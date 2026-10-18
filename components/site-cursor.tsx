"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only signature cursor. Over any element with data-cursor="<label>" the native cursor
 * hides and a glass bubble carrying the label grows in and trails the pointer; everywhere else
 * nothing is drawn. Rendered once in the root layout.
 */
export const SiteCursor = () => {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const bubble = bubbleRef.current;
        const label = labelRef.current;
        if (!bubble || !label) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const root = document.documentElement;
        root.setAttribute("data-custom-cursor", "");
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const target = { x: -200, y: -200 };
        const current = { x: -200, y: -200 };
        let active: Element | null = null;
        let raf = 0;
        let hasPosition = false;

        const render = () => {
            // Ease toward the pointer so the bubble trails it softly
            const ease = smooth ? 0.2 : 1;
            current.x += (target.x - current.x) * ease;
            current.y += (target.y - current.y) * ease;
            bubble.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
            const settled = Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1;
            raf = settled ? 0 : requestAnimationFrame(render);
        };
        const kick = () => {
            if (!raf) raf = requestAnimationFrame(render);
        };

        const setActive = (el: Element | null) => {
            if (el === active) return;
            active = el;
            if (el) {
                label.textContent = el.getAttribute("data-cursor") || "View";
                bubble.setAttribute("data-active", "");
            } else {
                bubble.removeAttribute("data-active");
            }
        };

        const hitTest = () => {
            if (!hasPosition) return;
            const el = document.elementFromPoint(target.x, target.y);
            setActive(el?.closest("[data-cursor]") ?? null);
        };

        const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            target.x = event.clientX;
            target.y = event.clientY;
            if (!hasPosition) {
                // First sighting: start at the pointer instead of flying in from the corner
                current.x = target.x;
                current.y = target.y;
                hasPosition = true;
            }
            setActive((event.target as Element | null)?.closest?.("[data-cursor]") ?? null);
            kick();
        };
        const onLeaveWindow = (event: MouseEvent) => {
            if (!event.relatedTarget) setActive(null);
        };
        // Content moves under a still pointer while scrolling, and after page changes
        const onScroll = () => hitTest();

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("mouseout", onLeaveWindow);
        const recheck = window.setInterval(hitTest, 400);

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("mouseout", onLeaveWindow);
            window.clearInterval(recheck);
            cancelAnimationFrame(raf);
            root.removeAttribute("data-custom-cursor");
        };
    }, []);

    return (
        <div ref={bubbleRef} aria-hidden className="site-cursor">
            <div className="site-cursor__bubble">
                <span ref={labelRef} className="site-cursor__label">View</span>
            </div>
        </div>
    );
};
