import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteContent.conditionsPage.items.map((condition) => ({ slug: condition.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const condition = siteContent.conditionsPage.items.find((item) => item.slug === slug);
  if (!condition) return pageMetadata({ title: "Condition not found", description: "", path: `/conditions/${slug}` });
  return pageMetadata({
    title: condition.title,
    description: condition.description,
    path: `/conditions/${condition.slug}`,
  });
}

export default async function ConditionPage({ params }: Params) {
  const { slug } = await params;
  const condition = siteContent.conditionsPage.items.find((item) => item.slug === slug);
  if (!condition) notFound();

  const others = siteContent.conditionsPage.items.filter((item) => item.slug !== slug);
  const services = siteContent.servicesPage.items.filter((service) =>
    service.relatedConditions.includes(condition.slug)
  );
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Conditions", href: "/conditions" },
    { label: condition.title, href: `/conditions/${condition.slug}` },
  ];

  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={serviceJsonLd({ title: condition.title, slug: condition.slug })} />

      <main>
        <PageHero
          eyebrow="CONDITIONS TREATED"
          heading={condition.title}
          summary={condition.description}
          crumbs={crumbs}
        />

        <PageSection tone="cream">
          <div className="grid gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12">
            <aside className={cn(CARD, "flex h-fit flex-col items-center p-6 text-center")}>
              <Image
                src={condition.icon}
                alt=""
                width={100}
                height={100}
                className="h-24 w-auto max-w-full"
              />
              <p className={cn(BODY, "mt-4 text-[14px] leading-[21px]")}>
                Treating {condition.title.toLowerCase()} at four Central Texas locations.
              </p>
              <Button href={siteConfig.bookingUrl} variant="solidOrange" className="mt-5 w-full">
                Schedule Appointment
              </Button>
            </aside>

            <div>
              <h2 className={cn(H3, "font-bold text-[#382F2D]")}>
                How we approach {condition.title.toLowerCase()}
              </h2>
              <p className={cn(BODY, "mt-[15px]")}>{condition.description}</p>
              <p className={cn(BODY, "mt-[15px]")}>
                {siteContent.rootPain.body}
              </p>
              <p className={cn(BODY, "mt-[15px]")}>{siteContent.commit.body}</p>

              {services.length > 0 ? (
                <div className="mt-8">
                  <h3 className={cn("font-sans text-[18px] leading-[25px] font-bold text-[#382F2D]")}>
                    Treatments often used for {condition.title.toLowerCase()}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {services.map((service) => (
                      <li
                        key={service.slug}
                        className="rounded-[2px] border border-[#ECEAE7] bg-white px-3 py-1.5 font-sans text-[15px] leading-[22px] font-semibold text-[#382F2D]"
                      >
                        {service.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="Other conditions we treat"
            links={others.map((item) => ({
              label: item.title,
              href: `/conditions/${item.slug}`,
              description: item.description,
            }))}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
