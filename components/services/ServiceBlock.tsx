"use client";

import React from "react";
import { ServiceItem } from "@/constants/services";
import { ServicesAccordion } from "./ServicesAccordion";
import { motion } from "motion/react";
import Image from "next/image";

interface ServiceBlockProps {
    service: ServiceItem;
    index: number;
}

export const ServiceBlock = ({ service, index }: ServiceBlockProps) => {
    const isreversed = index % 2 !== 0;

    return (
        <section className={`w-full py-24 md:py-32 px-6 md:px-12 ${index % 2 === 0 ? "bg-black" : "bg-zinc-950/30"}`}>
            <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isreversed ? "lg:flex-row-reverse" : ""}`}>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: isreversed ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`order-2 ${isreversed ? "lg:order-2" : "lg:order-1"}`}
                >
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                        {service.title}
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-12 font-light">
                        {service.description}
                    </p>

                    <ServicesAccordion items={service.subServices} />
                </motion.div>

                {/* Abstract Visual Content with Image Integration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`order-1 ${isreversed ? "lg:order-1" : "lg:order-2"} w-full aspect-square md:aspect-[4/3] max-w-[600px] mx-auto relative flex items-center justify-center`}
                >
                    {/* Abstract Container */}
                    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-zinc-900/10 border border-white/5 group">

                        {/* 1. Base Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-50" />

                        {/* 2. The Image with Abstract Treatment */}
                        <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
                            <div className="relative w-full h-full">
                                <Image
                                    src={service.imageSrc}
                                    alt={service.title}
                                    fill
                                    className="object-contain transition-all duration-700 
                                               filter grayscale contrast-[1.1] brightness-[0.8] 
                                               group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 
                                               opacity-70 group-hover:opacity-100
                                               mix-blend-lighten"
                                    quality={90}
                                    priority={index < 2}
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* 3. Overlay Effects for "Abstract" Look */}
                        {/* Scanline/Grid Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_2px,#000_3px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

                        {/* Radial Gradient Mask to Blend Edges */}
                        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, #000 100%) opacity-40 pointer-events-none" />

                        {/* Colored Glow Accent (Subtle) */}
                        <div className={`absolute -bottom-20 -right-20 w-64 h-64 blur-[100px] rounded-full opacity-20 pointer-events-none
                            ${index === 0 ? "bg-blue-600" : index === 1 ? "bg-pink-600" : index === 2 ? "bg-emerald-600" : "bg-orange-600"}
                        `} />
                        <div className={`absolute -top-20 -left-20 w-64 h-64 blur-[100px] rounded-full opacity-10 pointer-events-none
                            ${index === 0 ? "bg-purple-600" : index === 1 ? "bg-blue-600" : index === 2 ? "bg-cyan-600" : "bg-red-600"}
                        `} />

                    </div>
                </motion.div>

            </div>
        </section>
    );
};
