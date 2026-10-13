// Screen captures used by the reels. Each capture lands in tmp/cap/<name>/ with a meta.json
// and is reused on later renders unless --recapture is passed.
//   R1 hero:    http://localhost:3000 hero entrance, 390x844 @2x, frame by frame on a paused clock
//   R2 process: ProcessBuild scrub (#od-pomyslu-do-strony) at 1440x900 @2x, one shot per scrub value
//   R3 glow:    Glow Studio demo (home + /rezerwacja steps) at 390x844 @3x, full-page stills
// Nothing is ever submitted: on the demo every non-GET request is aborted.

import fs from "node:fs";
import path from "node:path";
import { FPS, processScrubAt } from "./lib.js";

const PLAYWRIGHT =
  process.env.PLAYWRIGHT_MODULE || "/Users/dawid/.claude/skills/auteur/node_modules/playwright/index.mjs";
const SITE = process.env.SITE_URL || "http://localhost:3000";
const GLOW = "https://salon-glow-gamma.vercel.app";

const HIDE_DEV_UI = `nextjs-portal,[data-nextjs-toast],#__next-build-watcher{display:none!important}`;

async function browser() {
  const { chromium } = await import(PLAYWRIGHT);
  return chromium.launch({ channel: "chrome" });
}

function skipIntroAndDevUi(css) {
  try {
    sessionStorage.setItem("dorlowski-intro-v2", "1");
  } catch {}
  const add = () => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };
  if (document.head) add();
  else document.addEventListener("DOMContentLoaded", add);
}

// Fonts plus the images already in view (lazy ones further down never fire), at most 8 s.
// The timeout lives in Node: the hero capture pauses the page clock.
const settle = (page) =>
  Promise.race([
    page
      .evaluate(async () => {
        const visible = [...document.images].filter((img) => !img.complete && img.getBoundingClientRect().top < innerHeight);
        await Promise.all([document.fonts.ready, ...visible.map((img) => img.decode().catch(() => null))]);
      })
      .catch(() => null),
    new Promise((r) => setTimeout(r, 8000)),
  ]);

const done = (dir) => fs.existsSync(path.join(dir, "meta.json"));
const writeMeta = (dir, meta) => fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2));
const fresh = (dir) => {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
};

/** R1: hero entrance on a paused clock, so GSAP advances exactly 1/30 s per frame. */
export async function captureHero(dir, { force = false, frames = 120 } = {}) {
  if (done(dir) && !force) return;
  fresh(dir);
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await ctx.addInitScript(skipIntroAndDevUi, HIDE_DEV_UI);
  const page = await ctx.newPage();
  const start = new Date("2026-10-19T10:00:00");
  await page.clock.install({ time: start });
  await page.clock.pauseAt(new Date(start.getTime() + 1000));
  await page.goto(SITE + "/", { waitUntil: "networkidle" });
  await settle(page);
  await page.waitForTimeout(700);
  for (let i = 0; i < frames; i++) {
    await page.screenshot({ path: path.join(dir, `${String(i).padStart(4, "0")}.png`) });
    await page.clock.runFor(1000 / FPS);
  }
  await page.clock.runFor(2000);
  const meta = await page.evaluate(() => {
    const r = document.querySelector(".hero-signature-entry").getBoundingClientRect();
    return { viewport: [innerWidth, innerHeight], stage: [r.x, r.y, r.width, r.height] };
  });
  writeMeta(dir, { ...meta, frames, dpr: 2 });
  await b.close();
  console.log(`  hero: ${frames} frames`);
}

/** R2: ProcessBuild is a scrubbed GSAP timeline (2.7 s long over 0.95 viewport heights of scroll). */
export async function captureProcess(dir, { force = false, from = 2.4, to = 13.2 } = {}) {
  const values = [];
  for (let f = Math.floor(from * FPS); f <= Math.ceil(to * FPS); f++) {
    const v = processScrubAt(f / FPS);
    if (!values.includes(v)) values.push(v);
  }
  if (done(dir) && !force) {
    const meta = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
    if (values.every((v) => meta.values.includes(v))) return;
  }
  fresh(dir);
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(skipIntroAndDevUi, HIDE_DEV_UI + "html{scroll-behavior:auto!important}");
  const page = await ctx.newPage();
  await page.goto(SITE + "/", { waitUntil: "networkidle" });
  await settle(page);
  const start = await page.evaluate(async () => {
    const section = document.querySelector("#od-pomyslu-do-strony");
    section.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    const holder = section.parentElement.classList.contains("pin-spacer") ? section.parentElement : section;
    return holder.getBoundingClientRect().top + scrollY;
  });
  const span = await page.evaluate(() => Math.round(innerHeight * 0.95));
  const goTo = (y) =>
    page.evaluate(async (y) => {
      window.scrollTo(0, y);
      for (let i = 0; i < 3; i++) await new Promise((r) => requestAnimationFrame(r));
    }, y);
  await goTo(start + span / 2);
  await page.waitForTimeout(500);
  const rects = await page.evaluate(() => {
    const box = (s) => {
      const r = document.querySelector(s).getBoundingClientRect();
      return [r.x, r.y, r.width, r.height];
    };
    return {
      devices: box(".process-build-devices"),
      browser: box(".process-build-browser"),
      phone: box(".process-build-phone"),
      ready: box(".process-build-ready"),
      background: getComputedStyle(document.querySelector(".process-build")).backgroundColor,
    };
  });
  const pad = 30;
  const [dx, dy, dw, dh] = rects.devices;
  const clip = { x: Math.floor(dx - pad), y: Math.floor(dy - pad), width: Math.ceil(dw + 2 * pad), height: Math.ceil(dh + 2 * pad) };
  const files = [];
  for (let i = 0; i < values.length; i++) {
    await goTo(start + (values[i] / 2.7) * span);
    const file = `${String(i).padStart(4, "0")}.jpg`;
    await page.screenshot({ path: path.join(dir, file), clip, type: "jpeg", quality: 95 });
    files.push(file);
  }
  const stages = await page.evaluate(() => document.querySelector(".process-build").dataset.stage);
  writeMeta(dir, { values, files, clip, rects, dpr: 2, lastStage: stages });
  await b.close();
  console.log(`  process: ${values.length} scrub shots`);
}

/** R3: Glow Studio demo. Full-page stills of each booking step; taps are animated in the compositor. */
export async function captureGlow(dir, { force = false } = {}) {
  if (done(dir) && !force) return;
  fresh(dir);
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  // Read-only visit: no form, booking or analytics request leaves the browser.
  await ctx.route("**/*", (route) => (route.request().method() === "GET" ? route.continue() : route.abort()));
  const page = await ctx.newPage();

  await page.goto(GLOW + "/", { waitUntil: "networkidle", timeout: 60000 });
  await settle(page);
  await page.waitForTimeout(2500);
  // A little more than one screen, for a slow scroll in the opening shot.
  await page.screenshot({ path: path.join(dir, "home.png"), fullPage: true, clip: { x: 0, y: 0, width: 390, height: 1000 } });

  await page.goto(GLOW + "/rezerwacja", { waitUntil: "networkidle", timeout: 60000 });
  await settle(page);
  await page.waitForTimeout(2000);

  const box = async (locator) => {
    const handle = locator.first();
    await handle.scrollIntoViewIfNeeded();
    const r = await handle.evaluate((el) => {
      const b = el.getBoundingClientRect();
      return [b.x, b.y + scrollY, b.width, b.height];
    });
    return r;
  };
  const states = [];
  const snap = async (name, extra = {}) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const file = `${name}.png`;
    await page.screenshot({ path: path.join(dir, file), fullPage: true });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const marks = await page.evaluate(() => {
      const out = {};
      const find = (sel, text) =>
        [...document.querySelectorAll(sel)].find((el) => el.offsetParent && el.textContent.replace(/\s+/g, " ").includes(text));
      const rect = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return [b.x, b.y + scrollY, b.width, b.height];
      };
      out.steps = rect(document.querySelector("ol, [aria-label*='krok' i], [class*='step' i]"));
      out.title = rect(find("h2, h3", "Wybierz"));
      const summary = find("aside, div, section", "Twoja wizyta");
      let s = summary;
      while (s && s.parentElement && s.parentElement.textContent.replace(/\s+/g, " ").trim().startsWith("Twoja wizyta")) s = s.parentElement;
      out.summary = rect(s);
      return out;
    });
    states.push({ name, file, height, marks, ...extra });
  };

  await snap("s0-usluga");
  const service = page.getByRole("button", { name: /Balayage/ });
  const serviceBox = await box(service);
  await service.first().click();
  await page.waitForTimeout(700);
  await snap("s1-usluga-wybrana", { tap: serviceBox });

  const next = () => page.getByRole("button", { name: /^Dalej/ });
  let nextBox = await box(next());
  await next().first().click();
  await page.waitForTimeout(900);
  await snap("s2-stylista", { tap: nextBox });

  const stylist = page.getByRole("button", { name: /Maja Kowalczyk/ });
  const stylistBox = await box(stylist);
  await stylist.first().click();
  await page.waitForTimeout(700);
  await snap("s3-stylista-wybrana", { tap: stylistBox });

  nextBox = await box(next());
  await next().first().click();
  await page.waitForTimeout(900);
  await snap("s4-termin", { tap: nextBox });

  const days = page.locator("button:not([disabled])").filter({ hasText: /\d{1,2}\s*paź|\d{1,2}\s*lis|\d{1,2}\s*[a-ząćęłńóśźż]{3}\b/i });
  const dayCount = await days.count();
  const day = days.nth(Math.min(2, dayCount - 1));
  const dayBox = await box(day);
  await day.click();
  await page.waitForTimeout(700);
  await snap("s5-dzien", { tap: dayBox });

  const hours = page.locator("button:not([disabled])").filter({ hasText: /^\s*\d{1,2}:\d{2}\s*$/ });
  const preferred = hours.filter({ hasText: "13:00" });
  const hour = (await preferred.count()) ? preferred.first() : hours.nth(2);
  const hourBox = await box(hour);
  await hour.click();
  await page.waitForTimeout(700);
  await snap("s6-godzina", { tap: hourBox });

  writeMeta(dir, { viewport: [390, 844], dpr: 3, home: "home.png", states });
  await b.close();
  console.log(`  glow: ${states.length} booking states`);
}
