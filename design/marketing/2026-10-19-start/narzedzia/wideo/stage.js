// Compositor: every reel is a DOM scene evaluated at an exact time t, then screenshotted by
// render.mjs. Captions come from kampania.json (passed in by render.mjs), so a copy change only
// needs a re-render.

import { FPS, W, H, SAFE, clamp, lerp, ease, ramp, keys, polish, processScrubAt } from "./lib.js";

const TOOLS = "/design/marketing/2026-10-19-start/narzedzia/wideo";
const CAP = `${TOOLS}/tmp/cap`;
const INTRO = `${TOOLS}/tmp/intro-long/frames`;
const stage = document.getElementById("stage");
const measure = document.getElementById("measure");
const C = { graphite: "#1d1d1d", cream: "#f4f0eb", burgundy: "#a00c30", icy: "#9fc5d3" };

/* ---------------------------------------------------------------- DOM helpers */

function el(tag, cls, parent = stage, style) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (style) Object.assign(node.style, style);
  parent.appendChild(node);
  return node;
}
const px = (n) => `${n}px`;

/** Position a layer: translate, rotate, scale around its transform-origin, opacity. */
function place(node, { x = 0, y = 0, s = 1, r = 0, o = 1 } = {}) {
  node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`;
  node.style.opacity = String(clamp(o));
}

const pending = [];
function source(img, url) {
  if (img.dataset.src === url) return;
  img.dataset.src = url;
  img.src = url;
  pending.push(img.decode().catch(() => {}));
}
async function flush() {
  while (pending.length) await Promise.all(pending.splice(0));
}
function image(url, cls, parent = stage, style) {
  const img = el("img", cls, parent, style);
  source(img, url);
  return img;
}

/* ---------------------------------------------------------------- typography */

function findAccent(text, accent) {
  if (!accent) return null;
  const body = text.replace(/[.?!]\s*$/, "");
  if (accent === "last") {
    const m = body.match(/([^\s ]+)$/);
    return m ? [m.index, m.index + m[1].length] : null;
  }
  if (accent === "after:") {
    const i = body.indexOf(":");
    if (i < 0) return findAccent(text, "last");
    let s = i + 1;
    while (/\s/.test(body[s])) s++;
    return [s, body.length];
  }
  if (accent === "before:") {
    const i = body.indexOf(":");
    return i < 0 ? null : [0, i + 1];
  }
  const i = text.indexOf(accent);
  return i < 0 ? findAccent(text, "last") : [i, i + accent.length];
}

/** Plain text plus a class per character: accent (icy or burgundy) and the closing dot. */
function richText(raw, accent, { dot = true } = {}) {
  const text = polish(raw);
  let plain = "";
  const cls = [];
  if (/\*[^*\n]+\*/.test(text)) {
    let on = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "*") {
        on = !on;
        continue;
      }
      plain += text[i];
      cls.push(on ? "accent" : "");
    }
  } else {
    plain = text;
    for (let i = 0; i < plain.length; i++) cls.push("");
    const range = findAccent(plain, accent);
    if (range) for (let i = range[0]; i < range[1]; i++) if (!/\s/.test(plain[i]) || plain[i] === " ") cls[i] = "accent";
  }
  const end = plain.replace(/\s+$/, "").length - 1;
  if (dot && end >= 0 && ".?!".includes(plain[end])) cls[end] = "dot";
  return { plain, cls };
}

/** Explicit lines (\n) of words (split on normal spaces only, so U+00A0 keeps words glued). */
function tokens(plain, cls) {
  const lines = [];
  let line = [];
  let word = [];
  let seg = null;
  const pushWord = () => {
    if (word.length) line.push(word);
    word = [];
    seg = null;
  };
  for (let i = 0; i < plain.length; i++) {
    const ch = plain[i];
    if (ch === "\n") {
      pushWord();
      lines.push(line);
      line = [];
      continue;
    }
    if (ch === " ") {
      pushWord();
      continue;
    }
    if (!seg || seg.cls !== cls[i]) {
      seg = { text: "", cls: cls[i] };
      word.push(seg);
    }
    seg.text += ch;
  }
  pushWord();
  lines.push(line);
  return lines.filter((l) => l.length);
}

function wordNode(word) {
  const span = document.createElement("span");
  for (const seg of word) {
    const s = document.createElement("span");
    if (seg.cls) s.className = seg.cls;
    s.textContent = seg.text;
    span.appendChild(s);
  }
  return span;
}

/** Largest size at which the text fits maxLines balanced lines of `width`. */
function layout(lines, { width = 920, max = 96, min = 52, maxLines = 3, weight = 500, tracking = "-.045em" }) {
  let result;
  for (let size = max; size >= min; size -= 2) {
    measure.innerHTML = "";
    Object.assign(measure.style, { fontSize: px(size), width: px(width), fontWeight: weight, letterSpacing: tracking });
    const visual = [];
    let overflow = false;
    for (const line of lines) {
      const div = el("div", "", measure);
      const spans = line.map((w, i) => {
        if (i) div.appendChild(document.createTextNode(" "));
        const s = wordNode(w);
        div.appendChild(s);
        return s;
      });
      let top = null;
      let current = null;
      spans.forEach((s, i) => {
        if (s.offsetWidth > width) overflow = true;
        if (s.offsetTop !== top) {
          top = s.offsetTop;
          current = [];
          visual.push(current);
        }
        current.push(line[i]);
      });
    }
    result = { size, visual };
    if (!overflow && visual.length <= maxLines) break;
  }
  measure.innerHTML = "";
  return result;
}

function lineNodes(parent, visual) {
  return visual.map((words) => {
    const mask = el("div", "mask", parent);
    const line = el("div", "line", mask);
    words.forEach((w, i) => {
      if (i) line.appendChild(document.createTextNode(" "));
      line.appendChild(wordNode(w));
    });
    return line;
  });
}

/** Folio + headline revealed line by line through masks (like the site hero), exits upward. */
class Caption {
  constructor({ text, accent, folio, theme = "dark", top = SAFE.top, max = 96, min = 52, maxLines = 3, sub = false, subSize = 38, tin, tout = Infinity, parent = stage, width = 920, dot = true }) {
    const { plain, cls } = richText(text, accent, { dot });
    let lines = tokens(plain, cls);
    let subLines = [];
    if (sub && lines.length > 1) {
      subLines = lines.slice(1);
      lines = lines.slice(0, 1);
    }
    this.root = el("div", `cap${theme === "light" ? " light" : ""}`, parent, { top: px(top) });
    if (folio) {
      this.folio = el("div", "folio", this.root);
      this.folio.innerHTML = folio;
      this.rule = el("i", "", this.folio);
    }
    const { size, visual } = layout(lines, { width, max, min, maxLines });
    this.size = size;
    const head = el("div", "head", this.root, { fontSize: px(size) });
    this.lines = lineNodes(head, visual);
    this.subs = [];
    if (subLines.length) {
      const sub = el("div", "sub", this.root, { fontSize: px(subSize) });
      const { visual: sv } = layout(subLines, { width, max: subSize, min: subSize - 8, maxLines: 3, tracking: "-.02em" });
      this.subs = lineNodes(sub, sv);
    }
    this.tin = tin;
    this.tout = tout;
  }
  get bottom() {
    return this.root.offsetTop + this.root.offsetHeight;
  }
  update(t) {
    const { tin, tout } = this;
    const on = t >= tin - 0.001 && t <= tout + 0.9;
    this.root.style.visibility = on ? "visible" : "hidden";
    if (!on) return;
    const all = this.lines.concat(this.subs);
    all.forEach((line, i) => {
      const delay = i * 0.075 + (i >= this.lines.length ? 0.15 : 0);
      const pin = ease.outQuint(clamp((t - tin - delay) / 0.95));
      const pout = ease.inCubic(clamp((t - tout - i * 0.035) / 0.42));
      line.style.transform = `translate3d(0, ${(1 - pin) * 118 - pout * 118}%, 0) rotate(${(1 - pin) * 2.2}deg)`;
    });
    if (this.folio) {
      const pout = ease.inCubic(clamp((t - tout) / 0.35));
      this.rule.style.transform = `scaleX(${ease.outExpo(clamp((t - tin) / 1.1))})`;
      this.folio.style.opacity = String(Math.min(ease.outCubic(clamp((t - tin) / 0.5)), 1 - pout));
    }
  }
}

/** Monogram from public/logo.svg, drawn as a pen stroke, then the address with an icy TLD and
 * the site slogan as a signature. "stack" centres monogram, headline, address and slogan as one
 * block; "fixed" puts the headline at the top and monogram + address low (room for art between). */
const SLOGAN = "Dobry design. Jeszcze lepsza strona.";
class EndCard {
  constructor({ text, tin, accent = null, mode = "stack", centre = 960, headTop = SAFE.top, headLines = 1, monoY = 1300, monoW = 290, urlY = 1430, urlMax = 124, headMax = 92, slogan = true }) {
    const parts = polish(text)
      .split(/\n|\s\|\s/)
      .map((s) => s.trim())
      .filter(Boolean);
    let url = "dorlowski.dev";
    const rest = [];
    for (const part of parts) {
      const m = part.match(/([a-z0-9-]+\.(?:dev|pl|com))\b/i);
      if (m) {
        url = m[1];
        const left = part.replace(m[0], "").trim();
        if (left) rest.push(left);
      } else rest.push(part);
    }
    this.tin = tin;
    this.headline = rest.length
      ? new Caption({ text: rest.join("\n"), accent, top: headTop, tin: tin + 0.05, max: headMax, min: 48, maxLines: headLines })
      : null;
    const monoH = (monoW * 64) / 88;
    this.mono = el("div", "mono", stage, { left: px(SAFE.left + 4), width: px(monoW), height: px(monoH) });
    this.mono.innerHTML = `<svg viewBox="0 0 88 64" width="${monoW}" height="${monoH}" overflow="visible"><path class="stroke d" pathLength="1" d="M34 8v36a14 14 0 1 1-14-14h14"/><circle class="stroke o" pathLength="1" cx="61" cy="44" r="14" transform="rotate(-90 61 44)"/><path class="sq" d="M77 8h8v8h-8z"/></svg>`;
    this.d = this.mono.querySelector(".d");
    this.o = this.mono.querySelector(".o");
    this.sq = this.mono.querySelector(".sq");
    const dot = url.indexOf(".");
    const { size } = layout([[[{ text: url, cls: "" }]]], { width: 920, max: urlMax, min: 60, maxLines: 1, tracking: "-.05em" });
    this.url = el("div", "end-url", stage, { fontSize: px(size) });
    const mask = el("div", "mask", this.url);
    this.urlLine = el("div", "line", mask);
    this.urlLine.innerHTML = `${url.slice(0, dot)}<span class="tld">${url.slice(dot)}</span>`;
    this.sig = null;
    if (slogan) {
      this.sig = el("div", "end-url", stage, { fontSize: "34px", letterSpacing: "-.01em", color: "rgb(244 240 235 / .6)" });
      const m2 = el("div", "mask", this.sig);
      this.sigLine = el("div", "line", m2);
      this.sigLine.textContent = SLOGAN;
    }
    // Vertical rhythm.
    const urlH = size * 1.1 + size * 0.24;
    const sigH = this.sig ? 34 * 1.1 + 30 : 0;
    if (mode === "stack") {
      const headH = this.headline ? this.headline.root.offsetHeight + 34 : 0;
      const total = monoH + 64 + headH + urlH + (this.sig ? 18 + sigH : 0);
      let y = Math.round(centre - total / 2);
      this.mono.style.top = px(y);
      y += monoH + 64;
      if (this.headline) {
        this.headline.root.style.top = px(y);
        y += headH;
      }
      this.url.style.top = px(y - size * 0.06);
      y += urlH + 18;
      if (this.sig) this.sig.style.top = px(y);
    } else {
      this.mono.style.top = px(monoY);
      this.url.style.top = px(urlY);
      if (this.sig) this.sig.style.top = px(urlY + urlH + 14);
    }
    this.update(-1);
  }
  update(t) {
    const t0 = this.tin;
    const on = t >= t0 - 0.001;
    for (const n of [this.mono, this.url, this.sig]) if (n) n.style.visibility = on ? "visible" : "hidden";
    this.headline?.update(t);
    if (!on) return;
    // A slow rise keeps the closing card alive until the last frame.
    const rise = `0 ${(-18 * clamp((t - t0) / 3.5)).toFixed(2)}px`;
    for (const n of [this.mono, this.url, this.sig, this.headline?.root]) if (n) n.style.translate = rise;
    const pd = ease.inOutCubic(clamp((t - t0) / 0.62));
    const po = ease.inOutCubic(clamp((t - t0 - 0.16) / 0.56));
    // A finished stroke drops its dash, or the joint of the dash pattern shows as a hairline.
    this.d.style.strokeDasharray = pd >= 1 ? "none" : "1 1";
    this.o.style.strokeDasharray = po >= 1 ? "none" : "1 1";
    this.d.style.strokeDashoffset = String(1 - pd);
    this.o.style.strokeDashoffset = String(1 - po);
    const sq = ease.outQuint(clamp((t - t0 - 0.55) / 0.5));
    this.sq.style.transform = `scale(${sq}) rotate(${(1 - sq) * -45}deg)`;
    const pu = ease.outQuint(clamp((t - t0 - 0.12) / 0.95));
    this.urlLine.style.transform = `translate3d(0, ${(1 - pu) * 118}%, 0) rotate(${(1 - pu) * 2}deg)`;
    if (this.sig) {
      const ps = ease.outQuint(clamp((t - t0 - 0.32) / 0.95));
      this.sigLine.style.transform = `translate3d(0, ${(1 - ps) * 118}%, 0)`;
    }
  }
}

/* ---------------------------------------------------------------- devices */

function makePhone(parent, { k, x, y, bezel = 14 }) {
  const sw = 390 * k;
  const sh = 844 * k;
  const R = 55 * k;
  const root = el("div", "phone layer", parent, { left: px(x), top: px(y), width: px(sw + 2 * bezel), height: px(sh + 2 * bezel), borderRadius: px(R + bezel), transformOrigin: "50% 50%" });
  const screen = el("div", "screen", root, { left: px(bezel), top: px(bezel), width: px(sw), height: px(sh), borderRadius: px(R) });
  el("div", "btn", root, { left: "-3px", top: px(bezel + 170 * k), height: px(56 * k) });
  el("div", "btn", root, { left: "-3px", top: px(bezel + 240 * k), height: px(56 * k) });
  el("div", "btn", root, { right: "-3px", left: "auto", top: px(bezel + 200 * k), height: px(90 * k) });
  return { root, screen, k, sw, sh, x, y, bezel, sx: x + bezel, sy: y + bezel };
}

function makeBrowser(parent, { x, y, width, imgW = 2880, imgH = 1800 }) {
  const h = 38 + (width * imgH) / imgW;
  const root = el("div", "browser layer", parent, { left: px(x), top: px(y), width: px(width), height: px(h), transformOrigin: "50% 50%" });
  const bar = el("div", "bar", root);
  el("span", "", bar);
  el("span", "", bar);
  el("span", "", bar);
  el("em", "", bar);
  const img = el("img", "", root, { width: px(width) });
  return { root, img, h };
}

/** A rectangle of a capture (in CSS px of the captured page) scaled by k. */
function cropView(parent, { url, natW, dpr, rect, k, radius = 0, x, y, shadow }) {
  const [cx, cy, cw, ch] = rect;
  const root = el("div", "crop layer", parent, { left: px(x), top: px(y), width: px(cw * k), height: px(ch * k), borderRadius: px(radius * k), boxShadow: shadow || "none", transformOrigin: "50% 50%" });
  const img = el("img", "", root, { width: px((natW / dpr) * k), transform: `translate(${-cx * k}px, ${-cy * k}px)` });
  if (url) source(img, url);
  return { root, img };
}

/** Finger tap: a soft dot that lands, then a ring that spreads. */
class Tap {
  constructor(parent, { color = "29 29 29" } = {}) {
    this.root = el("div", "tap", parent);
    this.dot = el("div", "", this.root, { width: "54px", height: "54px", background: `rgb(${color} / .2)`, border: `2px solid rgb(${color} / .38)` });
    this.ring = el("div", "", this.root, { width: "54px", height: "54px", border: `2px solid rgb(${color} / .45)` });
    this.root.style.visibility = "hidden";
  }
  update(t, taps) {
    const tap = taps.find((p) => t >= p.t - 0.28 && t <= p.t + 0.55);
    this.root.style.visibility = tap ? "visible" : "hidden";
    if (!tap) return;
    const { x, y } = tap.at(t);
    this.root.style.transform = `translate(${x}px, ${y}px)`;
    const pin = ease.outCubic(clamp((t - tap.t + 0.28) / 0.22));
    const press = t < tap.t ? 1 - 0.12 * ease.inOutSine(clamp((t - tap.t + 0.08) / 0.08)) : 0.88 + 0.12 * ease.outCubic(clamp((t - tap.t) / 0.15));
    const fade = 1 - ease.inCubic(clamp((t - tap.t - 0.12) / 0.4));
    this.dot.style.opacity = String(pin * fade);
    this.dot.style.transform = `translate(-50%, -50%) scale(${(0.7 + 0.3 * pin) * press})`;
    const pr = clamp((t - tap.t) / 0.5);
    this.ring.style.opacity = String(t < tap.t ? 0 : (1 - ease.outCubic(pr)) * 0.9);
    this.ring.style.transform = `translate(-50%, -50%) scale(${1 + 1.4 * ease.outCubic(pr)})`;
  }
}

/** Full-screen panel that sweeps in from the bottom (clip-path), used between colour worlds. */
function wipe(node, t, t0, t1, from = "bottom") {
  const p = ease.inOutQuart(clamp((t - t0) / (t1 - t0)));
  node.style.visibility = p <= 0 ? "hidden" : "visible";
  node.style.clipPath = from === "bottom" ? `inset(${(1 - p) * 100}% 0 0 0)` : `inset(0 0 ${(1 - p) * 100}% 0)`;
}

/* ---------------------------------------------------------------- reels */

const shotText = (reel, i) => reel.shots[i]?.onScreenText ?? "";
const shotFrom = (reel, i, fallback) => reel.shots[i]?.from ?? fallback;
const shotTo = (reel, i, fallback) => reel.shots[i]?.to ?? fallback;

/** R1 "Od kreski do strony": the Blender intro film, then the ribbon lands in the live hero. */
function R1(reel, caps) {
  const hero = caps.hero;
  const RIB_Y = 1060; // ribbon centre on the canvas while it is drawn
  const ribbonFrames = 195;

  // Phone with the hero entrance (captured frame by frame).
  const k = 1.25;
  const bezel = 13;
  const phone = makePhone(stage, { k, bezel, x: (W - (390 * k + 2 * bezel)) / 2, y: 545 });
  const heroImg = el("img", "", phone.screen, { width: px(phone.sw), height: px(phone.sh) });
  const [stX, stY, stW, stH] = hero.stage;
  const formWidth = Math.min(stW, (stH * 10) / 11);
  const landW = formWidth * 1.3 * k; // the hero still is the central 1/1.3 of a film frame
  const landC = { x: phone.sx + (stX + stW / 2) * k, y: phone.sy + (stY + stH / 2) * k };
  // Same ribbon, clipped by the screen, takes over once it has landed.
  const clipped = el("img", "", phone.screen, { position: "absolute", left: 0, top: 0, width: "1080px", transformOrigin: "50% 50%" });
  const ribbon = el("img", "layer", stage, { width: "1080px", transformOrigin: "50% 50%" });

  const c1 = new Caption({ text: shotText(reel, 0), accent: "kreski", folio: "<b>01</b> / Kreska", tin: -0.25, tout: shotTo(reel, 0, 3) - 0.3 });
  const c2 = new Caption({ text: shotText(reel, 1), accent: "formę", folio: "<b>02</b> / Forma", tin: shotFrom(reel, 1, 3) + 0.12, tout: shotTo(reel, 1, 6.5) - 0.3 });
  const c3 = new Caption({ text: shotText(reel, 2), accent: "after:", folio: "<b>03</b> / Strona", tin: shotFrom(reel, 2, 6.5) + 0.25, tout: shotTo(reel, 2, 10) - 0.3, maxLines: 2 });
  const endT = shotFrom(reel, 3, 10);
  const end = new EndCard({ text: shotText(reel, 3), tin: endT - 0.15 });
  const FLY = [6.5, 7.65];
  const HERO_T0 = 6.9;

  function ribbonAt(t) {
    // Slow push while drawing, then the flight into the hero (expo, like the site intro).
    const push = 1 + 0.06 * ease.inOutSine(clamp(t / 6.5));
    const p = ease.inOutExpo(clamp((t - FLY[0]) / (FLY[1] - FLY[0])));
    const s0 = push;
    const s1 = landW / 1080;
    return {
      x: lerp(540, landC.x, p),
      y: lerp(RIB_Y, landC.y, p),
      s: s0 * (s1 / s0) ** p,
      r: -5 * p,
    };
  }

  return {
    duration: reel.duration,
    seek(t) {
      const frame = clamp(Math.floor(t * FPS) + 7, 1, ribbonFrames); // the film opens on ~6 empty frames
      const url = `${INTRO}/${String(frame).padStart(3, "0")}.png`;
      source(ribbon, url);
      source(clipped, url);
      const rb = ribbonAt(t);
      const fadeIn = ramp(t, 7.05, 7.55, ease.inOutSine);
      place(ribbon, { x: rb.x - 540, y: rb.y - 594, s: rb.s, r: rb.r, o: 1 - fadeIn });
      ribbon.style.visibility = t > endT ? "hidden" : "visible";
      // Phone rises in under the flying ribbon, holds, then leaves for the end card.
      const pin = ease.outCubic(ramp(t, 6.35, 7.25));
      const pout = ease.inCubic(ramp(t, endT - 0.35, endT + 0.1));
      const drift = 1 + 0.018 * ease.inOutSine(ramp(t, 7.6, endT));
      place(phone.root, { y: (1 - pin) * 90 - pout * 60, s: (0.97 + 0.03 * pin) * drift, o: pin * (1 - pout) });
      const heroFrame = clamp(Math.floor((t - HERO_T0) * FPS), 0, hero.frames - 1);
      source(heroImg, `${CAP}/hero/${String(heroFrame).padStart(4, "0")}.png`);
      const handOff = 1 - ramp(t, 8.15, 8.6, ease.inOutSine);
      place(clipped, { x: rb.x - phone.sx - 540, y: rb.y - phone.sy - 594, s: rb.s, r: rb.r, o: fadeIn * handOff });
      for (const c of [c1, c2, c3]) c.update(t);
      end.update(t);
    },
    cover: { at: 6.3, title: reel.coverTitle, hide: [c1, c2, c3], prepare: () => (ribbon.style.translate = "0 170px") },
  };
}

/** R2 "Szkic, projekt, strona": the scrubbed ProcessBuild mock-up on a cream page. */
function R2(reel, caps) {
  const proc = caps.process;
  const files = new Map(proc.values.map((v, i) => [v, proc.files[i]]));
  const nearest = (v) => {
    if (files.has(v)) return files.get(v);
    let best = proc.values[0];
    for (const x of proc.values) if (Math.abs(x - v) < Math.abs(best - v)) best = x;
    return files.get(best);
  };
  const clipW = proc.clip.width;
  const rel = (r) => [r[0] - proc.clip.x, r[1] - proc.clip.y, r[2], r[3]];

  // Opening: process sculpture on graphite.
  const art = image("/public/process-form-blender.webp", "layer", stage, { width: "1000px", left: "40px", top: px(1090 - 364), transformOrigin: "50% 50%" });
  const c0 = new Caption({ text: shotText(reel, 0), accent: "strona", folio: "<b>04</b> / Proces", tin: -0.25, tout: shotTo(reel, 0, 2.5) - 0.35 });

  // Cream world with the device mock-ups cut out of the capture.
  const cream = el("div", "fill", stage, { background: C.cream, visibility: "hidden" });
  const group = el("div", "fill", cream, { transformOrigin: "540px 1100px" });
  const shadow = "0 2px 4px #0000000c, 0 18px 36px -14px #00000038, 0 50px 90px -40px #00000040";
  const kb = 1.22;
  const browser = cropView(group, { natW: clipW * 2, dpr: 2, rect: rel(proc.rects.browser), k: kb, radius: 14, x: 52, y: 640, shadow });
  const kp = 1.8;
  const [, , pw, ph] = proc.rects.phone;
  const phoneX = W - 56 - pw * kp;
  const phoneY = 640 + proc.rects.browser[3] * kb - 270;
  const phone = cropView(group, { natW: clipW * 2, dpr: 2, rect: rel(proc.rects.phone), k: kp, radius: 24, x: phoneX, y: phoneY, shadow });
  const ready = cropView(group, { natW: clipW * 2, dpr: 2, rect: rel(proc.rects.ready).map((v, i) => (i < 2 ? v - 4 : v + 8)), k: 1.9, x: 56, y: 640 + proc.rects.browser[3] * kb + 34 });
  const steps = [1, 2, 3].map(
    (n, i) =>
      new Caption({
        text: shotText(reel, n),
        accent: "before:",
        theme: "light",
        folio: `<b>0${n}</b> / ${["Szkic", "Projekt", "Strona"][i]}`,
        max: 84,
        tin: shotFrom(reel, n, 2.5 + i * 3.5) + 0.1,
        tout: shotTo(reel, n, 6 + i * 3.5) - 0.3,
        parent: cream,
      }),
  );

  const endT = shotFrom(reel, 4, 13);
  const dark = el("div", "fill", stage, { background: C.graphite, visibility: "hidden" });
  const end = new EndCard({ text: shotText(reel, 4), tin: endT - 0.05 });

  return {
    duration: reel.duration,
    seek(t) {
      const ain = ease.outExpo(ramp(t, 0, 1.4));
      const float = Math.sin(t * 1.4) * 6;
      place(art, { y: float + (1 - ain) * 40, s: 1.1 - 0.1 * ain + 0.02 * ramp(t, 1.4, 2.5, ease.inOutSine), o: 0.35 + 0.65 * ease.outCubic(ramp(t, 0, 0.5)) });
      c0.update(t);
      wipe(cream, t, 2.2, 2.85);
      const file = nearest(processScrubAt(t));
      const url = `${CAP}/process/${file}`;
      for (const v of [browser, phone, ready]) source(v.img, url);
      const din = ease.outQuart(ramp(t, 2.42, 3.3));
      const pinPhone = ease.outQuart(ramp(t, 2.52, 3.45));
      place(browser.root, { y: (1 - din) * 110, o: din });
      place(phone.root, { y: (1 - pinPhone) * 150, o: pinPhone });
      place(ready.root, { o: ramp(processScrubAt(t), 1.95, 2.35) });
      place(group, { s: 1 + 0.035 * ease.inOutSine(ramp(t, 2.7, endT)) });
      for (const c of steps) c.update(t);
      wipe(dark, t, endT - 0.3, endT + 0.25, "top");
      end.update(t);
    },
    cover: { at: 1.6, title: reel.coverTitle, hide: [c0] },
  };
}

/** R3 Glow Studio (demo): the real booking steps, taps animated over full-page captures. */
function R3(reel, caps) {
  const glow = caps.glow;
  const st = Object.fromEntries(glow.states.map((s) => [s.name, s]));
  const k = 1.38;
  const bezel = 14;
  const phone = makePhone(stage, { k, bezel, x: (W - (390 * k + 2 * bezel)) / 2, y: 600 });
  phone.root.style.transformOrigin = "50% 62%";
  const imgA = el("img", "", phone.screen, { position: "absolute", left: 0, top: 0, width: px(phone.sw), transformOrigin: "0 0", willChange: "transform, opacity" });
  const imgB = el("img", "", phone.screen, { position: "absolute", left: 0, top: 0, width: px(phone.sw), transformOrigin: "0 0", willChange: "transform, opacity" });
  const tap = new Tap(phone.screen);

  const S = 380; // the wizard sits right under the phone's top edge at this scroll
  const centre = (box) => [box[0] + box[2] / 2, box[1] + box[3] / 2];
  const T = { service: 5.1, stylist: 6.75, next: 7.45, day: 8.2, hour: 8.9 };
  const segs = [
    { t: 0, file: glow.home, scroll: (t) => keys(t, [[0.7, 0], [2.6, 120]], ease.inOutSine), fade: 0 },
    { t: 2.5, file: st["s0-usluga"].file, scroll: (t) => keys(t, [[2.5, S], [2.85, S], [4.85, 690]]), fade: 0.32, slide: true },
    { t: T.service + 0.1, file: st["s1-usluga-wybrana"].file, scroll: () => 690, fade: 0.16 },
    { t: 6.05, file: st["s2-stylista"].file, scroll: () => S, fade: 0.32, slide: true },
    { t: T.stylist + 0.1, file: st["s3-stylista-wybrana"].file, scroll: () => S, fade: 0.16 },
    { t: T.next + 0.1, file: st["s4-termin"].file, scroll: () => S, fade: 0.28, slide: true },
    { t: T.day + 0.1, file: st["s5-dzien"].file, scroll: () => S, fade: 0.16 },
    { t: T.hour + 0.1, file: st["s6-godzina"].file, scroll: (t) => keys(t, [[T.hour, S], [10.05, S], [11.3, 700]]), fade: 0.16 },
  ];
  const tapAt = (box, scroll) => (t) => {
    const [x, y] = centre(box);
    return { x: x * k, y: (y - scroll(t)) * k };
  };
  const taps = [
    { t: T.service, at: tapAt(st["s1-usluga-wybrana"].tap, segs[1].scroll) },
    { t: T.stylist, at: tapAt(st["s3-stylista-wybrana"].tap, () => S) },
    { t: T.next, at: tapAt(st["s4-termin"].tap, () => S) },
    { t: T.day, at: tapAt(st["s5-dzien"].tap, () => S) },
    { t: T.hour, at: tapAt(st["s6-godzina"].tap, () => S) },
  ];

  const folio = "Glow Studio <b>/</b> projekt autorski (demo)";
  const c0 = new Caption({ text: shotText(reel, 0), accent: "21:00", folio: "Glow Studio <b>/</b> salon beauty", sub: true, max: 88, maxLines: 2, tin: -0.25, tout: shotTo(reel, 0, 2.5) - 0.3 });
  const c1 = new Caption({ text: shotText(reel, 1), accent: "ceny", folio, max: 88, maxLines: 2, tin: shotFrom(reel, 1, 2.5) + 0.15, tout: shotTo(reel, 1, 6) - 0.3 });
  const c2 = new Caption({ text: shotText(reel, 2), accent: "godzinę", folio, max: 88, maxLines: 2, tin: shotFrom(reel, 2, 6) + 0.15, tout: shotTo(reel, 2, 10) - 0.3 });
  const c3 = new Caption({ text: shotText(reel, 3), accent: "bez prowizji", folio, max: 88, maxLines: 2, tin: shotFrom(reel, 3, 10) + 0.15, tout: shotTo(reel, 3, 13) - 0.3 });
  const endT = shotFrom(reel, 4, 13);
  const end = new EndCard({ text: shotText(reel, 4), tin: endT - 0.15 });

  const show = (img, seg, t, o, dy = 0) => {
    source(img, `${CAP}/glow/${seg.file}`);
    img.style.transform = `translate3d(0, ${-seg.scroll(t) * k + dy}px, 0)`;
    img.style.opacity = String(o);
  };

  return {
    duration: reel.duration,
    seek(t) {
      let i = 0;
      while (i + 1 < segs.length && t >= segs[i + 1].t) i++;
      const cur = segs[i];
      const p = cur.fade ? ease.inOutSine(clamp((t - cur.t) / cur.fade)) : 1;
      if (i > 0 && p < 1) {
        show(imgA, segs[i - 1], t, 1);
        show(imgB, cur, t, p, cur.slide ? (1 - ease.outCubic(p)) * 26 : 0);
      } else {
        show(imgA, cur, t, 1);
        imgB.style.opacity = "0";
      }
      tap.update(t, taps);
      const pin = ease.outQuart(ramp(t, 0, 0.8));
      const pout = ease.inCubic(ramp(t, endT - 0.35, endT + 0.1));
      const drift = 1 + 0.02 * ease.inOutSine(ramp(t, 0.8, endT)) + 0.045 * ease.inOutSine(ramp(t, 10.9, endT));
      place(phone.root, { y: (1 - pin) * 120 - pout * 60, s: drift, o: (0.25 + 0.75 * pin) * (1 - pout) });
      for (const c of [c0, c1, c2, c3]) c.update(t);
      end.update(t);
    },
    cover: { at: 1.9, title: reel.coverTitle, hide: [c0, c1, c2, c3], tag: "Projekt autorski (demo)", prepare: () => (phone.root.style.translate = "0 380px") },
  };
}

const PROJECTS = [
  { slug: "topauto-serwis", name: "TopAuto Serwis", client: true },
  { slug: "restauracja-bella", name: "Bella Cucina" },
  { slug: "salon-glow", name: "Glow Studio" },
  { slug: "sklep-craft-coffee", name: "Craft Coffee" },
  { slug: "fotograf-lena", name: "Lena Czarnecka" },
  { slug: "eko-solar", name: "EkoSolar" },
  { slug: "asystent-ai", name: "Asystent AI" },
  { slug: "kalkulator-wyceny", name: "Kalkulator wyceny" },
];

/** R4 "8 projektów w 20 sekund": library fan, eight quick cuts, the empty frame as the invitation. */
function R4(reel) {
  const fan = image("/public/art/library-fan.webp", "layer", stage, { width: "980px", left: "50px", top: px(1110 - 420), transformOrigin: "50% 50%" });
  const c0 = new Caption({ text: shotText(reel, 0), accent: "sekund", folio: "Biblioteka <b>/</b> 2026", tin: -0.25, tout: shotTo(reel, 0, 3) - 0.3 });

  // Montage text: line 1 belongs to the client project, line 2 heads the demos, the rest lists them.
  const montage = shotText(reel, 1).split("\n");
  const t0 = shotFrom(reel, 1, 3);
  const t1 = shotTo(reel, 1, 15);
  const slot = (t1 - t0) / PROJECTS.length;
  const clientLine = montage[0] || "";
  const demoHead = montage[1] || "";
  const list = montage.slice(2).join(" ").split(/,\s*/).filter(Boolean);
  const capTop = SAFE.top + 56;
  const cClient = new Caption({ text: clientLine, accent: "after:", max: 76, maxLines: 2, top: capTop, tin: t0 + 0.1, tout: t0 + slot - 0.55 });
  const cDemo = new Caption({ text: demoHead, accent: "(demo)", max: 64, maxLines: 2, top: capTop, tin: t0 + slot + 0.05, tout: t1 - 0.3, dot: false });
  // The list keeps its final layout; each word appears with its project, the current one in icy.
  const listBox = el("div", "cap", stage, { top: px(cDemo.bottom + 16) });
  const listHead = el("div", "head", listBox, { fontSize: "50px", letterSpacing: "-.035em", lineHeight: "1.12" });
  const listWords = list.map((word, i) => {
    const span = el("span", "", listHead, { display: "inline-block", whiteSpace: "nowrap" });
    span.textContent = polish(word) + (i < list.length - 1 ? "," : "");
    if (i < list.length - 1) listHead.appendChild(document.createTextNode(" "));
    return span;
  });
  const folioBox = el("div", "cap", stage, { top: px(SAFE.top) });
  const folio = el("div", "folio", folioBox);
  const folioText = el("span", "", folio);
  const rule = el("i", "", folio);

  const bw = 900;
  const items = PROJECTS.map((p) => {
    const g = el("div", "fill", stage, { visibility: "hidden" });
    const b = makeBrowser(g, { x: 56, y: 650, width: bw });
    source(b.img, `/public/projects/${p.slug}/desktop.png`);
    const ph = makePhone(g, { k: 0.8, bezel: 11, x: W - 52 - (390 * 0.8 + 22), y: 880 });
    const m = el("img", "", ph.screen, { width: px(ph.sw) });
    source(m, `/public/projects/${p.slug}/mobile.png`);
    return { g, b, ph };
  });

  const endT = shotFrom(reel, 2, 15);
  const vacancy = image("/public/art/library-vacancy.webp", "layer", stage, { width: "700px", left: "190px", top: px(610), transformOrigin: "50% 50%" });
  const end = new EndCard({ text: shotText(reel, 2), tin: endT + 0.1, accent: "następna", mode: "fixed", headLines: 2, monoY: 1250, monoW: 160, urlY: 1380, urlMax: 104 });

  return {
    duration: reel.duration,
    seek(t) {
      // Opening fan, then it swings away as the first project arrives.
      const fin = ease.outExpo(ramp(t, 0, 1.6));
      const fout = ease.outQuart(clamp((t - t0 + 0.2) / 0.6));
      place(fan, { x: fout * -1100, y: (1 - fin) * 50 + Math.sin(t * 1.3) * 5, s: 0.9 + 0.1 * fin + 0.03 * ramp(t, 1.6, t0, ease.inOutSine), r: (1 - fin) * -6, o: (0.3 + 0.7 * ease.outCubic(ramp(t, 0, 0.45))) * (1 - 0.5 * fout) });
      fan.style.visibility = fout >= 1 ? "hidden" : "visible";
      c0.update(t);

      const idx = clamp(Math.floor((t - t0) / slot), 0, PROJECTS.length - 1);
      // Carousel: every cut is a quick push to the left, so two projects never cross-fade.
      const PUSH = 0.55;
      let pos = 0;
      for (let i = 1; i < PROJECTS.length; i++) pos += ease.inOutCubic(clamp((t - (t0 + i * slot) + PUSH / 2) / PUSH));
      const enter = ease.outQuart(clamp((t - t0 + 0.2) / 0.6));
      const leave = ease.inOutQuart(clamp((t - t1 + 0.25) / 0.5));
      const P = pos - (1 - enter) + leave;
      items.forEach((it, i) => {
        const off = i - P;
        const alive = Math.abs(off) < 1.25 && t > t0 - 0.25 && t < t1 + 0.3;
        it.g.style.visibility = alive ? "visible" : "hidden";
        if (!alive) return;
        const drift = -22 * ((t - (t0 + i * slot)) / slot - 0.5);
        place(it.b.root, { x: off * 1100 + drift });
        place(it.ph.root, { x: off * 1260 + drift * 1.6, y: Math.abs(off) * 40 });
      });

      // Folio counts the projects and names them; the client/demo status is in the captions.
      const inMontage = t >= t0 - 0.05 && t <= t1;
      folioBox.style.visibility = inMontage ? "visible" : "hidden";
      if (inMontage) {
        const p = PROJECTS[idx];
        folioText.innerHTML = `<b>${String(idx + 1).padStart(2, "0")}</b> / 08 &nbsp;${p.name}`;
        rule.style.transform = `scaleX(${ease.outExpo(clamp((t - t0) / 1))})`;
        folio.style.opacity = String(Math.min(ease.outCubic(clamp((t - t0) / 0.4)), 1 - ease.inCubic(clamp((t - t1 + 0.3) / 0.3))));
      }
      cClient.update(t);
      cDemo.update(t);
      const listOut = ease.inCubic(clamp((t - t1 + 0.3) / 0.35));
      listBox.style.visibility = t >= t0 + slot - 0.05 && t <= t1 + 0.2 ? "visible" : "hidden";
      listWords.forEach((w, j) => {
        const s = t0 + (j + 1) * slot + (j === 0 ? 0.35 : 0);
        const pin = ease.outQuint(clamp((t - s - 0.05) / 0.5));
        const current = j === idx - 1;
        w.style.color = current ? C.icy : C.cream;
        w.style.opacity = String(pin * (current ? 1 : 0.55) * (1 - listOut));
        w.style.transform = `translate3d(0, ${(1 - pin) * 30 - listOut * 20}px, 0)`;
      });

      const vin = ease.outExpo(ramp(t, endT, endT + 1.6));
      place(vacancy, { y: (1 - vin) * 60 + Math.sin(t * 1.2) * 6, s: 0.92 + 0.08 * vin + 0.03 * ramp(t, endT + 1.6, reel.duration, ease.inOutSine), r: (1 - vin) * 5, o: ease.outCubic(ramp(t, endT, endT + 0.6)) });
      vacancy.style.visibility = t < endT ? "hidden" : "visible";
      end.update(t);
    },
    cover: { at: 2.2, title: reel.coverTitle, hide: [c0] },
  };
}

/* ---------------------------------------------------------------- runtime */

const REELS = { R1, R2, R3, R4 };
let scene = null;
let coverCaption = null;

window.setup = async (reel, caps) => {
  await document.fonts.load('500 96px "Montserrat"', "Ąą Ęę Łł Ńń Óó Śś Źź Żż abc");
  await document.fonts.ready;
  stage.innerHTML = "";
  scene = REELS[reel.id](reel, caps);
  await flush();
  return { duration: scene.duration };
};

window.seek = async (t) => {
  scene.seek(t);
  await flush();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
};

/** Cover still: the scene at `cover.at`, its captions swapped for the cover title. */
window.cover = async () => {
  const { at, title, hide, tag, prepare } = scene.cover;
  scene.seek(at);
  prepare?.();
  for (const c of hide) c.root.style.visibility = "hidden";
  coverCaption?.root.remove();
  coverCaption = new Caption({ text: title, folio: tag ? `dorlowski.dev <b>/</b> ${tag}` : "dorlowski.dev", max: 128, maxLines: 3, top: 330, tin: -10 });
  coverCaption.update(0);
  await flush();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
};

window.stageReady = true;
