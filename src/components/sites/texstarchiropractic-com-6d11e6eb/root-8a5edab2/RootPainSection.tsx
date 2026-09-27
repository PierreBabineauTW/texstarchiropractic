import Image from "next/image";

import { siteContent } from "../shared/content";

const { rootPain } = siteContent;

/**
 * Right edge of the photo frame: a smooth S-curve traced off the 1440 and 390
 * captures (right edge inset ~12% of the width at the top, full width by ~90%
 * of the height). Drawn in objectBoundingBox units so it scales with the frame.
 */
const FRAME_CLIP_ID = "ts-root-pain-frame-clip";

export function RootPainSection() {
  return (
    <section className="relative px-5 pt-[40px] pb-[30px] md:px-[30px] md:pt-[80px] md:pb-[50px] lg:px-0">
      <svg aria-hidden className="absolute size-0 overflow-hidden" width="0" height="0">
        <defs>
          <clipPath id={FRAME_CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d="M0 0H0.881C0.877 0.036 0.852 0.133 0.857 0.17 0.87 0.42 0.93 0.6 0.96 0.66 0.985 0.79 0.996 0.88 1 0.9V1H0Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto flex w-full max-w-[1220px] flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/2 md:pr-[30.5px]">
          <div className="md:mx-3 md:mb-10 [filter:drop-shadow(0_8px_30px_rgba(0,0,0,0.15))]">
            <div
              className="relative aspect-[1169/888] w-full"
              style={{ clipPath: `url(#${FRAME_CLIP_ID})` }}
            >
              <Image
                src={rootPain.image}
                alt={rootPain.imageAlt}
                width={1169}
                height={888}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:pl-[42.5px]">
          <div className="md:mx-3 md:min-h-[314px]">
            <h2 className="m-0 font-sans text-[28px] font-bold leading-[33px] text-primary md:text-[32px] md:leading-[37px] lg:text-[38px] lg:leading-[44px]">
              {rootPain.heading}
            </h2>

            <p className="mt-4 font-body text-[15px] leading-[23px] text-foreground md:leading-[22px] lg:mt-[16px] lg:leading-[26px]">
              {rootPain.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
