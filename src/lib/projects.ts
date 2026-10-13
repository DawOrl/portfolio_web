import { cvData } from "@/data/cv-data";

/** Pojedynczy projekt z biblioteki realizacji (model case study). */
export type Project = (typeof cvData.projects)[number];

/** Etap historii case study, przy którym stoi zrzut funkcji. */
export type FeatureStep = "challenge" | "solution" | "result";

/** Zrzut funkcji z działającej wersji projektu, pokazany przy etapie historii. */
export type ProjectFeature = {
  src: string;
  alt: string;
  caption: string;
  step: FeatureStep;
  device: "desktop" | "mobile";
};

/** Wymiary plików w public/projects/<slug>/features/ (desktop 16:10, telefon 390x844 @2x). */
export const FEATURE_SIZE = {
  desktop: { width: 1800, height: 1125 },
  mobile: { width: 780, height: 1688 },
} as const;

/** Zrzuty funkcji projektu w kolejności z danych (pusta lista, gdy brak). */
export function projectFeatures(project: Project): readonly ProjectFeature[] {
  return "features" in project ? project.features : [];
}

/**
 * Wszystkie projekty włącznie z szkicami (draft).
 * Używane przez generateStaticParams, by dało się podejrzeć szkic po bezpośrednim URL.
 */
export function getAllProjects(): Project[] {
  return cvData.projects;
}

/** Opublikowane projekty (bez szkiców) - kolejność jak w danych. */
export function getProjects(): Project[] {
  return cvData.projects.filter((p) => !("draft" in p && p.draft));
}

/** Projekty wyróżnione - używane jako teaser na stronie głównej (bez szkiców). */
export function getFeaturedProjects(limit = 3): Project[] {
  const published = getProjects();
  const featured = published.filter((p) => "featured" in p && p.featured);
  const base = featured.length > 0 ? featured : published;
  return base.slice(0, limit);
}

/** Nazwa projektu bez podtytułu po „ - ” (dane sklejają myślnik twardą spacją). */
export function projectName(project: Project): string {
  return project.title.split(/\s-\s/)[0];
}

/** Pojedynczy projekt po slugu (lub undefined). */
export function getProjectBySlug(slug: string): Project | undefined {
  return cvData.projects.find((p) => p.slug === slug);
}

// Kategorie realizacji odpowiadają czterem usługom, w tej samej kolejności.
const CATEGORY_ORDER = [
  "Strona firmowa",
  "Landing page",
  "Sklep internetowy",
  "Aplikacja & automatyzacja",
];

/** Lista kategorii do filtrowania (z prefiksem „Wszystkie”), tylko z opublikowanych. */
export function getProjectCategories(): string[] {
  const used = new Set(getProjects().map((p) => p.category));
  const rank = (category: string) =>
    CATEGORY_ORDER.includes(category)
      ? CATEGORY_ORDER.indexOf(category)
      : CATEGORY_ORDER.length;
  return ["Wszystkie", ...[...used].sort((a, b) => rank(a) - rank(b))];
}
