#!/usr/bin/env node
// Renderuje wszystkie grafiki kampanii z tresci/kampania.json do grafiki/*.png.
// Nazwy plików biorą się z pól `file` w kampania.json (posty, relacje, wyróżnione, setup).
//
//   node narzedzia/grafiki/render.mjs              wszystko + podgląd
//   node narzedzia/grafiki/render.mjs --only P04,S03,H,R,setup
//   node narzedzia/grafiki/render.mjs --data inny.json --out katalog --no-sheet
//   node narzedzia/grafiki/zrob-zrzuty.mjs        zrzuty makiety procesu (S12), strona musi działać
//
// Ścieżki obrazów w JSON: od katalogu repo albo od katalogu kampanii.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "/Users/dawid/.claude/skills/auteur/node_modules/playwright/index.mjs";
import { doc, CAMPAIGN, missing } from "./lib/parts.mjs";
import { warnings, isEmpty } from "./lib/typeset.mjs";
import { postTemplates, POST_SIZE } from "./templates/posts.mjs";
import { storyTemplateFor, storyTheme, storyLabel, highlightCover, reelCover, STORY_SIZE, STORY_SAFE } from "./templates/stories.mjs";
import { setupJobs } from "./templates/setup.mjs";

const args = process.argv.slice(2);
const opt = (k) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : null;
};
const DATA = path.resolve(opt("--data") || path.join(CAMPAIGN, "tresci/kampania.json"));
// --out: inny katalog wyjściowy (np. podgląd z przykładowymi tekstami).
const OUT = path.resolve(opt("--out") || path.join(CAMPAIGN, "grafiki"));
const BUILD = path.join(path.dirname(new URL(import.meta.url).pathname), "_build");
const ONLY = (opt("--only") || "").split(",").filter(Boolean);
const SHEET = !args.includes("--no-sheet");

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(BUILD, { recursive: true });

const want = (name) => !ONLY.length || ONLY.some((o) => name === o || name.startsWith(o + "-") || name.startsWith(o));

// ---------------------------------------------------------------- posty
const PILLAR = {
  osobiste: "Poznajmy się",
  marka: "Marka",
  realizacje: "Realizacje",
  oferta: "Cennik",
  edukacja: "Poradnik",
  proces: "Proces",
  "branże": "Branże",
  automatyzacje: "Automatyzacje",
  faq: "Pytania i odpowiedzi",
};
const THEME = {
  "portrait-cover": "t-dark",
  text: "auto",
  list: "auto",
  cta: "t-wine",
  "project-cover": "t-dark",
  screenshot: "auto",
  phone: "auto",
  "price-cover": "t-wine",
  "edu-cover": "t-dark",
  tip: "t-dark",
  "steps-cover": "t-cream",
  step: "t-dark",
  "industry-cover": "t-dark",
  choice: "t-cream",
  "faq-cover": "t-wine",
  faq: "t-cream",
};
// Okładki ułożone tak, żeby siatka profilu miała rytm: grafit, krem, burgund.
const COVER = { P05: "t-cream", P10: "t-dark", P11: "t-cream" };
const THEME_NAME = { dark: "t-dark", cream: "t-cream", wine: "t-wine", burgund: "t-wine", grafit: "t-dark", krem: "t-cream" };

const jobs = [];
// Nazwa pliku wyjściowego: pole `file` z kampania.json (grafiki/xxx.png), inaczej nazwa własna.
const fileFrom = (v) => {
  const m = /grafiki\/([^\s"')]+\.png)/.exec(String(v || ""));
  return m ? m[1] : null;
};
const names = new Map(); // id logiczne (P01-1, R1-cover, S02-1, H1, OLX-1) -> plik
const nameOf = (id) => names.get(id) || `${id}.png`;
for (const post of data.posts || []) (post.slides || []).forEach((sl, i) => names.set(`${post.id}-${i + 1}`, fileFrom(sl.file) || `${post.id}-${i + 1}.png`));
for (const r of data.reels || []) names.set(`${r.id}-cover`, fileFrom(r.cover) || fileFrom(r.coverFile) || `${r.id}-cover.png`);
for (const st of data.stories || []) (st.frames || st.slides || [st]).forEach((fr, k) => names.set(`${st.id}-${k + 1}`, fileFrom(fr.file) || `${st.id}-${k + 1}.png`));
for (const h of data.highlights || []) names.set(h.id, fileFrom(h.file) || fileFrom(h.cover) || `${h.id}.png`);
const su = data.setup || {};
names.set("profile", fileFrom(su.facebook?.profileImage) || fileFrom(su.instagram?.profileImage) || "profile.png");
names.set("profile-mono", (names.get("profile") || "profile.png").replace(/\.png$/, "-monogram.png"));
names.set("fb-cover", fileFrom(su.facebook?.coverImage) || "fb-cover.png");
(su.olx?.images || []).forEach((im, i) => names.set(`OLX-${i + 1}`, fileFrom(im.file) || `OLX-${i + 1}.png`));

const globalOcc = {};
for (const post of data.posts || []) {
  if (!Array.isArray(post.slides) || !post.slides.length) continue;
  const n = post.slides.length;
  let prev = null;
  const occ = {};
  post.slides.forEach((slide, idx) => {
    const t = slide.template;
    const name = `${post.id}-${idx + 1}`;
    occ[t] = (occ[t] ?? -1) + 1;
    globalOcc[t] = (globalOcc[t] ?? -1) + 1;
    let theme = THEME_NAME[slide.theme] || (idx === 0 && COVER[post.id]) || THEME[t] || "t-cream";
    if (t === "price") theme = /biznes/i.test(`${slide.note} ${slide.eyebrow}`) ? "t-cream" : "t-dark";
    if (theme === "auto") theme = prev === "t-cream" ? "t-dark" : "t-cream";
    prev = theme;
    const fn = postTemplates[t];
    if (!fn) {
      warnings.push(`${name}: brak szablonu "${t}"`);
      return;
    }
    if (!want(name)) return;
    const ctx = { post, slide, i: idx + 1, n, theme, where: name, label: PILLAR[post.pillar] || post.pillar || "", occ: occ[t], gocc: globalOcc[t] };
    jobs.push({ name, group: "Posty", ...POST_SIZE, html: doc({ ...POST_SIZE, theme, body: fn(ctx) }) });
  });
}

// ---------------------------------------------------------------- relacje
let seq = 0;
(data.stories || []).forEach((story, si) => {
  const id = story.id || `S${String(si + 1).padStart(2, "0")}`;
  const frames = story.frames || story.slides || [story];
  frames.forEach((fr, k) => {
    const f = fr === story ? { ...story } : { ...fr };
    const name = `${id}-${k + 1}`;
    seq++;
    if (!want(name)) return;
    if (isEmpty(f.title)) f.title = f.headline ?? f.text ?? f.onScreenText;
    const tpl = f.template || story.template;
    let fn = storyTemplateFor(tpl);
    if (!fn) {
      warnings.push(`${name}: nieznany szablon relacji "${tpl}", użyto "story-text"`);
      fn = storyTemplateFor("story-text");
    }
    const theme = storyTheme(story, f, k);
    const counter = frames.length > 1 ? `${k + 1} / ${frames.length}` : "";
    const { theme: th, body } = fn({ story, f, k, n: frames.length, where: name, data, outDir: OUT, nameOf, theme, label: storyLabel(story, f), counter, seq });
    jobs.push({ name, group: "Relacje", ...STORY_SIZE, html: doc({ ...STORY_SIZE, theme: th, body, safeTop: STORY_SAFE.top, safeBottom: STORY_SAFE.bottom }) });
  });
});

// ---------------------------------------------------------------- wyróżnione, rolki, konta
(data.highlights || []).forEach((h) => {
  if (!want(h.id)) return;
  const { theme, body } = highlightCover(h);
  jobs.push({ name: h.id, group: "Wyróżnione", ...STORY_SIZE, html: doc({ ...STORY_SIZE, theme, body }) });
});
(data.reels || []).forEach((r) => {
  const name = `${r.id}-cover`;
  if (!want(name)) return;
  const { theme, body } = reelCover(r, data);
  // Rolki renderujemy razem z postami: relacje pokazują ich gotowe okładki.
  jobs.push({ name, group: "Okładki rolek", early: true, ...STORY_SIZE, html: doc({ ...STORY_SIZE, theme, body, safeTop: 285, safeBottom: 285 }) });
});
for (const j of setupJobs(data)) {
  if (!want(j.name) && !want("setup")) continue;
  jobs.push({ ...j, group: j.name.startsWith("OLX") ? "OLX" : "Konta", html: doc({ w: j.w, h: j.h, theme: j.theme, body: j.body, minBody: j.minBody || 28 }) });
}
for (const j of jobs) j.file = nameOf(j.name);

// ---------------------------------------------------------------- kontrola faktów
const PRICES = new Set(["990", "1 490", "1 990", "350", "700", "250"]);
function checkFacts(text) {
  const out = [];
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g)) if (m[0] !== "contact@dorlowski.dev") out.push(`e-mail "${m[0]}" różni się od contact@dorlowski.dev`);
  for (const m of text.matchAll(/(?<![\d])(\+?48 ?)?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\d)/g)) if (m[0].replace(/\D/g, "").slice(-9) !== "739258786") out.push(`numer "${m[0]}" różni się od 739 258 786`);
  for (const m of text.matchAll(/\b[a-z0-9-]*orlowski[a-z0-9-]*\.[a-z]{2,}\b/gi)) if (m[0].toLowerCase() !== "dorlowski.dev") out.push(`domena "${m[0]}" różni się od dorlowski.dev`);
  for (const m of text.matchAll(/(\d[\d ]*\d|\d)\s?zł/g)) {
    const v = m[1].trim();
    if (!PRICES.has(v) && !/^[0-3] 000$/.test(v)) out.push(`kwota "${m[0]}" spoza cennika (990, 1 490, 1 990, +350, +700, +250)`);
  }
  if (/\u2014/.test(text)) out.push("długi myślnik w tekście");
  return out;
}

// ---------------------------------------------------------------- render
const browser = await chromium.launch({ channel: "chrome" });
const ctxB = await browser.newContext({ deviceScaleFactor: 1 });
const report = [];
let done = 0;

async function renderJob(page, job) {
  const file = path.join(BUILD, job.name + ".html");
  fs.writeFileSync(file, job.html);
  await page.setViewportSize({ width: job.w, height: job.h });
  await page.goto("file://" + file, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))));
  await page.evaluate(() => window.__fit && window.__fit());
  const warn = await page.evaluate(() => window.__warn || []);
  const text = await page.evaluate(() => document.body.innerText.replace(/\u00A0/g, " "));
  for (const w of checkFacts(text)) warn.push(w);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")));
  for (const b of broken) warn.push("nie wczytano obrazu: " + b);
  await page.screenshot({ path: path.join(OUT, job.file), clip: { x: 0, y: 0, width: job.w, height: job.h } });
  for (const w of warn) report.push(`${job.name}: ${w}`);
  done++;
}

// Najpierw posty (relacje "share" pokazują gotowe okładki postów), potem reszta.
for (const phase of [jobs.filter((j) => j.group === "Posty" || j.early), jobs.filter((j) => !(j.group === "Posty" || j.early))]) {
  const queue = [...phase];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      const page = await ctxB.newPage();
      while (queue.length) await renderJob(page, queue.shift());
      await page.close();
    }),
  );
}

// Pełny przebieg usuwa stare pliki, których już nie ma w kampania.json (lista w _pliki.json).
const MANIFEST = path.join(OUT, "_pliki.json");
if (!ONLY.length) {
  const made = new Set(jobs.map((j) => j.file));
  let before = [];
  try {
    before = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {}
  const legacy = /^(P\d+-\d+|S\d+-\d+|H\d+|R\d+-cover|OLX-\d+|fb-cover|profile)\.png$/;
  for (const f of fs.readdirSync(OUT)) {
    if ((before.includes(f) || legacy.test(f)) && !made.has(f)) {
      fs.rmSync(path.join(OUT, f));
      console.log("usunięto nieaktualny plik: " + f);
    }
  }
  fs.writeFileSync(MANIFEST, JSON.stringify([...made].sort(), null, 1));
}

// ---------------------------------------------------------------- podgląd
if (SHEET && !ONLY.length) {
  const order = ["Posty", "Relacje", "Okładki rolek", "Wyróżnione", "Konta", "OLX"];
  const title = { Posty: "Posty i karuzele (1080x1350)", Relacje: "Relacje (1080x1920)", "Okładki rolek": "Okładki rolek (1080x1920)", "Wyróżnione": "Okładki wyróżnionych relacji", Konta: "Facebook i profil", OLX: "OLX (1600x1200)" };
  let html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#141414;color:#f4f0eb;font:500 18px/1.3 sans-serif;padding:40px;width:2320px}
    h2{font-size:28px;margin:40px 0 18px;font-weight:600;letter-spacing:.02em}
    .row{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:22px;align-items:flex-start}
    figure{margin:0}figure img{display:block;background:#333}figcaption{font-size:15px;color:#aaa;margin-top:6px}
  </style></head><body><h1 style="font-size:36px;margin:0">Kampania dorlowski.dev: podgląd grafik</h1>`;
  for (const g of order) {
    const list = jobs.filter((j) => j.group === g);
    if (!list.length) continue;
    html += `<h2>${title[g]} · ${list.length}</h2>`;
    const rows = g === "Posty" ? Object.values(Object.groupBy(list, (j) => j.name.split("-")[0])) : [list];
    for (const r of rows) {
      html += `<div class="row">`;
      for (const j of r) {
        const w = j.w > j.h ? 400 : j.w === j.h ? 220 : j.h > 1500 ? 180 : 216;
        html += `<figure><img src="file://${path.join(OUT, j.file)}" width="${w}"><figcaption>${j.file.replace(".png", "")}</figcaption></figure>`;
      }
      html += `</div>`;
    }
  }
  html += `</body></html>`;
  const file = path.join(BUILD, "_podglad.html");
  fs.writeFileSync(file, html);
  const page = await ctxB.newPage();
  await page.setViewportSize({ width: 2400, height: 1200 });
  await page.goto("file://" + file, { waitUntil: "load" });
  await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))));
  await page.screenshot({ path: path.join(OUT, "_podglad.png"), fullPage: true });
  await page.close();
}
await browser.close();

// ---------------------------------------------------------------- raport
const all = [...new Set([...warnings, ...report])];
console.log(`Wyrenderowano ${done} plików do ${path.relative(process.cwd(), OUT) || OUT}`);
if (missing.size) console.log(`Brakujące obrazy (użyto zastępstwa): ${[...missing].join(", ")}`);
const placeholders = all.filter((w) => w.includes("wstawiono znacznik"));
const rest = all.filter((w) => !w.includes("wstawiono znacznik"));
if (placeholders.length) console.log(`Puste pola tekstu (różowy znacznik): ${placeholders.length}`);
if (args.includes("--verbose")) placeholders.forEach((w) => console.log("  " + w));
if (rest.length) {
  console.log("Uwagi:");
  rest.forEach((w) => console.log("  " + w));
}
