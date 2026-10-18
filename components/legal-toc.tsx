"use client";

import React, { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/scroll";

type TocItem = { id: string; heading: string };

/** Sticky contents list for the legal pages: glides to a section and highlights the one being read. */
export const LegalToc = ({ items }: { items: TocItem[] }) => {
    const [activeId, setActiveId] = useState(items[0]?.id);

    useEffect(() => {
        const sections = items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);
        if (sections.length === 0) return;

        // A section counts as "being read" while it crosses a band just below the navbar
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) setActiveId(visible[0].target.id);
            },
            { rootMargin: "-20% 0px -70% 0px" },
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [items]);

    return (
        <nav aria-label="On this page">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">On this page</p>
            <ol className="flex flex-col gap-1 border-l border-white/10">
                {items.map((item, idx) => {
                    const active = item.id === activeId;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(event) => {
                                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                                    event.preventDefault();
                                    smoothScrollTo(item.id);
                                    history.replaceState(history.state, "", `#${item.id}`);
                                }}
                                aria-current={active ? "location" : undefined}
                                className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-300 ${
                                    active
                                        ? "border-white text-white"
                                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                                }`}
                            >
                                <span className="font-mono text-xs leading-5 text-zinc-600">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span>{item.heading}</span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
