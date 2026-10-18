import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SitePreloader } from "@/components/site-preloader";
import { preloaderInitScript } from "@/lib/preloader";
import { MotionProvider } from "@/components/motion-provider";
import { PageTransition } from "@/components/page-transition";
import { SiteCursor } from "@/components/site-cursor";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { pageMetadata } from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

// Fonts are self-hosted (app/fonts, latin variable woff2 from Google Fonts) so builds and
// deploys never depend on fetching fonts.googleapis.com at build time.
const geistSans = localFont({
  variable: "--font-geist-sans",
  src: [{ path: "./fonts/geist-normal.woff2", weight: "100 900", style: "normal" }],
  fallback: ["system-ui", "arial"],
});

// Accent fonts are only used below the fold, so don't compete with the hero for bandwidth
const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "./fonts/fraunces-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-italic.woff2", weight: "100 900", style: "italic" },
  ],
  fallback: ["Georgia", "serif"],
  preload: false,
});

const playfair = localFont({
  variable: "--font-playfair",
  src: [
    { path: "./fonts/playfair-normal.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/playfair-italic.woff2", weight: "400 900", style: "italic" },
  ],
  fallback: ["Georgia", "serif"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  applicationName: SITE_NAME,
  // Description and sharing tags; the sharing image comes from app/opengraph-image.tsx
  ...pageMetadata({ path: "/" }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${fraunces.variable} ${playfair.variable} antialiased`}
      >
        <SitePreloader />
        <SmoothScroll />
        <PageTransition />
        <SiteCursor />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
