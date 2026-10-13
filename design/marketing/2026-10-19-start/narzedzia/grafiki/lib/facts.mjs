// Fakty z BRIEF.md i src/data/cv-data.ts. Ceny, telefon, e-mail i domena
// zawsze pochodzą stąd, nigdy z tekstów, żeby na grafikach nie było literówek.

export const contact = {
  email: "contact@dorlowski.dev",
  phone: "739 258 786",
  domain: "dorlowski.dev",
  pricingUrl: "dorlowski.dev/cennik",
  workUrl: "dorlowski.dev/realizacje",
  city: "Kraków",
  remote: "Kraków · zdalnie w całej Polsce",
};

export const packages = {
  start: {
    name: "Start",
    tagline: "Wizytówka Twojej firmy",
    price: "990",
    items: [
      "Jedna strona, do 5 sekcji",
      "Wygląd dopasowany do Twojej marki",
      "Wersja na telefon, tablet i komputer",
      "Formularz kontaktowy",
      "Podstawowe ustawienia SEO",
      "Podpięcie domeny i publikacja",
    ],
  },
  landing: {
    name: "Landing",
    tagline: "Jedna oferta. Konkretny cel.",
    price: "1 490",
    items: [
      "Jedna strona, do 8 sekcji",
      "Układ dopasowany do celu kampanii",
      "Uporządkowane argumenty oferty",
      "Wezwania do działania, formularz i FAQ",
      "Wersja mobilna i podstawowe SEO",
      "Podpięcie domeny i publikacja",
    ],
  },
  biznes: {
    name: "Biznes",
    tagline: "Strona firmowa",
    price: "1 990",
    featured: true,
    items: [
      "Do 5 stron, w tym strona główna",
      "Indywidualny wygląd dopasowany do marki",
      "Prezentacja usług i realizacji",
      "Wersja na telefon, tablet i komputer",
      "Formularz i podstawowe SEO",
      "Podpięcie domeny i publikacja",
    ],
  },
};

export const everyPackage = [
  "Dwie rundy poprawek",
  "Drobna redakcja Twoich tekstów",
  "30 dni pomocy przy błędach wdrożenia",
];

export const steps = [
  { n: "01", title: "Konsultacja i wycena", short: "Konsultacja" },
  { n: "02", title: "Projekt (UI/UX)", short: "Projekt" },
  { n: "03", title: "Kodowanie i wdrożenie", short: "Kodowanie" },
  { n: "04", title: "Publikacja i wsparcie", short: "Publikacja" },
];

// slug -> nazwa, branża, czy to realizacja dla klienta
export const projects = {
  "topauto-serwis": { name: "TopAuto Serwis", industry: "Warsztat samochodowy", client: true },
  "restauracja-bella": { name: "Bella Cucina", industry: "Restauracja" },
  "salon-glow": { name: "Glow Studio", industry: "Salon fryzjerski" },
  "sklep-craft-coffee": { name: "Craft Coffee", industry: "Sklep internetowy" },
  "asystent-ai": { name: "Asystent AI", industry: "Chatbot i generator ofert" },
  "eko-solar": { name: "EkoSolar", industry: "Fotowoltaika" },
  "fotograf-lena": { name: "Lena Czarnecka", industry: "Portfolio fotografki" },
  "kalkulator-wyceny": { name: "Kalkulator wyceny", industry: "Wycena strony www" },
};

export const CLIENT_LABEL = "Realizacja dla klienta";
export const DEMO_LABEL = "Projekt autorski · demo";

export function projectFromPath(p = "") {
  const m = /projects\/([^/]+)\//.exec(p);
  if (!m || !projects[m[1]]) return null;
  return { slug: m[1], ...projects[m[1]] };
}

export function packageFromNote(note = "") {
  const n = note.toLowerCase();
  if (n.includes("biznes")) return packages.biznes;
  if (n.includes("landing")) return packages.landing;
  if (n.includes("start") || n.includes("wizyt")) return packages.start;
  return null;
}
