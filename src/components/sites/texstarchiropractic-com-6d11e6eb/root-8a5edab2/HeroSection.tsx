import Image from "next/image";

import { siteContent } from "../shared/content";

const { brand, hero } = siteContent;

export function HeroSection() {
  const [beforePhone, afterPhone] = hero.body.split(brand.phone);

  return (
    <section className="ts-gradient-hero relative px-5 pt-10 md:px-[30px] md:pt-[80px] lg:px-0 lg:pt-[140px]">
      <div className="mx-auto flex w-full max-w-[1220px] flex-col md:flex-row md:items-stretch">
        <div className="flex w-full flex-col justify-center md:w-2/5 md:self-center">
          <div className="md:mx-3">
            <p className="mb-[17px] font-sans text-[15px] font-semibold leading-[24px] text-white lg:text-[19px] lg:leading-[26px]">
              {hero.eyebrow}
            </p>

            <h1 className="m-0 font-sans text-[32px] font-bold leading-[38px] text-white md:text-[43px] md:leading-[45px] lg:text-[50px] lg:leading-[53px]">
              {hero.heading}
            </h1>

            <p className="mt-[26px] font-body text-[15px] leading-[23px] text-white md:leading-[22px] lg:mt-[31px] lg:leading-[26px]">
              {beforePhone}
              <a href={brand.phoneHref} className="underline">
                {brand.phone}
              </a>
              {afterPhone}
            </p>

            <div className="mt-[26px] flex flex-col gap-4 bg-white/25 p-4 md:flex-row md:items-center md:gap-2.5 md:px-2 md:py-4 lg:mt-[33px] lg:gap-10 lg:px-3 lg:py-0">
              <p className="w-full font-body text-[16px] font-bold leading-[26px] text-white md:w-auto md:shrink lg:text-[19px] lg:leading-[31px]">
                {hero.awardCaption}
              </p>
              <Image
                src={hero.awardImage}
                alt={hero.awardImageAlt}
                width={162}
                height={134}
                className="h-auto w-[197px] shrink-0 self-center md:w-[80px] md:self-auto lg:w-[162px]"
              />
            </div>
          </div>
        </div>

        {/* the live column is inset 73px; a percentage padding would resolve
            against the 1220px flex container, not this column */}
        <div className="mt-8 w-full md:mt-0 md:w-3/5 md:pl-[73px] lg:pt-[34px]">
          <div className="flex h-full items-end md:mx-3">
            <Image
              src={hero.photo}
              alt={hero.photoAlt}
              width={1497}
              height={1536}
              /* Measured rendered widths: 350 @390, 328 @768, 517 @1024, 635 @1440.
                 Without this the browser assumed 100vw and pulled the full
                 1497px source for a 635px slot — over 2x the needed pixels,
                 and the element is the LCP. */
              sizes="(min-width: 1024px) 640px, (min-width: 768px) 45vw, 350px"
              className="h-auto w-full"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
