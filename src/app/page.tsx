import { BlogSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/BlogSection";
import { CommitSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/CommitSection";
import { DedicateSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/DedicateSection";
import { HeroSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/HeroSection";
import { LocalTeamSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/LocalTeamSection";
import { MapSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/MapSection";
import { OfferSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/OfferSection";
import { PageShell } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/PageShell";
import { ReviewsSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/ReviewsSection";
import { RootPainSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/RootPainSection";
import { SolutionsSection } from "@/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SolutionsSection";
import { JsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "TexStar Chiropractic",
  description:
    "Personalized chiropractic care in the Austin area. TexStar treats back pain, neck pain, knee pain and headaches from four Central Texas locations: Austin, Bee Cave, Buda and Dripping Springs.",
  path: "/",
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }])} />

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
    </PageShell>
  );
}
