// Relacje (1080 x 1920), okładki wyróżnionych relacji i okładki rolek.
import fs from "node:fs";
import path from "node:path";
import { field, rich, esc, isEmpty } from "../lib/typeset.mjs";
import { folio, monoFor, monogram, sculpt, src, exists, chipFor, browser, phone } from "../lib/parts.mjs";
import { contact, projectFromPath } from "../lib/facts.mjs";

export const STORY_SIZE = { w: 1080, h: 1920 };
// Interfejs Instagrama zasłania 250 px u góry i 340 px u dołu.
export const STORY_SAFE = { top: 250, bottom: 340 };

const S = {
  ribbon: "design/intro/hero-form.png",
  links: "public/contact-link-blender.webp",
  process: "public/process-form-blender.webp",
  fan: "public/art/library-fan.webp",
  frame: "public/art/library-vacancy.webp",
  lock: "public/art/privacy-lock.webp",
  vform: "public/contact-form-blender.webp",
};

const THEME_NAME = { dark: "t-dark", cream: "t-cream", wine: "t-wine", grafit: "t-dark", krem: "t-cream", burgund: "t-wine" };
// Kolor relacji wynika z jej rodzaju; kolejne klatki tej samej relacji zmieniają tło.
const TYPE_THEME = {
  "share-post": "t-cream",
  "behind-the-scenes": "t-dark",
  question: "t-wine",
  quiz: "t-cream",
  poll: "t-dark",
  link: "t-dark",
  reminder: "t-wine",
};
const TYPE_LABEL = {
  "share-post": "Nowy post",
  "behind-the-scenes": "Za kulisami",
  question: "Pytania",
  quiz: "Quiz",
  poll: "Ankieta",
  link: "Link",
  reminder: "Przypomnienie",
};
const ALT = { "t-cream": "t-dark", "t-dark": "t-cream", "t-wine": "t-dark" };

// Folio i stopka relacji leżą wewnątrz strefy bezpiecznej.
function sFolio(left, right) {
  return folio(left, right).replace('class="folio"', 'class="folio" style="top:262px"');
}
function sFoot(theme, text = contact.domain) {
  return `<div class="foot" style="bottom:372px"><div class="brand">${monoFor(theme)}<span>${esc(text)}</span></div></div>`;
}
const T = (f, where, cls = "h2", min = 56, prio = 1) =>
  `<h1 class="h ${cls}" data-fit="${prio}" data-min="${min}">${field(f, "title", where, "title")}</h1>`;
const B = (f, where, cls = "lg", optional = true) =>
  optional && isEmpty(f.body) ? "" : `<div class="body ${cls}" data-fit="2" data-min="32">${field(f, "body", where, "para")}</div>`;
const gap = (h) => `<div style="height:${h}px;flex:none"></div>`;

// Naklejka Instagrama dokładana w aplikacji: rezerwujemy na nią miejsce (znaczniki narożników).
export function stickerKind(sticker = "") {
  const t = String(sticker).toLowerCase();
  if (!t.trim()) return null;
  if (t.startsWith("ankieta")) return { kind: "poll", w: 780, h: 150 + 90 * Math.min(4, Math.max(2, (t.split(":").slice(1).join(":").match(/\//g) || []).length + 1)) };
  if (t.startsWith("quiz")) return { kind: "quiz", w: 780, h: 160 + 90 * Math.min(4, Math.max(2, (t.replace(/\(.*\)/, "").match(/\//g) || []).length + 1)) };
  if (t.startsWith("pytanie")) return { kind: "question", w: 780, h: 330 };
  if (t.startsWith("link")) return { kind: "link", w: 520, h: 120 };
  return { kind: "other", w: 600, h: 200 };
}
function stickerZone(st, align = "center") {
  if (!st) return "";
  const { w, h } = st;
  const c = (x, y, r) => `<path d="M${x} ${y + 36 * r[1]}V${y}H${x + 36 * r[0]}" stroke="var(--muted)" stroke-width="3" fill="none" opacity=".75"/>`;
  return `<div data-sticker style="position:relative;width:${w}px;height:${h}px;flex:none;${align === "center" ? "margin:0 auto" : ""}">
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">${c(2, 2, [1, 1])}${c(w - 2, 2, [-1, 1])}${c(2, h - 2, [1, -1])}${c(w - 2, h - 2, [-1, -1])}</svg></div>`;
}

function stage(where, inner, style = "") {
  return `<div class="abs" data-box="${where}" style="left:80px;right:80px;top:340px;bottom:440px;display:flex;flex-direction:column;${style}">${inner}</div>`;
}

const ART_ROTATION = [S.links, S.frame, S.process, S.ribbon, S.lock, S.fan, S.vform];

// Obraz klatki: plik z repo/kampanii, gotowa grafika (P03, R1) albo opis do zastąpienia.
function resolveImage(img = "", outDir, nameOf) {
  if (!img) return null;
  const s = String(img).trim();
  const post = /^P\d{2}$/.exec(s);
  const reel = /^R\d$/.exec(s);
  if (post || reel) {
    const file = nameOf(post ? `${s}-1` : `${s}-cover`);
    const abs = path.join(outDir, file);
    return { kind: post ? "post" : "reel", url: "file://" + abs, exists: fs.existsSync(abs), ref: s };
  }
  if (exists(s)) return { kind: "file", url: src(s), path: s };
  // Opisy z kampania.json: znane zastępstwa.
  const fal = /zdjecia-fal\/[\w-]+\.webp/.exec(s);
  if (fal && exists(fal[0])) return { kind: "photo", url: src(fal[0]), path: fal[0], substitute: true };
  if (/#proces|makiet/i.test(s)) {
    const stageName = /projekt/i.test(s.replace(/#proces/i, "")) ? "projekt" : /stron[aąy]\b/i.test(s.replace(/dorlowski\.dev/i, "")) ? "strona" : "szkic";
    const shot = `design/marketing/2026-10-19-start/narzedzia/grafiki/zrzuty/proces-${stageName}.png`;
    if (exists(shot)) return { kind: "mockup", url: src(shot), path: shot };
  }
  return { kind: "missing", note: s };
}

export const storyTemplates = {
  "story-share"(ctx) {
    const { f, where } = ctx;
    const theme = ctx.theme;
    const st = stickerKind(f.sticker);
    const im = resolveImage(f.image, ctx.outDir, ctx.nameOf);
    const reel = im?.kind === "reel";
    const card = im && im.exists
      ? `<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:10px 0">
          <img src="${im.url}" style="max-height:100%;max-width:${reel ? 520 : 760}px;width:auto;box-shadow:var(--shadow);border-radius:10px;transform:rotate(-2deg)" alt="">
        </div>`
      : `<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center">${im ? `<span class="ph">[brak grafiki ${esc(im.ref || "")}]</span>` : ""}</div>`;
    return {
      theme,
      body: `${sFolio(esc(reel ? "Nowa rolka" : ctx.label), ctx.counter)}
      ${stage(where, `${T(f, where, "h3", 52)}${gap(22)}${B(f, where, "")}${gap(34)}${card}${st ? `${gap(34)}${stickerZone(st)}` : ""}`)}
      ${sFoot(theme)}`,
    };
  },

  "story-photo"(ctx) {
    const { f, where } = ctx;
    const theme = "t-dark";
    const st = stickerKind(f.sticker);
    const im = resolveImage(f.image, ctx.outDir, ctx.nameOf);
    const photo = im && ["file", "photo"].includes(im.kind) ? im.url : exists("zdjecia-fal/biurko.webp") ? src("zdjecia-fal/biurko.webp") : "";
    return {
      theme,
      body: `${photo ? `<img class="sculpt" src="${photo}" style="inset:0;width:100%;height:100%;object-fit:cover">` : sculpt(S.process, "width:1000px;right:-160px;top:320px")}
      <div class="abs" style="inset:0;background:linear-gradient(180deg, rgb(29 29 29 / 72%) 0%, rgb(29 29 29 / 20%) 22%, transparent 34%, transparent 46%, rgb(29 29 29 / 86%) 66%, #1d1d1d 84%)"></div>
      ${sFolio(esc(ctx.label), ctx.counter)}
      ${stage(where, `${st ? stickerZone(st) : ""}<div style="flex:1;min-height:60px"></div>${T(f, where, "h2", 56)}${gap(28)}${B(f, where)}`)}
      ${sFoot(theme)}`,
    };
  },

  "story-text"(ctx) {
    const { f, where, k } = ctx;
    const theme = ctx.theme;
    const st = stickerKind(f.sticker);
    const im = resolveImage(f.image, ctx.outDir, ctx.nameOf);
    const art = im && im.kind === "file" ? im.path : ART_ROTATION[ctx.seq % ART_ROTATION.length];
    const big = !st && String(f.title || "").length < 34;
    // Rzeźba nad tekstem; przy dużej naklejce mniejsza, żeby nie wchodziła w tytuł.
    const artW = st && st.h > 300 ? 420 : 560;
    return {
      theme,
      body: `${sculpt(art, `width:${artW}px;right:-${Math.round(artW * 0.18)}px;top:300px;transform:rotate(-8deg)`)}
      ${sFolio(esc(ctx.label), ctx.counter)}
      ${stage(where, `<div style="flex:1;min-height:${Math.round(artW * 0.62)}px"></div>${T(f, where, big ? "h1" : "h2", 56)}${gap(30)}${B(f, where)}${st ? `${gap(56)}${stickerZone(st, st.kind === "link" ? "left" : "center")}` : ""}`)}
      ${sFoot(theme)}`,
    };
  },

  "story-screenshot"(ctx) {
    const { f, where } = ctx;
    const st = stickerKind(f.sticker);
    const im = resolveImage(f.image, ctx.outDir, ctx.nameOf);
    const pr = projectFromPath(im?.path || f.image || "");
    let theme = ctx.theme;
    let device = "";
    // Urządzenie zajmuje całą wolną wysokość między tekstem a naklejką.
    const fill = (inner, extra = "") => `<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;${extra}">${inner}</div>`;
    if (im?.kind === "mockup") {
      theme = "t-cream";
      // Zrzut sekcji strony na pełną szerokość, krawędzie wygaszone w tło.
      device = fill(`<img src="${im.url}" style="width:1080px;max-width:none;display:block;-webkit-mask-image:linear-gradient(180deg,transparent,#000 2%,#000 97%,transparent);mask-image:linear-gradient(180deg,transparent,#000 2%,#000 97%,transparent)" alt="">`, "margin:0 -80px");
    } else if (im?.kind === "file") {
      const tall = /mobile|\/mobile\.png$/.test(im.path);
      device = tall
        ? fill(phone({ img: im.path, style: "height:100%;max-height:980px;aspect-ratio:430/930" }), "padding:6px 0")
        : fill(browser({ img: im.path, label: pr?.name || "", style: "width:1000px;flex:none" }), "justify-content:flex-start;margin-right:-80px");
    } else {
      device = fill(`<span class="ph">[zrzut: ${esc(im?.note || "brak")}]</span>`, "text-align:center;padding:40px");
    }
    return {
      theme,
      body: `${sFolio(esc(ctx.label), ctx.counter)}
      ${stage(where, `${pr ? `<div style="flex:none;margin-bottom:26px">${chipFor(pr)}</div>` : ""}${T(f, where, "h3", 52)}${gap(22)}${B(f, where, "")}${gap(40)}${device}${st ? `${gap(30)}${stickerZone(st)}` : ""}`)}
      ${sFoot(theme)}`,
    };
  },
};

// Stare nazwy szablonów z briefu grafik (share, poll, ...) -> nowe.
const LEGACY = { share: "story-share", poll: "story-text", question: "story-text", quiz: "story-text", reminder: "story-text", link: "story-text", "behind-the-scenes": "story-photo" };
export function storyTemplateFor(name) {
  return storyTemplates[name] || storyTemplates[LEGACY[name]] || null;
}
export function storyTheme(story, f, k) {
  const base = THEME_NAME[f.theme] || TYPE_THEME[story.type] || "t-dark";
  return k % 2 === 1 && !THEME_NAME[f.theme] ? ALT[base] : base;
}
export function storyLabel(story, f = {}) {
  // Klatka tekstowa w relacji z udostępnieniem to osobisty dopisek, nie "nowy post".
  if (story.type === "share-post" && f.template === "story-text") return "Od Dawida";
  return TYPE_LABEL[story.type] || "Relacja";
}

// ---------------------------------------------------------------- wyróżnione
function icon(kind) {
  const c = "#F4F0EB";
  const a = "#9FC5D3";
  const sw = 16;
  switch (kind) {
    case "browser":
      return `<svg width="400" height="320" viewBox="0 0 400 320" fill="none"><rect x="8" y="8" width="384" height="304" rx="28" stroke="${c}" stroke-width="${sw}"/><path d="M8 82h384" stroke="${c}" stroke-width="${sw}"/><circle cx="52" cy="45" r="10" fill="${c}"/><circle cx="86" cy="45" r="10" fill="${c}"/><circle cx="120" cy="45" r="10" fill="${c}"/><path d="M60 150h170M60 196h120" stroke="${c}" stroke-width="${sw}" stroke-linecap="square"/><rect x="290" y="210" width="50" height="50" fill="${a}"/></svg>`;
    case "zl":
      return `<svg width="420" height="320" viewBox="0 0 420 320"><text x="200" y="250" text-anchor="middle" font-family="Montserrat" font-weight="500" font-size="300" letter-spacing="-12" fill="${c}">zł</text><rect x="352" y="40" width="48" height="48" fill="${a}"/></svg>`;
    case "steps":
      return `<svg width="440" height="200" viewBox="0 0 440 200" fill="none"><path d="M100 100h100M260 100h80" stroke="${c}" stroke-width="${sw}"/><circle cx="60" cy="100" r="44" stroke="${c}" stroke-width="${sw}"/><circle cx="230" cy="100" r="44" stroke="${c}" stroke-width="${sw}"/><rect x="340" y="56" width="88" height="88" fill="${a}"/></svg>`;
    case "mono":
      return monogram({ stroke: c, square: a, h: 300 });
    case "bubble":
    default:
      return `<svg width="400" height="340" viewBox="0 0 400 340" fill="none"><path d="M36 8h328a28 28 0 0 1 28 28v190a28 28 0 0 1-28 28H150l-86 72v-72H36a28 28 0 0 1-28-28V36A28 28 0 0 1 36 8z" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/><circle cx="120" cy="131" r="20" fill="${c}"/><circle cx="200" cy="131" r="20" fill="${c}"/><circle cx="280" cy="131" r="20" fill="${a}"/></svg>`;
  }
}
function iconKind(h) {
  const s = `${h.icon || ""} ${h.label || ""}`.toLowerCase();
  if (/przegl|realiz|ramka/.test(s)) return "browser";
  if (/zł|cennik|skala|cen/.test(s)) return "zl";
  if (/krok|proces/.test(s)) return "steps";
  if (/monogram|o mnie/.test(s)) return "mono";
  return "bubble";
}
export function highlightCover(h) {
  return {
    theme: "t-wine",
    body: `<div class="abs" style="left:240px;top:660px;width:600px;height:600px;display:grid;place-items:center">${icon(iconKind(h))}</div>`,
  };
}

// ---------------------------------------------------------------- okładki rolek
const REEL = {
  R1: { theme: "t-cream", art: S.ribbon, artStyle: "width:760px;left:170px;top:420px;transform:rotate(-6deg)" },
  R2: { theme: "t-dark", art: S.process, artStyle: "width:1000px;right:-180px;top:400px;transform:rotate(-4deg)" },
  R3: { theme: "t-dark", photo: "zdjecia-fal/salon.webp", demo: true, art: S.vform, artStyle: "width:700px;right:-60px;top:300px" },
  R4: { theme: "t-dark", art: S.fan, artStyle: "width:820px;right:-120px;top:340px;transform:rotate(-4deg)" },
};
function accentTitle(t) {
  let s = String(t).replace(/\s*\((demo|projekt autorski)\)\s*/gi, " ").trim();
  if (!s.includes("*")) {
    const m = /^(.*?)(\d+\s+\S+|\S+)([.?!]?)$/.exec(s);
    if (m) s = `${m[1]}*${m[2]}*${m[3]}`;
  }
  if (!/[.?!]$/.test(s)) s += ".";
  return s;
}
export function reelCover(r, data) {
  const cfg = REEL[r.id] || REEL.R2;
  const where = `${r.id}-cover`;
  const t = accentTitle(r.coverTitle || r.title || "");
  const post = (data.posts || []).find((p) => p.reel === r.id);
  const photo = cfg.photo && exists(cfg.photo);
  const visual = photo
    ? `<img class="sculpt" src="${src(cfg.photo)}" style="inset:0;width:100%;height:100%;object-fit:cover">
       <div class="abs" style="inset:0;background:linear-gradient(180deg, rgb(29 29 29 / 88%) 0%, rgb(29 29 29 / 72%) 20%, transparent 34%, transparent 42%, rgb(29 29 29 / 84%) 62%, #1d1d1d 80%)"></div>`
    : sculpt(cfg.art, cfg.artStyle);
  const big = r.id === "R4" ? `<div class="abs num" style="left:60px;top:250px;font-size:900px;line-height:1;font-weight:500;letter-spacing:-.06em;color:var(--panel)">8</div>` : "";
  const theme = cfg.theme;
  return {
    theme,
    body: `${big}${visual}
    ${folio("Rolka", post ? esc(labelFor(post.pillar)) : "").replace('class="folio"', 'class="folio" style="top:330px"')}
    <div class="abs" data-box="${where}" style="left:80px;right:80px;top:1000px;bottom:400px;display:flex;flex-direction:column;justify-content:flex-end;gap:30px">
      ${cfg.demo ? `<div>${chipFor({ client: false })}</div>` : ""}
      <h1 class="h h1" data-fit="1" data-min="64">${rich(t, where)}</h1>
    </div>
    <div class="foot" style="bottom:320px"><div class="brand">${monoFor(theme)}<span>${contact.domain}</span></div></div>`,
  };
}
function labelFor(p) {
  return { marka: "Marka", proces: "Proces", "branże": "Branże", realizacje: "Realizacje" }[p] || "";
}
