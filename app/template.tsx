"use client";

import { SitePreloader } from "@/components/site-preloader";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SitePreloader />
            {children}
        </>
    );
}
