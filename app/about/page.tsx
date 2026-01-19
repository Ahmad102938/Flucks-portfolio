"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black pt-32 text-white sm:pt-40">
            <SiteHeader />
            <div className="container mx-auto px-4 mb-24 sm:px-6 md:mb-32 lg:px-8 lg:mb-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-serif text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl">
                        About Us
                    </h1>
                    <p className="mt-8 text-xl text-zinc-400 max-w-2xl">
                        We are a team of creators, designers, and developers building digital experiences that matter.
                    </p>
                </motion.div>
            </div>
            <SiteFooter />
        </div>
    );
}
