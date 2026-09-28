"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../shared/Button";
import { siteConfig } from "@/lib/site";

import { siteContent } from "../shared/content";
import { ChevronDownIcon } from "../shared/icons";

export type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const submenuId = (label: string) => `sidemenu-sub-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function SideMenu({ open, onClose }: SideMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[9002] bg-black/60 transition-opacity duration-300 ease-linear",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        /* target of the header burger's aria-controls */
        id="site-side-menu"
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-[10000] h-[100dvh] w-[250px] overflow-y-auto bg-[#FDFCFA]",
          "transition-transform duration-300 ease-linear",
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-[18px] top-3 flex h-10 w-10 items-start text-[32px] leading-8 text-[#EA7600]"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="px-2 pt-[50px]">
          <div className="mx-3 pt-[10px]">
            <nav aria-label="Main">
              <ul className="w-[210px]">
                {siteContent.navigation.map((group) => {
                  const expanded = openGroup === group.label;
                  const panelId = submenuId(group.label);

                  return (
                    <li key={group.label} className="relative flex flex-col text-base leading-8">
                      <a
                        href={group.href}
                        className="flex w-full items-center py-[8px] pb-[9px] text-[16px] font-semibold leading-8 text-[#73748C]"
                      >
                        {group.label}
                      </a>

                      {/*
                        The live chevron is a 30x20 tap target, under the 24px
                        minimum height. The button grows to 44x44 for touch and
                        the glyph is nudged back by (7, 4)px so its optical
                        position is unchanged. The box stays flush at right-0:
                        the drawer's right edge IS the viewport edge, so a
                        negative offset would push it off screen.
                      */}
                      <button
                        type="button"
                        onClick={() => setOpenGroup(expanded ? null : group.label)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        className="absolute right-0 top-0 flex size-11 items-center justify-center text-[#EA7600]"
                      >
                        <ChevronDownIcon
                          className={cn(
                            "h-5 w-5 translate-x-[7px] translate-y-[4px] transition-transform duration-300 ease-out",
                            expanded && "rotate-180"
                          )}
                        />
                      </button>

                      {expanded && (
                        <ul id={panelId} className="w-full pl-4">
                          {group.children.map((child) => (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                className="block py-[10px] text-[16px] font-semibold leading-[26px] text-[#73748C]"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-5 flex flex-col items-start gap-5">
              <Button href={siteConfig.bookingUrl} variant="solidOrange">
                Online Scheduler
              </Button>
              <Button href="/contact" variant="solidOrange">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
