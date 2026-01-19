import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerLinks, footerBranding } from "@/constants/footer";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export const SiteFooter = () => {
    return (
        <footer className="relative w-full bg-black min-h-[40vh] flex flex-col justify-center overflow-hidden">
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 w-full flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 lg:gap-12 mb-24 md:mb-32 w-full">
                    {/* Column 1: Logo/Brand */}
                    <div className="flex flex-col gap-6 col-span-1 md:col-span-1 items-center text-center">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 relative flex items-center justify-center">
                                    <Image
                                        src="/assets/logo3.png"
                                        alt="Flucks Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">{footerBranding.logoText}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-sm text-zinc-400 font-medium">{footerBranding.slogan}</p>
                                <p className="text-sm text-zinc-500">{footerBranding.subSlogan}</p>
                            </div>
                            <p className="text-xs text-zinc-600 mt-2">{footerBranding.copyrightText}</p>
                        </div>
                    </div>

                    {/* Dynamic Columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col gap-6 items-center text-center">
                            <h3 className="text-sm font-medium text-white">{section.title}</h3>
                            <ul className="flex flex-col gap-4 items-center">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-base text-zinc-500 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Massive Bottom Text */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-end pointer-events-none">
                <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 select-none translate-y-[40%]">
                    FLUCKS
                </h1>
            </div>
        </footer>
    );
};
