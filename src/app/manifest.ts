import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const A = "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TexStar Chiropractic",
    short_name: "TexStar",
    description:
      "Personalized chiropractic care across Central Texas, with locations in Austin, Bee Cave, Buda and Dripping Springs.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFCFA",
    theme_color: "#005EB8",
    icons: [
      { src: `${A}/icon-192x192.png`, sizes: "192x192", type: "image/png" },
      { src: `${A}/apple-touch-icon-180x180.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
