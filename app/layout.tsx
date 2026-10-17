import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SitePreloader } from "@/components/site-preloader";
import { preloaderInitScript } from "@/lib/preloader";
import { MotionProvider } from "@/components/motion-provider";
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
  title: "Flucks",
  description: "A team of designers and engineers delivering web & app experiences, AI automation, and workflow integrations",
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
