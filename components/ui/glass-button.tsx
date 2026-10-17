"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type GlassButtonProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * "clear"  = no bubble at rest; a crystal bubble forms on hover / press / focus
   * "tinted" = the crystal bubble is always there
   */
  variant?: "clear" | "tinted";
  "aria-label"?: string;
} & (
  | { href: string; onClick?: () => void; disabled?: never }
  | { href?: undefined; onClick: () => void; disabled?: boolean }
);

const bubbleSpring = { type: "spring", stiffness: 420, damping: 18, mass: 0.7 } as const;
const textSpring = { type: "spring", stiffness: 380, damping: 24, mass: 0.7 } as const;

// The bubble swells more than the label, so the glass feels like it's reacting around the text.
// Opacity is left to CSS (see .glass-btn--clear) so hover/focus/touch rules stay in one place.
// "tinted" always shows its bubble, so it needs a bigger swell for the hover to read clearly;
// "clear" already gets an obvious cue from the bubble appearing.
const SCALES = {
  clear: { bubble: { rest: 0.9, hover: 1.08, press: 1.13 }, text: { hover: 1.035, press: 1.06 } },
  tinted: { bubble: { rest: 1, hover: 1.14, press: 1.2 }, text: { hover: 1.06, press: 1.09 } },
} as const;

const makeBubbleVariants = (s: (typeof SCALES)[keyof typeof SCALES]["bubble"]): Variants => ({
  rest: { scale: s.rest, transition: bubbleSpring },
  hover: { scale: s.hover, transition: bubbleSpring },
  press: { scale: s.press, transition: bubbleSpring },
});

const makeTextVariants = (s: (typeof SCALES)[keyof typeof SCALES]["text"]): Variants => ({
  rest: { scale: 1, transition: textSpring },
  hover: { scale: s.hover, transition: textSpring },
  press: { scale: s.press, transition: textSpring },
});

export const GlassButton = ({
  children,
  className,
  variant = "clear",
  href,
  onClick,
  disabled,
  ...rest
}: GlassButtonProps) => {
  const ref = useRef<HTMLElement>(null);

  // Specular glint follows the pointer. Written straight to CSS vars (no re-render);
  // touch is skipped so a tap doesn't leave the glint stuck where the finger was.
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handlePointerLeave = () => {
    ref.current?.style.removeProperty("--mx");
    ref.current?.style.removeProperty("--my");
  };

  const shared = {
    className: cn(
      "glass-btn",
      variant === "tinted" ? "glass-btn--tinted" : "glass-btn--clear",
      className,
    ),
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    initial: "rest",
    animate: "rest",
    whileHover: disabled ? undefined : "hover",
    whileTap: disabled ? undefined : "press",
    ...rest,
  };

  const content = (
    <>
      <motion.span
        aria-hidden
        className="glass-bubble"
        variants={makeBubbleVariants(SCALES[variant].bubble)}
      />
      <motion.span variants={makeTextVariants(SCALES[variant].text)} className="glass-btn__label">
        {children}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <MotionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...shared}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...shared}
    >
      {content}
    </motion.button>
  );
};
