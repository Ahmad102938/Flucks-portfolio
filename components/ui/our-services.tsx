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
import Link from "next/link";
import { smoothScrollTo } from "@/lib/scroll";

// Cards with an href open that service's landing page
const SERVICES: { title: string; icon: typeof IconWorld; href?: string }[] = [
    { title: "Crafted Websites \n& Mobile Apps", icon: IconWorld, href: "/services/web-development" },
    { title: "Web & App Redesign", icon: IconEdit, href: "/services/mobile-app-development" },
    { title: "eCommerce \nWebsite Design", icon: IconShoppingCart },
    { title: "CMS & \nDynamic Websites", icon: IconLayoutDashboard },
    { title: "Landing Pages \n& Microsites", icon: IconSend },
    { title: "MVP & Product \nDevelopment", icon: IconPuzzle, href: "/services/mvp-development" },
    { title: "AI Automation & \nAI Integration", icon: IconBolt, href: "/services/ai-automation" },
    { title: "UX-Centric \nStrategy", icon: IconCompass, href: "/services/product-design" },
    { title: "Performance \nOptimization", icon: IconRocket },
    { title: "Maintenance & \nOngoing Support", icon: IconTools },
];

export const OurServices = () => {
    return (
        <section className="relative w-full py-16 bg-black text-white overflow-hidden z-30">
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
                        className="flex flex-nowrap gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-start"
                    >
                        <button
                            onClick={() => smoothScrollTo("lets-connect")}
                            className="px-5 py-2.5 md:px-8 md:py-3 rounded-full bg-white text-black font-medium text-sm md:text-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                        >
                            Start a project
                        </button>
                        <Link href="/works" className="px-5 py-2.5 md:px-8 md:py-3 rounded-full bg-white/10 text-white font-medium text-sm md:text-lg border border-white/20 hover:bg-white/20 transition-colors whitespace-nowrap">
                            See our work
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 h-auto">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ title, icon: Icon, index, href }: { title: string, icon: any, index: number, href?: string }) => {
    const card = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={cn(
                "group relative flex flex-col items-center justify-center text-center p-4 md:p-6 lg:h-52 rounded-2xl md:rounded-3xl border border-white/10 hover:border-white/30 transition-colors bg-white/[0.02] overflow-hidden",
                href ? "cursor-pointer h-full" : "cursor-default",
            )}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="mb-3 md:mb-4 p-2.5 md:p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <Icon className="text-white w-5 h-5 md:w-7 md:h-7" stroke={1.5} />
            </div>
            <h3 className="text-xs md:text-lg font-medium text-slate-200 whitespace-pre-line leading-tight md:leading-snug">
                {title}
            </h3>
        </motion.div>
    );
    return href ? (
        <Link href={href} className="block h-full rounded-2xl md:rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            {card}
        </Link>
    ) : (
        card
    );
};
