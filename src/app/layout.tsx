import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "TexStar Chiropractic",
  description:
    "Personalized chiropractic care in the Central Texas area. Voted Best Chiropractor in the Austin area by Statesman. 4 locations: Austin, Bee Cave, Buda and Dripping Springs.",
  icons: {
    icon: [
      { url: "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/seo/icon-32x32.png", sizes: "32x32" },
      { url: "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/seo/icon-192x192.png", sizes: "192x192" },
    ],
    apple: [
      { url: "/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/seo/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
