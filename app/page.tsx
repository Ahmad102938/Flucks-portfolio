import { Suspense } from "react";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/background-lines";
import { SiteHeader } from "@/components/site-header";
import { OurWorks } from "@/components/ui/our-works";
import { OurServices } from "@/components/ui/our-services";
import { SiteFooter } from "@/components/site-footer";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ScrollHandler } from "@/components/home/scroll-handler";
import { GetInTouchButton } from "@/components/home/get-in-touch-button";
import { TechStackMarquee } from "@/components/home/tech-stack-marquee";
import { HeroParallax, OurApproach, FaqSection, LetsConnect } from "@/components/home/lazy-sections";
import { SectionIndex } from "@/components/home/section-index";
import { CONTACT_ID } from "@/lib/scroll";
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
  { name: "Flutter", src: "/assets/techStack/flutter.webp" },
  { name: "React Native", src: "/assets/techStack/reactnative.png" },
  { name: "LangChain", src: "/assets/techStack/langchain.png" },
  { name: "LangGraph", src: "/assets/techStack/langgraph.png" },
  { name: "n8n", src: "/assets/techStack/n8n.webp" },
  { name: "Google AI Studio", src: "/assets/techStack/google.jpeg" },
  { name: "OpenAI", src: "/assets/techStack/openAI.jpeg" },
];

const PARALLAX_PRODUCTS = [
  { title: "E-Commerce Reform", link: "/works", thumbnail: "/assets/featuredWork/aset.webp" },
  { title: "SaaS Dashboard", link: "/works", thumbnail: "/assets/featuredWork/aset2.webp" },
  { title: "Fintech App", link: "/works", thumbnail: "/assets/featuredWork/aset3.webp" },
  { title: "AI Platform", link: "/works", thumbnail: "/assets/featuredWork/aset4.webp" },
  { title: "Health Tech", link: "/works", thumbnail: "/assets/featuredWork/aset5.webp" },
  { title: "Real Estate", link: "/works", thumbnail: "/assets/featuredWork/aset6.webp" },
  { title: "Crypto Exchange", link: "/works", thumbnail: "/assets/featuredWork/aset7.webp" },
  { title: "Social Media", link: "/works", thumbnail: "/assets/featuredWork/aset8.webp" },
  { title: "EdTech Platform", link: "/works", thumbnail: "/assets/featuredWork/aset9.webp" },
  { title: "Marketing Tool", link: "/works", thumbnail: "/assets/featuredWork/aset10.webp" },
  { title: "Analytics Hub", link: "/works", thumbnail: "/assets/featuredWork/aset11.webp" },
  { title: "Cloud Systems", link: "/works", thumbnail: "/assets/featuredWork/aset12.webp" },
  { title: "Dev Tools", link: "/works", thumbnail: "/assets/featuredWork/aset13.webp" },
  { title: "Design System", link: "/works", thumbnail: "/assets/featuredWork/aset14.webp" },
  { title: "Enterprise CRM", link: "/works", thumbnail: "/assets/featuredWork/aset.webp" },
];

const HERO_SLIDER = homeContent.heroSlider;

// The right-edge section index; each id is on a wrapper below (the contact form sets its own)
const HOME_SECTIONS = [
  { id: "home-intro", label: "Intro" },
  { id: "home-work", label: "Work" },
  { id: "home-services", label: "Services" },
  { id: "home-approach", label: "Approach" },
  { id: "home-faq", label: "FAQ" },
  { id: CONTACT_ID, label: "Contact" },
];

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-slate-100">
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      {/* Background with slight grain or neutral gradient if desired, but sticking to black per request */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-black" />

      {/* Navigation - Resizable navbar inspired by Aceternity UI */}
      <SiteHeader />
      <SectionIndex sections={HOME_SECTIONS} />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
        {/* Hero */}
        <div id="home-intro">
        <BackgroundLines
          className="rounded-[2rem] py-2"
          svgOptions={{ duration: 10 }}
        >
          <section className="relative flex flex-col items-center text-center">
            <p className="mb-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-zinc-900 px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-slate-100 shadow-[0_0_26px_rgba(15,23,42,0.9)]">
              Engineering with taste
            </p>

            <div className="space-y-3">
              <div className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-slate-50 sm:text-[3.1rem] md:text-[3.6rem]">
                <span className="block">Digital products.</span>
                <span className="block text-slate-300">Built with precision.</span>
              </div>
              <p className="mx-auto max-w-xl text-sm text-slate-300/90 md:text-[0.97rem]">
                A team of designers and engineers delivering web & app experiences, AI automation, and workflow integrations — with obsessive attention to detail.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <GetInTouchButton />
              <Link className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/15 transition hover:bg-zinc-800" href="/works">
                See our work
              </Link>
            </div>

            {/* Metric strip under CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1 ring-1 ring-white/10">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span>Premium, product-grade builds</span>
              </div>
              <span>Production-ready · Maintainable · Modern</span>
            </div>

            {/* Horizontal sliding frame just below hero */}
            <div className="relative mt-12 w-full">
              <div className="pointer-events-none absolute -inset-x-24 -top-10 -z-10 h-56 opacity-0" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-black shadow-[0_40px_160px_rgba(15,23,42,1)]">
                {/* Browser chrome */}
                <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-zinc-900 px-4 py-2 text-[10px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 rounded-full bg-zinc-900 px-3 py-1 text-[10px] text-slate-200">
                      F
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-[10px] text-slate-400">
                    <span className="h-1.5 w-10 rounded-full bg-slate-700/80" />
                    <span className="hidden h-1.5 w-10 rounded-full bg-slate-800/80 sm:inline-flex" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-6 w-6 rounded-full bg-zinc-800" />
                    <span className="hidden h-6 w-6 rounded-full bg-zinc-800 sm:inline-flex" />
                  </div>
                </div>

                {/* Sliding content */}
                <div className="relative flex h-[40vh] max-h-[400px] items-center justify-center overflow-hidden bg-black">
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

                  <HeroCarousel images={HERO_SLIDER} />
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
            <div className="rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-[11px] text-slate-300 backdrop-blur">
              Web · App · AI
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black/70 py-6 shadow-[0_20px_80px_rgba(15,23,42,0.95)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <TechStackMarquee items={BRAND_STACK} />
          </div>
        </section>
        </div>

        {/* Featured works */}
        {/* Featured works with Hero Parallax */}
        <div id="home-work">
          <section className="relative w-full">
            <HeroParallax products={PARALLAX_PRODUCTS} />
          </section>

          {/* Our Works (Visuvate Style) */}
          <OurWorks />
        </div>

        {/* Our Services */}
        <div id="home-services">
          <OurServices />
        </div>

        {/* Our Approach (New) */}
        <div id="home-approach">
          <OurApproach />
        </div>

        <div id="home-faq">
          <FaqSection />
        </div>

        {/* CTA Form - LetsConnect Component */}
        <LetsConnect />
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
