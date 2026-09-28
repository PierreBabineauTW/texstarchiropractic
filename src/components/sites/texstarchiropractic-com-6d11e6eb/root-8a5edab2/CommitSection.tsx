import Image from "next/image";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { StarIcon } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";

/**
 * Photo is clipped by a concave left edge traced off the 1440 capture (the
 * right-facing mirror of RootPainSection). Path is in objectBoundingBox units
 * so the curve scales with the frame at every breakpoint.
 */
const CURVE_PATH =
  "M 0.2295 0 L 1 0 L 1 1 L 0.2295 1 C 0.2109 0.8358 0.08 0.592 0.0063 0.2304 C 0.012 0.2752 -0.027 0.1624 0.0765 0 Z";

export function CommitSection() {
  const { heading, body, points, image, imageAlt } = siteContent.commit;

  return (
    <section className="ts-gradient-cream-up relative px-[33px] pt-[30px] pb-[50px] md:px-10 xl:px-0">
      <div className="mx-auto flex max-w-[1220px] flex-col items-stretch gap-5 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="w-full md:w-1/2 md:max-w-[567px]">
          <h2 className="text-[28px]/[33px] font-bold text-[#005EB8] md:text-[32px]/[37px] xl:text-[38px]/[44px]">
            {heading}
          </h2>

          <p className="mt-4 mb-12 max-w-[540px] text-[16px]/[26px] font-normal text-[#382F2D]">
            {body}
          </p>

          <ul className="flex flex-col gap-10">
            {points.map((point) => (
              <li key={point.title} className="flex items-start gap-8">
                <StarIcon
                  filled
                  className="h-8 w-8 shrink-0 text-[#EA7600] md:h-[45px] md:w-[44px]"
                />
                <div className="min-w-0 max-w-[434px] flex-1">
                  <h3 className="mb-3 text-[20px]/[25px] font-bold text-[#382F2D] xl:text-[24px]/[29px]">
                    {point.title}
                  </h3>
                  <p className="max-w-[420px] text-[16px]/[26px] font-normal text-[#382F2D]">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full shrink-0 [filter:drop-shadow(0_8px_30px_rgba(0,0,0,0.15))] md:mb-10 md:w-1/2 md:max-w-[555.5px]">
          <div
            className="relative aspect-[555.5/586] w-full"
            style={{ clipPath: "url(#ts-commit-curve)" }}
          >
            <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute size-0">
              <defs>
                <clipPath id="ts-commit-curve" clipPathUnits="objectBoundingBox">
                  <path d={CURVE_PATH} />
                </clipPath>
              </defs>
            </svg>
            <Image
              src={image}
              alt={imageAlt}
              width={556}
              height={586}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
