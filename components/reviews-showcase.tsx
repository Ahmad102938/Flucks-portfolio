"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { REVIEWS_CONTENT, type ReviewCard as Review } from "@/constants/reviews";
import { CONTACT_HREF } from "@/lib/scroll";
import { useGoToContact } from "@/lib/use-go-to-contact";

const Stars = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        aria-hidden
        className={`${size === "md" ? "h-4 w-4" : "h-3 w-3"} ${i < Math.round(rating) ? "fill-current" : "fill-current opacity-25"}`}
      >
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  // Only offer "Read all" when the quote is actually cut off at the current width
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const measure = () => {
      if (!expanded) setClamped(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  return (
    <article className="flex h-full flex-col p-7 sm:p-8">
      <div className="text-zinc-900">
        <Stars rating={review.rating} />
      </div>
      <blockquote
        ref={quoteRef}
        className={`mt-4 text-[1.05rem] leading-relaxed text-zinc-900 ${expanded ? "" : "line-clamp-5"}`}
      >
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <div className="min-w-0">
          <p className="truncate text-sm text-zinc-500">{review.name}</p>
          <p className="truncate text-xs text-zinc-400">{review.designation}</p>
        </div>
        {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="shrink-0 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          {expanded ? "Show less" : "Read all"}
        </button>
        )}
      </div>
    </article>
  );
};

/**
 * Silver CD in the panel's top-right corner. It spins and glides in when the section arrives;
 * after that a white reflection sweeps around the grooves with the scroll, forward on the way
 * down and back on the way up (every device), and leans toward the pointer (mouse only).
 */
const CdDisc = ({ panelRef }: { panelRef: React.RefObject<HTMLDivElement | null> }) => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start end", "end start"] });
  const pointer = useMotionValue(0);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = panel.getBoundingClientRect();
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    };
    const onLeave = () => pointer.set(0);
    panel.addEventListener("pointermove", onMove);
    panel.addEventListener("pointerleave", onLeave);
    return () => {
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, [panelRef, pointer, reduceMotion]);

  // Reflection angle: sweeps with scroll plus a lean toward the pointer, eased by a soft spring
  const lightTarget = useTransform(() =>
    reduceMotion ? 30 : scrollYProgress.get() * 240 + pointer.get() * 40,
  );
  const light = useSpring(lightTarget, { stiffness: 40, damping: 18, mass: 1 });

  return (
    <motion.div
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0, rotate: -120, scale: 0.86, x: 80, y: -80 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute -right-20 -top-40 w-[25rem] sm:-right-40 sm:-top-64 sm:w-[38rem] lg:-right-32 lg:-top-72 lg:w-[46rem]"
    >
      <div className="cd-disc relative w-full">
        <motion.div style={{ rotate: light }} className="cd-disc__sheen" />
      </div>
    </motion.div>
  );
};

/**
 * Matte black reviews panel with a silver CD in the top-right corner and a strip of
 * review cards overlapping it. All copy, the overall rating and the cards come from
 * constants/reviews.ts.
 */
export const ReviewsShowcase = () => {
  const { heading, subheading, overallRating, reviewCount, headline, ctaLabel, cards } = REVIEWS_CONTENT;
  const goToContact = useGoToContact();
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container mx-auto bg-black px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mb-14 text-center md:mb-16">
        <h2 className="mb-4 text-4xl font-medium tracking-tight text-white md:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-500">
          {subheading}
        </p>
      </div>
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="matte-panel relative w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"
      >
        {/* The disc, cropped by the panel's top-right corner */}
        <CdDisc panelRef={panelRef} />

        <div className="relative px-5 pb-5 pt-52 sm:px-8 sm:pb-8 sm:pt-16 lg:px-10">
          {/* Header */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 text-white">
              <Stars rating={overallRating} size="md" />
              <span className="text-lg font-medium">{overallRating.toFixed(1)}</span>
              <span className="text-sm text-zinc-500">({reviewCount})</span>
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              {headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <Link
              href={CONTACT_HREF}
              onClick={(e) => {
                // Modified clicks (new tab/window) keep the plain link; the hard load lands too
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                goToContact();
              }}
              className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Review strip: stacks on mobile, three across from md */}
          <div className="relative mt-12 overflow-hidden rounded-[1.5rem] bg-zinc-50 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] sm:mt-16 sm:rounded-[1.75rem] md:grid md:grid-cols-3">
            {cards.map((review, i) => (
              <div
                key={i}
                className={i > 0 ? "border-t border-zinc-200 md:border-l md:border-t-0" : undefined}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
