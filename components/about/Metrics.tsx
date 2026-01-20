"use client";

import React from "react";
import { ABOUT_CONTENT } from "@/constants/about";

export const Metrics = () => {
    const { metrics } = ABOUT_CONTENT;

    return (
        <section className="w-full py-16 px-6 md:px-12 bg-black text-white border-y border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {metrics.map((item, idx) => (
                        <div key={idx} className="flex flex-col space-y-2">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white">
                                {item.value}
                            </h3>
                            <p className="text-sm text-zinc-500 uppercase tracking-widest">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
