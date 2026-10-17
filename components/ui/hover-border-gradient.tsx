"use client";
import React from "react";

import { cn } from "@/lib/utils";

const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

// The glow is only visible on hover, so it's a pure CSS opacity transition:
// no timers or React re-renders while idle.
export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  // Kept for API compatibility with the original Aceternity component
  duration: _duration,
  clockwise: _clockwise,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  return (
    <Tag
      className={cn(
        "group/hbg relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit] h-full w-full opacity-0 transition-opacity duration-300 ease-out group-hover/hbg:opacity-100"
        style={{ filter: "blur(2px)", background: highlight }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
