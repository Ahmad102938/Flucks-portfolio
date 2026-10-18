"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
    animate,
    motion,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "motion/react";
import type { MediaType } from "@/constants/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

type MediaProps = { type: MediaType; url: string; alt: string; sizes: string; priority?: boolean; onError: () => void };

const Media = ({ type, url, alt, sizes, priority, onError }: MediaProps) =>
    type === "video" ? (
        <video src={url} autoPlay loop muted playsInline preload="metadata" onError={onError} className="h-full w-full object-cover" />
    ) : (
        <Image src={url} alt={alt} fill sizes={sizes} priority={priority} onError={onError} className="object-cover" />
    );

/**
 * Opening shot of a case study: starts inset with rounded corners and opens up to the full
 * frame as you scroll into it, while the media drifts slowly inside (parallax).
 */
export const CaseHeroMedia = ({ type, url, alt }: { type: MediaType; url: string; alt: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const open = useSpring(useTransform(scrollYProgress, [0, 0.45], [0, 1]), { stiffness: 120, damping: 26, mass: 0.6 });
    const scale = useTransform(open, [0, 1], [0.9, 1]);
    const radius = useTransform(open, [0, 1], [48, 24]);
    const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    // A missing file shouldn't leave an empty frame at the top of the story
    const [failed, setFailed] = useState(false);
    if (failed) return null;

    return (
        <div className="relative isolate">
            {/* The shot's own colours, blurred and spilling softly onto the page around it */}
            {type === "image" && (
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.45 }}
                    transition={{ duration: 2, ease: EASE, delay: 0.6 }}
                    className="pointer-events-none absolute inset-x-[4%] -bottom-[8%] top-[12%] -z-10 blur-[90px] saturate-150"
                >
                    <Image src={url} alt="" fill sizes="320px" className="object-cover" />
                </motion.div>
            )}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
                style={reduceMotion ? undefined : { scale, borderRadius: radius }}
                className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 sm:aspect-video"
            >
                <motion.div style={reduceMotion ? undefined : { y: drift }} className="absolute -inset-y-[7%] inset-x-0">
                    <Media type={type} url={url} alt={alt} sizes="(max-width: 1280px) 100vw, 1280px" priority onError={() => setFailed(true)} />
                </motion.div>
            </motion.div>
        </div>
    );
};

/** Gallery image that unveils upward (clip) while settling from a slight zoom as it scrolls in. */
export const RevealMedia = ({
    type,
    url,
    alt,
    caption,
    ratio,
    delay = 0,
    sizes = "(max-width: 1280px) 100vw, 1280px",
    className = "",
    style,
}: {
    type: MediaType;
    url: string;
    alt: string;
    caption?: string;
    /** Width / height of the media; the frame matches it so nothing is cropped. Defaults to 16:9. */
    ratio?: number;
    delay?: number;
    sizes?: string;
    className?: string;
    style?: React.CSSProperties;
}) => {
    const [failed, setFailed] = useState(false);
    if (failed) return null;

    return (
    <figure className={className} style={style}>
        <motion.div
            initial={{ clipPath: "inset(22% 0% 0% 0% round 24px)", opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.2, ease: EASE, delay }}
            style={{ aspectRatio: ratio ?? 16 / 9 }}
            className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-inset ring-white/10 md:rounded-3xl"
        >
            <motion.div
                initial={{ scale: 1.14 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 1.6, ease: EASE, delay }}
                className="absolute inset-0"
            >
                <Media type={type} url={url} alt={alt} sizes={sizes} onError={() => setFailed(true)} />
            </motion.div>
        </motion.div>
        {caption && <figcaption className="mt-4 text-sm text-zinc-500">{caption}</figcaption>}
    </figure>
    );
};

export type RevealRowItem = { type: MediaType; url: string; alt: string; caption?: string; ratio?: number };

// Tallest a row may get, so a single phone screen doesn't fill several screens of scrolling
const ROW_MAX_HEIGHT = "min(78vh, 760px)";

/**
 * A row of gallery media at one shared height: each item's width follows its own shape, so wide
 * screenshots and phone screens sit side by side uncropped. Items rise in one after another.
 */
export const RevealRow = ({ items, className = "" }: { items: RevealRowItem[]; className?: string }) => {
    const ratios = items.map((item) => item.ratio ?? 16 / 9);
    const total = ratios.reduce((sum, r) => sum + r, 0);

    return (
        <div
            className={`mx-auto flex w-full items-start gap-3 md:gap-6 ${className}`}
            style={{ maxWidth: `calc(${total.toFixed(4)} * ${ROW_MAX_HEIGHT} + ${(items.length - 1) * 24}px)` }}
        >
            {items.map((item, i) => (
                <RevealMedia
                    key={item.url}
                    {...item}
                    ratio={ratios[i]}
                    delay={i * 0.12}
                    sizes={`(max-width: 1280px) ${Math.ceil((ratios[i] / total) * 100)}vw, ${Math.ceil((ratios[i] / total) * 1280)}px`}
                    className="min-w-0"
                    // Grow factors are scaled up because a row whose factors sum below 1 leaves space unfilled
                    style={{ flex: `${(ratios[i] * 100).toFixed(2)} 1 0%` }}
                />
            ))}
        </div>
    );
};

/** One chapter of the story: a sticky label on the left, paragraphs rising in on the right. */
export const StoryChapter = ({ index, title, paragraphs }: { index: number; title: string; paragraphs: string[] }) => (
    <section className="grid gap-6 border-t border-white/10 py-16 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 md:py-24">
        <div className="md:sticky md:top-32 md:self-start">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex items-baseline gap-4 md:flex-col md:gap-6"
            >
                <span className="font-mono text-xs text-zinc-600 md:hidden">{String(index).padStart(2, "0")}</span>
                {/* Outlined chapter number, desktop only */}
                <span
                    aria-hidden
                    className="hidden font-serif text-[8rem] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)] md:block"
                >
                    {String(index).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">{title}</h2>
            </motion.div>
        </div>
        <div className="space-y-6">
            {paragraphs.map((paragraph, i) => (
                <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                    className="text-lg font-light leading-relaxed text-zinc-300 md:text-2xl md:leading-relaxed"
                >
                    {paragraph}
                </motion.p>
            ))}
        </div>
    </section>
);

/** Project title whose letters rise out of a mask one after another. */
export const TitleReveal = ({ text, className = "" }: { text: string; className?: string }) => {
    const reduceMotion = useReducedMotion();
    let letterIndex = 0;

    return (
        <h1 aria-label={text} className={className}>
            {text.split(" ").map((word, w) => (
                <span key={w} aria-hidden className="inline-block whitespace-nowrap">
                    {word.split("").map((letter, l) => {
                        const i = letterIndex++;
                        return (
                            // Padding keeps descenders (p, g, y) inside the mask despite the tight leading
                            <span key={l} className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
                                <motion.span
                                    className="inline-block"
                                    initial={reduceMotion ? false : { y: "105%", rotate: 6 }}
                                    animate={{ y: "0%", rotate: 0 }}
                                    transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.04 }}
                                >
                                    {letter}
                                </motion.span>
                            </span>
                        );
                    })}
                    {w < text.split(" ").length - 1 && "\u00a0"}
                </span>
            ))}
        </h1>
    );
};

/** Content that fades up into place on load, after the title. */
export const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

/** Thin line along the top of the window that fills as you read down the page. */
export const ReadingProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-white/30 via-white/80 to-white"
        />
    );
};

// "10+", "100%", "3x" count up; things like "24/7" or "iOS" are shown as they are
const COUNTABLE = /^(\D*?)(\d+(?:[.,]\d+)?)([+%xXkKmM]{0,2})$/;

/** Headline number that counts up from zero the first time it scrolls into view. */
export const CountUp = ({ value, className = "" }: { value: string; className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const reduceMotion = useReducedMotion();
    const match = value.trim().match(COUNTABLE);
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        if (!match || reduceMotion) return;
        const [, prefix, number, suffix] = match;
        const target = parseFloat(number.replace(",", "."));
        const decimals = number.includes(".") || number.includes(",") ? number.split(/[.,]/)[1].length : 0;
        if (!inView) {
            setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);
            return;
        }
        const controls = animate(0, target, {
            duration: 1.6,
            ease: EASE,
            onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
        });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, value, reduceMotion]);

    return (
        <span ref={ref} className={`tabular-nums ${className}`}>
            {display}
        </span>
    );
};

const QuoteWord = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.16, 1]);
    return <motion.span style={{ opacity }}>{word} </motion.span>;
};

/** Client quote that lights up word by word as it's scrolled through. */
export const ScrollQuote = ({ quote, name, role }: { quote: string; name: string; role: string }) => {
    const ref = useRef<HTMLQuoteElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
    // Quotes are sometimes pasted with their own quotation marks; the design adds them
    const words = quote.trim().replace(/^["“”']+|["“”']+$/g, "").split(/\s+/);

    return (
        <figure className="mx-auto max-w-5xl border-t border-white/10 py-20 md:py-32">
            <span aria-hidden className="mb-6 block font-serif text-8xl leading-[0.5] text-white/20 md:text-[10rem]">
                &ldquo;
            </span>
            <blockquote ref={ref} className="font-serif text-2xl leading-snug text-white md:text-[2.75rem] md:leading-[1.25]">
                {reduceMotion
                    ? words.join(" ")
                    : words.map((word, i) => (
                          <QuoteWord key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
                      ))}
            </blockquote>
            {name.trim() && (
                <figcaption className="mt-12 flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-serif text-lg text-white">
                        {name.trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="flex flex-col text-sm">
                        <span className="text-white">{name}</span>
                        {role.trim() && <span className="text-zinc-500">{role.replace(/[:\s]+$/, "")}</span>}
                    </span>
                </figcaption>
            )}
        </figure>
    );
};

/**
 * Hand-off to the next project: its cover opens from an inset frame to full width on hover (always open on touch
 * screens) and drifts with scroll, under a large title.
 */
export const NextProject = ({ href, title, category, image }: { href: string; title: string; category: string; image: string }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const drift = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <Link ref={ref} href={href} data-cursor="Next" className="group block">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <span className="mb-4 block text-xs uppercase tracking-[0.25em] text-zinc-500 transition-colors group-hover:text-zinc-300">
                        Next project
                    </span>
                    <span className="block font-serif text-5xl leading-[0.95] tracking-tight transition-[font-style] duration-500 group-hover:italic md:text-8xl lg:text-9xl">
                        {title}
                    </span>
                    <span className="mt-4 block text-sm text-zinc-500">{category}</span>
                </div>
                <span className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black md:h-20 md:w-20">
                    <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
                </span>
            </div>
            {/* Timing lives in globals.css (.next-reveal): slow open, gentler close, hover intent */}
            <div className="next-reveal relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-900 md:aspect-[21/9]">
                <motion.div style={reduceMotion ? undefined : { y: drift }} className="absolute -inset-y-[10%] inset-x-0">
                    <div className="next-reveal__image absolute inset-0">
                        <Image src={image} alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
                    </div>
                </motion.div>
                <div aria-hidden className="next-reveal__veil pointer-events-none absolute inset-0 bg-black" />
            </div>
        </Link>
    );
};
