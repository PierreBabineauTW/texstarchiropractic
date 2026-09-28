import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

const ASSETS = "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2";

/**
 * Per-page metadata. Every indexable route goes through here so the title,
 * description, canonical and OpenGraph tags stay consistent and no two pages
 * can accidentally share a description.
 *
 * `title.absolute` is deliberate: the root layout defines a `%s | <name>`
 * template, and passing an already-suffixed string through it would repeat the
 * brand name on every page.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = `${ASSETS}/seo/og-image.webp`,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  /** Absolute site path, e.g. "/conditions". */
  path: string;
  ogImage?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  // "Home" reads better without a brand suffix in the tab.
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
      ...(ogImage ? { images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: title }] } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [absoluteUrl(ogImage)] } : {}),
    },
  };
}
