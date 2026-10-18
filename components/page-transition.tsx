"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLenis, liftCurtain, showCurtain } from "@/lib/scroll";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Site-wide page transition. Clicking an internal link fades the black curtain in, navigates
 * behind it, then slides the curtain up to reveal the new page. Rendered once in the root layout.
 *
 * Left alone: modified clicks, new-tab/download links, other sites, same-page and hash links,
 * links that opt out with data-no-transition, and "?scroll=" links (lib/scroll.ts goToContact
 * runs its own arrival). Back/forward navigation is instant, as browsers expect.
 */
export const PageTransition = () => {
    const router = useRouter();
    const pathname = usePathname();
    const pendingRef = useRef(false);
    const fallbackRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (pendingRef.current || prefersReducedMotion()) return;

            const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!anchor || anchor.hasAttribute("download") || anchor.hasAttribute("data-no-transition")) return;
            if (anchor.target && anchor.target !== "_self") return;

            const url = new URL(anchor.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname) return;
            if (url.searchParams.has("scroll")) return;

            // Runs in the capture phase, before next/link's handler, which then sees
            // defaultPrevented and leaves the navigation to us
            event.preventDefault();
            pendingRef.current = true;
            const href = url.pathname + url.search + url.hash;
            router.prefetch(href);
            void showCurtain().then(() => router.push(href));
            // If the navigation never lands, accept clicks again (the curtain has its own failsafe)
            clearTimeout(fallbackRef.current);
            fallbackRef.current = setTimeout(() => (pendingRef.current = false), 5000);
        };

        document.addEventListener("click", onClick, { capture: true });
        return () => document.removeEventListener("click", onClick, { capture: true });
    }, [router]);

    // The new route has rendered: start it at the top and lift the curtain
    useEffect(() => {
        if (!pendingRef.current) return;
        pendingRef.current = false;
        clearTimeout(fallbackRef.current);
        if (!window.location.hash) {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
            else window.scrollTo(0, 0);
        }
        let raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(liftCurtain);
        });
        return () => cancelAnimationFrame(raf);
    }, [pathname]);

    return null;
};
