import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection, SectionHeading } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.aboutPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/about",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function AboutPage() {
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
          <div className="mx-auto max-w-[760px]">
            <h2 className={cn(H3, "font-bold text-[#382F2D]")}>Our story</h2>
            {siteContent.localTeam.paragraphs.map((paragraph, index) => (
              <p key={index} className={cn(BODY, "mt-[15px]")}>
                {paragraph.text}
              </p>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <SectionHeading
            title="What we stand for"
            lede="Three commitments that shape every visit."
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {siteContent.commit.points.map((point) => (
              <li
                key={point.title}
                className="rounded-[2px] border border-[#ECEAE7] bg-white p-6 shadow-[0_10px_20px_0_rgba(1,7,39,0.05)]"
              >
                <h3 className={cn("font-sans text-[18px] leading-[25px] font-bold text-[#382F2D] lg:text-[20px] lg:leading-[25px]")}>
                  {point.title}
                </h3>
                <p className={cn(BODY, "mt-[15px]")}>{point.description}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection tone="creamUp">
          <div className="mx-auto max-w-[760px]">
            <h2 className={cn(H3, "font-bold text-[#382F2D]")}>Voted Best Chiropractor in the Austin area</h2>
            <p className={cn(BODY, "mt-[15px]")}>{siteContent.hero.awardCaption}</p>
            <p className={cn(BODY, "mt-[15px]")}>
              {siteContent.rootPain.body}
            </p>
          </div>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="Where to go next"
            links={[
              { label: "Meet our doctors", href: "/team", description: siteContent.teamPage.summary },
              { label: "Our locations", href: "/locations", description: siteContent.locationsPage.summary },
              { label: "Contact us", href: "/contact", description: siteContent.contactPage.summary },
            ]}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
