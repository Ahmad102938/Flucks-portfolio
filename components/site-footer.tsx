"use client";

import React, { useRef } from "react";
import { SERVICE_PAGES } from "@/constants/service-pages";
import Link from "next/link";
import Image from "next/image";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "motion/react";
import { footerLinks, footerBranding } from "@/constants/footer";

const WORDMARK = "FLUCKS";

// The wordmark stays hidden while the footer's information scrolls in, then grows out of the
// bottom edge over the last stretch of the page, letter by letter from the centre outwards.
const GROW_RANGE: [number, number] = [0.35, 0.97];
const LETTER_SPAN = 0.55; // share of GROW_RANGE each letter takes; the rest is the stagger

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const WordmarkLetter = ({
    letter,
    index,
    progress,
}: {
    letter: string;
    index: number;
    progress: MotionValue<number>;
}) => {
    // Centre letters lead, outer letters follow: 0 for the middle pair, 1 for the edges
    const centre = (WORDMARK.length - 1) / 2;
    const order = Math.abs(index - centre) / centre;
    const [from, to] = GROW_RANGE;
    const start = from + order * (to - from) * (1 - LETTER_SPAN);
    const end = start + (to - from) * LETTER_SPAN;

    const t = useTransform(progress, (p) => easeOutCubic(clamp01((p - start) / (end - start))));
    const y = useTransform(t, (v) => `${(1 - v) * 105}%`);
    const scaleY = useTransform(t, (v) => 0.55 + v * 0.45);
    const opacity = useTransform(t, (v) => clamp01(v * 2.5));
    const filter = useTransform(t, (v) => (v > 0.98 ? "none" : `blur(${((1 - v) * 8).toFixed(2)}px)`));

    return (
        <motion.span
            style={{ y, scaleY, opacity, filter }}
            className="inline-block origin-bottom bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent will-change-transform"
        >
            {letter}
        </motion.span>
    );
};

export const SiteFooter = () => {
    const footerRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();

    // 0 as the footer's top enters the screen, 1 when the page is scrolled to the very end
    const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.7 });

    return (
        <footer ref={footerRef} className="relative w-full bg-black md:min-h-[40vh] flex flex-col justify-center overflow-hidden px-5 pt-12 md:pt-0 md:px-12">
            <div className="relative z-10 mx-auto max-w-[1400px] w-full flex-grow flex flex-col justify-center">
                {/* Phones: brand on top, then all three link columns side by side, then the copyright */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-9 md:gap-8 lg:gap-12 mb-10 md:mb-14 w-full">
                    {/* Column 1: Logo/Brand */}
                    <div className="flex flex-col gap-6 col-span-3 md:col-span-1 items-center text-center">
                        <div className="flex flex-col gap-3 md:gap-4 items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="h-10 w-10 relative flex items-center justify-center">
                                    <Image
                                        src="/assets/logo3.png"
                                        alt="Flucks Logo"
                                        fill
                                        sizes="40px"
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">{footerBranding.logoText}</span>
                            </Link>
                            <div className="flex flex-wrap justify-center gap-x-1 md:flex-col md:gap-1 items-center">
                                <p className="text-sm text-zinc-400 font-medium">{footerBranding.slogan}</p>
                                <p className="text-sm text-zinc-500">{footerBranding.subSlogan}</p>
                            </div>
                            <p className="hidden md:block text-xs text-zinc-600 mt-2">{footerBranding.copyrightText}</p>
                        </div>
                    </div>

                    {/* Dynamic Columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4 md:gap-6 items-center text-center">
                            <h3 className="text-xs md:text-sm font-medium text-white">{section.title}</h3>
                            <ul className="flex flex-col gap-3 md:gap-4 items-center">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            {...(link.href.startsWith("http")
                                                ? { target: "_blank", rel: "noopener noreferrer" }
                                                : {})}
                                            className="text-sm md:text-base text-zinc-500 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <p className="col-span-3 md:hidden text-center text-xs text-zinc-600 order-last">
                        {footerBranding.copyrightText}
                    </p>
                </div>

                {/* Every service page, linked from every page */}
                <nav aria-label="Services" className="mb-[24vw] md:mb-32 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-8 text-xs md:text-sm">
                    <span className="w-full text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600 md:w-auto">What we build</span>
                    {SERVICE_PAGES.map((service) => (
                        <Link key={service.slug} href={`/services/${service.slug}`} className="text-zinc-500 transition-colors duration-200 hover:text-white">
                            {service.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Massive Bottom Text */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-end pointer-events-none">
                {reduceMotion ? (
                    <div aria-hidden className="text-[22vw] md:text-[15vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 select-none translate-y-[40%]">
                        {WORDMARK}
                    </div>
                ) : (
                    <div
                        aria-hidden
                        className="text-[22vw] md:text-[15vw] leading-[0.8] font-bold tracking-tighter select-none translate-y-[40%]"
                    >
                        {WORDMARK.split("").map((letter, i) => (
                            <WordmarkLetter key={i} letter={letter} index={i} progress={progress} />
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
};
