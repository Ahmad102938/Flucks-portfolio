"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic", "normal"] });

export const OurWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0.1, 0.5], [150, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    // Restoring image parallax transforms
    const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const imageOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-black overflow-hidden z-40">
            {/* Header */}
            <div className="container mx-auto px-4 mb-20 relative z-10 flex justify-center items-center mt-20">
                <motion.h2
                    style={{ y: textY, opacity: textOpacity }}
                    className="text-4xl md:text-8xl lg:text-9xl text-white tracking-tighter text-center flex flex-wrap justify-center items-center gap-2 md:gap-4"
                >
                    <span className="font-sans font-light">Our</span>
                    <span className={cn(playfair.className, "italic font-normal")}>Works</span>
                </motion.h2>
            </div>

            {/* Parallax Image Section */}
            <div className="w-full max-w-[90vw] mx-auto relative group cursor-none">
                <motion.div
                    style={{ scale, opacity: imageOpacity }}
                    className="relative aspect-video w-full overflow-hidden rounded-2xl"
                >
                    <Link href="/works" className="block w-full h-full relative">
                        <motion.div style={{ y: imageY }} className="w-full h-[120%] -y-[10%] relative">
                            <img
                                src="/assets/works/dreamblend.png"
                                alt="Featured Project"
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </motion.div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full z-20">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">HealthCore</h3>
                                    <p className="text-slate-300 text-lg">Healthcare App Development</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Custom Cursor Follower */}
                <CursorFollower />
            </div>

            <div className="container mx-auto px-4 mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                <WorkItem
                    title="Automation"
                    subtitle="multi-cast podcast"
                    image="/assets/works/videoLab.png"
                    index={1}
                />
                <WorkItem
                    title="Music"
                    subtitle="Music Streaming App"
                    image="/assets/works/tringbox.png"
                    index={2}
                />
            </div>
        </section>
    );
};

const CursorFollower = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parent = parentRef.current?.parentElement;
        if (!parent) return;

        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                const rect = parent.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }
        };

        parent.addEventListener("mousemove", moveCursor);
        return () => {
            parent.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div ref={parentRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div
                ref={cursorRef}
                className="absolute top-0 left-0 z-40 flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <div className={cn(playfair.className, "text-white italic text-sm")}>View Project</div>
            </div>
        </div>
    );
};

const WorkItem = ({ title, subtitle, image, index }: { title: string, subtitle: string, image: string, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
        >
            <Link href="/works" className="block w-full h-full relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors z-10" />
                <img
                    src={image}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    alt={title}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className={cn(playfair.className, "text-4xl italic text-white")}>View</div>
                </div>
                <div className="absolute bottom-6 left-6 z-20">
                    <h4 className="text-2xl font-bold text-white">{title}</h4>
                    <p className="text-slate-200 text-sm">{subtitle}</p>
                </div>
            </Link>
        </motion.div>
    )
}
