// Szablony slajdów 1080 x 1350 (post i karuzela FB/IG).
import { field, rich, plain, esc, isEmpty, polish, ensureStop } from "../lib/typeset.mjs";
import { folio, foot, browser, phone, sculpt, chipFor, src, exists, arrowNE } from "../lib/parts.mjs";
import { contact, packages, packageFromNote, everyPackage, steps, projectFromPath, CLIENT_LABEL, DEMO_LABEL } from "../lib/facts.mjs";

const W = 1080;
const H = 1350;

const S = {
  ribbon: "design/intro/hero-form.png",
  links: "public/contact-link-blender.webp",
  process: "public/process-form-blender.webp",
  fan: "public/art/library-fan.webp",
  frame: "public/art/library-vacancy.webp",
  lock: "public/art/privacy-lock.webp",
  vform: "public/contact-form-blender.webp",
};

// Rzeźba na slajdzie CTA: inna w kolejnych postach, żeby końcówki karuzel się nie powtarzały.
const CTA_ART = {
  P01: S.links, P03: S.frame, P04: S.links, P05: S.frame, P07: S.links,
  P08: S.fan, P10: S.frame, P11: S.links, P12: S.lock,
};

const norm = (s = "") => String(s).replace(/<[^>]+>/g, "").replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase();
const strip = (s = "") => String(s).replace(/\*/g, "");

// Prawa etykieta folio: eyebrow z tekstów, chyba że powtarza lewą etykietę albo plakietkę.
// Segmenty "A · B" powtarzające etykietę albo plakietkę (demo, realizacja) są pomijane.
function folioRight(ctx, fallback = "", avoid = []) {
  const bad = [ctx.label, ...avoid].filter(Boolean).map(norm);
  const chipDemo = avoid.some((a) => /demo/i.test(a));
  const keep = (seg) => {
    const n = norm(seg);
    if (!n || bad.includes(n)) return false;
    if (chipDemo && /^(demo|projektautorski(demo)?)$/.test(n)) return false;
    // Ten sam rdzeń (Automatyzacje / Automatyzacja) też liczy się jako powtórzenie.
    return !bad.some((b) => b && (n === b || (n.length > 8 && b.slice(0, 9) === n.slice(0, 9))));
  };
  const clean = (v) => String(v || "").split(/\s+·\s+/).map((x) => x.trim()).filter(keep).join(" · ");
  const e = clean(ctx.slide.eyebrow);
  if (e) return plain(e, ctx.where);
  const f = clean(fallback);
  return f ? plain(f, ctx.where) : "";
}

function frame(ctx, inner, { right, swipe } = {}) {
  const r = right ?? folioRight(ctx);
  return `${folio(esc(ctx.label), r)}${inner}${foot({ theme: ctx.theme, i: ctx.i, n: ctx.n, swipe: swipe ?? (ctx.i === 1 && ctx.n > 1) })}`;
}

const title = (ctx, cls = "h2", min = 56, prio = 1, key = "title", fallback) =>
  `<h1 class="h ${cls}" data-fit="${prio}" data-min="${min}">${field(ctx.slide, key, ctx.where, "title", fallback)}</h1>`;
// Treść slajdu: body, a gdy go brak, podpis pod zrzutem (caption).
const body = (ctx, cls = "", prio = 2, optional = false, fallback) => {
  const src = isEmpty(ctx.slide.body) && !isEmpty(ctx.slide.caption) ? { body: ctx.slide.caption } : ctx.slide;
  if (optional && isEmpty(src.body) && fallback == null) return "";
  return `<div class="body ${cls}" data-fit="${prio}" data-min="30">${field(src, "body", ctx.where, "para", fallback)}</div>`;
};
function items(ctx, fallback) {
  const list = !isEmpty(ctx.slide.items) ? ctx.slide.items : fallback;
  if (isEmpty(list)) return null;
  return list.map((it) => (typeof it === "string" ? it : [it.title, it.body].filter(Boolean).join(": ")));
}
// "Etykieta: treść" (krótka etykieta) -> [etykieta, treść]
function splitItem(s) {
  const m = /^([^:]{2,22}):\s+(.+)$/.exec(s);
  return m ? [m[1], m[2]] : ["", s];
}
const tagged = (s, where) => {
  const [tag, text] = splitItem(s);
  return `${tag ? `<span class="tag">${plain(tag, where)}</span>` : ""}${plain(text, where)}`;
};
const box = (ctx, style, inner) =>
  `<div class="abs" data-box="${ctx.where}" style="left:80px;right:80px;display:flex;flex-direction:column;${style}">${inner}</div>`;
const gap = (h) => `<div style="height:${h}px;flex:none"></div>`;
const spring = (min = 40) => `<div style="flex:1;min-height:${min}px"></div>`;
// Pas tła u dołu: zrzut "wchodzi" pod stopkę zamiast na nią nachodzić.
const mask = () =>
  `<div class="abs" style="left:0;right:0;bottom:0;height:146px;background:var(--bg);z-index:10"><div style="margin:0 80px;border-top:2px solid var(--rule)"></div></div>`;
const chipLabel = (pr) => (pr ? (pr.client ? CLIENT_LABEL : DEMO_LABEL) : "");
const projectOf = (ctx) => projectFromPath(ctx.slide.image) || ctx.post.slides.map((s) => projectFromPath(s.image)).find(Boolean) || null;

// ---------------------------------------------------------------- szablony

export const postTemplates = {
  "portrait-cover"(ctx) {
    const img = ctx.slide.image || "public/portrait-dawid-4k-pressed-20261012.webp";
    return frame(
      ctx,
      `<div class="abs" style="inset:0;background:radial-gradient(ellipse 70% 55% at 75% 32%, rgb(159 197 211 / 9%), transparent 70%)"></div>
      ${sculpt(S.ribbon, "width:620px;left:-150px;top:110px;transform:rotate(-28deg)")}
      <img class="sculpt" src="${src(img)}" style="height:1080px;right:-190px;bottom:-30px" alt="">
      <div class="abs" style="inset:0;background:linear-gradient(180deg, transparent 48%, rgb(29 29 29 / 80%) 70%, #1d1d1d 88%)"></div>
      ${box(ctx, "top:600px;bottom:150px;justify-content:flex-end;gap:30px", `${title(ctx, "h1", 80)}${body(ctx, "", 2, true)}`)}`,
      { right: folioRight(ctx, "Web designer i developer") },
    );
  },

  text(ctx) {
    const v = ctx.gocc % 2;
    if (v === 0) {
      return frame(
        ctx,
        box(ctx, "top:172px;bottom:150px", `${title(ctx, "h2", 60)}${spring(48)}<div style="display:flex;flex-direction:column;gap:30px"><i style="display:block;width:72px;height:6px;background:var(--acc)"></i>${body(ctx, "lg")}</div>`),
      );
    }
    // Szerokie rzeźby: mieszczą się nad tytułem, nie wchodzą w tekst.
    const art = [S.process, S.frame, S.fan].find((a) => a !== CTA_ART[ctx.post.id]);
    return frame(
      ctx,
      `${sculpt(art, "width:560px;right:-60px;top:150px;transform:rotate(-6deg)")}
      ${box(ctx, "top:172px;bottom:150px", `${spring(440)}${title(ctx, "h2", 56)}${gap(44)}${body(ctx, "lg")}`)}`,
    );
  },

  list(ctx) {
    const pkg = /każdym/i.test(ctx.slide.note || "");
    const list = items(ctx, pkg ? everyPackage : null);
    const rows = list
      ? list
          .map((s, k) => {
            return `<li class="li"><span class="n num">${String(k + 1).padStart(2, "0")}</span><span>${tagged(s, ctx.where)}</span></li>`;
          })
          .join("")
      : `<li class="li"><span class="n">01</span><span>${field({}, "items", ctx.where)}</span></li>`;
    const size = list && list.length > 5 ? 34 : 40;
    return frame(
      ctx,
      box(
        ctx,
        "top:172px;bottom:150px",
        `${title(ctx, "h2", 56)}
        ${isEmpty(ctx.slide.body) ? "" : `${gap(28)}${body(ctx, "sm", 3)}`}
        ${spring(44)}
        <ul class="list" data-fit="2" data-min="28" style="font-size:${size}px">${rows}</ul>`,
      ),
    );
  },

  cta(ctx) {
    const art = CTA_ART[ctx.post.id] || S.links;
    const linked = /dorlowski\.dev\/[a-z0-9/-]+/i.exec([ctx.slide.body, ...(ctx.slide.items || [])].join(" "));
    const site = linked ? linked[0].replace(/[.,]$/, "") : contact.domain;
    const row = (label, value) =>
      `<a style="display:grid;grid-template-columns:170px 1fr 30px;align-items:center;font-size:36px"><small>${label}</small><span class="num">${value}</span>${arrowNE()}</a>`;
    return frame(
      ctx,
      `${box(
        ctx,
        "top:172px;bottom:150px",
        `${title(ctx, "h1", 72)}
        ${gap(30)}
        <div style="display:flex;align-items:flex-start;gap:20px">
          <div style="flex:1;min-width:0;padding-top:10px">${body(ctx, "", 2, true)}</div>
          <img src="${src(art)}" style="width:500px;flex:none;margin-right:-170px;margin-top:-20px;transform:rotate(-8deg)" alt="">
        </div>
        ${spring(20)}
        <div class="contact-rows">
          ${row("E-mail", contact.email)}
          ${row("Telefon", contact.phone.replace(/ /g, " "))}
          ${row("Strona", site)}
        </div>`,
      )}`,
      { right: folioRight(ctx, "Bezpłatna wycena") },
    );
  },

  "project-cover"(ctx) {
    const pr = projectOf(ctx);
    const right = folioRight(ctx, pr?.industry || "", [chipLabel(pr)]);
    const label = pr?.name || "";
    const text = `<div>${chipFor(pr)}</div>${title(ctx, "h2", 56)}${body(ctx, "sm", 2, true)}`;
    if (ctx.theme === "t-cream") {
      return frame(
        ctx,
        `${box(ctx, "top:172px;height:470px;gap:28px", text)}
        ${browser({ img: ctx.slide.image, label, style: "position:absolute;left:80px;top:690px;width:1120px" })}
        ${mask()}`,
        { right },
      );
    }
    return frame(
      ctx,
      `${browser({ img: ctx.slide.image, label, style: "position:absolute;left:80px;top:170px;width:1100px" })}
      ${box(ctx, "top:900px;bottom:150px;justify-content:flex-end;gap:26px", text)}`,
      { right },
    );
  },

  screenshot(ctx) {
    const pr = projectOf(ctx);
    const v = ctx.occ % 3;
    const label = pr?.name || "";
    const right = folioRight(ctx, pr?.name || "", [chipLabel(pr)]);
    const text = `<div style="flex:none">${chipFor(pr)}</div>${gap(26)}${title(ctx, "h3", 52)}${gap(22)}${body(ctx, "sm", 2, true)}`;
    if (v === 0) {
      return frame(
        ctx,
        `${browser({ img: ctx.slide.image, label, style: "position:absolute;left:80px;top:172px;width:920px" })}
        ${box(ctx, "top:830px;bottom:150px;justify-content:flex-end", text)}`,
        { right },
      );
    }
    if (v === 1) {
      return frame(
        ctx,
        `${box(ctx, "top:172px;height:360px", text)}
        ${browser({ img: ctx.slide.image, label, style: "position:absolute;left:80px;top:570px;width:1040px" })}
        ${mask()}`,
        { right },
      );
    }
    return frame(
      ctx,
      `${browser({ img: ctx.slide.image, label, style: "position:absolute;left:-80px;top:172px;width:960px" })}
      ${box(ctx, "top:860px;bottom:150px;justify-content:flex-end", text)}`,
      { right },
    );
  },

  phone(ctx) {
    const pr = projectOf(ctx);
    const left = ctx.gocc % 2 === 1;
    const right = folioRight(ctx, "Wersja na telefon", [chipLabel(pr)]);
    const ph = phone({
      img: ctx.slide.image,
      style: `position:absolute;${left ? "left:80px" : "right:80px"};top:190px;width:430px;height:940px`,
    });
    return frame(
      ctx,
      `${ph}
      ${box(ctx, `${left ? "left:570px;right:80px" : "left:80px;right:590px"};top:190px;bottom:150px`, `<div>${chipFor(pr)}</div>${spring(40)}${title(ctx, "h4", 44)}${gap(28)}${body(ctx, "sm", 2, true)}`)}`,
      { right },
    );
  },

  "price-cover"(ctx) {
    const rows = [packages.start, packages.landing, packages.biznes]
      .map((p) => {
        const val = parseInt(p.price.replace(/\D/g, ""), 10);
        const x = (val / 3000) * 100;
        return `<div style="display:grid;grid-template-columns:390px 1fr;align-items:center;height:104px;border-top:2px solid var(--rule)">
          <div style="display:flex;align-items:baseline;gap:16px;white-space:nowrap"><span style="font-size:46px;font-weight:500;letter-spacing:-.03em">${p.name}</span><span class="num" style="font-size:26px;color:var(--muted)">od ${p.price.replace(" ", " ")} zł</span></div>
          <div style="position:relative;height:30px">
            <div style="position:absolute;left:0;right:0;top:14px;border-top:2px dashed rgb(244 240 235 / 25%)"></div>
            <div style="position:absolute;left:${x}%;right:0;top:5px;height:20px;background:linear-gradient(90deg, ${p.featured ? "#f4f0eb" : "rgb(244 240 235 / 55%)"}, transparent)"></div>
            <div style="position:absolute;left:calc(${x}% - 15px);top:0;width:30px;height:30px;border-radius:50%;background:${p.featured ? "#9fc5d3" : "#a00c30"};border:4px solid #f4f0eb"></div>
          </div>
        </div>`;
      })
      .join("");
    const axis = [0, 1000, 2000, 3000]
      .map((v) => `<span class="num" style="position:absolute;left:${(v / 3000) * 100}%;transform:translateX(${v === 0 ? "0" : v === 3000 ? "-100%" : "-50%"})">${v ? `${v / 1000} 000` : "0"}${v === 3000 ? " zł" : ""}</span>`)
      .join("");
    return frame(
      ctx,
      `${box(ctx, "top:172px;height:560px;gap:34px", `${title(ctx, "h1", 72)}${body(ctx, "", 2, true)}`)}
      <div class="abs" style="left:80px;right:80px;bottom:170px">
        ${rows}
        <div style="display:grid;grid-template-columns:390px 1fr;border-top:2px solid var(--rule);padding-top:16px">
          <span></span><div style="position:relative;height:30px;font-size:24px;color:var(--muted)">${axis}</div>
        </div>
      </div>`,
      { right: folioRight(ctx, "Ceny wejściowe") },
    );
  },

  price(ctx) {
    const p = packageFromNote(ctx.slide.note) || packageFromNote(ctx.slide.eyebrow) || packages.start;
    const list = items(ctx, p.items);
    // Cena zawsze z cennika; tytuł z ceną ("od 990 zł") zastępuje hasło pakietu.
    const t = String(ctx.slide.title || "");
    const tagline = !isEmpty(t) && !/zł/.test(t) ? rich(ensureStop(t), ctx.where) : rich(ensureStop(p.tagline), ctx.where);
    const all = ctx.post.slides.filter((x) => x.template === "price");
    const k = ctx.occ + 1;
    const [th, tl] = p.price.includes(" ") ? p.price.split(" ") : [null, p.price];
    return frame(
      ctx,
      box(
        ctx,
        "top:172px;bottom:150px",
        `<div style="display:flex;justify-content:space-between;align-items:baseline">
          <div class="h" style="font-size:96px;line-height:1">${p.name}</div>
          ${p.featured ? `<span class="eyebrow" style="color:var(--wine)">Polecany</span>` : ""}
        </div>
        <div class="num" style="display:flex;align-items:baseline;gap:18px;white-space:nowrap;color:var(--acc);margin-top:10px">
          <span style="font-size:40px;font-weight:500">od</span>
          <span class="big" style="font-size:210px;font-weight:500;letter-spacing:-.05em;line-height:1">${th ? `${th}\u00A0${tl}` : tl}</span>
          <span style="font-size:40px;font-weight:500">zł</span>
        </div>
        ${gap(34)}
        <h2 class="h h5" data-fit="1" data-min="36" style="color:var(--fg)">${tagline}</h2>
        ${isEmpty(ctx.slide.body) ? "" : `${gap(18)}<div class="body sm" data-fit="3" data-min="28">${field(ctx.slide, "body", ctx.where, "para")}</div>`}
        ${spring(34)}
        <ul class="ticks" data-fit="2" data-min="26" style="font-size:30px">${list.map((s) => `<li>${plain(s, ctx.where)}</li>`).join("")}</ul>`,
      ),
      { right: plain(`Pakiet ${k} z ${all.length}`) },
    );
  },

  "edu-cover"(ctx) {
    const m = /^\s*(\d+)\s/.exec(strip(ctx.slide.title || "")) || /(?:^|\s)(\d+)\s+(punkt|rzecz|wskaz|pyta|krok|błęd)/i.exec(strip(ctx.slide.eyebrow || ""));
    if (m) {
      return frame(
        ctx,
        `<div class="abs big" style="right:50px;top:150px;font-size:820px;line-height:.86;font-weight:500;letter-spacing:-.06em;color:var(--acc)">${m[1]}</div>
        ${box(ctx, "top:760px;bottom:150px;justify-content:flex-end;gap:30px", `${title(ctx, "h2", 60)}${body(ctx, "", 2, true)}`)}`,
        { right: folioRight(ctx, `${m[1]} wskazówek`) },
      );
    }
    return frame(
      ctx,
      `${sculpt(S.frame, "width:640px;right:-110px;top:150px;transform:rotate(-6deg)")}
      ${box(ctx, "top:560px;bottom:150px;justify-content:flex-end;gap:30px", `${title(ctx, "h1", 64)}${body(ctx, "", 2, true)}`)}`,
      { right: folioRight(ctx, "Przewodnik") },
    );
  },

  tip(ctx) {
    const tips = ctx.post.slides.filter((s) => s.template === "tip").length;
    const k = ctx.occ + 1;
    return frame(
      ctx,
      box(
        ctx,
        "top:172px;bottom:150px",
        `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:40px">
          <div class="big" style="font-size:360px;line-height:.78;font-weight:500;letter-spacing:-.06em;color:var(--acc);margin-top:10px">${String(k).padStart(2, "0")}</div>
          <div class="progress" style="width:300px;margin-top:20px">${Array.from({ length: tips }, (_, j) => `<i class="${j < k ? "on" : ""}"></i>`).join("")}</div>
        </div>
        ${spring(48)}
        ${title(ctx, "h2", 56)}
        ${gap(34)}
        ${body(ctx, "lg")}`,
      ),
      { right: /^\s*\d+\s*\/\s*\d+\s*$/.test(ctx.slide.eyebrow || "") ? plain(`Wskazówka ${k} z ${tips}`) : folioRight(ctx, `Wskazówka ${k} z ${tips}`) },
    );
  },

  "steps-cover"(ctx) {
    const img = ctx.slide.image || S.process;
    return frame(
      ctx,
      `${sculpt(img, "width:780px;right:-150px;top:116px;transform:rotate(-4deg)")}
      ${box(ctx, "top:640px;bottom:290px;justify-content:flex-end;gap:28px", `${title(ctx, "h1", 64)}${body(ctx, "", 2, true)}`)}
      <div class="abs" style="left:80px;right:80px;bottom:160px;display:grid;grid-template-columns:repeat(4,1fr);border-top:2px solid var(--rule)">
        ${steps.map((s) => `<div style="padding-top:18px"><div class="num" style="font-size:24px;font-weight:600;color:var(--num);letter-spacing:.06em">${s.n}</div><div style="font-size:27px;font-weight:500;margin-top:6px;letter-spacing:-.01em">${plain(s.short)}</div></div>`).join("")}
      </div>`,
      { right: folioRight(ctx, "4 kroki") },
    );
  },

  step(ctx) {
    const k = ctx.occ;
    const s = steps[k] || steps[0];
    return frame(
      ctx,
      `<img class="sculpt" src="${src("public/textures/studio-drafting.svg")}" style="right:-420px;top:-60px;width:1500px;opacity:.9">
      ${box(ctx, "top:172px;bottom:290px", `<div class="big" style="font-size:400px;line-height:.78;font-weight:500;letter-spacing:-.06em;color:var(--acc);margin-top:10px">${s.n}</div>${spring(40)}${title(ctx, "h2", 52, 1, "title", s.title + ".")}${gap(32)}${body(ctx, "")}`)}
      <div class="abs" style="left:80px;right:80px;bottom:160px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        ${steps.map((x, j) => `<div><i style="display:block;height:4px;background:${j <= k ? "var(--acc)" : "var(--rule)"}"></i><div style="font-size:24px;font-weight:500;margin-top:14px;white-space:nowrap;color:${j === k ? "var(--fg)" : "var(--muted)"}">${x.n} ${plain(x.short)}</div></div>`).join("")}
      </div>`,
      { right: folioRight(ctx, `Krok ${s.n} z 04`) },
    );
  },

  "industry-cover"(ctx) {
    const has = exists(ctx.slide.image);
    const pr = projectOf(ctx);
    const visual = has
      ? `<img class="sculpt" src="${src(ctx.slide.image)}" style="inset:0;width:100%;height:100%;object-fit:cover">
         <div class="abs" style="inset:0;background:linear-gradient(180deg, rgb(29 29 29 / 60%) 0%, transparent 20%, transparent 36%, rgb(29 29 29 / 80%) 62%, #1d1d1d 88%)"></div>`
      : `${sculpt(S.fan, "width:760px;right:-120px;top:140px")}`;
    return frame(
      ctx,
      `${visual}
      ${box(ctx, "top:600px;bottom:150px;justify-content:flex-end;gap:28px", `${pr ? `<div>${chipFor(pr, pr.client ? "" : pr.name)}</div>` : ""}${title(ctx, "h1", 64)}${body(ctx, "", 2, true)}`)}`,
      { right: folioRight(ctx, pr?.industry || "", [chipLabel(pr)]) },
    );
  },

  choice(ctx) {
    const p = packageFromNote(ctx.slide.note) || packages.start;
    const list = items(ctx, null);
    return frame(
      ctx,
      `<div class="abs" style="right:80px;top:180px">${diagram(p.name, 1.15)}</div>
      ${box(
        ctx,
        "top:172px;bottom:270px",
        `${spring(380)}
        ${title(ctx, "h3", 50)}
        ${gap(28)}
        ${body(ctx, "sm", 2, true)}
        ${list ? `${gap(30)}<ul class="ticks" data-fit="3" data-min="26" style="font-size:30px">${list.map((s) => `<li>${tagged(s, ctx.where)}</li>`).join("")}</ul>` : ""}`,
      )}
      <div class="abs" style="left:80px;right:80px;bottom:160px;display:flex;justify-content:space-between;align-items:baseline;border-top:2px solid var(--fg);padding-top:20px">
        <span style="font-size:34px;font-weight:500;letter-spacing:-.02em">${p.name}<span style="color:var(--muted);font-weight:400"> · ${plain(p.tagline)}</span></span>
        <span class="num" style="font-size:34px;font-weight:500;white-space:nowrap">od ${p.price.replace(" ", " ")} zł</span>
      </div>`,
      { right: plain(String(ctx.slide.eyebrow || `Pakiet ${p.name}`).split(/\s+·\s+/).filter((x) => !/zł/i.test(x)).join(" · "), ctx.where) },
    );
  },

  "faq-cover"(ctx) {
    return frame(
      ctx,
      `<div class="abs" style="right:-120px;top:-150px;font-size:1300px;line-height:1;font-weight:500;color:var(--panel);letter-spacing:-.05em">?</div>
      ${box(ctx, "top:560px;bottom:150px;justify-content:flex-end;gap:30px", `${title(ctx, "h1", 64)}${body(ctx, "", 2, true)}`)}`,
      { right: folioRight(ctx, "FAQ") },
    );
  },

  faq(ctx) {
    const k = ctx.occ + 1;
    const qs = ctx.post.slides.filter((s) => s.template === "faq");
    const index = qs.every((q) => !isEmpty(q.title))
      ? `<div style="flex:none;border-top:2px solid var(--rule)">${qs
          .map(
            (q, j) =>
              `<div style="display:grid;grid-template-columns:56px 1fr;padding:13px 0;border-bottom:2px solid var(--rule);font-size:27px;line-height:1.25;${j === k - 1 ? "color:var(--fg);font-weight:600" : "color:var(--muted)"}"><span class="num" style="${j === k - 1 ? "color:var(--acc)" : ""}">${String(j + 1).padStart(2, "0")}</span><span>${esc(polish(strip(q.title)))}</span></div>`,
          )
          .join("")}</div>`
      : "";
    return frame(
      ctx,
      box(
        ctx,
        "top:172px;bottom:150px",
        `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:40px">
          ${title(ctx, "h3", 50)}
          <svg width="56" height="56" viewBox="0 0 56 56" style="flex:none;margin-top:14px"><circle cx="28" cy="28" r="26" fill="none" stroke="var(--acc)" stroke-width="2.5"/><path d="M17 28h22" stroke="var(--acc)" stroke-width="3"/></svg>
        </div>
        ${gap(36)}
        ${body(ctx, "lg")}
        ${spring(48)}
        ${index}`,
      ),
      { right: folioRight(ctx, `Pytanie ${String(k).padStart(2, "0")} z ${String(qs.length).padStart(2, "0")}`) },
    );
  },
};

// Schematy pakietów: z czego składa się strona (rysowane, bez zdjęć).
function diagram(name, k = 1) {
  const st = 'fill="none" stroke="currentColor" stroke-width="3"';
  if (name === "Biznes") {
    const page = (x, y, w, h, hi) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ${st}/><rect x="${x + 10}" y="${y + 12}" width="${w - 20}" height="${h * 0.28}" fill="${hi ? "var(--acc)" : "currentColor"}" opacity="${hi ? 1 : 0.18}"/><path d="M${x + 10} ${y + h * 0.56}h${w - 30}M${x + 10} ${y + h * 0.72}h${w - 44}" stroke="currentColor" stroke-width="3" opacity=".45"/>`;
    return `<svg width="${330 * k}" height="${300 * k}" viewBox="0 0 330 300" style="color:var(--fg)">${page(115, 10, 100, 120, true)}<path d="M165 130v34M40 164h250M40 164v26M123 164v26M207 164v26M290 164v26" stroke="currentColor" stroke-width="3" opacity=".5"/>${[0, 1, 2, 3].map((j) => page(6 + j * 83.5, 190, 68, 96, false)).join("")}</svg>`;
  }
  const n = name === "Landing" ? 8 : 5;
  const h = name === "Landing" ? 300 : 230;
  const bh = (h - 24 - (n - 1) * 7) / n;
  let bands = "";
  for (let j = 0; j < n; j++) {
    const y = 12 + j * (bh + 7);
    const hi = j === 0 || (name === "Landing" && j === n - 1);
    bands += `<rect x="14" y="${y}" width="${j % 2 ? 120 : 172}" height="${bh}" fill="${hi ? "var(--acc)" : "currentColor"}" opacity="${hi ? 1 : 0.16 + (j % 2) * 0.08}"/>`;
  }
  return `<svg width="${200 * k}" height="${h * k}" viewBox="0 0 200 ${h}" style="color:var(--fg)"><rect x="1.5" y="1.5" width="197" height="${h - 3}" rx="8" ${st}/>${bands}</svg>`;
}

export const POST_SIZE = { w: W, h: H };
