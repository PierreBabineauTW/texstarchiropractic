import type { MetadataRoute } from "next";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/** Routes that must not be indexed (404, and anything added later). */
const EXCLUDE = new Set(["/not-found"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/conditions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/team", priority: 0.7, changeFrequency: "yearly" },
    { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/testimonials", priority: 0.6, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes
    .filter((route) => !EXCLUDE.has(route.path))
    .map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  for (const condition of siteContent.conditionsPage.items) {
    entries.push({
      url: `${siteConfig.url}/conditions/${condition.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of siteContent.blog.posts) {
    entries.push({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
