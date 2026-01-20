"use client";

import React from "react";
import { motion } from "motion/react";
import { ABOUT_CONTENT } from "@/constants/about";
import { IconArrowUpRight } from "@tabler/icons-react";

export const ServicesGrid = () => {
    const { services } = ABOUT_CONTENT;

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-black text-white border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Core Capabilities</h3>
                    <h2 className="text-3xl md:text-4xl font-normal">What we bring to the table.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} service={service} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/20 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col justify-between min-h-[320px]"
        >
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconArrowUpRight className="text-white w-6 h-6" />
            </div>

            <div>
                <span className="inline-block text-5xl font-light text-zinc-700/50 mb-6">0{index + 1}</span>
                <h3 className="text-xl font-medium text-white mb-4 whitespace-pre-line leading-tight">
                    {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    {service.description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
                {service.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-full bg-white/5 text-zinc-400">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}
