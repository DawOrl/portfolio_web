import { cvData } from "@/data/cv-data";

/** Pojedynczy projekt z biblioteki realizacji (model case study). */
export type Project = (typeof cvData.projects)[number];

/**
 * Wszystkie projekty włącznie z szkicami (draft).
 * Używane przez generateStaticParams, by dało się podejrzeć szkic po bezpośrednim URL.
 */
export function getAllProjects(): Project[] {
  return cvData.projects;
}

/** Opublikowane projekty (bez szkiców) — kolejność jak w danych. */
export function getProjects(): Project[] {
  return cvData.projects.filter((p) => !("draft" in p && p.draft));
}

/** Projekty wyróżnione — używane jako teaser na stronie głównej (bez szkiców). */
export function getFeaturedProjects(limit = 3): Project[] {
  const published = getProjects();
  const featured = published.filter((p) => "featured" in p && p.featured);
  const base = featured.length > 0 ? featured : published;
  return base.slice(0, limit);
}

/** Pojedynczy projekt po slugu (lub undefined). */
export function getProjectBySlug(slug: string): Project | undefined {
  return cvData.projects.find((p) => p.slug === slug);
}

/** Lista kategorii do filtrowania (z prefiksem „Wszystkie”) — tylko z opublikowanych. */
export function getProjectCategories(): string[] {
  return ["Wszystkie", ...Array.from(new Set(getProjects().map((p) => p.category)))];
}
