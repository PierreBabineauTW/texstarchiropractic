import { ContactForm } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/ContactForm";
import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection, SectionHeading } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H3, H4 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const page = siteContent.contactPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/contact",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export default function ContactPage() {
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
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <SectionHeading title="Reach us directly" />
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className={cn(H4, "font-bold text-[#382F2D]")}>Phone</dt>
                  <dd className={cn(BODY, "mt-1")}>
                    <a
                      href={siteContent.brand.phoneHref}
                      className="text-primary underline underline-offset-4"
                    >
                      {siteContent.brand.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={cn(H4, "font-bold text-[#382F2D]")}>Online scheduler</dt>
                  <dd className={cn(BODY, "mt-1")}>
                    <Button href={siteConfig.bookingUrl} variant="solidOrange">
                      Schedule Appointment
                    </Button>
                  </dd>
                </div>
                <div>
                  <dt className={cn(H4, "font-bold text-[#382F2D]")}>Locations</dt>
                  <dd className={cn(BODY, "mt-1")}>
                    {siteContent.locationsPage.items.map((location) => location.name).join(", ")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className={cn(CARD, "p-6 md:p-8")}>
              <h2 className={cn(H3, "font-bold text-[#382F2D]")}>Send a message</h2>
              <p className={cn(BODY, "mt-[15px] text-[15px] leading-[23px]")}>
                Leave your name, email and a short note and we will get back to you.
              </p>
              <ContactForm className="mt-6" />
            </div>
          </div>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="Before you write"
            links={[
              { label: "Frequently asked questions", href: "/faq", description: siteContent.faqPage.summary },
              { label: "Conditions we treat", href: "/conditions", description: siteContent.conditionsPage.summary },
              { label: "Our locations", href: "/locations", description: siteContent.locationsPage.summary },
            ]}
          />
        </PageSection>

        <BookingCta
          title="Prefer to book straight away?"
          body="Use the online scheduler or call the clinic and mention the new patient special when scheduling."
        />
      </main>
    </PageShell>
  );
}
