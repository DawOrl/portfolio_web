// Wspólne elementy: monogram, folio, stopka, ramy przeglądarki i telefonu.
import fs from "node:fs";
import path from "node:path";
import { esc, plain } from "./typeset.mjs";
import { CLIENT_LABEL, DEMO_LABEL, contact } from "./facts.mjs";

export const ROOT = path.resolve(new URL("../../../../../../", import.meta.url).pathname);
export const CAMPAIGN = path.join(ROOT, "design/marketing/2026-10-19-start");

export const missing = new Set();

// Ścieżka od katalogu repo albo od katalogu kampanii -> file:// URL
export function resolveAsset(p) {
  if (!p) return null;
  for (const base of [ROOT, CAMPAIGN]) {
    const abs = path.join(base, p);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}
export function src(p, fallback) {
  const abs = resolveAsset(p);
  if (abs) return "file://" + abs;
  if (p) missing.add(p);
  if (fallback) return src(fallback);
  return "";
}
export function exists(p) {
  return !!resolveAsset(p);
}

// Monogram "do" z public/logo.svg; kolory zależne od tła.
export function monogram({ stroke = "currentColor", square = "#9FC5D3", h = 40, cls = "" } = {}) {
  const w = Math.round((h * 88) / 64);
  return `<svg class="${cls}" width="${w}" height="${h}" viewBox="0 0 88 64" fill="none" aria-hidden="true"><path d="M34 8v36a14 14 0 1 1-14-14h14" stroke="${stroke}" stroke-width="8"/><circle cx="61" cy="44" r="14" stroke="${stroke}" stroke-width="8"/><path d="M77 8h8v8h-8z" fill="${square}"/></svg>`;
}
export function monoFor(theme, h = 40) {
  if (theme === "t-cream") return monogram({ stroke: "#A00C30", h });
  return monogram({ stroke: "#F4F0EB", h });
}

export const arrowNE = (c = "currentColor") =>
  `<svg class="arrow" viewBox="0 0 30 30" fill="none"><path d="M8 22 22 8M10 8h12v12" stroke="${c}" stroke-width="2.6"/></svg>`;
export const arrowRight = (c = "currentColor") =>
  `<svg viewBox="0 0 76 20" fill="none"><path d="M0 10h72M63 2l9 8-9 8" stroke="${c}" stroke-width="2.4"/></svg>`;

export function folio(left, right = "") {
  return `<div class="folio"><span class="l" data-fitw data-min="17">${left}</span><span class="r" data-fitw data-min="17">${right}</span></div>`;
}

export function foot({ theme, i, n, swipe = false, domain = true }) {
  const brand = `<div class="brand">${monoFor(theme)}${domain ? `<span>${contact.domain}</span>` : ""}</div>`;
  let right = "";
  if (swipe) right = `<div class="swipe">Przesuń ${arrowRight()}</div>`;
  else if (n > 1) right = `<div class="count num"><b>${String(i).padStart(2, "0")}</b> / ${String(n).padStart(2, "0")}</div>`;
  return `<div class="foot">${brand}${right}</div>`;
}

export function chipFor(project, extra = "") {
  if (!project) return "";
  const label = project.client ? CLIENT_LABEL : DEMO_LABEL;
  return `<span class="chip ${project.client ? "client" : "demo"}"><i></i><span>${esc(label)}${extra ? `<span style="opacity:.72">\u00A0· ${esc(extra)}</span>` : ""}</span></span>`;
}

// Rama przeglądarki bez wymyślonego adresu: w pasku tylko nazwa projektu.
export function browser({ img, label = "", style = "", cls = "", fallback }) {
  return `<div class="browser ${cls}" style="${style}"><div class="bar"><i></i><i></i><i></i>${label ? `<span>${esc(label)}</span>` : ""}</div><img src="${src(img, fallback)}" alt=""></div>`;
}

export function phone({ img, style = "", cls = "" }) {
  return `<div class="phone ${cls}" style="${style}"><div class="screen"><div class="sb"><i class="island"></i></div><img src="${src(img)}" alt=""></div></div>`;
}

export function sculpt(p, style) {
  return `<img class="sculpt" src="${src(p)}" style="${style}" alt="">`;
}

// Script wykonywany w przeglądarce: dopasowanie wielkości tekstu i kontrola stref.
const FIT_SCRIPT = `
window.__warn = [];
// Liczymy prostokąty bloków, nie scrollHeight: przy ciasnej interlinii Chrome
// wlicza do przepełnienia "pole" fontu, którego nie widać.
function over(box){
  const b = box.getBoundingClientRect();
  for (const el of [...box.children, ...box.querySelectorAll('[data-fit]')]) {
    const r = el.getBoundingClientRect();
    if (!r.height) continue;
    const bleed = el.style.marginRight && el.style.marginRight.startsWith("-") || el.style.margin && el.style.margin.includes("-");
    if (r.bottom > b.bottom + 1 || r.top < b.top - 1 || (!bleed && r.right > b.right + 1)) return true;
    if (el.hasAttribute('data-fit') && el.scrollWidth > el.clientWidth + 1) return true;
  }
  return false;
}
function shrink(t, k){ const fs = parseFloat(getComputedStyle(t).fontSize); const min = parseFloat(t.dataset.min || 26); if (fs <= min) return false; t.style.fontSize = Math.max(min, fs * k) + 'px'; return true; }
window.__fit = function(){
  // 1) słowa szersze niż kolumna
  for (const t of document.querySelectorAll('[data-fit],[data-fitw]')) {
    let g = 0; while (t.scrollWidth > t.clientWidth + 1 && g++ < 40) { if (!shrink(t, 0.96)) break; }
  }
  // 2) bloki o stałej wysokości: zmniejszaj wg priorytetu (data-fit="1" najpierw)
  for (const box of document.querySelectorAll('[data-box]')) {
    const ts = [...box.querySelectorAll('[data-fit]')].sort((a,b)=>(+a.dataset.fit||1)-(+b.dataset.fit||1));
    let g = 0;
    while (over(box) && g++ < 120) {
      let done = false;
      for (const t of ts) { if (shrink(t, 0.965)) { done = true; break; } }
      if (!done) { __warn.push('przepełnienie: ' + box.dataset.box); break; }
    }
  }
  // 3) czytelność i strefy bezpieczne
  const W = document.body.dataset.w|0, H = document.body.dataset.h|0;
  const st = +document.body.dataset.safetop || 0, sb = +document.body.dataset.safebottom || 0;
  // Polska typografia: żadna linia nie kończy się jednoliterowym słowem.
  const walker = document.createTreeWalker(document.querySelector('.cv'), NodeFilter.SHOW_TEXT);
  let prevTop = null, prevWord = '';
  while (walker.nextNode()) {
    const n = walker.currentNode, t = n.textContent;
    for (const m of t.matchAll(/\\S+/g)) {
      const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
      const rect = r.getClientRects()[0]; if (!rect) continue;
      if (prevTop !== null && rect.top > prevTop + 4 && /^[aiouwzAIOUWZ]$/.test(prevWord)) __warn.push('linia kończy się na "' + prevWord + '" przed: ' + m[0]);
      prevTop = rect.top; prevWord = m[0];
    }
  }
  for (const el of document.querySelectorAll('.body')) {
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < (+document.body.dataset.minbody || 28) && el.textContent.trim()) __warn.push('mały tekst ' + Math.round(fs) + 'px: ' + el.textContent.trim().slice(0, 40));
  }
  for (const el of document.querySelectorAll('.h,.body,.eyebrow,.chip,.li,.contact-rows,.folio,.foot,[data-safe]')) {
    const r = el.getBoundingClientRect();
    if (!r.width || el.closest('[data-nosafe]')) continue;
    if (r.left < 30 || r.right > W - 30 || r.top < st - 1 || r.bottom > H - sb + 1) __warn.push('poza strefą: ' + (el.className || el.tagName) + ' ' + el.textContent.trim().slice(0, 30) + ' [' + Math.round(r.top) + '-' + Math.round(r.bottom) + ']');
  }
};
`;

let CSS = null;
export function doc({ w, h, theme, body, safeTop = 0, safeBottom = 0, minBody = 28, extraCss = "" }) {
  if (!CSS) CSS = fs.readFileSync(new URL("../system.css", import.meta.url), "utf8").replaceAll("{{ROOT}}", "file://" + ROOT);
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>${CSS}${extraCss}</style></head>
<body data-w="${w}" data-h="${h}" data-safetop="${safeTop}" data-safebottom="${safeBottom}" data-minbody="${minBody}">
<div class="cv ${theme}" style="width:${w}px;height:${h}px">${body}</div>
<script>${FIT_SCRIPT}</script></body></html>`;
}

export { esc, plain };
