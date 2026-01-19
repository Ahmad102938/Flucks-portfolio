"use client";

import { WorkCard } from "@/components/ui/work-card";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";

// Generate work items based on available assets
// Assets: aset.webp, aset2.webp ... aset12.webp
const works = [
    {
        id: 1,
        title: "Carento",
        category: "Car Rental Platform",
        image: "/assets/workspage/aset.webp",
    },
    {
        id: 2,
        title: "FinTech Dashboard", // Dummy title
        category: "Finance",
        image: "/assets/workspage/aset2.webp",
    },
    {
        id: 3,
        title: "E-Commerce App", // Dummy title
        category: "Mobile Application",
        image: "/assets/workspage/aset3.webp",
    },
    {
        id: 4,
        title: "Travel Agency", // Dummy title
        category: "Web Design",
        image: "/assets/workspage/aset4.webp",
    },
    {
        id: 5,
        title: "SaaS Landing", // Dummy title
        category: "Development",
        image: "/assets/workspage/aset5.webp",
    },
    {
        id: 6,
        title: "Portfolio V1", // Dummy title
        category: "Personal Brand",
        image: "/assets/workspage/aset6.webp",
    },
    {
        id: 7,
        title: "Restaurant OS", // Dummy title
        category: "Management System",
        image: "/assets/workspage/aset7.webp",
    },
    {
        id: 8,
        title: "Crypto Wallet", // Dummy title
        category: "Blockchain",
        image: "/assets/workspage/aset8.webp",
    },
    {
        id: 9,
        title: "Health Tracker", // Dummy title
        category: "Mobile App",
        image: "/assets/workspage/aset9.webp",
    },
    {
        id: 10,
        title: "AI Chatbot", // Dummy title
        category: "Artificial Intelligence",
        image: "/assets/workspage/aset10.webp",
    },
    {
        id: 11,
        title: "Learning Hub", // Dummy title
        category: "Education",
        image: "/assets/workspage/aset11.webp",
    },
    {
        id: 12,
        title: "Social Connect", // Dummy title
        category: "Social Network",
        image: "/assets/workspage/aset12.webp",
    },
];

import { SiteHeader } from "@/components/site-header";

export default function WorksPage() {
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
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
