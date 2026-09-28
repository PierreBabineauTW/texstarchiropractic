import Image from "next/image";

import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";

/**
 * The live CTA reads "Read More Blog Posts" (confirmed in
 * `desktop-768-sec-11-blog.png` and `TEXT-CONTENT.txt`); `siteContent.blog.cta`
 * currently holds a different label, so the rendered string is pinned here.
 */
const CTA_LABEL = "Read More Blog Posts";

export function BlogSection() {
  const { heading, subheading, ctaHref, posts } = siteContent.blog;

  return (
    <section className="ts-gradient-cream relative pt-[30px] pb-[50px]">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="mx-8 flex flex-col items-center gap-4 md:mx-[42px] md:flex-row md:items-start md:justify-between lg:mx-3">
          <div className="w-full md:w-auto">
            <h2 className="text-[28px] leading-[33px] font-bold text-[#005EB8] md:text-[32px] md:leading-[37px] lg:text-[38px] lg:leading-[44px]">
              {heading}
            </h2>
            {/* `font-sans` opts these two paragraphs out of the global `p { Poppins }`
                rule: the reference sets both in Open Sans (measured against the
                Poppins/Open Sans advance widths of the rendered strings). */}
            <p className="mt-2 font-sans text-base leading-[26px] font-normal text-[#382F2D] md:text-[14px] md:leading-[22px] lg:text-base lg:leading-[26px]">
              {subheading}
            </p>
          </div>
          <Button href={ctaHref} variant="solidOrange" className="shrink-0">
            {CTA_LABEL}
          </Button>
        </div>

        {/* `items-start` keeps the three cards at their natural, unequal heights — the
            reference does not equalise them and every "Read more" hugs its own excerpt. */}
        <div className="mx-8 mt-8 mb-10 grid grid-cols-1 items-start gap-x-[21px] gap-y-4 md:mx-[56px] md:mt-[62px] md:grid-cols-3 lg:mx-9 lg:gap-x-9">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col items-stretch border border-[#E5E3DF] bg-white p-[25px] shadow-[0_10px_20px_0_rgba(1,7,39,0.05)]"
            >
              {/* Measured box heights: 204px at 1440/390, 120px at 768 — not the
                  307x239 natural ratio, so the crop is pinned per breakpoint. */}
              <Image
                src={post.image}
                alt={post.imageAlt}
                width={307}
                height={239}
                className="mb-6 h-[204px] w-full object-cover md:h-[120px] lg:h-[204px]"
              />
              <h3 className="mb-5 px-5 text-[17px] leading-[24px] font-semibold text-[#382F2D] md:text-[16px] md:leading-[21px] lg:text-[20px] lg:leading-[25px]">
                {post.title}
              </h3>
              <p className="mb-6 px-5 font-sans text-[14px] leading-[22px] font-normal text-[#382F2D] lg:text-base lg:leading-[26px]">
                {post.excerpt}
              </p>
              <Button
                href={post.href}
                variant="whiteOnOrange"
                className="mx-[15px] h-[44px] w-auto rounded-none border-[#EA7600] py-0"
              >
                Read more
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
