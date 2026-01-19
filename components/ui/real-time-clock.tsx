"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type ClockRingType = "years" | "seconds" | "minutes" | "hours" | "days" | "months" | "day-names";

interface ClockRingConfig {
    type: ClockRingType;
    radius: number; // radius in px (half of diameter)
    fontSize: number;
    color: string;
}

// Explicit radii optimized for spacing to prevent overlap
const RINGS: ClockRingConfig[] = [
    { type: "years", radius: 190, fontSize: 12, color: "#e2e8f0" },   // slate-200
    { type: "seconds", radius: 165, fontSize: 10, color: "#cbd5e1" },  // slate-300
    { type: "minutes", radius: 140, fontSize: 12, color: "#94a3b8" },  // slate-400
    { type: "hours", radius: 115, fontSize: 12, color: "#94a3b8" },   // slate-400
    { type: "days", radius: 90, fontSize: 12, color: "#cbd5e1" },     // slate-300
    { type: "months", radius: 65, fontSize: 12, color: "#e2e8f0" },   // slate-200
    { type: "day-names", radius: 40, fontSize: 12, color: "#f1f5f9" }, // slate-100
];

export const RealTimeClock = ({ className }: { className?: string }) => {
    const [time, setTime] = useState(new Date());
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const update = () => {
            setTime(new Date());
            frameRef.current = requestAnimationFrame(update);
        };
        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    return (
        <div className={cn("relative flex items-center justify-center bg-slate-950", className)}>
            {/* Highlight Bar (Right Side Only) */}
            <div className="absolute top-1/2 left-[calc(50%-20px)] right-0 -translate-y-1/2 h-5 z-10">
                {/* The blue bar background - pill shaped left */}
                <div className="absolute inset-y-0 left-0 w-[210px] min-[1100px]:w-[250px] bg-white border-y border-white/50 rounded-l-full shadow-[0_0_25px_rgba(255,255,255,0.5)]" />

                {/* Flag Icon (Left end) - Centered on axis */}
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,255,255,0.4)] overflow-hidden">
                    <span className="text-2xl leading-none relative top-[1px]">🇮🇳</span>
                </div>

                {/* Static Colons for Time Separation */}
                {/* Offsets based on ring radii + 20px centering offset. Colon 1: 128+20=148. Colon 2: 153+20=173 */}
                <span className="absolute left-[148px] top-1/2 -translate-y-[55%] text-black font-bold text-sm">:</span>
                <span className="absolute left-[173px] top-1/2 -translate-y-[55%] text-black font-bold text-sm">:</span>
            </div>

            {/* Container for rings */}
            <div className="relative z-20 w-full h-full flex items-center justify-center origin-center">
                {RINGS.map((ring) => (
                    <ClockRing key={ring.type} config={ring} time={time} />
                ))}
            </div>
        </div>
    );
};

const ClockRing = ({ config, time }: { config: ClockRingConfig; time: Date }) => {
    const { type, radius, fontSize, color } = config;

    // Generate values using useMemo to avoid regenerating every frame
    const { values, total, stepAngle } = useMemo(() => {
        let vals: (string | number)[] = [];
        const locale = "en-US";

        if (config.type === "seconds" || config.type === "minutes") {
            vals = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
        } else if (config.type === "hours") {
            vals = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
        } else if (config.type === "days") {
            // Static 31 for simplicity as per code pen generic
            vals = Array.from({ length: 31 }, (_, i) => i + 1);
        } else if (config.type === "months") {
            vals = Array.from({ length: 12 }, (_, i) =>
                new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(2021, i))
            );
        } else if (config.type === "day-names") {
            vals = Array.from({ length: 7 }, (_, i) =>
                new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2021, 0, i + 3)) // i+3 aligns to Sun? 2021-01-03 was Sunday
            );
        } else if (config.type === "years") {
            vals = Array.from({ length: 50 }, (_, i) => String(2020 + i).slice(-2));
        }

        return { values: vals, total: vals.length, stepAngle: 360 / vals.length };
    }, [config.type]);

    // Calculate Target Angle
    // CodePen logic: targetAngle = (360 / total) * currentValue
    // Then uses shortest path logic.
    // Wait, CodePen rotates the *face* by NEGATIVE this amount?
    // "clockFace.style.transform = `rotate(${newAngle * -1}deg)`"
    // Yes.

    let currentValue = 0;
    if (config.type === "seconds") currentValue = time.getSeconds();
    else if (config.type === "minutes") currentValue = time.getMinutes();
    else if (config.type === "hours") currentValue = time.getHours();
    else if (config.type === "days") currentValue = time.getDate() - 1; // 0-indexed for array
    else if (config.type === "months") currentValue = time.getMonth();
    else if (config.type === "years") currentValue = time.getFullYear() - 2020;
    else if (config.type === "day-names") currentValue = time.getDay();

    const targetAngle = stepAngle * currentValue;
    const lastAngle = useRef(0);

    // Shortest path logic from snippet
    const delta = targetAngle - lastAngle.current;
    const shortestDelta = ((delta + 540) % 360) - 180;
    const newAngle = lastAngle.current + shortestDelta;
    lastAngle.current = newAngle;

    return (
        <div
            className={cn(
                "absolute rounded-full",
                config.type === "years" && "hidden min-[1100px]:block"
            )}
            style={{
                width: radius * 2,
                height: radius * 2,
                transform: `rotate(${newAngle * -1}deg)`,
                // Add transition for smoothness unless it's seconds which update frequently?
                // Actually CodePen provided uses 300ms transition.
                transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            {values.map((val, i) => {
                const angleDeg = i * stepAngle;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = radius + radius * Math.cos(angleRad);
                const y = radius + radius * Math.sin(angleRad);

                // Highlight active logic
                const isActive = i === currentValue;

                return (
                    <div
                        key={i}
                        className={cn(
                            "absolute flex items-center justify-center font-medium transition-all duration-300",
                            isActive ? "text-black opacity-100 scale-110" : "opacity-70 scale-90"
                        )}
                        style={{
                            left: x,
                            top: y,
                            width: 40,
                            height: 40,
                            transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`, // radial rotation
                            fontSize: fontSize,
                            color: isActive ? 'black' : color,
                            fontWeight: isActive ? 600 : 400
                        }}
                    >
                        {val}
                    </div>
                );
            })}
        </div>
    );
}
