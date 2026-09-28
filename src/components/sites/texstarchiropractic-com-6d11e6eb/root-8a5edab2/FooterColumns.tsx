import Link from "next/link";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";

/**
 * Footer link columns. The four columns are mfn `one-fourth / one-fourth /
 * one-fourth / one-fifth` wraps (305 / 305 / 305 / 244 inside the 1220 inner,
 * each with 12px side margins), left-packed with ~61px of slack at the right.
 */
export function FooterColumns() {
  return (
    <section className="relative pt-[65px]">
      <div className="mx-auto grid max-w-[1220px] grid-cols-1 gap-8 pb-10 md:grid-cols-2 md:gap-x-10 md:pb-0 lg:flex lg:gap-0">
        {siteContent.footerColumns.map((column) => (
          <div key={column.heading} className="px-3 lg:mb-10 lg:w-1/4 lg:last:w-1/5">
            <h3 className="mb-3 text-[17px] leading-[28px] font-bold text-[#382F2D] uppercase">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[16px] leading-[26px] font-semibold text-[#382F2D] no-underline transition-all hover:text-[#005EB8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
