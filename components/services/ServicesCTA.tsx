"use client";

import React, { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "motion/react";
import { SERVICES_CONTENT } from "@/constants/services";
import { useGoToContact } from "@/lib/use-go-to-contact";
import { IconArrowUpRight } from "@tabler/icons-react";

const SCROLL_SPRING = { stiffness: 120, damping: 24, mass: 0.6 };

// Portions of the scroll progress each part animates over. Scrolling down, the title's words
// arrive one after another and the button follows; scrolling back up plays it in reverse, so the
// button leaves before the title. (The section ends the page, so it never scrolls off the top.)
const TITLE_RANGE: [number, number] = [0, 0.7];
const BUTTON_RANGE: [number, number] = [0.55, 1];

/** 0 → 1 over the slice [from, to] of `progress`, clamped. */
const slice = (progress: number, [from, to]: [number, number]) =>
    Math.min(Math.max((progress - from) / (to - from), 0), 1);

/** Splits a range into overlapping per-item sub-ranges so items follow each other. */
const stagger = ([from, to]: [number, number], index: number, count: number): [number, number] => {
    const span = (to - from) / (1 + (count - 1) * 0.35);
    const start = from + index * span * 0.35;
    return [start, start + span];
};

const Word = ({
    word,
    index,
    count,
    progress,
}: {
    word: string;
    index: number;
    count: number;
    progress: MotionValue<number>;
}) => {
    const range = stagger(TITLE_RANGE, index, count);

    const opacity = useTransform(() => slice(progress.get(), range));
    const y = useTransform(() => (1 - slice(progress.get(), range)) * 40);
    const filter = useTransform(() => {
        const blur = (1 - slice(progress.get(), range)) * 10;
        return blur < 0.1 ? "none" : `blur(${blur.toFixed(2)}px)`;
    });

    return (
        <motion.span style={{ opacity, y, filter }} className="inline-block will-change-transform">
            {word}
        </motion.span>
    );
};

export const ServicesCTA = () => {
    const { title, button } = SERVICES_CONTENT.cta;
    const goToContact = useGoToContact();
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();

    // 0 as the section's top enters at the bottom of the screen, 1 once it has risen to 35%
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.95", "start 0.35"] });
    const progress = useSpring(scrollYProgress, SCROLL_SPRING);

    const buttonOpacity = useTransform(() => slice(progress.get(), BUTTON_RANGE));
    const buttonY = useTransform(() => (1 - slice(progress.get(), BUTTON_RANGE)) * 36);
    const buttonScale = useTransform(() => {
        const t = slice(progress.get(), BUTTON_RANGE);
        // Small overshoot near the end of the entrance for a soft "pop"
        return t < 0.75 ? 0.85 + (t / 0.75) * 0.19 : 1.04 - ((t - 0.75) / 0.25) * 0.04;
    });

    const words = title.split(" ");

    return (
        <section
            ref={sectionRef}
            className="w-full py-32 px-6 md:px-12 bg-black border-t border-white/10 relative overflow-hidden"
        >
            {/* Background Noise / Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/textures/noise.svg')] bg-repeat mix-blend-overlay"></div>

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 leading-[1.1]">
                    {reduceMotion
                        ? title
                        : words.map((word, i) => (
                              <React.Fragment key={i}>
                                  <Word word={word} index={i} count={words.length} progress={progress} />
                                  {i < words.length - 1 && " "}
                              </React.Fragment>
                          ))}
                </h2>

                <motion.div style={reduceMotion ? undefined : { opacity: buttonOpacity, y: buttonY, scale: buttonScale }}>
                    <button
                        onClick={goToContact}
                        className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-zinc-200 text-black text-lg font-medium transition-all duration-300"
                    >
                        <span>{button}</span>
                        <IconArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
