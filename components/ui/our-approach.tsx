"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThreeDMarquee } from "./3d-marquee";

const ApproachCard = ({
    title,
    description,
    children,
    className = "",
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 md:p-10",
                className
            )}
        >
            <div className="relative z-10 mb-8 max-w-lg">
                <h3 className="text-2xl font-semibold text-slate-50 md:text-4xl">
                    {title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
                    {description}
                </p>
            </div>
            <div className="relative flex-grow flex flex-col justify-end">{children}</div>

            {/* Hover glow effect */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
            </div>
        </motion.div>
    );
};

// Component for Discovery First with multiple layered images
const DiscoveryFirstCard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax transforms for different layers
    // Middle layer moves slightly
    const xMiddle = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    // Back layers move faster/slower to create depth
    const xBackLeft = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
    const xBackRight = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

    return (
        <ApproachCard
            title="Discovery First"
            description="We begin by defining clear goals, understanding your audience, and aligning with your brand voice to set a strong foundation."
            className="min-h-[500px] md:min-h-[600px] overflow-hidden"
        >
            <div ref={containerRef} className="relative h-[300px] md:h-[400px] w-full mt-auto">
                {/* Background Layer Left */}
                <motion.div style={{ x: xBackLeft }} className="absolute bottom-10 -left-20 w-[60%] h-[80%] opacity-40 grayscale hover:grayscale-0 transition-all duration-500 z-0">
                    <Image
                        src="/assets/ourApproach/discorvery/aset10.webp"
                        alt="Discovery Wireframe"
                        fill
                        className="object-contain object-bottom"
                    />
                </motion.div>

                {/* Background Layer Right */}
                <motion.div style={{ x: xBackRight }} className="absolute bottom-20 -right-20 w-[60%] h-[80%] opacity-40 grayscale hover:grayscale-0 transition-all duration-500 z-0">
                    <Image
                        src="/assets/ourApproach/discorvery/aset11.webp"
                        alt="Discovery Data"
                        fill
                        className="object-contain object-bottom"
                    />
                </motion.div>

                {/* Main Layer */}
                <motion.div style={{ x: xMiddle }} className="absolute bottom-0 left-0 right-0 h-full z-10">
                    <div className="relative h-full w-full transform transition-transform duration-500 hover:scale-[1.02]">
                        <Image
                            src="/assets/ourApproach/discorvery/aset8.webp"
                            alt="Discovery Process"
                            fill
                            className="object-contain object-bottom drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </ApproachCard>
    );
}

// Component for Mobile First with simple scroll shift
const MobileFirstCard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax effect for the video panning
    const xInfo = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 min-h-[500px] md:min-h-[600px]"
        >
            {/* Full Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div style={{ x: xInfo }} className="h-full w-[120%] -ml-[10%] relative">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    >
                        <source src="/assets/ourApproach/mobile/mobilefirst.mp4" type="video/mp4" />
                    </video>
                </motion.div>
                {/* Overlay for text readability - stronger gradient at top for text and bottom for style */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/40" />
            </div>

            {/* Content on top */}
            <div className="relative z-10 p-6 md:p-10 pointer-events-none">
                <div className="max-w-lg">
                    <h3 className="text-2xl font-semibold text-slate-50 md:text-4xl">
                        Mobile-First Design
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base font-medium drop-shadow-md">
                        Every layout is designed for seamless mobile-first experiences, ensuring performance across all devices.
                    </p>
                </div>
            </div>

            {/* Hover glow effect (shared) */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
            </div>
        </motion.div>
    )
}

// Component for Conversion Driven with scroll shift
const ConversionCard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const xChart = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 min-h-[500px] md:min-h-[600px]"
        >
            {/* Full Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    style={{ x: xChart }}
                    className="relative w-[120%] h-full left-[0%]"
                >
                    <Image
                        src="/assets/ourApproach/statistic.webp"
                        alt="Conversion Statistics"
                        fill
                        className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    />
                </motion.div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/40" />
            </div>

            {/* Content on top */}
            <div className="relative z-10 p-6 md:p-10 pointer-events-none">
                <div className="max-w-lg">
                    <h3 className="text-2xl font-semibold text-slate-50 md:text-4xl">
                        Conversion Driven
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base font-medium drop-shadow-md">
                        Websites built with strategy, designed to engage audiences, and crafted to turn visitors into customers.
                    </p>
                </div>
            </div>

            {/* Hover glow effect (shared) */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
            </div>
        </motion.div>
    )
}

// Component for Pixel Perfect with 3D Marquee
const PixelPerfectCard = () => {
    // Array of images for the marquee - using specific pixelperfect assets
    const baseImages = [
        "/assets/ourApproach/pixelperfect/ast1.webp",
        "/assets/ourApproach/pixelperfect/ast2.webp",
        "/assets/ourApproach/pixelperfect/ast3.webp",
        "/assets/ourApproach/pixelperfect/ast4.webp",
        "/assets/ourApproach/pixelperfect/ast5.webp",
    ];
    // Duplicate for density - need heavily populated grid to cover the large container
    const images = [...baseImages, ...baseImages, ...baseImages, ...baseImages, ...baseImages, ...baseImages];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 min-h-[500px] md:min-h-[600px] h-full"
        >
            {/* 3D Marquee Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <ThreeDMarquee images={images} className="h-full w-full opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/80" />
                {/* Side fades for better integration */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent" />
            </div>

            {/* Content Centered */}
            <div className="relative z-10 p-6 md:p-10 text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold text-slate-50 md:text-5xl tracking-tight">
                    Pixel-Perfect Development
                </h3>
                <p className="mt-6 text-base leading-relaxed text-slate-300 md:text-lg">
                    Designed and developed with pixel-perfect precision, delivering high performance and easy updates.
                </p>
                <div className="mt-8 flex justify-center">
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                </div>
            </div>

            {/* Hover glow effect */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
            </div>
        </motion.div>
    );
}

export const OurApproach = () => {
    return (
        <section className="py-20 md:py-32">
            <div className="mb-16 md:mb-24">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-6xl">
                    Our Approach
                </h2>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-5">
                {/* 1. Discovery First (Wide) */}
                <div className="md:col-span-3">
                    <DiscoveryFirstCard />
                </div>

                {/* 2. Mobile-First Design (Narrow) */}
                <div className="md:col-span-2">
                    <MobileFirstCard />
                </div>

                {/* 3. Conversion Driven (Narrow) */}
                <div className="md:col-span-2">
                    <ConversionCard />
                </div>

                {/* 4. Pixel-Perfect Development (Wide) */}
                <div className="md:col-span-3">
                    <PixelPerfectCard />
                </div>

                {/* 5. Seamless CMS Launch (Wide) */}
                <div className="md:col-span-3">
                    <ApproachCard
                        title="Seamless CMS Launch"
                        description="Launched seamlessly with a powerful CMS, allowing you to update and manage your website content effortlessly after going live."
                        className="min-h-[500px] md:min-h-[600px] h-full"
                    >
                        <div className="relative h-full w-full flex flex-col gap-3 pt-10 px-4 md:px-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-sm transform transition-all duration-300 hover:bg-slate-800/80 hover:scale-[1.02] cursor-default">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2.5 w-24 bg-slate-700/50 rounded mb-2" />
                                        <div className="h-2 w-32 bg-slate-800/50 rounded" />
                                    </div>
                                    <div className="h-6 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 flex items-center justify-center">
                                        Published
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ApproachCard>
                </div>

                {/* 6. Future-Ready (Narrow) */}
                <div className="md:col-span-2">
                    <ApproachCard
                        title="Future-Ready"
                        description="Websites designed to be scalable and future-ready, adapting as your business grows."
                        className="min-h-[500px] md:min-h-[600px] h-full"
                    >
                        <div className="relative h-full w-full flex items-center justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5 bg-slate-900/30 flex items-center justify-center group-hover:bg-slate-900/50 transition-colors duration-500">
                                {/* Clock face ticks */}
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-1 h-3 bg-slate-700 rounded-full"
                                        style={{
                                            transform: `rotate(${i * 30}deg) translateY(-110px)`,
                                            transformOrigin: "50% 120px"
                                        }}
                                    />
                                ))}

                                {/* Hour Hand */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                                    className="absolute w-1.5 h-20 bg-slate-400 rounded-full origin-bottom top-[40px]"
                                />

                                {/* Minute Hand */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    className="absolute w-1 h-32 bg-cyan-400/80 rounded-full origin-bottom top-[-8px] shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                />

                                {/* Center dot */}
                                <div className="absolute w-4 h-4 bg-white rounded-full shadow-lg z-10" />
                            </div>
                        </div>
                    </ApproachCard>
                </div>
            </div>
        </section>
    );
};
