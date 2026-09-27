import Image from "next/image";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";

const SITE_ROOT = siteContent.brand.assetBase;

/**
 * The live site floats a 15%-wide image at `margin-left: 5%` inside the 585px
 * column-inner, which is what `left-[5%]` of that inner column reproduces. The
 * theme hides the image below 1240px, so the swoosh is desktop-only (Tailwind's
 * `xl` = 1280 is the nearest stock breakpoint).
 */
const SWOOSH_CLASS =
  "pointer-events-none absolute left-[5%] top-1/2 hidden h-[360px] w-[73px] -translate-y-1/2 xl:block";

export function DedicateSection() {
  const { quote, attribution, cta, ctaHref, image, imageAlt } = siteContent.dedicate;

  return (
    <section className="relative px-[21px] pb-20 md:px-[30px]">
      <div className="mx-auto flex w-full max-w-[1220px] flex-col items-stretch rounded-[2px] border border-[#ECEAE7] bg-[#FDFCFA] max-[767px]:border-0 md:flex-row">
        <div className="flex w-full items-center px-3 md:w-1/2">
          <div className="relative flex w-full self-stretch items-center">
            <Image
              src={SITE_ROOT + "/images/quote-swoosh.png"}
              alt=""
              width={73}
              height={361}
              className={SWOOSH_CLASS}
            />
            {/* padding mirrors the live `.text-div` 75%-wide / 32% offset box */}
            <blockquote className="w-full pb-[25px] md:pb-0 md:pl-[5%] md:pr-[5%] md:pt-[10%] xl:pl-[32%] xl:pr-[25px] xl:pt-[22px]">
              <h3 className="mb-4 max-w-[360px] text-[26px] leading-[31px] font-bold text-[#382F2D] md:text-[20px] md:leading-[26px] xl:text-[33px] xl:leading-[40px]">
                {quote}
              </h3>
              <p className="mb-8 text-base leading-[26px] font-medium text-[#382F2D]">
                {attribution}
              </p>
              <Button href={ctaHref} variant="solidOrange">
                {cta}
              </Button>
            </blockquote>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src={image}
            alt={imageAlt}
            width={1161}
            height={1040}
            className="block w-full object-cover drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </section>
  );
}
