import Link from "next/link";

import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection, SectionHeading } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, serviceJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const page = siteContent.servicesPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/services",
});

export default function ServicesPage() {
  const conditions = siteContent.conditionsPage.items;

  return (
    <PageShell>
      <JsonLd data={serviceJsonLd({ title: page.heading, slug: "services" })} />

      <main>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          summary={page.summary}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />

        <PageSection tone="cream">
          <SectionHeading
            title="Treatments we offer"
            lede="Every treatment below is delivered by a TexStar doctor as part of a plan built around the cause of your pain."
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {page.items.map((service) => (
              <li key={service.slug} id={service.slug} className={cn(CARD, "scroll-mt-28 p-6 md:p-8")}>
                <h3 className={cn(H3, "font-bold text-[#382F2D]")}>{service.title}</h3>
                {service.summary ? (
                  <p className={cn(BODY, "mt-[15px]")}>{service.summary}</p>
                ) : null}
                {service.relatedConditions.length > 0 ? (
                  <p className={cn(BODY, "mt-[15px] text-[14px] leading-[21px]")}>
                    Commonly used for{" "}
                    {service.relatedConditions.map((slug, index) => {
                      const condition = conditions.find((c) => c.slug === slug);
                      if (!condition) return null;
                      return (
                        <span key={slug}>
                          {index > 0 ? ", " : ""}
                          <Link href={`/conditions/${slug}`} className="text-primary underline underline-offset-4">
                            {condition.title}
                          </Link>
                        </span>
                      );
                    })}
                  </p>
                ) : null}
                <Button href={siteConfig.bookingUrl} variant="solidOrange" className="mt-6">
                  Schedule Appointment
                </Button>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection>
          <SectionHeading
            title="What a first visit includes"
            lede="Our new patient special is built around the same four steps for every patient."
          />
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {siteContent.offer.steps.map((step, index) => (
              <li key={step.label} className={cn(CARD, "flex gap-4 p-6")}>
                <span
                  aria-hidden="true"
                  className="flex size-8 flex-none items-center justify-center rounded-full bg-[#EA7600] font-sans text-[15px] font-bold text-white"
                >
                  {index + 1}
                </span>
                <p className={cn(BODY, "font-semibold")}>{step.label}</p>
              </li>
            ))}
          </ol>
        </PageSection>

        <PageSection tone="creamUp">
          <RelatedLinks
            heading="Conditions we treat"
            links={conditions.map((condition) => ({
              label: condition.title,
              href: `/conditions/${condition.slug}`,
              description: condition.description,
            }))}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
