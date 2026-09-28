import type { Metadata, Viewport } from "next";
import { Open_Sans, Poppins } from "next/font/google";

import "./globals.css";

import { siteConfig } from "@/lib/site";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const A = "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/seo";

/**
 * Root metadata. Per-page titles, descriptions, canonicals and OpenGraph come
 * from `pageMetadata()` in src/lib/metadata.ts; this is only the app-wide
 * defaults (icons, manifest, robots directives, verification placeholders).
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: `${A}/icon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${A}/icon-192x192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: `${A}/apple-touch-icon-180x180.png`, sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Uncomment and set when the properties are configured:
  // alternates: { canonical: "/" },
  // verification: { google: "your-google-site-verification-token" },
};

export const viewport: Viewport = {
  themeColor: "#005EB8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
