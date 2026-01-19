"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

interface WorkCardProps {
    imageSrc: string;
    title: string;
    category: string;
    href?: string;
}

export function WorkCard({ imageSrc, title, category, href = "#" }: WorkCardProps) {
    return (
        <Link href={href} className="group block w-full space-y-4">
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-slate-900">
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

                <div className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 group-hover:text-cyan-400">
                    <span>Visit site</span>
                    <MoveUpRight className="h-4 w-4" />
                </div>
            </div>
        </Link>
    );
}
