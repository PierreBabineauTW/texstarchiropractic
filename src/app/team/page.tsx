import { BookingCta, RelatedLinks } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd, personJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.teamPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/team",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Our doctors", href: "/team" },
];

export default function TeamPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {page.members.map((member) => (
        <JsonLd key={member.slug} data={personJsonLd(member)} />
      ))}

      <main>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          summary={page.summary}
          crumbs={crumbs}
        />

        <PageSection tone="cream">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {page.members.map((member) => (
              <li key={member.slug} id={member.slug} className={cn(CARD, "scroll-mt-28 p-6 md:p-8")}>
                <h2 className={cn(H3, "font-bold text-[#382F2D]")}>
                  Dr. {member.name}
                </h2>
                <p className={cn(BODY, "mt-1 text-[15px] leading-[23px] font-semibold text-primary")}>
                  {member.credential}
                </p>
                {member.bio ? (
                  <p className={cn(BODY, "mt-[15px]")}>{member.bio}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection>
          <RelatedLinks
            heading="Next steps"
            links={[
              { label: "Our locations", href: "/locations", description: siteContent.locationsPage.summary },
              { label: "Conditions we treat", href: "/conditions", description: siteContent.conditionsPage.summary },
              { label: "Book an appointment", href: "/contact", description: siteContent.contactPage.summary },
            ]}
          />
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
