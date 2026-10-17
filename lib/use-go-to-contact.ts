"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { goToContact } from "@/lib/scroll";

/** Click handler for every "Start your project" / "Let's connect" CTA on the site. */
export const useGoToContact = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Have the home page ready before the click so the hand-off is near-instant
    useEffect(() => {
        if (pathname !== "/") router.prefetch("/");
    }, [pathname, router]);

    return useCallback(() => goToContact(pathname, router.push), [pathname, router]);
};
