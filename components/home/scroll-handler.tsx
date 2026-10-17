"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { smoothScrollTo } from "@/lib/scroll";

export const ScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget === "lets-connect") {
      setTimeout(() => {
        smoothScrollTo("lets-connect");
      }, 100);

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams]);

  return null;
};
