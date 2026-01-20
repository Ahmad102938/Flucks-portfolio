import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// About Page Components
import { Hero } from "@/components/about/Hero";
import { Mission } from "@/components/about/Mission";
import { ServicesGrid } from "@/components/about/ServicesGrid";
import { Metrics } from "@/components/about/Metrics";
import { Awards } from "@/components/about/Awards";
import { Testimonial } from "@/components/about/Testimonial";
import { ProjectCTA } from "@/components/about/ProjectCTA";
// import { TeamSection } from "@/components/about/TeamSection"; // Hidden for now

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30">
            {/* Navigation */}
            <SiteHeader />

            {/* Page Content */}
            <div className="pt-0">
                <Hero />
                <Mission />
                <Metrics />
                <ServicesGrid />
                <Awards />
                <Testimonial />
                <ProjectCTA />

                {/* Team Section is ready but hidden as requested */}
                {/* <TeamSection /> */}
            </div>

            <SiteFooter />
        </main>
    );
}
