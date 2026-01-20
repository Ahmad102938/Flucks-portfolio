"use client";

import React from "react";
import { SERVICES_CONTENT } from "@/constants/services";
import { smoothScrollTo } from "@/lib/scroll";
import { IconArrowUpRight } from "@tabler/icons-react";

export const ServicesCTA = () => {
    const { title, button } = SERVICES_CONTENT.cta;

    return (
        <section className="w-full py-32 px-6 md:px-12 bg-black border-t border-white/10 relative overflow-hidden">
            {/* Background Noise / Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 leading-[1.1]">
                    {title}
                </h2>

                <button
                    onClick={() => {
                        if (window.location.pathname === "/") {
                            smoothScrollTo("lets-connect");
                        } else {
                            window.location.href = "/?scroll=lets-connect";
                        }
                    }}
                    className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-zinc-200 text-black text-lg font-medium transition-all duration-300"
                >
                    <span>{button}</span>
                    <IconArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </button>
            </div>
        </section>
    );
};
