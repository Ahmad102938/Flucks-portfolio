"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

interface WorkCardProps {
    imageSrc: string;
    title: string;
    category: string;
    href?: string;
    showLink?: boolean;
}

export function WorkCard({ imageSrc, title, category, href = "#", showLink = false, slug }: WorkCardProps & { slug?: string }) {
    const safeHref = href && href !== "#" && !href.startsWith("http") ? `https://${href}` : href;
    const internalLink = slug ? `/works/${slug}` : "#";

    return (
        <div className="group block w-full space-y-4 rounded-[2rem] focus:outline-none">
            {/* Image Container - Links to Internal Page */}
            <Link href={internalLink} className="block relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-slate-900 ring-1 ring-white/10 transition-all duration-500 group-hover:ring-white/20">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-black/40 backdrop-blur-sm">
                    <span className="font-serif text-3xl md:text-4xl text-white font-medium tracking-wide translate-y-4 transition-transform duration-500 group-hover:translate-y-0 italic">
                        View Project
                    </span>
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

                {showLink && (
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
