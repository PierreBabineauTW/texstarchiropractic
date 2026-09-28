import { absoluteUrl, siteConfig } from "@/lib/site";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";

type Json = Record<string, unknown>;

/**
 * JSON-LD. Every value comes from configuration or the content layer — no
 * invented ratings, prices, opening hours or addresses. Properties that are not
 * configured are omitted rather than filled with placeholders, so the markup
 * never makes a claim the business has not made.
 */
export function organizationJsonLd(): Json {
  const { name, phone, address } = siteContent.brand;
  const locations = siteContent.locationsPage.items.filter((l) => l.addressLines.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name,
    url: siteConfig.url,
    telephone: phone,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    description: siteConfig.description,
    address: { "@type": "PostalAddress", addressLocality: address, addressRegion: "TX", addressCountry: "US" },
    ...(locations.length
      ? {
          location: locations.map((l) => ({
            "@type": "MedicalClinic",
            name: `${name} \u2014 ${l.name}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: l.addressLines[0],
              ...(l.addressLines[1] ? { addressLine2: l.addressLines[1] } : {}),
              addressLocality: l.name,
              addressRegion: "TX",
              addressCountry: "US",
            },
            ...(l.phone ? { telephone: l.phone } : {}),
          })),
        }
      : {}),
    sameAs: siteContent.social.map((s) => s.href),
    ...(siteContent.hero.awardImage
      ? {
          image: absoluteUrl(siteContent.hero.photo),
        }
      : {}),
  };
}

export function serviceJsonLd(service: { title: string; slug: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    url: absoluteUrl(`/services#${service.slug}`),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "State", name: "Texas" },
  };
}

export function breadcrumbJsonLd(crumbs: { label: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function personJsonLd(member: { name: string; slug: string; bio: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    url: absoluteUrl(`/team#${member.slug}`),
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    jobTitle: "Chiropractor",
    ...(member.bio ? { description: member.bio } : {}),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: Json }) {
  return (
    <script
      type="application/ld+json"
      // Schema payloads are built from typed config, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
