import Link from "next/link";

import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { BODY, CONTAINER, EYEBROW, H1 } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Conditions we treat", href: "/conditions" },
  { label: "Services and treatments", href: "/services" },
  { label: "Our doctors", href: "/team" },
  { label: "Our locations", href: "/locations" },
  { label: "Contact us", href: "/contact" },
  { label: "Frequently asked questions", href: "/faq" },
];

export default function NotFound() {
  return (
    <PageShell>
      <main className="ts-gradient-hero flex flex-1 items-center px-[21px] py-[64px] md:px-[30px] lg:px-0">
        <div className={CONTAINER}>
          <p className={cn(EYEBROW, "text-white")}>PAGE NOT FOUND</p>
          <h1 className={cn(H1, "mt-[15px] text-white")}>We could not find that page</h1>
          <p className={cn(BODY, "mt-[18px] max-w-[52ch] text-white")}>
            The link may be out of date. Try one of the pages below, or call us on{" "}
            <a href={siteContent.brand.phoneHref} className="underline underline-offset-4">
              {siteContent.brand.phone}
            </a>
            .
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-[640px]">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-[2px] border-2 border-white/70 bg-white/10 px-4 py-3 font-sans text-[16px] leading-[24px] font-semibold text-white transition-colors hover:bg-white hover:text-[#EA7600]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/" variant="solidWhite">
              Back to home
            </Button>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
