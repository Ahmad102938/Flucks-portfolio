"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ABOUT_CONTENT } from "@/constants/about";

export const Mission = () => {
    const { heading, description, subText, images } = ABOUT_CONTENT.mission;

    return (
        <section id="our-mission" className="relative w-full py-24 px-6 md:px-12 bg-black text-white">
            <div className="max-w-[1400px] mx-auto">

                {/* Text Layout */}
                <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-24 mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl lg:text-5xl font-normal leading-[1.2] tracking-tight"
                    >
                        {heading}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-between"
                    >
                        <p className="text-lg md:text-xl text-zinc-300 mb-8 font-light">
                            {description}
                        </p>
                        <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-md">
                            {subText}
                        </p>
                    </motion.div>
                </div>

                {/* Images Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10%)" }}
                        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[4/5] w-full md:w-[90%] md:translate-y-12"
                    >
                        {/* Placeholder Image 1 */}
                        <div className="w-full h-full bg-zinc-900 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="/assets/featuredWork/aset5.webp"
                                alt="Office Culture"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10%)" }}
                        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[4/3] w-full mt-12 md:mt-0"
                    >
                        {/* Placeholder Image 2 */}
                        <div className="w-full h-full bg-zinc-900 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="/assets/featuredWork/aset2.webp"
                                alt="Team Collaboration"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="mt-6 flex justify-between items-start border-t border-white/10 pt-4">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">Our Culture</p>
                            <p className="text-sm text-zinc-400 max-w-[200px] text-right">
                                We build environments that foster creativity and open communication.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
