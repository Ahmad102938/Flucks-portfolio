"use client";

import { InfiniteMarquee } from "@/components/ui/infinite-marquee";

export const TechStackMarquee = ({ items }: { items: Array<{ name: string; src: string }> }) => (
  <InfiniteMarquee
    items={items}
    itemClassName="gap-20 px-4"
    renderItem={(item) => (
      <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
        <img
          src={item.src}
          alt={item.name}
          height={48}
          loading="lazy"
          decoding="async"
          className="h-12 w-auto object-contain grayscale invert mix-blend-screen contrast-125"
        />
        <span className="text-xl font-semibold text-slate-200 tracking-tight">
          {item.name}
        </span>
      </div>
    )}
  />
);
