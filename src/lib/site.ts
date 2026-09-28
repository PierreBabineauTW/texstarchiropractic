/**
 * Site-wide configuration.
 *
 * Everything a new business in this vertical would need to change lives here or
 * in `src/components/sites/<site-key>/shared/content.ts`. Nothing in this file
 * is a secret: it is published in the HTML/JSON-LD by design.
 *
 * `NEXT_PUBLIC_SITE_URL` is the only value that must be set per deployment —
 * it drives canonical URLs, the sitemap, robots.txt and OpenGraph.
 */

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

const DEFAULT_SITE_URL = "https://texstarchiropractic.com";

export const siteConfig = {
  /** Absolute origin, no trailing slash. Used for canonical + OG URLs. */
  url: trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  ),

  name: "TexStar Chiropractic",
  legalName: "", // set to the registered entity name before publishing
  shortName: "TexStar",

  /** Used for <title> fallbacks and the default meta description. */
  tagline: "Personalized chiropractic care in the Austin area",
  description:
    "TexStar Chiropractic provides personalized chiropractic care across Central Texas, with locations in Austin, Bee Cave, Buda and Dripping Springs.",

  /**
   * Third-party scheduler. Left as the source business's real page by default so
   * the "Schedule Appointment" call to action works out of the box; point it at
   * your own booking provider (Calendly, Square, etc.) when re-using this.
   */
  bookingUrl: "https://texstarchiropractic.com/schedule-consultation/",

  /**
   * Contact form delivery. When unset, /api/contact returns 503 and the UI says
   * plainly that the form is not connected — it never fakes a success.
   */
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "",

  /** Optional map/directions base. A Google Maps place search, not coordinates. */
  mapsQuery: "TexStar Chiropractic",

  locale: "en_US",
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for an internal path, using the configured origin. */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}
