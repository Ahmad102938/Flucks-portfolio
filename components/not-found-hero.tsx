"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

/**
 * 404 hero: an outlined "404" with a soft spotlight that reveals a lit copy of the numbers.
 * The light follows the mouse; on touch screens (or before the mouse moves) it drifts on its own.
 */
export const NotFoundHero = () => {
    const stageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        let raf = 0;
        let target = { x: 50, y: 50 };
        const current = { x: 50, y: 50 };

        const onMove = (event: PointerEvent) => {
            const rect = stage.getBoundingClientRect();
            target = {
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
            };
            stage.dataset.pointer = "";
            if (!raf) raf = requestAnimationFrame(tick);
        };
        // Ease toward the pointer so the light trails it softly instead of snapping
        const tick = () => {
            current.x += (target.x - current.x) * 0.12;
            current.y += (target.y - current.y) * 0.12;
            stage.style.setProperty("--spot-x", `${current.x.toFixed(2)}%`);
            stage.style.setProperty("--spot-y", `${current.y.toFixed(2)}%`);
            const settled = Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
            raf = settled ? 0 : requestAnimationFrame(tick);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-32 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.svg')] bg-repeat opacity-[0.04] mix-blend-overlay"></div>

            <div ref={stageRef} className="not-found-stage relative select-none" aria-hidden="true">
                <span className="not-found-digits not-found-digits--outline">404</span>
                <span className="not-found-digits not-found-digits--lit">404</span>
            </div>

            <div className="relative z-10 -mt-[1vw] flex flex-col items-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <span className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    Error 404 / Page not found
                </span>
                <h1 className="text-3xl font-medium tracking-tight text-white md:text-5xl">This page didn&apos;t ship.</h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
                    It may have moved, or it never made it out of design review. Everything else is right where
                    you left it.
                </p>

                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-colors duration-300 hover:bg-zinc-200"
                    >
                        Back to home
                        <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/works"
                        className="inline-flex items-center rounded-full border border-white/15 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.04]"
                    >
                        See our work
                    </Link>
                </div>
            </div>
        </section>
    );
};
