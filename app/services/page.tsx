"use client";

import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { SERVICES_CONTENT } from "@/constants/services";

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30">
            <SiteHeader />

            <div className="flex flex-col w-full">
                <ServicesHero />

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
