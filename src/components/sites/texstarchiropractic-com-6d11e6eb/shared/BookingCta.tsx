import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import { Button } from "./Button";
import { siteContent } from "./content";
import { BODY, CONTAINER, H2 } from "./type-scale";

/**
 * Closing call to action. Built from the offer panel's blue gradient and the
 * orange pill buttons already on the home page, so it reads as part of the same
 * page rather than a bolted-on banner.
 */
export function BookingCta({
  title = "Book your visit",
  body = "Call the clinic or use the online scheduler to book an appointment. Mention the new patient special when scheduling.",
  className,
}: {
  title?: string;
  body?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative px-[21px] py-[40px] md:px-[30px] lg:px-0", className)}>
      <div className={CONTAINER}>
        <div className="ts-gradient-blue flex flex-col items-center gap-6 rounded-[2px] px-6 py-10 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:px-12 md:py-12 md:text-left">
          <div className="max-w-[52ch]">
            <h2 className={cn(H2, "font-bold text-white")}>{title}</h2>
            <p className={cn(BODY, "mt-[15px] text-white")}>{body}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={siteConfig.bookingUrl} variant="solidWhite" className="w-full sm:w-auto">
              Schedule Appointment
            </Button>
            <Button
              href={siteContent.brand.phoneHref}
              variant="outlineWhite"
              className="w-full sm:w-auto"
            >
              {siteContent.brand.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Compact inline link list, used for related pages / breadcrumbs in content. */
export function RelatedLinks({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string; description?: string }[];
}) {
  if (links.length === 0) return null;
  return (
    <div>
      <h2 className={cn("font-sans text-[18px] leading-[25px] font-bold text-[#382F2D] lg:text-[20px]")}>
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex flex-col rounded-[2px] border border-[#ECEAE7] bg-white px-4 py-3 shadow-[0_10px_20px_0_rgba(1,7,39,0.05)] transition-colors hover:border-[#005EB8]"
            >
              <span className="font-sans text-[16px] leading-[24px] font-semibold text-[#382F2D] group-hover:text-primary">
                {link.label}
              </span>
              {link.description ? (
                <span className={cn(BODY, "mt-1 text-[14px] leading-[21px]")}>{link.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
