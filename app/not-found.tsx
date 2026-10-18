import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { NotFoundHero } from "@/components/not-found-hero";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false },
};

export default function NotFound() {
    return (
        <main className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30">
            <SiteHeader />
            <NotFoundHero />
        </main>
    );
}
