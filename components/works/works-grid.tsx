"use client";

import { motion } from "motion/react";
import { WorkCard } from "@/components/ui/work-card";
import { isInProgress } from "@/constants/projects";
import type { WorkItem } from "@/lib/works";

export function WorksHeading() {
    return (
        <div className="enter-rise mb-16 md:mb-24" style={{ "--enter-y": "20px" } as React.CSSProperties}>
            <h1 className="font-serif text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl">
                Our Works
            </h1>
        </div>
    );
}

export function WorksGrid({ works }: { works: WorkItem[] }) {
    return (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {works.map((work, index) => (
                <motion.div
                    key={work.id}
                    // The first row is on screen at load, so it rises in with CSS from first paint
                    initial={index < 3 ? false : { opacity: 0, y: 30 }}
                    className={index < 3 ? "enter-rise" : undefined}
                    style={index < 3 ? ({ "--enter-y": "30px", "--enter-opacity": "0.01", "--enter-delay": `${0.1 + index * 0.1}s` } as React.CSSProperties) : undefined}
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
                        inProgress={isInProgress(work.slug)}
                        priority={index < 3}
                    />
                </motion.div>
            ))}
        </div>
    );
}
