"use client";

import { ArrowRight } from "lucide-react";
import { useGoToContact } from "@/lib/use-go-to-contact";
import { cn } from "@/lib/utils";

/** Status chip for projects that are still being built */
export function InProgressBadge({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-300 backdrop-blur",
                className,
            )}
        >
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            In development
        </span>
    );
}

/** Takes the place of the case study while the project is still in the studio */
export function InProgressNotice({ title }: { title: string }) {
    const goToContact = useGoToContact();

    return (
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-14 text-center md:px-16 md:py-20">
            {/* Faint light from above, like a lamp over the workbench */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-1/2 left-1/2 h-full w-3/4 -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl"
            />
            <div className="relative flex flex-col items-center gap-6">
                <InProgressBadge />
                <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">
                    Still in the studio.
                </h2>
                <p className="max-w-xl text-lg font-light leading-relaxed text-zinc-400">
                    We&apos;re building {title} right now. The full story, the screens and the results will
                    be here once it ships.
                </p>
                <button
                    type="button"
                    onClick={goToContact}
                    className="group mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                    <span>Start a similar project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}
