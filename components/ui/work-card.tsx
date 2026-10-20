"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { InProgressBadge } from "@/components/case-study/in-progress-notice";

interface WorkCardProps {
    imageSrc: string;
    title: string;
    category: string;
    href?: string;
    showLink?: boolean;
    /** Still being built: shows an "In development" chip and hides "Visit site" */
    inProgress?: boolean;
    /** Load the image straight away (for cards on screen at load) */
    priority?: boolean;
}

// How far the "View Project" label drifts toward the mouse, as a share of the pointer's offset
// from the card's centre. Small enough to feel magnetic rather than glued to the pointer.
const LABEL_PULL = 0.3;

const followPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    // Never let the label slide past the card's edge (it nearly fills narrow cards)
    const label = card.querySelector<HTMLElement>("[data-follow-label]");
    const maxX = label ? Math.max((rect.width - label.offsetWidth) / 2 - 16, 0) : 0;
    const maxY = label ? Math.max((rect.height - label.offsetHeight) / 2 - 16, 0) : 0;
    const clamp = (v: number, max: number) => Math.min(Math.max(v, -max), max);
    const x = clamp((event.clientX - rect.left - rect.width / 2) * LABEL_PULL, maxX);
    const y = clamp((event.clientY - rect.top - rect.height / 2) * LABEL_PULL, maxY);
    card.style.setProperty("--label-x", `${x.toFixed(1)}px`);
    card.style.setProperty("--label-y", `${y.toFixed(1)}px`);
};

const recentreLabel = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--label-x", "0px");
    event.currentTarget.style.setProperty("--label-y", "0px");
};

export function WorkCard({ imageSrc, title, category, href = "#", showLink = false, inProgress = false, priority = false, slug }: WorkCardProps & { slug?: string }) {
    const safeHref = href && href !== "#" && !href.startsWith("http") ? `https://${href}` : href;
    const internalLink = slug ? `/works/${slug}` : "#";

    return (
        <div className="group block w-full space-y-4 rounded-[2rem] focus:outline-none">
            {/* Image Container - Links to Internal Page */}
            <Link
                href={internalLink}
                aria-label={`View project: ${title}`}
                onPointerMove={followPointer}
                onPointerLeave={recentreLabel}
                className="group/img block relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-slate-900 ring-1 ring-white/10 outline-none transition-all duration-500 group-hover:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/70"
            >
                <Image
                    src={imageSrc}
                    alt={`${title}: ${category} by Flucks`}
                    fill
                    priority={priority}
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {inProgress && (
                    <InProgressBadge className="absolute left-4 top-4 z-30 border-white/20 bg-black/55 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md" />
                )}

                {/* Hover overlay: the whole card turns into a sheet of crystal-clear glass */}
                <div
                    aria-hidden
                    className="crystal-sheet pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible/img:opacity-100"
                >
                    {/* Light sweep across the glass */}
                    <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-[transform,opacity] duration-[1100ms] ease-out group-hover:translate-x-[300%] group-hover:opacity-100 motion-reduce:hidden" />

                    {/* Label and its soft shadow drift together toward the mouse (the card's own "cursor") */}
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:translate3d(var(--label-x,0px),var(--label-y,0px),0)]">
                        {/* Soft shadow behind the label only, so the glass itself stays bright */}
                        <div className="crystal-sheet__scrim absolute inset-0" />

                        <span data-follow-label="" className="relative flex items-center gap-3 font-playfair text-4xl md:text-5xl text-white font-normal italic antialiased [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible/img:translate-y-0">
                            View Project
                            {/* ↗ swings round to → as the card is hovered */}
                            <MoveUpRight
                                strokeWidth={1.75}
                                className="h-8 w-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-45 group-focus-visible/img:rotate-45"
                            />
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex items-end justify-between px-2">
                <Link href={internalLink} className="space-y-1 cursor-pointer">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400 decoration-cyan-400/0 underline-offset-4 group-hover:underline group-hover:decoration-cyan-400">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-300">{category}</p>
                </Link>

                {showLink && !inProgress && (
                    <a
                        href={safeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_20px_-10px_rgba(6,182,212,0.5)] active:scale-95"
                    >
                        <span>Visit site</span>
                        <MoveUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                )}
            </div>
        </div>
    );
}
