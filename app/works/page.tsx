"use client";

import { WorkCard } from "@/components/ui/work-card";
import { SiteFooter } from "@/components/site-footer";
import { Testimonials } from "@/components/testimonials";
import { motion } from "framer-motion";

// Generate work items based on available assets
// Assets: aset.webp, aset2.webp ... aset12.webp

interface WorkItem {
    id: string;
    title: string;
    category: string;
    image: string;
    link?: string | null;
}

import { SiteHeader } from "@/components/site-header";
import { useEffect, useState } from "react";

export default function WorksPage() {
    const [works, setWorks] = useState<WorkItem[]>([]);

    useEffect(() => {
        async function fetchWorks() {
            try {
                const response = await fetch("/api/works");
                if (response.ok) {
                    const data = await response.json();
                    setWorks(data);
                }
            } catch (error) {
                console.error("Failed to fetch works:", error);
            }
        }
        fetchWorks();
    }, []);
    return (
        <div className="min-h-screen bg-black pt-32 text-white sm:pt-40">
            <SiteHeader />
            <div className="container mx-auto px-4 mb-24 sm:px-6 md:mb-32 lg:px-8 lg:mb-40">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24"
                >
                    <h1 className="font-serif text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl">
                        Our Works
                    </h1>
                </motion.div>

                {/* Works Grid */}
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {works.map((work, index) => (
                        <motion.div
                            key={work.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <WorkCard
                                title={work.title}
                                category={work.category}
                                imageSrc={work.image}
                                href={work.link || "#"}
                                showLink={!!work.link}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <Testimonials />

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
