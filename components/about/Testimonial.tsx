"use client";

import React from "react";
import { ABOUT_CONTENT } from "@/constants/about";
import Image from "next/image";

export const Testimonial = () => {
    const { testimonial } = ABOUT_CONTENT;

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-zinc-900/20 text-white border-y border-white/5">
            <div className="max-w-7xl mx-auto text-center">
                <blockquote className="font-playfair text-3xl md:text-5xl lg:text-[3.5rem] font-normal leading-[1.1] text-slate-200 mb-12">
                    &quot;{testimonial.quote.split("clients who share the vision")[0]}
                    <span className="text-white font-medium">clients who share the vision</span>
                    {testimonial.quote.split("clients who share the vision")[1]}&quot;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-left">
                        <div className="text-white font-medium text-base hover:text-cyan-400 transition-colors cursor-pointer">
                            {testimonial.author}
                        </div>
                        <div className="text-zinc-500 text-sm">
                            {testimonial.role}
                        </div>
                        {/* TypeScript might complain if college isn't in the inferred type yet, but since it comes from constants it's fine */}
                        {(testimonial as any).college && (
                            <div className="text-zinc-600 text-xs mt-0.5">
                                {(testimonial as any).college}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
