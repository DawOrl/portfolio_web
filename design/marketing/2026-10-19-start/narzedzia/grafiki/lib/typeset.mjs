// Polska typografia i składanie tekstu do HTML.

export const warnings = [];

export function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const NB = " ";
const LONG_DASH = String.fromCharCode(8212); // zakazany długi myślnik

// Twarde spacje: jednoliterowe słowa, liczby z jednostkami, grupy cyfr.
export function polish(input = "", where = "") {
  let s = String(input);
  if (s.includes(LONG_DASH)) {
    warnings.push(`${where}: zamieniono długi myślnik na dywiz`);
    s = s.split(LONG_DASH).map((x) => x.trim()).join(" - ");
  }
  s = s.replace(/[ \t]+/g, " ");
  // a, i, o, u, w, z (także wielkie) sklejone z następnym słowem
  s = s.replace(/(?<=^|[\s\u00A0(\u201E"\u00AB/*])([aiouwzAIOUWZ])(\*?) /g, `$1$2${NB}`);
  // grupy cyfr: 1 490, 739 258 786
  s = s.replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NB}`);
  // liczba + jednostka lub słowo po niej
  s = s.replace(/(\d) (?=[^\s\d])/g, `$1${NB}`);
  // krótkie słowa przed liczbą: od 990, do 5, ok. 7
  s = s.replace(/(?<=^|[\s ])(od|do|ok\.|nawet|na|to|po) (?=[+\d])/gi, `$1${NB}`);
  // dywiz z odstępami nie zaczyna nowej linii
  s = s.replace(/ - /g, `${NB}- `);
  return s;
}

// Nagłówek zawsze kończy się znakiem: brakującą kropkę dopisujemy (kropka marki).
export function ensureStop(input = "") {
  const t = String(input).trim();
  return /[.?!:…]\**$/.test(t) ? t : t + ".";
}

// *akcent* -> <em>, końcowa kropka/pytajnik w kolorze kropki.
export function rich(input = "", where = "", { dot = true } = {}) {
  let s = esc(polish(input, where).trim());
  s = s.replace(/\*([^*]+)\*/g, '<em class="acc">$1</em>');
  s = s.replace(/\n/g, "<br>");
  if (dot) {
    s = s.replace(/([.?!])(<\/em>)?$/, (m, p, em) =>
      em ? `</em><span class="dot">${p}</span>` : `<span class="dot">${p}</span>`,
    );
  }
  return s;
}

// Zwykły tekst (bez kropki w kolorze), akceptuje *akcent*.
export function plain(input = "", where = "") {
  return rich(input, where, { dot: false });
}

export function paragraphs(input = "", where = "") {
  const parts = String(input)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.map((p) => `<p>${plain(p, where)}</p>`).join("");
}

export function isEmpty(v) {
  if (v == null) return true;
  if (Array.isArray(v)) return v.filter((x) => !isEmpty(x)).length === 0;
  if (typeof v === "object") return Object.keys(v).length === 0;
  return String(v).trim() === "";
}

export function ph(fieldName, where) {
  warnings.push(`${where}: brak pola "${fieldName}" (wstawiono znacznik)`);
  return `<span class="ph">[${esc(fieldName)}]</span>`;
}

// Tekst pola albo znacznik braku. kind: rich | plain | para
export function field(obj, key, where, kind = "rich", fallback) {
  let v = obj?.[key];
  if (isEmpty(v)) {
    if (fallback == null) return ph(key, where);
    v = fallback;
  }
  if (kind === "para") return paragraphs(v, where);
  if (kind === "plain") return plain(v, where);
  if (kind === "title") return rich(ensureStop(v), where);
  return rich(v, where);
}
