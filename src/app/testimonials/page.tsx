import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection, SectionHeading } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { StarIcon, VerifiedIcon } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";
import { BODY, CARD } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.testimonialsPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/testimonials",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/testimonials" },
];

export default function TestimonialsPage() {
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
            title="What patients say"
            lede="Reviews collected from the TexStar Google Business profile."
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {siteContent.reviews.items.map((review) => (
              <li key={review.id} className={cn(CARD, "flex flex-col p-6")}>
                <div className="flex gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
                  {Array.from({ length: review.stars }, (_, index) => (
                    <StarIcon key={index} filled className="h-4 w-4 text-[#EA7600]" />
                  ))}
                </div>
                <p className={cn(BODY, "mt-3 flex-1")}>{review.text}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex size-10 flex-none items-center justify-center rounded-full bg-[#005EB8] font-sans text-[14px] font-semibold text-white"
                  >
                    {review.avatar}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-sans text-[16px] leading-[21px] font-semibold text-[#382F2D]">
                      {review.author}
                    </span>
                    {review.verified ? <VerifiedIcon className="h-3.5 w-3.5" /> : null}
                  </span>
                  <span className="font-sans text-[16px] leading-[21px] text-[#73748C]">
                    {review.timeAgo}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="Next steps"
            links={[
              { label: "Conditions we treat", href: "/conditions", description: siteContent.conditionsPage.summary },
              { label: "Our doctors", href: "/team", description: siteContent.teamPage.summary },
              { label: "Book an appointment", href: "/contact", description: siteContent.contactPage.summary },
            ]}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
