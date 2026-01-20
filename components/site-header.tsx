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
import { smoothScrollTo } from "@/lib/scroll";

const NAV_ITEMS = homeContent.navItems;

export function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const ignoreScrollCloseUntilRef = React.useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // Only close if menu is open AND the "ignore" window has passed
            if (mobileMenuOpen && Date.now() > ignoreScrollCloseUntilRef.current) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mobileMenuOpen]);

    const handleToggle = () => {
        if (!mobileMenuOpen) {
            // Opening the menu: ignore scroll events temporarily (800ms) to prevent immediate closing
            // if the user's scroll momentum is still going.
            ignoreScrollCloseUntilRef.current = Date.now() + 800;
        }
        setMobileMenuOpen((prev) => !prev);
    };

    return (
        <Navbar className="top-0 z-50">
            {/* Desktop navbar */}
            <NavBody>
                <NavbarBrand />

                <NavItems
                    items={NAV_ITEMS.map((item) => {
                        let link = "/";
                        if (item === "Works") link = "/works";
                        if (item === "Services") link = "/services";
                        if (item === "About Us") link = "/about";
                        return {
                            name: item,
                            link,
                        };
                    })}
                />

                <div className="flex items-center gap-2">
                    <NavbarButton variant="secondary" href="/works">See our work</NavbarButton>
                    <HoverBorderGradient
                        containerClassName="rounded-full group"
                        as="button"
                        onClick={() => {
                            if (window.location.pathname === "/") {
                                smoothScrollTo("lets-connect");
                            } else {
                                window.location.href = "/?scroll=lets-connect";
                            }
                        }}
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
                        onClick={handleToggle}
                    />
                </MobileNavHeader>
                <MobileNavMenu
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    {NAV_ITEMS.map((item, idx) => {
                        let link = "/";
                        if (item === "Works") link = "/works";
                        if (item === "Services") link = "/services";
                        if (item === "About Us") link = "/about";
                        return (
                            <a
                                key={idx}
                                href={link}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        );
                    })}
                    <div className="mt-2 flex flex-col gap-2 items-center">
                        <NavbarButton
                            variant="secondary"
                            href="/works"
                            className="w-full rounded-full border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            See our work
                        </NavbarButton>
                        <HoverBorderGradient
                            containerClassName="rounded-full w-full group"
                            as="button"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                if (window.location.pathname === "/") {
                                    smoothScrollTo("lets-connect");
                                } else {
                                    window.location.href = "/?scroll=lets-connect";
                                }
                            }}
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
