"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { HamburgerToggle } from "@/components/ui/hamburger-toggle";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
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
    <motion.div
      ref={ref}
      layout
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-20 z-40 w-full will-change-transform", className)}
    >
      <NavbarContext.Provider value={{ visible }}>
        {children}
      </NavbarContext.Provider>
    </motion.div>
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
        <AnimatePresence>
          {!visible && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[11px] text-slate-400 overflow-hidden whitespace-nowrap"
            >
              Egineering With Teste. Build to Innovate.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  const { visible } = useNavbarContext();
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "fit-content" : "100%",
        y: visible ? 20 : 0,
        gap: visible ? "1rem" : "0",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: visible ? "60%" : "100%",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-black/90 backdrop-blur-md border border-white/10 shadow-sm px-6",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-slate-300 hover:text-slate-50 font-medium"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-slate-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  const { visible } = useNavbarContext();
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "20px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-black/90 backdrop-blur-md border border-white/10 shadow-sm",
        className,
      )}
    >
      {children}
    </motion.div>
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
          initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.3, duration: 0.5 } }}
          exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2, ease: "easeIn" } }}
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
  as: Tag = "a",
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
  const { visible } = useNavbarContext();

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
