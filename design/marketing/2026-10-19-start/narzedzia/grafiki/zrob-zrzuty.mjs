#!/usr/bin/env node
// Zrzuty makiety "Od szkicu do gotowej strony" (sekcja procesu na stronie) do relacji S12.
// Wymaga działającej strony: http://localhost:3000 (albo adres w argumencie).
//   node narzedzia/grafiki/zrob-zrzuty.mjs [http://localhost:3000]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "/Users/dawid/.claude/skills/auteur/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), "zrzuty");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
await page.addInitScript(() => sessionStorage.setItem("dorlowski-intro-v2", "1"));
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const section = page.locator("#od-pomyslu-do-strony");
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

const stages = [
  ["Szkic", "proces-szkic.png"],
  ["Projekt", "proces-projekt.png"],
  ["Strona", "proces-strona.png"],
];
for (const [label, file] of stages) {
  await section.getByRole("button", { name: label, exact: true }).click();
  await page.waitForTimeout(900);
  const target = section.locator("#process-build-preview");
  await target.screenshot({ path: path.join(OUT, file) });
  console.log("zapisano zrzuty/" + file);
}
await browser.close();
