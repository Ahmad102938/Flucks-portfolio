import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { SERVICES_CONTENT } from "@/constants/services";
import { ALL_SERVICE_PAGES, SERVICE_PAGES } from "@/constants/service-pages";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
    title: "Web, App, MVP & AI Automation Services",
    description: "Full-stack web development, mobile app development, MVP development, AI automation and UI/UX design by Flucks, for startups and businesses in India and worldwide.",
    path: "/services",
});

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30">
            <JsonLd
                data={breadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Services", path: "/services" },
                ])}
            />
            <SiteHeader />

            <div className="flex flex-col w-full">
                <ServicesHero />

                {/* Index of the service landing pages */}
                <nav aria-label="Our services" className="w-full px-6 md:px-12">
                    <ul className="mx-auto max-w-7xl divide-y divide-white/10 border-y border-white/10">
                        {SERVICE_PAGES.map((service, i) => (
                            <li key={service.slug}>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 md:gap-10 md:py-8"
                                >
                                    <span className="font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-10">
                                        <span className="text-2xl font-light text-zinc-200 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white md:text-4xl">
                                            {service.name}
                                        </span>
                                        <span className="max-w-md text-sm text-zinc-500 md:text-right">{service.headline}</span>
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-zinc-600 transition-all duration-500 group-hover:rotate-45 group-hover:text-white md:h-6 md:w-6" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 py-8">
                        <span className="mr-2 text-[11px] uppercase tracking-[0.25em] text-zinc-600">Specialist services</span>
                        {ALL_SERVICE_PAGES.filter((service) => service.parent).map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-zinc-300 transition-colors duration-300 hover:border-white/40 hover:text-white"
                            >
                                {service.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="flex flex-col">
                    {SERVICES_CONTENT.services.map((service, idx) => (
                        <ServiceBlock key={idx} service={service} index={idx} />
                    ))}
                </div>

                <ServicesCTA />
            </div>

            <SiteFooter />
        </main>
    );
}
