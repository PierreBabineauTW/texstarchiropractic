"use client";

import { useCallback, useState } from "react";

import { FooterAbout } from "../root-8a5edab2/FooterAbout";
import { FooterBottom } from "../root-8a5edab2/FooterBottom";
import { FooterColumns } from "../root-8a5edab2/FooterColumns";
import { FooterNewsletter } from "../root-8a5edab2/FooterNewsletter";
import { SideMenu } from "../root-8a5edab2/SideMenu";
import { SiteHeader } from "../root-8a5edab2/SiteHeader";

/**
 * Chrome shared by every route: header, off-canvas side menu, footer.
 *
 * The markup and the menu-state wiring are identical to the approved home
 * page, which now renders through this component too, so moving the state here
 * is a no-op visually.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <SiteHeader onToggleMenu={toggleMenu} menuOpen={menuOpen} />
      <SideMenu open={menuOpen} onClose={closeMenu} />
      {children}
      {/*
        The live footer gradient is one continuous 0deg ramp across sections
        13, 14 and 15, so it wraps all three rather than sitting on one.
      */}
      <footer className="ts-gradient-footer">
        <FooterNewsletter />
        <FooterColumns />
        <FooterAbout />
        <FooterBottom />
      </footer>
    </>
  );
}
