// Auto-zrzuty ekranu z live'owych stron projektów.
//
// Generuje spójne zrzuty (desktop + mobile) dla każdego projektu z
// scripts/shots.config.json i zapisuje je w public/projects/<slug>/.
//
// Wymaga zainstalowanego Google Chrome (ścieżka jak niżej) oraz pakietu
// puppeteer-core (już w devDependencies).
//
// Użycie:
//   node scripts/shots.mjs              # wszystkie projekty z configu
//   node scripts/shots.mjs mechanik     # tylko wybrany slug (można podać kilka)
//
// Po wygenerowaniu zrzuty trafiają np. do:
//   public/projects/zbychu-garage/desktop.png
//   public/projects/zbychu-garage/mobile.png
// i odwołujesz się do nich w cv-data.ts jako "/projects/zbychu-garage/desktop.png".

import puppeteer from "puppeteer-core";
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Typowe lokalizacje Chrome na macOS / Linux
const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  process.env.CHROME_PATH,
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findChrome() {
  const { access } = await import("node:fs/promises");
  for (const p of CHROME_CANDIDATES) {
    try {
      await access(p);
      return p;
    } catch {}
  }
  throw new Error(
    "Nie znaleziono Chrome. Ustaw zmienną CHROME_PATH na ścieżkę do przeglądarki."
  );
}

// Przygotowanie strony do zrzutu:
// 1) przewinięcie w dół (odpala lazy-load i animacje wejścia),
// 2) zamrożenie animacji,
// 3) powrót na samą górę i odczekanie, aż sticky/fixed navbar wróci na miejsce.
async function preparePage(page, url) {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
  await sleep(900);

  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.85);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
  });

  // Zamrożenie animacji/przewijania — stabilny, powtarzalny kadr.
  await page
    .addStyleTag({
      content:
        "*{animation:none !important;transition:none !important;scroll-behavior:auto !important;}",
    })
    .catch(() => {});

  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(700);
}

async function shootProject(browser, project, viewports) {
  const slug = project.slug;
  const outDir = join(ROOT, "public", "projects", slug);
  await mkdir(outDir, { recursive: true });

  for (const [name, vp] of Object.entries(viewports)) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    try {
      await preparePage(page, project.url);
      const file = join(outDir, `${name}.png`);
      // Zrzut "above the fold" — czysty hero z navbarem na właściwym miejscu (u góry).
      // Świadomie NIE używamy fullPage: przy stronach ze sticky/fixed navbarem
      // pełnostronicowy zrzut renderuje pasek nawigacji w połowie strony.
      await page.screenshot({ path: file });
      console.log(`  ✅ ${slug}/${name}.png`);
    } catch (e) {
      console.log(`  ❌ ${slug}/${name}: ${e.message}`);
    } finally {
      await page.close();
    }
  }
}

async function main() {
  const cfgRaw = await readFile(join(__dirname, "shots.config.json"), "utf8");
  const cfg = JSON.parse(cfgRaw);
  const only = process.argv.slice(2);
  const projects = only.length
    ? cfg.projects.filter((p) => only.includes(p.slug))
    : cfg.projects;

  if (!projects.length) {
    console.log("Brak projektów do zrzucenia (sprawdź slug lub config).");
    return;
  }

  const executablePath = await findChrome();
  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });

  console.log(`Generuję zrzuty dla ${projects.length} projekt(ów)...`);
  for (const project of projects) {
    console.log(`▸ ${project.slug} — ${project.url}`);
    await shootProject(browser, project, cfg.viewports);
  }

  await browser.close();
  console.log("Gotowe.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
