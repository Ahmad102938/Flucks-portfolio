"use client";

import { ArrowRight } from "lucide-react";
import { useGoToContact } from "@/lib/use-go-to-contact";

/** "Start a project" button that glides to the contact form on the home page */
export function ContactButton({ label = "Start a project" }: { label?: string }) {
    const goToContact = useGoToContact();
    return (
        <button
            type="button"
            onClick={goToContact}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-zinc-200"
        >
            <span>{label}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    );
}
