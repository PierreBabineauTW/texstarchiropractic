import type { ComponentType, SVGProps } from "react";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import {
  OfferChartIcon,
  OfferPeopleIcon,
  OfferSpineIcon,
  OfferTreatmentIcon,
} from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";
import { cn } from "@/lib/utils";

import { Button } from "../shared/Button";

const SITE_ROOT = siteContent.brand.assetBase;

const stepIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  chart: OfferChartIcon,
  spine: OfferSpineIcon,
  treatment: OfferTreatmentIcon,
  people: OfferPeopleIcon,
};

const HEADING = "font-bold text-white";

/* MFN type ramp: mobile (<480) / tablet (480-1024) / laptop+ (>=1025). */
const H1 = "text-[32px] leading-[38px] md:text-[43px] md:leading-[45px] lg:text-[50px] lg:leading-[53px]";
const H2 = "text-[24px] leading-[31px] md:text-[32px] md:leading-[37px] lg:text-[38px] lg:leading-[44px]";
const H3 = "text-[20px] leading-[25px] md:text-[28px] md:leading-[34px] lg:text-[33px] lg:leading-[40px]";
const H4 = "text-[18px] leading-[25px] md:text-[20px] md:leading-[25px] lg:text-[24px] lg:leading-[29px]";
const FINE = "font-sans text-center text-[16px] leading-[26px] font-medium text-white";

export function OfferSection() {
  const { price, title, note, cta, ctaHref, includesHeading, steps, finePrint, readMore } =
    siteContent.offer;

  return (
    <section className="relative px-[21px] py-[60px] md:px-[30px]">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="ts-gradient-blue relative flex flex-col rounded-[2px]">
          <div className="relative flex flex-col pt-4 md:pt-5 lg:h-[262px] lg:pt-8">
            <div
              className="absolute -left-[7px] top-0 flex h-[94px] w-[94px] items-center justify-center bg-cover bg-center md:-left-[30px] md:-top-[30px] md:h-[160px] md:w-[160px] lg:-left-12 lg:-top-12 lg:h-[230px] lg:w-[230px]"
              style={{ backgroundImage: `url(${SITE_ROOT}/images/offer-starburst.png)` }}
            >
              <p className={cn(HEADING, H1, "text-center")}>{price}</p>
            </div>
            <div className="ml-[88px] md:ml-[142px] lg:ml-[223px]">
              <h2 className={cn(HEADING, H2, "mb-[15px]")}>{title}</h2>
              <h3 className={cn(HEADING, H4)}>{note}</h3>
            </div>
            {/* the live DOM shows this CTA below 1024px only */}
            {/* w-[320px] alone overflowed below 400px once the 8-unit indent was
                added; derive the width from the space the indent leaves, and
                restore the fixed 320px from md up where there is room. */}
            <div className="mt-6 ml-8 w-[calc(100%-2rem)] max-w-[320px] md:ml-[142px] md:w-[320px] lg:hidden">
              <Button href={ctaHref} variant="solidWhite" className="w-full font-normal">
                {cta}
              </Button>
            </div>
            <h3 className={cn(HEADING, H3, "mt-[15px] ml-8 md:ml-[142px] lg:ml-[223px]")}>
              {includesHeading}
            </h3>
          </div>

          <ul className="mt-[68px] flex flex-col gap-8 md:mt-12 md:pr-16 md:pb-[10px] lg:mt-0">
            {steps.map((step) => {
              const Icon = stepIcons[step.icon] ?? OfferChartIcon;

              return (
                <li
                  key={step.label}
                  className="ts-gradient-orange flex flex-col items-center gap-2 rounded-r-[100px] border-y-4 border-r-4 border-l-0 border-white px-9 py-[26px] md:min-h-[104px] md:flex-row md:items-center md:gap-4 md:py-4 md:pl-[102px] md:pr-6 lg:gap-6 lg:pl-[164px]"
                >
                  <Icon className="h-6 w-6 flex-none text-white" />
                  <h4 className={cn(HEADING, H4, "text-left")}>{step.label}</h4>
                </li>
              );
            })}
          </ul>

          <p className={cn(FINE, "mt-10 md:mt-6 md:mb-[39px]")}>{finePrint}</p>
          <span className={cn(FINE, "mt-6 block md:mt-2.5 md:mb-10")}>{readMore}</span>
        </div>
      </div>
    </section>
  );
}
