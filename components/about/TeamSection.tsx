"use client";

import React from "react";
import { ABOUT_CONTENT } from "@/constants/about";
import Image from "next/image";
import { IconBrandLinkedin, IconBrandTwitter, IconBrandGithub } from "@tabler/icons-react";

// NOTE: This component is fully implemented but currently NOT rendered on the About page.
// To enable, import and render <TeamSection /> in app/about/page.tsx

export const TeamSection = () => {
    const { team } = ABOUT_CONTENT;

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-black text-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-normal">Our Members</h2>
                    <p className="text-zinc-500 mt-4 max-w-xl">
                        The creative minds bringing your ideas to life. We are a diverse team of experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {team.map((member, idx) => (
                        <div key={idx} className="group">
                            <div className="relative aspect-[3/4] w-full mb-6 overflow-hidden rounded-sm bg-zinc-900">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-medium text-white">{member.name}</h3>
                                    <p className="text-sm text-zinc-500 mt-1">{member.role}</p>
                                </div>
                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {/* Conditional rendering based on available socials */}
                                    <a href="#" className="text-zinc-400 hover:text-white transition-colors"><IconBrandLinkedin size={18} /></a>
                                    <a href="#" className="text-zinc-400 hover:text-white transition-colors"><IconBrandTwitter size={18} /></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
