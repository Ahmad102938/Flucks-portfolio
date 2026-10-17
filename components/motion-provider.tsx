"use client";

import { MotionConfig } from "motion/react";

// Honour the OS "reduce motion" setting for every motion component on the site
export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
