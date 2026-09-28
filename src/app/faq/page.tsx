import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.faqPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/faq",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq" },
];

export default function FaqPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(page.items)} />

      <main>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          summary={page.summary}
          crumbs={crumbs}
        />

        <PageSection tone="cream">
          <div className="mx-auto max-w-[820px]">
            <dl className="space-y-4">
              {page.items.map((item) => (
                <div
                  key={item.question}
                  id={
                    item.question.toLowerCase().includes("insurance") ? "insurance" : undefined
                  }
                  className={cn(CARD, "scroll-mt-28 p-6 md:p-8")}
                >
                  <dt>
                    <h2 className={cn(H3, "font-bold text-[#382F2D]")}>{item.question}</h2>
                  </dt>
                  <dd className={cn(BODY, "mt-[15px]")}>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="Still have a question?"
            links={[
              { label: "Contact us", href: "/contact", description: siteContent.contactPage.summary },
              { label: "Our locations", href: "/locations", description: siteContent.locationsPage.summary },
              { label: "Services and treatments", href: "/services", description: siteContent.servicesPage.summary },
            ]}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
