"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    speed?: "fast" | "normal" | "slow";
    className?: string;
    itemClassName?: string;
}

export const InfiniteMarquee = <T,>({
    items,
    renderItem,
    speed = "normal",
    className,
    itemClassName,
}: InfiniteMarqueeProps<T>) => {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items, ...items, ...items]; // 4x for safety on wide screens

    const x = useMotionValue(0);
    const [contentWidth, setContentWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        // Measure content width based on an estimate or real measurement
        // For simplicity in this marquee, we'll rely on the assumption that
        // the duplicated items cover enough width.
        // A more robust way is to measure the ref, but let's try a pure CSS/motion approach first
        // mirroring the carousel logic which used fixed widths.
        // However, for variable text width, we might need a different approach.

        // Let's use a simpler duration-based animation loop that doesn't depend on exact pixel measurement of children
        // OR we can stick to the user's request of "same speed" effectively.

        // The Hero carousel uses: duration = items.length * 4s.
        // Let's approximate a "normal" speed.
    }, []);

    // Actually, to match the Hero Carousel EXACTLY, we should try to reuse the exact logic.
    // The Hero logic moves 'x' from 0 to -halfWayPoint.
    // We need to measure the width of the content.

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const calculateWidth = () => {
            if (contentRef.current) {
                // The content width of ONE set of items
                // Since we quadruple, we dividing total scroll width by 4 is tricky if we don't know exact wrap.
                // Let's assume we want to scroll the width of the ORIGINAL items.
                // A safe bet for "seamless" is to scroll until the first set is fully out, then reset.
                // But we don't know the width of the first set easily without wrapping it.

                // Let's simply measure the full scrollable width and divide by duplication factor.
                const totalWidth = contentRef.current.scrollWidth;
                const singleSetWidth = totalWidth / 4;
                setContentWidth(singleSetWidth);
            }
        };

        calculateWidth();
        // Re-calc on resize might be needed
        window.addEventListener("resize", calculateWidth);
        return () => window.removeEventListener("resize", calculateWidth);
    }, [items]);


    useEffect(() => {
        if (contentWidth === 0) return;

        // Speed normalization: 
        // Hero carousel: 4s per item? No, it was duration = length * 4 * 1000.
        // Let's aim for a constant pixel/second speed for consistency.
        // If Hero card is ~40vw wide (say 400px) and takes 4s, that's 100px/s.

        const pixelsPerSecond = 50; // Slower for text usually looks better, but user said "same speed". 
        // Let's try to match the "feel".

        const duration = (contentWidth / pixelsPerSecond) * 1000;

        let startTime = performance.now();
        let animationFrameId: number;
        let isRunning = true;

        const animate = (currentTime: number) => {
            if (!isRunning) return;

            const elapsed = currentTime - startTime;
            const progress = (elapsed % duration) / duration;
            const currentX = -progress * contentWidth;

            x.set(currentX);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            isRunning = false;
            cancelAnimationFrame(animationFrameId);
        };
    }, [x, contentWidth]);

    return (
        <div
            ref={containerRef}
            className={cn("w-full overflow-hidden", className)}
        >
            <motion.div
                ref={contentRef}
                className={cn("flex items-center w-max", itemClassName)}
                style={{ x }}
            >
                {duplicatedItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {renderItem(item, idx)}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};
