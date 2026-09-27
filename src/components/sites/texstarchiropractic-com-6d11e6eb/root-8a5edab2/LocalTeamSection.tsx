import Image from "next/image";
import type { ReactNode } from "react";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";

type Paragraph = (typeof siteContent.localTeam.paragraphs)[number];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits one paragraph into text runs and anchors. Each paragraph is walked on
 * its own, and only the first whole-word match of a label it declares becomes a
 * link — "Dr. Henry" inside paragraph 2's prose is left as plain text.
 */
function renderParagraph(paragraph: Paragraph): ReactNode[] {
  const nodes: ReactNode[] = [];
  let rest = paragraph.text;

  paragraph.links.forEach((link) => {
    const match = new RegExp(`\\b${escapeRegExp(link.label)}\\b`).exec(rest);
    if (!match) return;

    const before = rest.slice(0, match.index);
    if (before) nodes.push(before);
    nodes.push(
      <a
        key={link.href}
        href={link.href}
        className="text-[#005EB8] transition-all"
      >
        {link.label}
      </a>
    );
    rest = rest.slice(match.index + link.label.length);
  });

  if (rest) nodes.push(rest);
  return nodes;
}

export function LocalTeamSection() {
  const { heading, paragraphs, image, imageAlt } = siteContent.localTeam;

  return (
    <section className="relative px-[33px] pt-[80px] pb-[50px] md:px-10 xl:px-0">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="w-full shrink-0 [filter:drop-shadow(0_8px_30px_rgba(0,0,0,0.15))] md:mb-10 md:w-[46%] md:max-w-[556px]">
          <div className="relative aspect-[556/466] w-full">
            <Image
              src={image}
              alt={imageAlt}
              width={556}
              height={466}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:mb-10 md:w-1/2 md:max-w-[543px]">
          <h2 className="mb-4 text-[28px]/[33px] font-bold text-[#005EB8] md:text-[32px]/[37px] xl:text-[38px]/[44px]">
            {heading}
          </h2>

          <div className="flex flex-col gap-5 md:gap-6">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.text}
                className="max-w-[556px] text-[16px]/[26px] font-normal text-[#382F2D]"
              >
                {renderParagraph(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
