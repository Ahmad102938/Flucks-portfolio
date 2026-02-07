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

export function WorkCard({ imageSrc, title, category, href = "#", showLink = false }: WorkCardProps) {
    const safeHref = href && href !== "#" && !href.startsWith("http") ? `https://${href}` : href;
    const isExternal = safeHref.startsWith("http");

    return (
        <Link
            href={safeHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group block w-full space-y-4 rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-slate-900 ring-1 ring-white/10 transition-all duration-500 group-hover:ring-white/20">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="flex items-end justify-between px-2">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-slate-400">{category}</p>
                </div>

                {showLink && (
                    <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:shadow-[0_0_20px_-10px_rgba(6,182,212,0.5)] group-active:scale-95">
                        <span>Visit site</span>
                        <MoveUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                )}
            </div>
        </Link>
    );
}
