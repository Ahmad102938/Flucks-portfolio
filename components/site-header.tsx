"use client";

import React, { useState, useEffect } from "react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarButton,
    NavbarBrand,
} from "@/components/ui/resizable-navbar";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import homeContent from "@/constants/home.json";

const NAV_ITEMS = homeContent.navItems;

export function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mobileMenuOpen]);

    return (
        <Navbar className="top-0 z-50">
            {/* Desktop navbar */}
            <NavBody>
                <NavbarBrand />

                <NavItems
                    items={NAV_ITEMS.map((item) => ({
                        name: item,
                        link: "#",
                    }))}
                />

                <div className="flex items-center gap-2">
                    <NavbarButton variant="secondary">See our work</NavbarButton>
                    <HoverBorderGradient
                        containerClassName="rounded-full group"
                        as="button"
                        className="bg-slate-950 text-white flex items-center space-x-2 transition-all duration-300 hover:bg-slate-800 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.4)]"
                    >
                        <span className="inline-block transition-transform duration-300 group-hover:scale-110">
                            Let&apos;s connect
                        </span>
                    </HoverBorderGradient>
                </div>
            </NavBody>

            {/* Mobile navbar */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarBrand />
                    <MobileNavToggle
                        isOpen={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                </MobileNavHeader>
                <MobileNavMenu
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    {NAV_ITEMS.map((item, idx) => (
                        <a
                            key={idx}
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <div className="mt-2 flex flex-col gap-2 items-center">
                        <NavbarButton
                            variant="secondary"
                            className="w-full rounded-full border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            See our work
                        </NavbarButton>
                        <HoverBorderGradient
                            containerClassName="rounded-full w-full group"
                            as="button"
                            className="bg-slate-950 text-white flex items-center justify-center space-x-2 w-full transition-all duration-300 hover:bg-slate-800 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.4)]"
                        >
                            <span className="inline-block transition-transform duration-300 group-hover:scale-110">
                                Let&apos;s connect
                            </span>
                        </HoverBorderGradient>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
