import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import {
  FacebookIcon,
  InstagramIcon,
  StarIcon,
  YelpIcon,
  YoutubeIcon,
} from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import type { SocialLink } from "@/types/texstarchiropractic-com-6d11e6eb";

const IMAGES = `${siteContent.brand.assetBase}/images`;

const socialIcons: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  yelp: YelpIcon,
};

/**
 * Lower footer strip: About Us links, social icons, the Best of ATX award, and
 * the Google reviews bar + phone button. Four mfn columns
 * (one-fifth / one-fifth / one-fourth / one-third = 244 / 244 / 305 / 407).
 */
export function FooterAbout() {
  const { footerAbout } = siteContent;
  return (
    <section className="relative pt-[15px]">
      <div className="mx-auto grid max-w-[1220px] grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 lg:flex lg:justify-between lg:gap-0">
        <div className="px-3 lg:w-1/5">
          <h6 className="mb-3 text-[17px] leading-[28px] font-bold text-[#382F2D] uppercase">
            {footerAbout.linksHeading}
          </h6>
          <ul className="flex flex-col gap-2.5">
            {siteContent.footerAboutLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[16px] leading-[26px] font-semibold text-[#382F2D] no-underline transition-all hover:text-[#005EB8]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 lg:w-1/5">
          <h6 className="mb-3 text-[17px] leading-[28px] font-bold text-[#382F2D] uppercase">
            {footerAbout.socialHeading}
          </h6>
          <ul className="mt-1 flex flex-row gap-6">
            {siteContent.social.map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="block text-[#382F2D] transition-all hover:text-[#005EB8]"
                  >
                    <Icon className="h-[22px] w-[22px]" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-3 lg:w-1/4">
          <Image
            src={`${IMAGES}/badge-best-of-atx.svg`}
            alt={siteContent.hero.awardImageAlt}
            width={281}
            height={176}
            unoptimized
            className="mx-auto mb-4 h-auto w-[200px] md:w-[281px]"
          />
          <h5 className="mx-auto mb-[35px] max-w-[300px] text-[20px] leading-[25px] font-semibold text-[#382F2D] text-center">
            {footerAbout.awardCaption}
          </h5>
        </div>

        <div className="px-3 lg:w-1/3">
          <a
            href={siteContent.reviews.ctaHref}
            className="mb-10 flex h-[60px] w-full items-center justify-between gap-3 rounded-none bg-[#EA7600] px-5"
          >
            <span className="text-[16px] leading-[24px] font-semibold text-white">
              {footerAbout.reviewCount}
            </span>
            <span className="flex items-center gap-0.5 text-white">
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} filled className="h-[18px] w-[18px]" />
              ))}
            </span>
            {/* The capture shows the single-colour white Google wordmark, not the
                multi-colour G mark, so the badge asset is used. */}
            <Image
              src={footerAbout.reviewBadgeImage}
              alt="Google"
              width={102}
              height={34}
              className="h-[34px] w-[102px]"
            />
          </a>
          <Button
            href={siteContent.brand.phoneHref}
            variant="solidOrange"
            className="mx-auto w-full md:w-auto"
          >
            Call us: {siteContent.brand.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
