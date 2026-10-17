"use client";

import React, { useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const FAQS = [
    {
        q: "How do I get started with Flucks?",
        a: "Simply reach out through our contact form or book a discovery call. We’ll discuss your goals, timeline, and how we can help elevate your brand."
    },
    {
        q: "How involved do I need to be during the project?",
        a: "We believe in collaboration but respect your time. We’ll need your input during key checkpoints — strategy, design approval, and content—but we handle the heavy lifting."
    },
    {
        q: "How long does it take to build a website?",
        a: "Timelines vary by scope. A typical comprehensive website project takes 4–6 weeks from kickoff to launch, including design, development, and testing."
    },
    {
        q: "Do you provide support after the website is launched?",
        a: "Yes. We include complimentary minor updates and essential support for the first year after launch. After that, we offer flexible post-launch support packages to keep your website secure, updated, and performing at its best."
    },
    {
        q: "Do you create responsive and eCommerce websites?",
        a: "Absolutely. Mobile-first design is standard for us, and we specialize in building robust, scalable eCommerce solutions tailored to your products."
    },
    {
        q: "Do you offer AI integration services?",
        a: "Yes. We integrate AI into websites, apps, and internal systems — including chatbots, AI assistants, recommendation engines, and custom AI features tailored to your business needs."
    },
    {
        q: "What kind of AI solutions can you build?",
        a: "We build AI-powered chatbots, workflow automations, AI assistants, recommendation systems, document processing tools, and custom AI-driven products designed to solve real business problems."
    },
    {
        q: "Can we order multiple services or products at the same time?",
        a: "Yes. You can combine multiple services and products into a single project or package. We’ll help you structure a bundled solution that fits your goals, timeline, and budget."
    }
];

// Soft spring over the scroll position: rows ease into place instead of tracking the wheel 1:1
const SCROLL_SPRING = { stiffness: 140, damping: 22, mass: 0.5 };

/**
 * Scroll-linked wrapper: rises and pops in (slight overshoot) as it enters from the bottom of
 * the viewport, then lifts away, shrinks and fades as it passes up under the navbar.
 * Offsets are viewport-relative, so an opened (taller) row behaves the same as a closed one.
 */
const ScrollPop = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // 0 when the row's top touches the bottom edge, 1 once it has risen to 80% of the viewport
    const { scrollYProgress: enterRaw } = useScroll({ target: ref, offset: ["start end", "start 0.8"] });
    // 0 when the row's bottom reaches 30% of the viewport, 1 as it slips under the navbar
    const { scrollYProgress: exitRaw } = useScroll({ target: ref, offset: ["end 0.3", "end 0.08"] });
    const enter = useSpring(enterRaw, SCROLL_SPRING);
    const exit = useSpring(exitRaw, SCROLL_SPRING);

    const enterScale = useTransform(enter, [0, 0.7, 1], [0.86, 1.025, 1]);
    const exitScale = useTransform(exit, [0, 1], [1, 0.92]);
    const scale = useTransform(() => enterScale.get() * exitScale.get());
    const y = useTransform(() => (1 - enter.get()) * 48 - exit.get() * 24);
    const opacity = useTransform(() => Math.min(enter.get() * 1.6, 1) * (1 - exit.get()));

    if (reduceMotion) {
        return (
            <div ref={ref} className={className}>
                {children}
            </div>
        );
    }

    return (
        <motion.div ref={ref} className={className} style={{ scale, y, opacity, willChange: "transform, opacity" }}>
            {children}
        </motion.div>
    );
};

export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-24 flex flex-col items-center justify-center bg-black text-slate-50 relative overflow-hidden">
            {/* Background glow for ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.05)_0,_transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
                {/* Title Section */}
                <ScrollPop className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                        <span className="text-white">Frequently Asked</span>{" "}
                        <span className="font-serif italic font-light text-slate-200">Questions</span>
                    </h2>
                </ScrollPop>

                {/* FAQ List */}
                <div className="flex flex-col gap-3">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <ScrollPop key={index}>
                                <div
                                    className={cn(
                                        "border rounded-xl transition-all duration-300 bg-black/40 backdrop-blur-sm overflow-hidden group",
                                        isOpen ? "border-white/20 bg-black/80" : "border-white/5 hover:border-white/10"
                                    )}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="flex items-center justify-between w-full p-4 md:p-6 text-left"
                                    >
                                        <div className="flex items-center gap-4 md:gap-6">
                                            <span className="text-slate-500 font-mono text-sm md:text-base">
                                                {index + 1}.
                                            </span>
                                            <span className={cn(
                                                "text-sm md:text-lg font-medium transition-colors",
                                                isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
                                            )}>
                                                {faq.q}
                                            </span>
                                        </div>

                                        {/* Chevron Icon */}
                                        <div className={cn(
                                            "w-6 h-6 flex items-center justify-center rounded-full border border-white/10 text-slate-400 transition-transform duration-300",
                                            isOpen ? "rotate-180 bg-white/10 text-white" : ""
                                        )}>
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-4 md:px-6 pb-6 pl-12 md:pl-[3.5rem] pt-0">
                                                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </ScrollPop>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
