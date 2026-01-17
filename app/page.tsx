"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue } from "motion/react";
import { BackgroundLines } from "@/components/ui/background-lines";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
  NavbarBrand,
} from "@/components/ui/resizable-navbar";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { OurWorks } from "@/components/ui/our-works";
import { OurServices } from "@/components/ui/our-services";
import { OurApproach } from "@/components/ui/our-approach";
import homeContent from "@/constants/home.json";

const BRAND_STACK = [
  { name: "Wix Studio", src: "/assets/techStack/wix.avif" },
  { name: "Stripe", src: "/assets/techStack/stripe.webp" },
  { name: "Figma", src: "/assets/techStack/figma.webp" },
  { name: "Webflow", src: "/assets/techStack/webflow.webp" },
  { name: "Notion", src: "/assets/techStack/notion.webp" },
  { name: "Adobe", src: "/assets/techStack/adobe.webp" },
  { name: "Adobe Illustrator", src: "/assets/techStack/AI.webp" },
  { name: "Next.js", src: "/assets/techStack/Next.webp" },
];

const PARALLAX_PRODUCTS = [
  { title: "E-Commerce Reform", link: "#", thumbnail: "/assets/featuredWork/aset.webp" },
  { title: "SaaS Dashboard", link: "#", thumbnail: "/assets/featuredWork/aset2.webp" },
  { title: "Fintech App", link: "#", thumbnail: "/assets/featuredWork/aset3.webp" },
  { title: "AI Platform", link: "#", thumbnail: "/assets/featuredWork/aset4.webp" },
  { title: "Health Tech", link: "#", thumbnail: "/assets/featuredWork/aset5.webp" },
  { title: "Real Estate", link: "#", thumbnail: "/assets/featuredWork/aset6.webp" },
  { title: "Crypto Exchange", link: "#", thumbnail: "/assets/featuredWork/aset7.webp" },
  { title: "Social Media", link: "#", thumbnail: "/assets/featuredWork/aset8.webp" },
  { title: "EdTech Platform", link: "#", thumbnail: "/assets/featuredWork/aset9.webp" },
  { title: "Marketing Tool", link: "#", thumbnail: "/assets/featuredWork/aset10.webp" },
  { title: "Analytics Hub", link: "#", thumbnail: "/assets/featuredWork/aset11.webp" },
  { title: "Cloud Systems", link: "#", thumbnail: "/assets/featuredWork/aset12.webp" },
  { title: "Dev Tools", link: "#", thumbnail: "/assets/featuredWork/aset13.webp" },
  { title: "Design System", link: "#", thumbnail: "/assets/featuredWork/aset14.webp" },
  { title: "Enterprise CRM", link: "#", thumbnail: "/assets/featuredWork/aset.webp" },
];

const NAV_ITEMS = homeContent.navItems;
const FEATURED_WORKS = homeContent.featuredWorks;
const FAQS = homeContent.faqs;
const HERO_SLIDER = homeContent.heroSlider;

// Infinite carousel component using Framer Motion
const InfiniteCarousel: React.FC<{
  images: Array<{ src?: string; alt?: string; objectPosition?: string }>;
}> = ({ images }) => {
  const imageFallback = "/assets/UrbanGuest.png";

  // Duplicate images for seamless loop: [A, B, C] -> [A, B, C, A, B, C]
  const duplicatedImages = [...images, ...images];

  const x = useMotionValue(0);
  const [slideWidthPx, setSlideWidthPx] = useState(0);
  const [cardHeightPx, setCardHeightPx] = useState(0);
  const gapPx = 24; // 6 * 4px (gap-6)

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      const slideW = width < 768 ? width * 0.8 : width < 1024 ? width * 0.48 : width * 0.4;
      setSlideWidthPx(slideW);
      setCardHeightPx(slideW / 1.5); // width:height = 1.5x
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (slideWidthPx === 0 || images.length === 0) return;

    const totalSlideWidth = slideWidthPx + gapPx;
    const halfWayPoint = totalSlideWidth * images.length;
    const duration = images.length * 4 * 1000; // milliseconds

    // Continuous animation with seamless reset
    let startTime = performance.now();
    let animationFrameId: number;
    let isRunning = true;

    const animate = (currentTime: number) => {
      if (!isRunning) return;

      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      const currentX = -progress * halfWayPoint;

      // When we reach halfway, reset seamlessly (duplicated images make this invisible)
      if (progress >= 1) {
        startTime = currentTime;
        x.set(0);
      } else {
        x.set(currentX);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [x, slideWidthPx, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="flex h-full items-center gap-6 pr-6"
      style={{
        x,
      }}
    >
      {duplicatedImages.map((img, idx) => {
        const src = img.src || imageFallback;
        const alt = img.alt || "Project";
        const objectPosition = img.objectPosition || "50% 50%";

        return (
          <div
            key={`${src}-${idx}`}
            className="flex-shrink-0 px-2 py-2"
            style={{
              width: slideWidthPx || "40vw",
              height: cardHeightPx || "26vw",
            }}
          >
            <img
              src={src}
              alt={alt}
              className="block h-full w-full rounded-3xl border border-white/10 object-cover shadow-[0_18px_80px_rgba(0,0,0,0.55)]"
              style={{ objectPosition }}
              loading="lazy"
            />
          </div>
        );
      })}
    </motion.div>
  );
};

const Page: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0]?.q ?? null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background glows / grain */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_#22d3ee_0,_transparent_55%),radial-gradient(circle_at_center,_#4f46e5_0,_transparent_60%),radial-gradient(circle_at_bottom,_#e11d48_0,_transparent_55%)] opacity-60" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/window.svg')] mix-blend-soft-light opacity-[0.15]" />

      {/* Navigation - Resizable navbar inspired by Aceternity UI */}
      <Navbar className="top-0">
        {/* Desktop navbar */}
        <NavBody>
          <NavbarBrand />

          <NavItems
            items={NAV_ITEMS.map((item) => ({
              name: item,
              link: "#",
            }))}
          />

          <div className="flex items-center gap-2">
            <NavbarButton variant="secondary">See our work</NavbarButton>
            <NavbarButton variant="gradient">Let&apos;s connect</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile navbar */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarBrand />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={idx}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-slate-50"
              >
                {item}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <NavbarButton variant="secondary">See our work</NavbarButton>
              <NavbarButton variant="gradient">Let&apos;s connect</NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
        {/* Hero */}
        <BackgroundLines
          className="rounded-[2rem] py-2"
          svgOptions={{ duration: 10 }}
        >
          <section className="relative flex flex-col items-center text-center">
            <p className="mb-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-slate-100 shadow-[0_0_26px_rgba(15,23,42,0.9)]">
              Design in Details
            </p>

            <div className="space-y-3">
              <div className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-slate-50 sm:text-[3.1rem] md:text-[3.6rem]">
                <span className="block">Crafted{" "}Websites</span>
                <span className="block text-slate-300">Lasting{" "}Impressions</span>
              </div>
              <p className="mx-auto max-w-xl text-sm text-slate-300/90 md:text-[0.97rem]">
                Premium websites crafted for bold brands — clean UX, precise
                motion, and a focus on conversions, inspired by{" "}
                <a
                  href="https://www.visuvate.com/"
                  target="_blank"
                  className="underline decoration-cyan-400/60 underline-offset-4 hover:text-cyan-200"
                  rel="noreferrer"
                >
                  Visuvate
                </a>
                .
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-900 shadow-[0_0_35px_rgba(248,250,252,0.9)] transition hover:bg-white">
                Get in touch
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-slate-50">
                  →
                </span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/15 transition hover:bg-slate-800">
                See our work
              </button>
            </div>

            {/* Metric strip under CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 ring-1 ring-white/10">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span>Premium UX & motion‑driven builds</span>
              </div>
              <span>Mobile‑first · Future‑ready · CMS friendly</span>
            </div>

            {/* Horizontal sliding frame just below hero */}
            <div className="relative mt-12 w-full">
              <div className="pointer-events-none absolute -inset-x-24 -top-10 -z-10 h-56 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.5)_0,_transparent_60%)] opacity-90" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-black shadow-[0_40px_160px_rgba(15,23,42,1)]">
                {/* Browser chrome */}
                <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-black/60 px-4 py-2 text-[10px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] text-slate-200">
                      V
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] text-slate-400">
                    <span className="h-1.5 w-10 rounded-full bg-slate-700/80" />
                    <span className="hidden h-1.5 w-10 rounded-full bg-slate-800/80 sm:inline-flex" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-6 w-6 rounded-full bg-slate-800" />
                    <span className="hidden h-6 w-6 rounded-full bg-slate-800 sm:inline-flex" />
                  </div>
                </div>

                {/* Sliding content */}
                <div className="relative flex h-[40vh] max-h-[400px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

                  {/* Framer Motion infinite carousel */}
                  <InfiniteCarousel images={HERO_SLIDER.length ? HERO_SLIDER : [{ src: "/assets/UrbanGuest.png", alt: "Preview" }]} />
                </div>
              </div>
            </div>
          </section>
        </BackgroundLines>

        {/* Tech stack marquee */}
        <section className="mt-14 space-y-5 md:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                Tech stack
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Design, development & systems that keep your site future‑ready.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-300 backdrop-blur">
              Web · Product · Brand
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/70 py-6 shadow-[0_20px_80px_rgba(15,23,42,0.95)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <InfiniteMarquee
              items={BRAND_STACK}
              itemClassName="gap-20 px-4"
              renderItem={(item) => (
                <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-12 w-auto object-contain grayscale invert mix-blend-screen contrast-125"
                  />
                  <span className="text-xl font-semibold text-slate-200 tracking-tight">
                    {item.name}
                  </span>
                </div>
              )}
            />
          </div>
        </section>

        {/* Featured works */}
        {/* Featured works with Hero Parallax */}
        <section className="relative w-full">
          <HeroParallax products={PARALLAX_PRODUCTS} />
        </section>

        {/* Our Works (Visuvate Style) */}
        <OurWorks />

        {/* Our Services */}
        <OurServices />

        {/* Our Approach (New) */}
        <OurApproach />

        {/* Services Summary Text */}
        <section className="mt-16 md:mt-24">
          <div className="space-y-5 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Services
            </p>
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Crafted websites, reimagined redesigns, and CMS‑driven builds.
            </h2>
            <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
                <p className="text-xs font-semibold text-slate-100">
                  Crafted Websites
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  From concept to launch — full‑funnel, story‑driven websites
                  that reflect your positioning and product.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
                <p className="text-xs font-semibold text-slate-100">
                  Website Redesign
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Keep your content, rethink the experience. Sharper messaging,
                  better flows, higher conversions.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-4">
                <p className="text-xs font-semibold text-slate-100">
                  CMS & Dynamic Sites
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Powerful CMS setups so you can publish blogs, case studies,
                  landing pages and more — without dev cycles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ + CTA */}
        <section className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Frequently asked
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
              Everything you need to know before we start.
            </h2>

            <div className="mt-4 space-y-2">
              {FAQS.map((item) => {
                const isOpen = openFaq === item.q;
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() =>
                      setOpenFaq((prev) => (prev === item.q ? null : item.q))
                    }
                    className="flex w-full flex-col rounded-2xl border border-white/5 bg-slate-900/80 p-3 text-left text-xs text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-medium text-slate-100">
                        {item.q}
                      </p>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 text-[10px] text-slate-300">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-2 text-[11px] text-slate-400">
                        {item.a}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-5 shadow-[0_26px_100px_rgba(8,47,73,0.95)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Let&apos;s build your next website
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-50">
                Create bold. Deliver better.
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Share a short brief (or even a rough idea) and we&apos;ll
                respond with a roadmap, timeline, and investment — no fluff.
              </p>

              <form
                className="mt-4 space-y-3 text-xs"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-300">
                    What are you building?
                  </label>
                  <input
                    placeholder="New marketing site, product launch, redesign..."
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-300">
                    Preferred contact
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-200 transition hover:border-cyan-400/50 hover:bg-slate-900"
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-200 transition hover:border-cyan-400/50 hover:bg-slate-900"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 shadow-[0_0_40px_rgba(248,250,252,0.8)] transition hover:bg-white"
                >
                  Send brief
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-slate-50">
                    →
                  </span>
                </button>
                <p className="text-[10px] text-slate-400">
                  No spam. Just one clear response with next steps and a clear
                  path to launch.
                </p>
              </form>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <p>India — working globally. Available for Q1 & Q2 collaborations.</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 px-2 py-0.5">
                  Portfolio
                </span>
                <span className="rounded-full border border-white/15 px-2 py-0.5">
                  Templates
                </span>
                <span className="rounded-full border border-white/15 px-2 py-0.5">
                  Blog
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/90 py-6 text-[11px] text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-semibold text-slate-100 ring-1 ring-white/10">
              FL
            </span>
            <span>© {new Date().getFullYear()} Flucks. Crafted in detail.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span>Process</span>
            <span>FAQs</span>
            <span>Privacy</span>
            <span className="text-slate-300">Create bold. Deliver better.</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Page;