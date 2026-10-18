"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const grid = (alpha: number): React.CSSProperties => ({
  backgroundImage: `linear-gradient(to right, rgba(255,255,255,${alpha}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${alpha}) 1px, transparent 1px)`,
  backgroundSize: "64px 64px",
});

// Resting grid shared by every wall, and a brighter copy that only shows where a light wave passes
const gridStyle = grid(0.26);
const litGridStyle = grid(0.75);

/**
 * A perspective grid tunnel (floor, ceiling, two walls) converging on a vanishing point.
 * `progress` (0 → 1, usually scroll progress) slides the grid toward the viewer, which
 * reads as travelling deeper into the space. Transform-only, so it stays on the compositor.
 */
export const DepthTunnel = ({
  progress,
  travel = 640,
  className,
}: {
  progress: MotionValue<number>;
  /** How far (px) the grid moves across the full progress range */
  travel?: number;
  className?: string;
}) => {
  const toViewer = useTransform(progress, [0, 1], [0, travel]);
  const awayFromViewer = useTransform(progress, [0, 1], [0, -travel]);

  // Each wall is hinged on the edge nearest the viewer and fades out toward the far end
  const walls = [
    {
      key: "floor",
      plane: "inset-x-0 bottom-0 h-full origin-bottom [transform:rotateX(78deg)] [mask-image:linear-gradient(to_top,black_10%,transparent_85%)]",
      layer: "-inset-y-full inset-x-0",
      style: { y: toViewer },
      pulse: "tunnel-pulse tunnel-pulse--down",
    },
    {
      key: "ceiling",
      plane: "inset-x-0 top-0 h-full origin-top [transform:rotateX(-78deg)] [mask-image:linear-gradient(to_bottom,black_10%,transparent_85%)]",
      layer: "-inset-y-full inset-x-0",
      style: { y: awayFromViewer },
      pulse: "tunnel-pulse tunnel-pulse--up [animation-delay:-4.5s]",
    },
    {
      key: "left",
      plane: "inset-y-0 left-0 w-full origin-left [transform:rotateY(-78deg)] [mask-image:linear-gradient(to_right,black_10%,transparent_85%)]",
      layer: "-inset-x-full inset-y-0",
      style: { x: awayFromViewer },
      pulse: "tunnel-pulse tunnel-pulse--left [animation-delay:-2.25s]",
    },
    {
      key: "right",
      plane: "inset-y-0 right-0 w-full origin-right [transform:rotateY(78deg)] [mask-image:linear-gradient(to_left,black_10%,transparent_85%)]",
      layer: "-inset-x-full inset-y-0",
      style: { x: toViewer },
      pulse: "tunnel-pulse tunnel-pulse--right [animation-delay:-6.75s]",
    },
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ perspective: "520px", perspectiveOrigin: "50% 38%" }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {walls.map((w) => (
          <div key={w.key} className={cn("absolute overflow-hidden", w.plane)}>
            <motion.div
              className={cn("absolute will-change-transform", w.layer)}
              style={{ ...gridStyle, ...w.style }}
            />
            {/* A soft band of light travelling along the grid toward the viewer (globals.css) */}
            <div className={cn("absolute inset-0", w.pulse)}>
              <motion.div
                className={cn("absolute will-change-transform", w.layer)}
                style={{ ...litGridStyle, ...w.style }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Light at the vanishing point, and darkness pooling at the edges for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_38%,rgba(255,255,255,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_38%,rgba(255,255,255,0.05),transparent_75%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_40px_rgba(0,0,0,0.72)]" />
    </div>
  );
};
