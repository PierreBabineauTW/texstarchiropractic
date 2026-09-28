"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../shared/Button";
import { siteConfig } from "@/lib/site";

import { siteContent } from "../shared/content";
import { MenuFineIcon } from "../shared/icons";

const IMAGES = `${siteContent.brand.assetBase}/images`;

/** The rendered height of the desktop header; the live site swaps at exactly this point. */
const SCROLL_TRIGGER = 192;

export type SiteHeaderProps = {
  onToggleMenu: () => void;
  /** Only needed for `aria-expanded` on the burger. */
  menuOpen?: boolean;
};

export function SiteHeader({ onToggleMenu, menuOpen = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY >= SCROLL_TRIGGER);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    /*
     * Below md the header stays in normal flow and pins with `sticky`. The
     * previous static -> fixed swap lifted the whole document by the header
     * height the moment the visitor passed SCROLL_TRIGGER, which yanked the
     * content out from under their thumb and scored CLS 0.21. Sticky keeps the
     * rendered position at rest byte-identical while removing the jump.
     *
     * From md up the live site's absolute -> fixed swap is reproduced exactly,
     * because there the hero is designed to sit underneath the tall banner.
     */
    <header
      className={cn(
        "sticky top-0 z-[3] w-full",
        scrolled ? "md:fixed" : "md:absolute"
      )}
    >
      {/*
        The blue band is a full-bleed header section on the live site; only its
        contents sit inside the 1220px wrapper.
      */}
      <div
        className={cn(
          "w-full bg-[#005EB8]",
          scrolled ? "h-[89px] p-2 md:h-[65px] md:px-0 md:py-[5px]" : "h-[89px] p-2 md:h-[103px] md:px-0 md:py-3 lg:h-[192px]"
        )}
      >
        <div className="mx-auto flex h-full w-full items-center md:max-w-[1220px]">
        <Link href="/" className="flex shrink-0 items-center" aria-label="TexStar Chiropractic">
          <Image
            src={`${IMAGES}/logo-texstar-white-horizontal.svg`}
            alt="TexStar Chiropractic"
            width={scrolled ? 150 : 486}
            height={scrolled ? 52 : 168}
            priority
            className="hidden h-auto max-w-[110px] md:block md:max-w-[229px] lg:max-w-none"
          />
          <Image
            src={`${IMAGES}/logo-texstar-spine-icon.png`}
            alt=""
            width={42}
            height={73}
            priority
            className="md:hidden"
          />
        </Link>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden items-center gap-2.5 md:flex">
            <Button
              href={siteConfig.bookingUrl}
              variant={scrolled ? "outlineWhite" : "solidWhite"}
            >
              Schedule Appointment
            </Button>
            <Button href="/contact" variant={scrolled ? "outlineWhite" : "solidWhite"}>
              Contact Us
            </Button>
          </div>

          <div className="flex items-center gap-2.5 min-[380px]:gap-5 md:hidden">
            {/*
              The live mobile header is a fixed 390px: logo 42 + two CTAs +
              burger. At 360/375 that overflowed and clipped the burger, so below
              380px the CTAs tighten their horizontal padding and the gap closes.
              Type size, radius, weight and border are untouched.
            */}
            <Button
              href={siteConfig.bookingUrl}
              variant="outlineWhite"
              className="px-3 min-[380px]:px-5"
            >
              Online Scheduler
            </Button>
            <Button
              href="tel:+15128992228"
              variant="outlineWhite"
              className="px-3 min-[380px]:px-5"
            >
              Call Us
            </Button>
          </div>

          <button
            type="button"
            onClick={onToggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="site-side-menu"
            aria-expanded={menuOpen}
            className={cn(
              "flex h-[39px] w-[38px] items-center justify-center rounded-[2px] border-2 border-[#FDFCFA] text-[#FDFCFA]",
              "md:h-[50px] md:w-[50px]"
            )}
          >
            <MenuFineIcon className="h-[14px] w-[18px] md:h-[19px] md:w-[25px]" />
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}
