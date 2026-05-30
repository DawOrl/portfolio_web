import { cvData } from "@/data/cv-data";

/** Pojedynczy projekt z biblioteki realizacji (model case study). */
export type Project = (typeof cvData.projects)[number];

/** Wszystkie projekty (kolejność jak w danych). */
export function getProjects(): Project[] {
  return cvData.projects;
}

/** Projekty wyróżnione — używane jako teaser na stronie głównej. */
export function getFeaturedProjects(limit = 3): Project[] {
  const featured = cvData.projects.filter((p) => p.featured);
  const base = featured.length > 0 ? featured : cvData.projects;
  return base.slice(0, limit);
}

/** Pojedynczy projekt po slugu (lub undefined). */
export function getProjectBySlug(slug: string): Project | undefined {
  return cvData.projects.find((p) => p.slug === slug);
}

/** Lista kategorii do filtrowania (z prefiksem „Wszystkie”). */
export function getProjectCategories(): string[] {
  return ["Wszystkie", ...Array.from(new Set(cvData.projects.map((p) => p.category)))];
}
