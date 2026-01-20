"use client";

import React from "react";
import { SERVICES_CONTENT } from "@/constants/services";

export const Testimonials = () => {
    const { testimonials } = SERVICES_CONTENT;

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-medium text-white mb-16 text-center">What Our Clients Say</h3>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="bg-zinc-900/40 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors duration-300">
                            <div className="flex flex-col h-full justify-between">
                                <p className="text-zinc-400 text-lg leading-relaxed mb-6 italic">
                                    "{item.quote}"
                                </p>
                                <div>
                                    <div className="text-white font-medium">{item.author}</div>
                                    <div className="text-sm text-zinc-500">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
