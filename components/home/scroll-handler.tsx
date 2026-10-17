"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { arriveAt, CONTACT_ID } from "@/lib/scroll";

export const ScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("scroll") !== CONTACT_ID) return;

    // Not cancelled on cleanup: dropping the query below re-renders this effect, and the
    // arrival must keep running through that. arriveAt ignores repeat calls.
    void arriveAt(CONTACT_ID);
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.hash);
  }, [searchParams]);

  return null;
};
