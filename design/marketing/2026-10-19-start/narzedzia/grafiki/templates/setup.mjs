// Grafiki kont: okładka FB, zdjęcie profilowe, zdjęcia ogłoszenia OLX.
// Teksty na nich pochodzą z faktów (BRIEF.md); opcjonalnie nadpisuje je
// setup.facebook.cover / setup.olx.images[n] w kampania.json ({eyebrow,title,body}).
import { rich, plain, esc, isEmpty } from "../lib/typeset.mjs";
import { monogram, monoFor, browser, sculpt, src, chipFor, arrowNE } from "../lib/parts.mjs";
import { contact, packages, everyPackage, steps, projects, CLIENT_LABEL, DEMO_LABEL } from "../lib/facts.mjs";

const NB = " ";
const pr = (slug) => ({ slug, ...projects[slug] });
const price = (p) => `od${NB}${p.price.replace(" ", NB)}${NB}zł`;

function pick(over, key, fallback, where, kind = "rich") {
  const v = isEmpty(over?.[key]) ? fallback : over[key];
  return kind === "plain" ? plain(v, where) : rich(v, where);
}

export function setupJobs(data) {
  const fb = data.setup?.facebook?.cover || {};
  const olx = data.setup?.olx?.images || [];
  const jobs = [];

  // ------------------------------------------------------------ profil 720
  // Zdjęcie profilowe: portret (kampania.json: ten sam plik na FB i IG), twarz w środku koła.
  jobs.push({
    name: "profile",
    w: 720,
    h: 720,
    theme: "t-dark",
    body: `<div class="abs" style="inset:0;background:radial-gradient(circle at 50% 40%, #2c2c2c 0%, #1d1d1d 62%)"></div>
      <div class="abs" style="left:50%;top:50%;width:640px;height:640px;margin:-320px 0 0 -320px;border-radius:50%;background:radial-gradient(circle at 50% 30%, rgb(160 12 48 / 26%), transparent 62%)"></div>
      <img class="sculpt" src="${src("public/portrait-dawid-4k-pressed-20261012.webp")}" style="height:930px;left:50%;margin-left:-372px;top:40px" alt="">`,
  });
  // Wariant zapasowy: sam monogram.
  jobs.push({
    name: "profile-mono",
    w: 720,
    h: 720,
    theme: "t-wine",
    body: `<div class="abs" style="inset:0;background:radial-gradient(circle at 50% 42%, #b0103a 0%, #a00c30 55%, #8c0a29 100%)"></div>
      <div class="abs" style="left:0;right:0;top:0;bottom:0;display:grid;place-items:center;padding-top:12px">${monogram({ stroke: "#F4F0EB", square: "#9FC5D3", h: 250 })}</div>`,
  });

  // ------------------------------------------------------------ okładka FB 1640x924
  // Kluczowa treść w pasie 150-774 (desktop przycina do 1640x624).
  jobs.push({
    name: "fb-cover",
    w: 1640,
    h: 924,
    theme: "t-dark",
    body: `<div class="abs" style="inset:0;background:radial-gradient(ellipse 55% 70% at 80% 45%, rgb(159 197 211 / 10%), transparent 70%)"></div>
      ${sculpt("design/intro/hero-form.png", "width:500px;right:120px;top:150px;transform:rotate(-10deg)")}
      <div class="abs" data-safe style="left:160px;top:190px;width:900px;display:flex;flex-direction:column;gap:26px">
        <div class="eyebrow" style="color:var(--fg)">${pick(fb, "eyebrow", "Dawid Orłowski · web designer & developer", "fb-cover", "plain")}</div>
        <h1 class="h" style="font-size:100px;line-height:1">${pick(fb, "title", "Strony internetowe *dla firm*.", "fb-cover")}</h1>
        <div class="body" style="font-size:32px;max-width:860px">${pick(fb, "body", "Projektuję i koduję sam, od rozmowy do publikacji. Kraków i zdalnie w całej Polsce.", "fb-cover", "plain")}</div>
        <div style="display:flex;gap:44px;align-items:center;margin-top:10px;font-size:30px;font-weight:500;white-space:nowrap">
          <span class="chip client" style="font-size:26px"><i></i>Wizytówka ${price(packages.start)}</span>
          <span>${contact.domain}</span>
          <span class="num">${contact.phone.replace(/ /g, NB)}</span>
        </div>
      </div>
      <div class="abs" style="left:160px;right:160px;top:150px;border-top:2px solid var(--rule)"></div>
      <div class="abs" style="left:1060px;top:144px;width:12px;height:12px;background:var(--icy)"></div>`,
  });

  // ------------------------------------------------------------ OLX 1600x1200
  const band = (theme = "t-cream") => `
    <div class="abs ${theme}" style="left:0;right:0;bottom:0;height:190px;background:var(--bg);color:var(--fg);display:flex;align-items:center;justify-content:space-between;padding:0 80px">
      <div style="display:flex;align-items:center;gap:26px">${monoFor(theme, 64)}<span style="font-size:64px;font-weight:500;letter-spacing:-.04em">${contact.domain}</span></div>
      <div style="text-align:right">
        <div class="num" style="font-size:64px;font-weight:500;letter-spacing:-.03em;line-height:1">${contact.phone.replace(/ /g, NB)}</div>
        <div style="font-size:30px;font-weight:500;margin-top:10px;color:var(--muted)">${contact.email}</div>
      </div>
    </div>`;

  const o = (i) => olx[i] || {};

  // 1. okładka: usługa, przykład, cena, kontakt
  jobs.push({
    name: "OLX-1",
    w: 1600,
    h: 1200,
    theme: "t-dark",
    body: `<div class="abs" style="inset:0;background:radial-gradient(ellipse 60% 70% at 85% 30%, rgb(159 197 211 / 9%), transparent 70%)"></div>
      ${browser({ img: "public/projects/topauto-serwis/desktop.png", label: "TopAuto Serwis", style: "position:absolute;left:820px;top:150px;width:900px" })}
      <div class="abs" style="left:820px;top:${150 + 50 + 562 + 28}px">${chipFor(pr("topauto-serwis"), "TopAuto Serwis")}</div>
      <div class="abs" style="left:80px;top:90px;bottom:280px;width:700px;display:flex;flex-direction:column">
        <div style="display:flex;align-items:center;gap:22px">${monoFor("t-dark", 52)}<div><div style="font-size:32px;font-weight:500;letter-spacing:-.02em">Dawid Orłowski</div><div class="eyebrow" style="font-size:20px;margin-top:4px">Web designer &amp; developer</div></div></div>
        <h1 class="h" style="font-size:108px;margin-top:56px;line-height:1">${pick(o(0), "title", "Strony internetowe *dla firm*.", "OLX-1")}</h1>
        <div class="body" style="font-size:32px;margin-top:30px">${pick(o(0), "body", "Projekt, kod, wersja na telefon i publikacja. Kraków i zdalnie w całej Polsce.", "OLX-1", "plain")}</div>
        <div style="margin-top:auto;display:flex;align-items:baseline;gap:22px;white-space:nowrap">
          <span style="font-size:32px;font-weight:500;color:var(--muted)">Wizytówka</span>
          <span class="num" style="font-size:96px;font-weight:500;letter-spacing:-.045em;color:var(--icy)">${price(packages.start)}</span>
        </div>
      </div>
      ${band("t-cream")}`,
  });

  // 2. realizacje: TopAuto (klient) i projekty autorskie (demo)
  const demos = ["restauracja-bella", "salon-glow", "sklep-craft-coffee", "eko-solar"];
  jobs.push({
    name: "OLX-2",
    w: 1600,
    h: 1200,
    theme: "t-cream",
    body: `<div class="abs" style="left:80px;top:76px;right:80px;display:flex;justify-content:space-between;align-items:flex-end">
        <h1 class="h" style="font-size:88px">${pick(o(1), "title", "Realizacja i projekty *autorskie*.", "OLX-2")}</h1>
      </div>
      <div class="abs" style="left:80px;top:250px;width:760px">
        ${browser({ img: "public/projects/topauto-serwis/desktop.png", label: "TopAuto Serwis", style: "width:760px" })}
        <div style="margin-top:26px;display:flex;align-items:center;gap:18px;flex-wrap:wrap"><span class="chip client" style="font-size:26px;border-color:var(--wine)"><i></i>${CLIENT_LABEL}</span><span style="font-size:34px;font-weight:500;letter-spacing:-.02em">TopAuto Serwis</span></div>
        <div class="body" style="font-size:28px;margin-top:12px">Strona warsztatu samochodowego.</div>
      </div>
      <div class="abs" style="left:900px;right:80px;top:250px">
        <div class="eyebrow" style="color:var(--fg);display:flex;align-items:center;gap:12px"><i style="width:12px;height:12px;border:2px solid var(--muted);display:inline-block"></i>${DEMO_LABEL}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:34px 24px;margin-top:22px">
          ${demos.map((s) => `<div>${browser({ img: `public/projects/${s}/desktop.png`, style: "width:100%", cls: "mini" })}<div style="font-size:26px;font-weight:500;margin-top:14px;letter-spacing:-.01em">${projects[s].name}</div><div style="font-size:22px;color:var(--muted);margin-top:2px">${projects[s].industry} · demo</div></div>`).join("")}
        </div>
      </div>
      ${band("t-dark").replace("Wszystkie", "")}`,
    extraCss: ``,
  });

  // 3. cennik
  const card = (p, featured) => `
    <div class="${featured ? "t-cream" : "t-dark"}" style="background:${featured ? "var(--bg)" : "#252525"};color:var(--fg);padding:44px 40px;display:flex;flex-direction:column;${featured ? "border-radius:0 60px 0 0" : ""}">
      <div class="eyebrow" style="display:flex;justify-content:space-between;font-size:20px"><span>Pakiet</span>${featured ? `<span style="color:var(--wine)">Polecany</span>` : ""}</div>
      <div class="h" style="font-size:72px;margin-top:16px">${p.name}</div>
      <div style="font-size:26px;color:var(--muted);margin-top:10px;min-height:34px">${esc(p.tagline)}</div>
      <div class="num" style="display:flex;align-items:baseline;gap:10px;margin-top:30px;white-space:nowrap"><span style="font-size:28px;font-weight:500">od</span><span class="big" style="font-size:92px;font-weight:500;letter-spacing:-.045em;line-height:.95">${p.price.replace(" ", NB)}</span><span style="font-size:28px;font-weight:500">zł</span></div>
      <ul class="ticks" style="font-size:27px;margin-top:30px">${p.items.slice(0, 4).map((s) => `<li style="padding-left:40px">${plain(s, "OLX-3")}</li>`).join("")}</ul>
    </div>`;
  jobs.push({
    name: "OLX-3",
    w: 1600,
    h: 1200,
    theme: "t-dark",
    body: `<div class="abs" style="left:80px;right:80px;top:70px;display:flex;justify-content:space-between;align-items:flex-end;gap:40px">
        <h1 class="h" style="font-size:80px;white-space:nowrap">${pick(o(2), "title", "Cenę znasz *przed startem*.", "OLX-3")}</h1>
        <div class="body" style="font-size:28px;max-width:420px;text-align:right;line-height:1.35">${plain("Pełna kwota i termin w bezpłatnej wycenie.", "OLX-3")}</div>
      </div>
      <div class="abs" style="left:80px;right:80px;top:210px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">
        ${card(packages.start)}${card(packages.landing)}${card(packages.biznes, true)}
      </div>
      <div class="abs" style="left:80px;right:80px;top:1010px;font-size:28px;color:var(--body);line-height:1.4">
        ${plain(`W każdym pakiecie: ${everyPackage.map((s) => s[0].toLowerCase() + s.slice(1)).join(", ")}. Domena i hosting rozliczane osobno.`, "OLX-3")}
      </div>
      <div class="abs" style="left:80px;right:80px;bottom:46px;display:flex;justify-content:space-between;align-items:baseline;font-weight:500">
        <span style="font-size:34px">${contact.pricingUrl}</span><span class="num" style="font-size:34px">${contact.phone.replace(/ /g, NB)}</span>
      </div>`,
  });

  // 4. proces w 4 krokach
  const desc = [
    "Rozmawiamy o firmie i celu strony. Dostajesz bezpłatną wycenę z terminem.",
    "Projektuję wygląd dopasowany do marki. Akceptujesz go, zanim powstanie kod.",
    "Koduję stronę: szybka, działa na telefonie, ma podstawy SEO.",
    "Publikuję na Twojej domenie i zostaję do pomocy przez 30 dni.",
  ];
  jobs.push({
    name: "OLX-4",
    w: 1600,
    h: 1200,
    theme: "t-cream",
    body: `${sculpt("public/process-form-blender.webp", "width:560px;right:40px;top:30px;transform:rotate(-4deg)")}
      <div class="abs" style="left:80px;top:76px;width:960px">
        <div class="eyebrow" style="color:var(--fg)"><b style="color:var(--wine)">4</b>${NB}kroki współpracy</div>
        <h1 class="h" style="font-size:96px;margin-top:22px">${pick(o(3), "title", "Od rozmowy do *publikacji*.", "OLX-4")}</h1>
      </div>
      <div class="abs" style="left:80px;right:80px;top:450px;display:grid;grid-template-columns:repeat(4,1fr);gap:0">
        ${steps.map((s, i) => `<div style="border-top:2px solid var(--rule);padding:30px ${i < 3 ? "36px" : "0"} 0 0">
          <div class="big" style="font-size:120px;font-weight:500;letter-spacing:-.06em;line-height:.9;color:var(--wine)">${s.n}</div>
          <div style="font-size:38px;font-weight:500;letter-spacing:-.025em;margin-top:30px;line-height:1.15">${plain(s.title, "OLX-4")}</div>
          <div class="body" style="font-size:29px;margin-top:18px;line-height:1.38">${plain(desc[i], "OLX-4")}</div>
        </div>`).join("")}
      </div>
      ${band("t-dark").replace(contact.email, `Wizytówka ok.${NB}7${NB}dni · większe strony zwykle 2-4${NB}tygodnie`)}`,
  });

  // 5. o mnie
  jobs.push({
    name: "OLX-5",
    w: 1600,
    h: 1200,
    theme: "t-dark",
    body: `<div class="abs" style="inset:0;background:radial-gradient(ellipse 55% 60% at 78% 35%, rgb(159 197 211 / 10%), transparent 70%)"></div>
      ${sculpt("design/intro/hero-form.png", "width:700px;right:-40px;top:20px;transform:rotate(-16deg)")}
      <img class="sculpt" src="${src("public/portrait-dawid-4k-pressed-20261012.webp")}" style="height:1250px;right:-150px;bottom:-260px" alt="">
      <div class="abs" style="left:0;right:0;bottom:0;height:260px;background:linear-gradient(180deg, transparent, #1d1d1d 80%)"></div>
      <div class="abs" style="left:80px;top:80px;width:800px;display:flex;flex-direction:column">
        <div class="eyebrow" style="color:var(--fg)">O mnie</div>
        <h1 class="h" style="font-size:112px;margin-top:24px">${pick(o(4), "title", "Cześć, jestem *Dawid*.", "OLX-5")}</h1>
        <div class="body" style="font-size:32px;margin-top:36px;max-width:720px">${pick(o(4), "body", "Projektuję i koduję strony dla firm. Na co dzień pracuję jako Fullstack AI Developer, wcześniej zajmowałem się email marketingiem. Rozmawiasz cały czas ze mną: od wyceny do publikacji.", "OLX-5", "plain")}</div>
        <div style="margin-top:44px;display:flex;flex-direction:column;gap:14px;font-size:28px;color:var(--fg)">
          <div style="display:flex;gap:16px;align-items:center"><i style="width:12px;height:12px;background:var(--icy)"></i>${plain(contact.remote, "OLX-5")}</div>
          <div style="display:flex;gap:16px;align-items:center"><i style="width:12px;height:12px;background:var(--icy)"></i>${plain("Kod i strona po rozliczeniu należą do Ciebie", "OLX-5")}</div>
        </div>
        <div class="contact-rows" style="margin-top:52px;width:640px">
          <a style="font-size:38px;padding:20px 0"><span>${contact.email}</span>${arrowNE()}</a>
          <a style="font-size:38px;padding:20px 0"><span class="num">${contact.phone.replace(/ /g, NB)}</span>${arrowNE()}</a>
        </div>
      </div>`,
  });

  return jobs;
}
