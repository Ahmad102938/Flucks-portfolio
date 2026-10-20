"use client";

import React, { useId, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-10% 0px" } as const;

/** Headline whose words rise out of a mask one after another. */
export const HeadlineReveal = ({ text, className = "" }: { text: string; className?: string }) => {
    const words = text.split(" ");
    return (
        <h1 className={className}>
            {words.map((word, i) => (
                <React.Fragment key={i}>
                    {/* Padding keeps descenders inside the mask despite the tight leading */}
                    <span className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                        {/* CSS so the headline plays from first paint, before JavaScript loads */}
                        <span className="enter-mask inline-block" style={{ "--enter-delay": `${0.15 + i * 0.06}s` } as React.CSSProperties}>
                            {word}
                        </span>
                    </span>
                    {i < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </h1>
    );
};

/** Fades and rises into place the first time it scrolls into view. */
export const Reveal = ({
    children,
    delay = 0,
    className = "",
    as = "div",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: "div" | "section" | "h2" | "p";
}) => {
    const Component = motion[as];
    return (
        <Component
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE, delay }}
            className={className}
        >
            {children}
        </Component>
    );
};

const listVariants: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.08 } } };
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 36 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** A list whose items rise in one after another as it scrolls into view. */
export const StaggerList = ({ children, className = "", as = "ul" }: { children: React.ReactNode; className?: string; as?: "ul" | "ol" }) => {
    const Component = motion[as];
    return (
        <Component initial="hidden" whileInView="shown" viewport={VIEWPORT} variants={listVariants} className={className}>
            {children}
        </Component>
    );
};

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.li variants={itemVariants} className={className}>
        {children}
    </motion.li>
);

/** Hairline that draws itself from left to right as it scrolls into view. */
export const DrawLine = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
    <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE, delay }}
        className={cn("block h-px origin-left bg-white/15", className)}
    />
);

/**
 * FAQ list that opens one answer at a time with an eased height transition. Answers stay in the
 * page's HTML while closed, so search engines still read them.
 */
export const FaqAccordion = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
    const [open, setOpen] = useState<number | null>(null);
    const baseId = useId();

    return (
        <StaggerList className="border-b border-white/10">
            {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-panel-${i}`;
                const buttonId = `${baseId}-button-${i}`;
                return (
                    <StaggerItem key={faq.question} className="border-t border-white/10">
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="group flex w-full items-start justify-between gap-6 py-6 text-left text-lg text-white outline-none md:py-7 md:text-xl"
                            >
                                <span
                                    className={cn(
                                        "transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-focus-visible:underline",
                                        isOpen ? "text-white" : "text-zinc-200",
                                    )}
                                >
                                    {faq.question}
                                </span>
                                <span
                                    className={cn(
                                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                        isOpen
                                            ? "rotate-[135deg] border-white bg-white text-black"
                                            : "border-white/15 text-zinc-400 group-hover:border-white/40 group-hover:text-white",
                                    )}
                                >
                                    <Plus className="h-4 w-4" strokeWidth={1.75} />
                                </span>
                            </button>
                        </h3>
                        {/* Grid rows 0fr -> 1fr animates to the answer's natural height without measuring it */}
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={cn(
                                "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none",
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                            )}
                        >
                            <div className="overflow-hidden">
                                <p
                                    className={cn(
                                        "max-w-3xl pb-7 pr-12 leading-relaxed text-zinc-400 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-lg",
                                        isOpen ? "translate-y-0 opacity-100 blur-0 delay-150" : "-translate-y-2 opacity-0 blur-[2px]",
                                    )}
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </StaggerItem>
                );
            })}
        </StaggerList>
    );
};
