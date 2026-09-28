/**
 * Shared type scale for inner pages.
 *
 * These strings are lifted from the approved home-page components so new pages
 * use the same ramp at the same breakpoints. Import them instead of restating
 * Tailwind classes, otherwise a design change has to be chased across files.
 */

/** Page hero H1. Same ramp as the home H1. */
export const H1 =
  "font-sans text-[32px] leading-[38px] font-bold md:text-[43px] md:leading-[45px] lg:text-[50px] lg:leading-[53px]";

/** Section heading. */
export const H2 =
  "font-sans text-[24px] leading-[31px] font-bold md:text-[32px] md:leading-[37px] lg:text-[38px] lg:leading-[44px]";

/** Sub-section heading. */
export const H3 =
  "font-sans text-[20px] leading-[25px] font-bold md:text-[28px] md:leading-[34px] lg:text-[33px] lg:leading-[40px]";

/** Card / row heading. */
export const H4 =
  "font-sans text-[18px] leading-[25px] font-bold md:text-[20px] md:leading-[25px] lg:text-[24px] lg:leading-[29px]";

/** Card title (blog posts). */
export const H5 =
  "font-sans text-[16px] leading-[21px] font-semibold md:text-[18px] md:leading-[23px] lg:text-[20px] lg:leading-[25px]";

/** Small heading (footer-style columns, list groups). */
export const H6 = "font-sans text-[17px] leading-[28px] font-bold uppercase";

/** Eyebrow / overline. */
export const EYEBROW = "font-sans text-[15px] leading-[24px] font-semibold md:text-[16px] md:leading-[26px]";

/** Body copy. */
export const BODY =
  "font-sans text-[15px] leading-[23px] font-normal text-[#382F2D] md:text-[16px] md:leading-[26px]";

/** Section gutter + page container, matching the home sections. */
export const SECTION = "relative px-[21px] pt-10 pb-[50px] md:px-[30px] md:pt-16 lg:px-0 lg:pt-20";

/** The 1220px content container. */
export const CONTAINER = "mx-auto w-full max-w-[1220px]";

/** White card, as used by the solutions and reviews sections. */
export const CARD =
  "rounded-[2px] border border-[#ECEAE7] bg-white shadow-[0_10px_20px_0_rgba(1,7,39,0.05)]";
