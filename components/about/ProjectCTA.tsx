"use client";

import React from "react";
import { IconMail } from "@tabler/icons-react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scroll";

export const ProjectCTA = () => {
    const handleStartProject = () => {
        if (window.location.pathname === "/") {
            smoothScrollTo("lets-connect");
        } else {
            window.location.href = "/?scroll=lets-connect";
        }
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-black text-white border-t border-white/5 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 rounded-3xl bg-zinc-900/40 p-12 border border-white/5 relative overflow-hidden">

                    {/* Background Decor */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-zinc-800/20 to-transparent pointer-events-none transform skew-x-12"></div>

                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1] text-white">
                            Have a project <br />
                            <span className="text-zinc-400">in mind?</span>
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-lg">
                            Send us a message or schedule a call. Let's create something memorable together.
                        </p>

                        <div className="pt-4">
                            <button
                                onClick={handleStartProject}
                                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-slate-200 hover:bg-white text-black text-lg font-medium transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
                            >
                                <IconMail className="w-6 h-6" />
                                <span>Start a Project</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i, index, arr) => (
                                <div key={i} className="relative w-12 h-12 rounded-full border-2 border-zinc-900 overflow-visible bg-zinc-800">
                                    <Image
                                        src={`/assets/team/avatar-1.png`} // Using specific dummy image as requested
                                        alt="Team"
                                        fill
                                        className="object-cover rounded-full"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`;
                                        }}
                                    />
                                    {/* Add status dot to the last avatar */}
                                    {index === arr.length - 1 && (
                                        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-900 z-10"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-white font-medium">Get reply within 12 hours!</p>
                            <p className="text-zinc-500 text-sm">Your personal success team</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
