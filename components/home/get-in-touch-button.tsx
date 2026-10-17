"use client";

import { smoothScrollTo } from "@/lib/scroll";

export const GetInTouchButton = () => (
  <button
    onClick={() => smoothScrollTo("lets-connect")}
    className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-900 shadow-[0_0_35px_rgba(248,250,252,0.9)] transition hover:bg-white cursor-pointer"
  >
    Get in touch
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-slate-50">
      →
    </span>
  </button>
);
