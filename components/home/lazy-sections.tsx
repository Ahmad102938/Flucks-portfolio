"use client";

import dynamic from "next/dynamic";

// Below-the-fold sections split into their own chunks so the hero hydrates first
export const HeroParallax = dynamic(() => import("@/components/ui/hero-parallax").then((m) => m.HeroParallax));
export const OurApproach = dynamic(() => import("@/components/ui/our-approach").then((m) => m.OurApproach));
export const FaqSection = dynamic(() => import("@/components/ui/faq-section").then((m) => m.FaqSection));
export const LetsConnect = dynamic(() => import("@/components/ui/lets-connect").then((m) => m.LetsConnect));
