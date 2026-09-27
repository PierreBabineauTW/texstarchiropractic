"use client";

import { useCallback, useState } from "react";

import { BlogSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/BlogSection";
import { CommitSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/CommitSection";
import { DedicateSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/DedicateSection";
import { FooterAbout } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterAbout";
import { FooterBottom } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterBottom";
import { FooterColumns } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterColumns";
import { FooterNewsletter } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterNewsletter";
import { HeroSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/HeroSection";
import { LocalTeamSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/LocalTeamSection";
import { MapSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/MapSection";
import { OfferSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/OfferSection";
import { ReviewsSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/ReviewsSection";
import { RootPainSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/RootPainSection";
import { SideMenu } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SideMenu";
import { SiteHeader } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SiteHeader";
import { SolutionsSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SolutionsSection";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <SiteHeader onToggleMenu={toggleMenu} menuOpen={menuOpen} />
      <SideMenu open={menuOpen} onClose={closeMenu} />

      <main>
        <HeroSection />
        <RootPainSection />
        <OfferSection />
        <SolutionsSection />
        <CommitSection />
        <MapSection />
        <LocalTeamSection />
        <DedicateSection />
        <ReviewsSection />
        <BlogSection />
      </main>

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
