"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/scroll";

export type HomeSection = { id: string; label: string };

// A section counts as current once its top passes this far down the window
const ACTIVE_LINE = 0.4;

/**
 * Slim index on the right edge of the home page (desktop only): a tick per section, the current
 * one longer and lit with its name beside it. Hovering the rail reveals every name; clicking glides
 * to that section. It appears once you've scrolled past the hero and steps aside for the footer.
 */
export function SectionIndex({ sections }: { sections: HomeSection[] }) {
    const [active, setActive] = useState(0);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * ACTIVE_LINE;
            let current = 0;
            sections.forEach((section, i) => {
                const el = document.getElementById(section.id);
                if (el && el.getBoundingClientRect().top <= line) current = i;
            });
            setActive(current);

            const footer = document.querySelector("footer");
            const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
            setShown(window.scrollY > window.innerHeight * 0.6 && !footerInView);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [sections]);

    return (
        <nav
            aria-label="Page sections"
            className={cn(
                "group/index fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block xl:right-8",
                shown ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0",
            )}
        >
            <ol className="flex flex-col items-end gap-1">
                {sections.map((section, i) => {
                    const isActive = i === active;
                    return (
                        <li key={section.id}>
                            <button
                                type="button"
                                onClick={() => smoothScrollTo(section.id)}
                                aria-current={isActive ? "true" : undefined}
                                className="group/item flex items-center gap-3 py-1.5 outline-none"
                            >
                                <span
                                    className={cn(
                                        "text-[10px] font-medium uppercase tracking-[0.25em] [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                        isActive
                                            ? "translate-x-0 text-white opacity-100"
                                            : "translate-x-2 text-zinc-500 opacity-0 group-hover/index:translate-x-0 group-hover/index:opacity-100 group-hover/item:text-zinc-200 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100",
                                    )}
                                >
                                    {section.label}
                                </span>
                                <span
                                    className={cn(
                                        "h-px rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                        isActive
                                            ? "w-8 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                            : "w-3 bg-white/30 group-hover/item:w-5 group-hover/item:bg-white/70",
                                    )}
                                />
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
