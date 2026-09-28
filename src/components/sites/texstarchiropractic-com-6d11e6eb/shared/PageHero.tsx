import Link from "next/link";

import { cn } from "@/lib/utils";

import { BODY, CONTAINER, EYEBROW, H1 } from "./type-scale";

export type Crumb = {
  label: string;
  /** Internal path, or an absolute URL for the final external hop. */
  href: string;
};

/**
 * Inner-page banner. Reuses the home hero's orange radial wash, the eyebrow
 * ramp and the H1 ramp so a visitor cannot tell this page was added later.
 */
export function PageHero({
  eyebrow,
  heading,
  summary,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  heading: string;
  summary?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="ts-gradient-hero relative px-[21px] pt-[40px] pb-[48px] md:px-[30px] md:pt-[64px] md:pb-[64px] lg:px-0">
      <div className={CONTAINER}>
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] leading-5">
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {last ? (
                      <span aria-current="page" className="text-white/90">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          {crumb.label}
                        </Link>
                        <span aria-hidden="true" className="text-white/50">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <p className={cn(EYEBROW, "text-white")}>{eyebrow}</p>
        <h1 className={cn(H1, "mt-[15px] max-w-[16ch] text-white md:max-w-[20ch]")}>{heading}</h1>
        {summary ? (
          <p className={cn(BODY, "mt-[18px] max-w-[62ch] text-white lg:mt-[22px]")}>{summary}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
