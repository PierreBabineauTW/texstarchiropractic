"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../shared/Button";
import { MenuFineIcon } from "../shared/icons";

const SITE = "https://texstarchiropractic.com";
const IMAGES = "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images";

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
    <header
      className={cn(
        "z-[3] w-full",
        scrolled ? "fixed top-0" : "md:absolute md:top-0"
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
        <a href={SITE} className="flex shrink-0 items-center" aria-label="TexStar Chiropractic">
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
        </a>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden items-center gap-2.5 md:flex">
            <Button
              href={`${SITE}/schedule-consultation/`}
              variant={scrolled ? "outlineWhite" : "solidWhite"}
            >
              Schedule Appointment
            </Button>
            <Button href={`${SITE}/contact-us/`} variant={scrolled ? "outlineWhite" : "solidWhite"}>
              Contact Us
            </Button>
          </div>

          <div className="flex items-center gap-5 md:hidden">
            <Button href={`${SITE}/schedule-consultation/`} variant="outlineWhite">
              Online Scheduler
            </Button>
            <Button href="tel:+15128992228" variant="outlineWhite">
              Call Us
            </Button>
          </div>

          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(
              "flex h-[39px] w-[38px] items-center justify-center rounded-[2px] border-2 border-[#FDFCFA] text-[#FDFCFA]",
              "transition-colors duration-200 ease-in-out md:h-[50px] md:w-[50px]"
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
