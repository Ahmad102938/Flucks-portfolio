"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, useInView, useMotionValue } from "motion/react";
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

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef);

    // Width of ONE set of items = offset of the first item of the second set.
    // Re-measured via ResizeObserver so it stays correct once images load.
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const calculateWidth = () => {
            const first = content.children[0] as HTMLElement | undefined;
            const secondSet = content.children[items.length] as HTMLElement | undefined;
            if (!first || !secondSet) return;
            setContentWidth(secondSet.offsetLeft - first.offsetLeft);
        };

        calculateWidth();
        const ro = new ResizeObserver(calculateWidth);
        ro.observe(content);
        return () => ro.disconnect();
    }, [items]);

    // Constant pixel speed; paused while off screen, resumes from the same position
    useEffect(() => {
        if (contentWidth === 0 || !isInView) return;

        const pixelsPerSecond = 50;
        let last = performance.now();
        let animationFrameId: number;

        const animate = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;
            let next = x.get() - dt * pixelsPerSecond;
            if (next <= -contentWidth) next += contentWidth;
            x.set(next);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [x, contentWidth, isInView]);

    return (
        <div
            ref={containerRef}
            className={cn("w-full overflow-hidden", className)}
        >
            <motion.div
                ref={contentRef}
                className={cn("flex items-center w-max", itemClassName)}
                style={{ x, willChange: "transform" }}
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
