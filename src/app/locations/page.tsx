import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection, SectionHeading } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H3, H4 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.locationsPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/locations",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
];

export default function LocationsPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <main>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          summary={page.summary}
          crumbs={crumbs}
        />

        <PageSection tone="cream">
          <SectionHeading
            title="Four locations across Central Texas"
            lede="Call the clinic to book at the location that is closest to you."
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {page.items.map((location) => (
              <li key={location.slug} id={location.slug} className={cn(CARD, "scroll-mt-28 p-6 md:p-8")}>
                <h3 className={cn(H3, "font-bold text-[#382F2D]")}>{location.name}</h3>

                {location.addressLines.length > 0 ? (
                  <address className={cn(BODY, "mt-[15px] not-italic")}>
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : (
                  <p className={cn(BODY, "mt-[15px] text-[14px] leading-[21px] text-[#73748C]")}>
                    Street address not published yet &mdash; call for directions.
                  </p>
                )}

                {location.hours.length > 0 ? (
                  <dl className={cn(BODY, "mt-4")}>
                    {location.hours.map((row) => (
                      <div key={row.days} className="flex justify-between gap-4 border-b border-[#ECEAE7] py-1.5 last:border-b-0">
                        <dt className="font-semibold">{row.days}</dt>
                        <dd>{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className={cn(BODY, "mt-4 text-[14px] leading-[21px] text-[#73748C]")}>
                    Opening hours are not published yet &mdash; call to confirm.
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={siteContent.brand.phoneHref} variant="solidOrange">
                    Call {siteContent.brand.phone}
                  </Button>
                  <Button
                    href={
                      location.directionsUrl ||
                      // Falls back to a maps *search* for the clinic and the
                      // area name. That is honest — it is not a claimed pin —
                      // and it keeps the local-business journey usable before
                      // real addresses are configured.
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${siteConfig.mapsQuery} ${location.name} Texas`
                      )}`
                    }
                    variant="solidWhite"
                    className="border-[#382F2D] text-[#382F2D]"
                  >
                    Get directions
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection>
          <div className="mx-auto max-w-[760px]">
            <h2 className={cn(H4, "font-bold text-[#382F2D]")}>Insurance and self pay</h2>
            <p className={cn(BODY, "mt-[15px]")}>{siteContent.offer.finePrint}</p>
          </div>
        </PageSection>

        <PageSection tone="creamUp">
          <RelatedLinks
            heading="Next steps"
            links={[
              { label: "Contact us", href: "/contact", description: siteContent.contactPage.summary },
              { label: "Conditions we treat", href: "/conditions", description: siteContent.conditionsPage.summary },
              { label: "Our doctors", href: "/team", description: siteContent.teamPage.summary },
            ]}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
