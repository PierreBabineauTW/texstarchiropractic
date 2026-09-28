import Image from "next/image";
import Link from "next/link";

import { BookingCta } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/BookingCta";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageHero } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageHero";
import { PageSection, SectionHeading } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CARD, H4 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const page = siteContent.conditionsPage;

export const metadata = pageMetadata({
  title: page.heading,
  description: page.summary,
  path: "/conditions",
});

export default function ConditionsPage() {
  return (
    <PageShell>
      <main>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          summary={page.summary}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Conditions", href: "/conditions" },
          ]}
        />

        <PageSection tone="cream">
          <SectionHeading
            title="What we treat"
            lede="Select a condition to read how a TexStar doctor approaches it."
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {page.items.map((condition) => (
              <li
                key={condition.slug}
                id={condition.slug}
                className={cn(CARD, "flex scroll-mt-28 flex-col p-6 md:p-8")}
              >
                <Image
                  src={condition.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="mb-5 h-20 w-auto max-w-full md:h-[100px]"
                />
                <h3 className={cn(H4, "font-bold text-[#382F2D]")}>{condition.title}</h3>
                <p className={cn(BODY, "mt-[15px] flex-1")}>{condition.description}</p>
                <Link
                  href={`/conditions/${condition.slug}`}
                  className="mt-5 inline-flex items-center gap-2 font-sans text-[16px] leading-[24px] font-semibold text-primary underline-offset-4 transition-colors hover:text-[#EA7600] hover:underline"
                >
                  Learn more about {condition.title.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>

        <BookingCta />
      </main>
    </PageShell>
  );
}
