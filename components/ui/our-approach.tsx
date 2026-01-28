"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThreeDMarquee } from "./3d-marquee";
import { RealTimeClock } from "./real-time-clock";

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
                "group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black p-6 md:p-10",
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
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black min-h-[500px] md:min-h-[600px]"
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
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black min-h-[500px] md:min-h-[600px]"
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
                        Your Application will be built with strategy, designed to engage audiences, and crafted to turn visitors into customers.
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
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black min-h-[500px] md:min-h-[600px] h-full"
        >
            {/* 3D Marquee Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <ThreeDMarquee images={images} className="h-full w-full opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />
                {/* Side fades for better integration */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
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
                        title="Recent Events & Works"
                        description="Stay updated with our latest projects, events, and milestones as we continue to push boundaries."
                        className="min-h-[500px] md:min-h-[600px] h-full"
                    >
                        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
                                        <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeOpacity="0.1" className="text-slate-500" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                            </svg>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                            />
                        </div>
                        <div className="relative z-10 h-full w-full flex flex-col pt-8 px-6 md:px-10">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <div className="col-span-6 md:col-span-7 pl-2">Title</div>
                                <div className="col-span-4 md:col-span-3">Date</div>
                                <div className="col-span-2 text-right pr-2">Image</div>
                            </div>

                            {/* Table Body */}
                            <div className="flex flex-col">
                                {[
                                    { title: "Complited rental management system for Urban Guest", date: "05 January 2026", img: "aset.webp" },
                                    { title: "Complited real estate project with Urban Guest", date: "17 Dec 2025", img: "aset2.webp" },
                                    { title: "Complited eCommerce project with react-native", date: "18 October 2025", img: "aset3.webp" },
                                    { title: "Created MCP server for Notes Application", date: "25 July 2025", img: "aset5.webp" },
                                    { title: "Complited AI podcast automation with Langchain", date: "10 June 2025", img: "aset6.webp" },
                                ].map((item, i) => (
                                    <div key={i} className="group/row grid grid-cols-12 gap-4 py-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors duration-300 rounded-lg px-2 -mx-2">
                                        {/* Title Column */}
                                        <div className="col-span-6 md:col-span-7 flex items-center gap-3 overflow-hidden">
                                            <div className="shrink-0 text-slate-400 group-hover/row:text-slate-200 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-slate-300 truncate group-hover/row:text-white transition-colors">
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* Date Column */}
                                        <div className="col-span-4 md:col-span-3 text-xs md:text-sm text-slate-500 group-hover/row:text-slate-400 transition-colors">
                                            {item.date}
                                        </div>

                                        {/* Image Column */}
                                        <div className="col-span-2 flex justify-end">
                                            <div className="relative w-12 h-8 md:w-16 md:h-10 rounded overflow-hidden border border-white/10 group-hover/row:border-white/20 transition-colors">
                                                <Image
                                                    src={`/assets/ourApproach/RecentEvents/${item.img}`}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                            {/* Dark overlay for contrast if needed, but the clock component has its own bg */}
                            <RealTimeClock className="w-full h-full bg-transparent" />
                        </div>
                    </ApproachCard>
                </div>
            </div>
        </section>
    );
};
