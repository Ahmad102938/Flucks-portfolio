"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
    IconWorld,
    IconEdit,
    IconShoppingCart,
    IconLayoutDashboard,
    IconSend,
    IconPuzzle,
    IconBolt,
    IconCompass,
    IconRocket,
    IconTools
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const SERVICES = [
    { title: "Crafted Websites", icon: IconWorld },
    { title: "Website Redesign", icon: IconEdit },
    { title: "eCommerce \nWebsite Design", icon: IconShoppingCart },
    { title: "CMS & \nDynamic Websites", icon: IconLayoutDashboard },
    { title: "Landing Pages \n& Microsites", icon: IconSend },
    { title: "Consistent \nIdentity", icon: IconPuzzle },
    { title: "Motion & \nInteraction Design", icon: IconBolt },
    { title: "UX Centric \nStrategy", icon: IconCompass },
    { title: "Performance \nOptimization", icon: IconRocket },
    { title: "Maintenance & \nOngoing Support", icon: IconTools },
];

export const OurServices = () => {
    return (
        <section className="relative w-full py-16 bg-slate-950 text-white overflow-hidden z-30">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 gap-8 text-center lg:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-sans font-medium tracking-tighter leading-[1.1]"
                    >
                        Elevate your <br className="hidden md:block" />
                        digital footprint.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="flex gap-4"
                    >
                        <button className="px-6 py-2 md:px-8 md:py-3 rounded-full bg-white text-black font-medium text-sm md:text-lg hover:bg-slate-200 transition-colors">
                            Start a project
                        </button>
                        <button className="px-6 py-2 md:px-8 md:py-3 rounded-full bg-white/10 text-white font-medium text-sm md:text-lg border border-white/20 hover:bg-white/20 transition-colors">
                            See our work
                        </button>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-auto">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ title, icon: Icon, index }: { title: string, icon: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative flex flex-col items-center justify-center text-center p-6 lg:h-52 rounded-3xl border border-white/10 hover:border-white/30 transition-colors bg-white/[0.02] cursor-default overflow-hidden"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <Icon size={28} className="text-white" stroke={1.5} />
            </div>
            <h3 className="text-lg font-medium text-slate-200 whitespace-pre-line leading-snug">
                {title}
            </h3>
        </motion.div>
    );
};
