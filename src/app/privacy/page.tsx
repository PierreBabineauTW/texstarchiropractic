import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, H3 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy" },
];

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How TexStar Chiropractic handles information you share through this website, including the contact form and newsletter sign-up.",
  path: "/privacy",
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "What this website collects",
    body: [
      "This site does not run advertising or cross-site tracking scripts. The pages you visit are served as static files and no behavioural profile is built about you.",
      "Two forms can collect information you type into them: the newsletter sign-up in the footer and the contact form. Both ask only for the details needed to reply to you.",
    ],
  },
  {
    heading: "How the information is used",
    body: [
      "Details you submit are used to answer your enquiry or send the health tips you asked for. They are not sold or shared for marketing.",
    ],
  },
  {
    heading: "Contacting the clinic",
    body: [
      `Questions about your information can be raised by calling ${siteContent.brand.phone} or by using the contact form on this site.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <main>
        <PageHero
          eyebrow="LEGAL"
          heading="Privacy policy"
          summary="What this website collects, why it is collected, and how to reach us about it."
          crumbs={crumbs}
        />

        <PageSection tone="cream">
          <div className="mx-auto max-w-[760px]">
            {SECTIONS.map((section) => (
              <section key={section.heading} className="mb-10 last:mb-0">
                <h2 className={cn(H3, "font-bold text-[#382F2D]")}>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className={cn(BODY, "mt-[15px]")}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className="mt-12 border-t border-[#ECEAE7] pt-8">
              <h2 className={cn(H3, "font-bold text-[#382F2D]")}>Operator details</h2>
              <p className={cn(BODY, "mt-[15px] text-[14px] leading-[21px] text-[#73748C]")}>
                The registered legal entity, postal address and data protection contact for
                this site have not been published yet. Set them in{" "}
                <code className="font-mono text-[13px]">siteConfig.legalName</code> and the
                location entries in the content layer before going live.
              </p>
              <p className={cn(BODY, "mt-[15px] text-[14px] leading-[21px] text-[#73748C]")}>
                Canonical site address: {siteConfig.url}
              </p>
            </section>
          </div>
        </PageSection>
      </main>
    </PageShell>
  );
}
