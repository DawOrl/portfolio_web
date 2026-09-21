import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = getProjects().map((p) => ({
    url: `${SITE_URL}/realizacje/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/realizacje`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
    {
      url: `${SITE_URL}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
