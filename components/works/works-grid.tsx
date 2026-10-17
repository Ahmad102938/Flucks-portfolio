"use client";

import { motion } from "motion/react";
import { WorkCard } from "@/components/ui/work-card";
import type { WorkItem } from "@/lib/works";

export function WorksHeading() {
    return (
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
    );
}

export function WorksGrid({ works }: { works: WorkItem[] }) {
    return (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {works.map((work, index) => (
                <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    // Stagger only within a row so later cards don't wait seconds
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                    <WorkCard
                        title={work.title}
                        category={work.category}
                        imageSrc={work.image}
                        href={work.link || "#"}
                        showLink={!!work.link}
                        slug={work.slug}
                    />
                </motion.div>
            ))}
        </div>
    );
}
