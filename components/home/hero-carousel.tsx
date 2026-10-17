"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Infinite carousel driven by a CSS keyframe (compositor-only), paused while offscreen
export const HeroCarousel: React.FC<{
  images: Array<{ src?: string; alt?: string; objectPosition?: string }>;
}> = ({ images }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => {
      track.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  if (images.length === 0) {
    return null;
  }

  // Duplicate images for seamless loop: [A, B, C] -> [A, B, C, A, B, C]
  const duplicatedImages = [...images, ...images];

  return (
    <div
      ref={trackRef}
      className="flex h-full w-max items-center gap-6 pr-6 animate-marquee will-change-transform motion-reduce:animate-none"
      style={{ animationDuration: `${images.length * 4}s` }}
    >
      {duplicatedImages.map((img, idx) => {
        const src = img.src || "/assets/UrbanGuest.png";
        const alt = img.alt || "Project";
        const objectPosition = img.objectPosition || "50% 50%";

        return (
          <div
            key={`${src}-${idx}`}
            className="relative aspect-[3/2] w-[80vw] flex-shrink-0 px-2 py-2 md:w-[48vw] lg:w-[40vw]"
            aria-hidden={idx >= images.length || undefined}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="block rounded-3xl border border-white/10 object-cover shadow-[0_18px_80px_rgba(0,0,0,0.55)]"
              style={{ objectPosition }}
              priority={idx < 2}
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 48vw, 40vw"
            />
          </div>
        );
      })}
    </div>
  );
};
