"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { HamburgerToggle } from "@/components/ui/hamburger-toggle";
import React, { useRef, useState, createContext, useContext } from "react";

const NavbarContext = createContext<{ visible: boolean }>({ visible: false });

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a Navbar");
  }
  return context;
};



interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else if (latest < 80) {
      setVisible(false);
    }
  });

  return (
    <div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-20 z-40 w-full", className)}
    >
      <NavbarContext.Provider value={{ visible }}>
        {children}
      </NavbarContext.Provider>
    </div>
  );
};

export const NavbarBrand = () => {
  const { visible } = useNavbarContext();
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center gap-2 px-2 py-1"
    >
      <img
        src="/assets/logo2.png"
        alt="Flucks Logo"
        className="h-8 w-8 object-contain"
      />
      <div className="leading-tight">
        <p className={cn(
          "text-sm font-semibold tracking-[0.18em]",
          "text-slate-100"
        )}>
          FLUCKS
        </p>
        {/* grid-rows 0fr/1fr collapses the tagline without animating `height` */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            visible ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
          )}
          aria-hidden={visible}
        >
          <p className="text-[11px] text-slate-400 overflow-hidden whitespace-nowrap">
            Engineering With Taste. Built to Innovate.
          </p>
        </div>
      </div>
    </Link>
  );
};

// Only transform and max-width transition here (all in CSS). The old
// version spring-animated width/gap/backdrop-filter/box-shadow on the main thread.
const navTransition =
  "transition-[max-width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

// Mobile keeps the original solid dark bar (glass is a laptop-only treatment)
const mobileNavTransition =
  "transition-[max-width,transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

// Frosted-glass backdrop (see .glass-surface in globals.css); fades in via opacity only
const GlassSurface = ({ visible }: { visible: boolean }) => (
  <span aria-hidden className="glass-surface" data-visible={visible} />
);

export const NavBody = ({ children, className }: NavBodyProps) => {
  const { visible } = useNavbarContext();
  return (
    <div
      className={cn(
        "relative isolate z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        navTransition,
        visible && "max-w-[max(60%,60rem)] translate-y-5 gap-4 px-6",
        className,
      )}
    >
      <GlassSurface visible={visible} />
      {children}
    </div>
  );
};

const isActiveLink = (pathname: string, link: string) =>
  link === "/" ? pathname === "/" : pathname === link || pathname.startsWith(`${link}/`);

// Springy slide between items, like the iOS tab bar's liquid-glass selector
const lensSpring = { type: "spring", stiffness: 420, damping: 32, mass: 0.9 } as const;

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIdx = items.findIndex((item) => isActiveLink(pathname, item.link));
  // The lens rests on the current page and follows the pointer while hovering
  const lensIdx = hovered ?? (activeIdx === -1 ? null : activeIdx);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <motion.div key={`link-${idx}`} whileTap={{ scale: 0.95 }} className="relative">
          <Link
            onMouseEnter={() => setHovered(idx)}
            onFocus={() => setHovered(idx)}
            onBlur={() => setHovered(null)}
            onClick={onItemClick}
            aria-current={idx === activeIdx ? "page" : undefined}
            className={cn(
              "relative block whitespace-nowrap px-4 py-2 font-medium outline-none transition-colors duration-300",
              lensIdx === idx ? "text-white" : "text-slate-300 hover:text-slate-50",
            )}
            href={item.link}
          >
            <AnimatePresence>
              {lensIdx === idx && (
                <motion.span
                  layoutId="nav-lens"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ layout: lensSpring, opacity: { duration: 0.2 } }}
                  className="absolute inset-0 rounded-full"
                >
                  {/* Re-keyed on every move: squashes then wobbles back, the "liquid" stretch */}
                  <motion.span
                    key={idx}
                    initial={{ scaleX: 1.14, scaleY: 0.84 }}
                    animate={{ scaleX: 1, scaleY: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 14, mass: 0.6 }}
                    className="glass-lens absolute inset-0 rounded-full"
                  />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="relative z-20">{item.name}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  const { visible } = useNavbarContext();
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-none border border-transparent bg-transparent px-0 py-2 lg:hidden",
        mobileNavTransition,
        visible &&
          "max-w-[90%] translate-y-5 rounded-[20px] bg-black/90 backdrop-blur-md border-white/10 px-3 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.5 } }}
          exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-black px-4 py-8 shadow-xl border border-white/10",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="relative z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden"
    >
      <div className="scale-[0.58]">
        <HamburgerToggle isOpen={isOpen} />
      </div>
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center gap-2 px-2 py-1"
    >
      <img
        src="/assets/logo.png"
        alt="Flucks Logo"
        className="h-8 w-8 object-contain"
      />
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-[0.18em] text-slate-100">
          FLUCKS
        </p>
      </div>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: cn(
      "bg-transparent shadow-none text-slate-300 border border-transparent",
      "hover:bg-white/10 hover:text-white hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
      "focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none",
      "transition-all duration-300 ease-out"
    ),
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient: cn(
      "bg-slate-50 text-slate-950 border border-white/20",
      "hover:bg-white hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]",
      "active:scale-95",
      "focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none",
      "transition-all duration-300 ease-out"
    ),
  };

  // Internal links use next/link for client-side navigation (no full reload)
  const Tag: React.ElementType = as ?? (href?.startsWith("/") ? Link : "a");

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
