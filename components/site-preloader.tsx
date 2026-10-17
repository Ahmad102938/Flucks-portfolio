"use client";

import React, { useEffect, useState } from "react";
import styles from "./site-preloader.module.css";
import { cn } from "@/lib/utils";
import { PRELOADER_SESSION_KEY } from "@/lib/preloader";

export const SitePreloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (document.documentElement.hasAttribute("data-preloaded")) {
            setShouldRender(false);
            return;
        }

        let cancelled = false;
        const dismiss = () => {
            if (cancelled) return;
            cancelled = true;
            setIsLoading(false);
            try {
                sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
            } catch {
                // Storage unavailable (private mode etc.) - the loader just shows again next visit
            }
        };

        // The DOM is ready by the time we hydrate; wait for web fonts so the
        // reveal doesn't swap typefaces, but never longer than the fallback.
        const fallback = setTimeout(dismiss, 2500);
        document.fonts?.ready.then(dismiss, dismiss) ?? dismiss();

        return () => {
            cancelled = true;
            clearTimeout(fallback);
        };
    }, []);

    // Unmount after the fade-out finishes
    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 500); // Match CSS transition
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div className={cn(styles.preloaderWrapper, !isLoading && styles.hidden)} aria-hidden="true">
            {/* Loaders Container */}
            <div className="flex items-center gap-8">
                {/* Circle Loader */}
                <div className={styles.loader}>
                    <svg viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32"></circle>
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
