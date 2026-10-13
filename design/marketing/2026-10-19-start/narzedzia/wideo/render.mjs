#!/usr/bin/env node
// Renders the campaign reels (R1-R4) from tresci/kampania.json into wideo/.
//
//   node design/marketing/2026-10-19-start/narzedzia/wideo/render.mjs            all reels
//   node .../render.mjs R2 R3                                                     chosen reels
//   node .../render.mjs R1 --still 0.5,6.6,11                                     PNG stills only (tmp/stills)
//   node .../render.mjs --covers                                                  cover stills only (tmp/stills)
//   node .../render.mjs --recapture                                               redo screen captures
//
// Captions are read from kampania.json at render time. Screen captures and the long intro film
// are cached in tmp/ (gitignored); the local site (localhost:3000) is only needed to recapture.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FPS, W, H } from "./lib.js";
import { captureHero, captureProcess, captureGlow } from "./capture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CAMPAIGN = path.resolve(HERE, "../..");
const ROOT = path.resolve(CAMPAIGN, "../../..");
const TMP = path.join(HERE, "tmp");
const PLAYWRIGHT =
  process.env.PLAYWRIGHT_MODULE || "/Users/dawid/.claude/skills/auteur/node_modules/playwright/index.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const stills = option("--still")?.split(",").map(Number);
const coversOnly = flag("--covers");
const wanted = args.filter((a) => /^R\d$/.test(a));
const recapture = flag("--recapture");

/* ------------------------------------------------------------ static server for the stage */

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
function serve() {
  const server = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream", "cache-control": "max-age=3600" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

/* ------------------------------------------------------------ inputs */

function introFrames() {
  const dir = path.join(TMP, "intro-long");
  if (fs.existsSync(path.join(dir, "frames", "195.png"))) return;
  console.log("R1: rendering the long intro film in Blender (about 10 min)...");
  const result = spawnSync(
    process.env.BLENDER || "/opt/homebrew/bin/blender",
    ["--background", "--factory-startup", "--python-exit-code", "1", "--python", path.join(HERE, "blender_intro.py"), "--", "--output-dir", dir],
    { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] },
  );
  if (result.status !== 0) throw new Error("Blender render failed");
}

async function captures(ids) {
  const cap = (n) => path.join(TMP, "cap", n);
  const meta = (n) => JSON.parse(fs.readFileSync(path.join(cap(n), "meta.json"), "utf8"));
  const out = {};
  if (ids.includes("R1")) {
    introFrames();
    await captureHero(cap("hero"), { force: recapture });
    out.hero = meta("hero");
  }
  if (ids.includes("R2")) {
    await captureProcess(cap("process"), { force: recapture });
    out.process = meta("process");
  }
  if (ids.includes("R3")) {
    await captureGlow(cap("glow"), { force: recapture });
    out.glow = meta("glow");
  }
  return out;
}

/* ------------------------------------------------------------ encode */

function encoder(file) {
  const ff = spawn(
    "ffmpeg",
    [
      "-y", "-v", "error",
      "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
      "-vf", "scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
      "-c:v", "libx264", "-preset", "slow", "-crf", "13", "-maxrate", "16M", "-bufsize", "32M",
      "-profile:v", "high", "-level:v", "4.2", "-g", "60", "-bf", "2",
      // aq-mode 3 spends more bits on dark flat areas: no banding on the graphite.
      "-x264-params", "aq-mode=3:aq-strength=0.9",
      "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
      "-r", String(FPS), "-an", "-movflags", "+faststart", file,
    ],
    { stdio: ["pipe", "inherit", "inherit"] },
  );
  const closed = new Promise((resolve, reject) => ff.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg ${code}`)))));
  return {
    write: (buf) => (ff.stdin.write(buf) ? null : new Promise((r) => ff.stdin.once("drain", r))),
    end: () => {
      ff.stdin.end();
      return closed;
    },
  };
}

function contactSheet(video, out, duration) {
  const cols = 6;
  const rows = Math.ceil(duration / cols);
  spawnSync("ffmpeg", ["-y", "-v", "error", "-i", video, "-vf", `fps=1,scale=270:480,tile=${cols}x${rows}:padding=6:color=0x444444`, "-frames:v", "1", out]);
}

/* ------------------------------------------------------------ main */

const campaign = JSON.parse(fs.readFileSync(path.join(CAMPAIGN, "tresci", "kampania.json"), "utf8"));
const reels = campaign.reels.filter((r) => !wanted.length || wanted.includes(r.id));
const caps = await captures(reels.map((r) => r.id));
const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = await import(PLAYWRIGHT);
const browser = await chromium.launch({ channel: "chrome", args: ["--force-color-profile=srgb", "--disable-lcd-text"] });
const review = path.join(TMP, "review");
fs.mkdirSync(review, { recursive: true });

try {
  for (const reel of reels) {
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    page.on("pageerror", (e) => console.error(`  [${reel.id}] page error: ${e.message}`));
    await page.goto(`${base}/design/marketing/2026-10-19-start/narzedzia/wideo/stage.html`);
    await page.waitForFunction(() => window.stageReady === true);
    const { duration } = await page.evaluate(([r, c]) => window.setup(r, c), [reel, caps]);
    const cdp = await page.context().newCDPSession(page);
    const shot = async () => Buffer.from((await cdp.send("Page.captureScreenshot", { format: "png", optimizeForSpeed: true })).data, "base64");

    if (coversOnly) {
      await page.evaluate(() => window.cover());
      fs.mkdirSync(path.join(TMP, "stills"), { recursive: true });
      await page.screenshot({ path: path.join(TMP, "stills", `${reel.id}-cover.jpg`), type: "jpeg", quality: 92 });
      await page.close();
      continue;
    }
    if (stills) {
      const dir = path.join(TMP, "stills");
      fs.mkdirSync(dir, { recursive: true });
      for (const t of stills) {
        await page.evaluate((t) => window.seek(t), t);
        fs.writeFileSync(path.join(dir, `${reel.id}-${t.toFixed(2)}.png`), await shot());
      }
      console.log(`${reel.id}: ${stills.length} stills in ${path.relative(ROOT, dir)}`);
      await page.close();
      continue;
    }

    const out = path.join(CAMPAIGN, reel.file || `wideo/${reel.id}.mp4`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const frames = Math.round(duration * FPS);
    const started = Date.now();
    const enc = encoder(out);
    for (let f = 0; f < frames; f++) {
      await page.evaluate((t) => window.seek(t), f / FPS);
      await enc.write(await shot());
      if (f % 60 === 0) process.stdout.write(`\r${reel.id}: frame ${f}/${frames}`);
    }
    await enc.end();
    await page.evaluate(() => window.cover());
    const poster = out.replace(/\.mp4$/, "-poster.jpg");
    await page.screenshot({ path: poster, type: "jpeg", quality: 92 });
    contactSheet(out, path.join(review, `${reel.id}-sheet.png`), duration);
    const mb = (fs.statSync(out).size / 1e6).toFixed(1);
    console.log(`\r${reel.id}: ${frames} frames, ${mb} MB, ${((Date.now() - started) / 1000).toFixed(0)} s -> ${path.relative(ROOT, out)}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
