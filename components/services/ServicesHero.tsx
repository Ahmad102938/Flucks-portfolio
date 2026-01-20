"use client";

import React from "react";
import { motion } from "motion/react";
import { SERVICES_CONTENT } from "@/constants/services";
import { smoothScrollTo } from "@/lib/scroll";
import { IconArrowRight } from "@tabler/icons-react";

export const ServicesHero = () => {
    const { title, subtitle, description } = SERVICES_CONTENT.hero;

    return (
        <section className="relative w-full flex flex-col pt-32 sm:pt-40 px-6 md:px-12 bg-black text-white overflow-hidden pb-12">
            {/* Background Noise / Texture to match About page */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto z-10 w-full"
            >
                <div className="flex items-center gap-4 mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
                    <span className="uppercase tracking-[0.2em] text-xs text-slate-400 font-medium">FLUCKS / Services</span>
                </div>

                <h1 className="text-[13vw] md:text-[8rem] leading-[0.85] font-medium tracking-tight mb-8 text-white">
                    {title}
                </h1>

                <div className="grid md:grid-cols-[1fr,1.5fr] gap-12 mt-16 items-end border-t border-white/10 pt-12">
                    <div>
                        <button
                            onClick={() => window.location.href = "/works"}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-slate-200 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10">See our works</span>
                            <IconArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl md:text-3xl font-normal text-slate-200 leading-snug">
                            {subtitle}
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
