"use client";

import React from "react";
import { ABOUT_CONTENT } from "@/constants/about";
import { IconAward } from "@tabler/icons-react";

export const Awards = () => {
    const { awards } = ABOUT_CONTENT;

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-black text-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <h2 className="text-3xl md:text-5xl font-normal leading-tight max-w-2xl">
                        On a mission to become the digital backbone for modern businesses.
                    </h2>
                    <IconAward className="w-12 h-12 text-zinc-600 hidden md:block stroke-1" />
                </div>

                <div className="space-y-4">
                    {/* {awards.map((award, idx) => (
                        <div key={idx} className="group relative flex flex-col md:flex-row items-baseline md:items-center justify-between py-8 border-b border-white/10 hover:border-white/30 transition-colors">
                            <div className="flex items-center gap-8 md:w-1/3">
                                <span className="text-sm font-medium text-zinc-500">{award.year}</span>
                                <h3 className="text-xl font-medium text-white group-hover:pl-4 transition-all duration-300">
                                    {award.title}
                                </h3>
                            </div>
                            <div className="md:w-1/3 mt-2 md:mt-0">
                                <span className="text-zinc-400 text-sm">{award.organization}</span>
                            </div>
                            <div className="md:w-1/3 mt-2 md:mt-0 md:text-right">
                                <span className="text-zinc-500 text-sm hidden md:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {award.description}
                                </span>
                                <span className="md:hidden text-zinc-500 text-xs">
                                    {award.description}
                                </span>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </section>
    );
};
