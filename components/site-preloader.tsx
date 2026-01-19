"use client";

import React, { useEffect, useState } from "react";
import styles from "./site-preloader.module.css";
import { cn } from "@/lib/utils";

export const SitePreloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    // Safety timeout to ensure loader doesn't stick forever
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            setIsLoading(false);
        }, 8000); // 8 seconds max

        return () => clearTimeout(safetyTimer);
    }, []);

    useEffect(() => {
        // Simple loading logic - wait for everything
        const handleLoad = () => {
            // Add a small delay for smoothness before dismissing
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    // Handle unmounting
    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 600); // Match CSS transition
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div className={cn(styles.preloaderWrapper, !isLoading && styles.hidden)}>
            {/* Loaders Container */}
            <div className="flex items-center gap-8">
                {/* Circle Loader */}
                <div className={styles.loader}>
                    <svg viewBox="0 0 80 80">
                        <circle id="test" cx="40" cy="40" r="32"></circle>
                    </svg>
                </div>

                {/* Triangle Loader */}
                <div className={cn(styles.loader, styles.triangle)}>
                    <svg viewBox="0 0 86 80">
                        <polygon points="43 8 79 72 7 72"></polygon>
                    </svg>
                </div>

                {/* Square Loader */}
                <div className={styles.loader}>
                    <svg viewBox="0 0 80 80">
                        <rect x="8" y="8" width="64" height="64"></rect>
                    </svg>
                </div>
            </div>
        </div>
    );
};
