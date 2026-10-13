/**
 * Polska typografia: jednoliterowe spójniki i przyimki (a, i, o, u, w, z)
 * nie mogą zostać na końcu wiersza, a myślnik ze spacjami nie może go zaczynać.
 * Sklejamy je z sąsiednim słowem twardą spacją (U+00A0).
 */
const NBSP = " ";

// Jednoliterowe słowo (po początku tekstu, białym znaku lub otwierającym cudzysłowie/nawiasie)
// i spacja po nim, jeśli dalej jest jakieś słowo. Lookbehind pozwala łapać "i w domu".
const ORPHAN = /(?<=^|[\s(„"»])([aiouwzAIOUWZ]) (?=\S)/g;
const SPACED_DASH = / - /g;

/** Zamienia spacje po jednoliterowych słowach i przed " - " na twarde spacje. */
export function pl(text: string): string {
  return text.replace(ORPHAN, `$1${NBSP}`).replace(SPACED_DASH, `${NBSP}- `);
}

/** Tekst do poprawy: ma spację i nie wygląda na URL, ścieżkę ani e-mail. */
function isCopy(value: string): boolean {
  if (!value.includes(" ")) return false;
  if (/^(https?:|mailto:|tel:|\/|#)/.test(value)) return false;
  if (/^\S+@\S+$/.test(value)) return false;
  return true;
}

/**
 * Stosuje pl() do każdego tekstu w obiekcie lub tablicy (zachowuje typ).
 * Pomija teksty bez spacji (slugi, id, nazwy ikon, ścieżki, e-maile, URL-e).
 */
export function plDeep<T>(value: T): T {
  if (typeof value === "string") {
    return (isCopy(value) ? pl(value) : value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => plDeep(item)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, plDeep(item)]),
    ) as T;
  }
  return value;
}
