/**
 * Bazowy adres serwisu — używany w metadanych, robots, sitemap i danych
 * strukturalnych. Ustaw NEXT_PUBLIC_SITE_URL w środowisku produkcyjnym
 * (np. na Vercel), aby nadpisać domyślną wartość poniżej.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dorlowski.dev";
