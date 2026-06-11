import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://localhost:3000/";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const anchors = [
  ["hero", "#top"],
  ["uslugi", "#uslugi"],
  ["realizacje", "#realizacje"],
  ["proces", "#proces"],
  ["omnie", "#o-mnie"],
  ["cennik", "#cennik"],
  ["faq", "#faq"],
  ["kontakt", "#kontakt"],
];

async function scrollThrough(page) {
  // przewiń krok po kroku, by odpalić reveal-on-scroll
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

async function shoot(label, width, height) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle0" });
  await sleep(1200);
  await scrollThrough(page);

  // pełna strona
  await page.screenshot({ path: `/tmp/ux_${label}_full.png`, fullPage: true });

  // per-sekcja (viewport)
  for (const [name, sel] of anchors) {
    const found = await page.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return false;
      el.scrollIntoView({ block: "start" });
      return true;
    }, sel);
    if (!found) {
      console.log(`  [${label}] brak ${sel}`);
      continue;
    }
    await sleep(450);
    await page.screenshot({ path: `/tmp/ux_${label}_${name}.png` });
  }

  // stopka
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(500);
  await page.screenshot({ path: `/tmp/ux_${label}_footer.png` });

  await browser.close();
  console.log(`done ${label} ${width}x${height}`);
}

await shoot("desktop", 1440, 900);
await shoot("mobile", 390, 844);
console.log("ALL DONE");
