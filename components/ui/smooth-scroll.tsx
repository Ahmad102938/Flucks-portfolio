"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame, type FrameData } from "motion/react";
import { setLenis } from "@/lib/scroll";

export const SmoothScroll = () => {
    useEffect(() => {
        // Respect the OS setting: native scrolling only
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Drive Lenis from motion's frame loop so scroll-linked animations
        // read the scroll position in the same frame (no second rAF loop).
        const update = (data: FrameData) => lenis.raf(data.timestamp);
        frame.update(update, true);
        setLenis(lenis);

        return () => {
            cancelFrame(update);
            setLenis(null);
            lenis.destroy();
        };
    }, []);

    return null;
};
