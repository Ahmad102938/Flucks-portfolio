import type Lenis from "lenis";

// Shared Lenis instance, registered by <SmoothScroll /> so programmatic scrolls
// go through the same loop as wheel/touch scrolling instead of fighting it.
let lenisInstance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
    lenisInstance = lenis;
};

export const getLenis = () => lenisInstance;

export const smoothScrollTo = (elementId: string) => {
    const target = document.getElementById(elementId);
    if (!target) return;

    if (lenisInstance) {
        const distance = Math.abs(target.getBoundingClientRect().top);
        // Scale duration with distance so short hops feel snappy and long ones don't drag.
        const duration = Math.min(Math.max(distance / 1500, 0.8), 2);
        lenisInstance.scrollTo(target, { duration });
        return;
    }

    // Fallback when Lenis is disabled (e.g. prefers-reduced-motion)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};
