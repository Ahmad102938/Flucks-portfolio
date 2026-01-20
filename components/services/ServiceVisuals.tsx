import React from "react";
import { motion } from "motion/react";

interface ServiceVisualProps {
    type: "web" | "app" | "ai" | "automation";
}

export const ServiceVisual = ({ type }: ServiceVisualProps) => {
    switch (type) {
        case "web":
            return <WebAbstract />;
        case "app":
            return <AppAbstract />;
        case "ai":
            return <AIAbstract />;
        case "automation":
            return <AutomationAbstract />;
        default:
            return null;
    }
};

const WebAbstract = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-white/10 shadow-2xl shadow-blue-900/20">
        {/* Stronger Grid System */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Vibrant Floating Glow */}
        <motion.div
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1.1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 blur-3xl"
        />

        {/* Editorial Divider Line - Scanner Effect */}
        <div className="relative w-[85%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent">
            <motion.div
                animate={{ x: [-150, 150], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20px] left-1/2 w-[2px] h-10 bg-blue-400 box-shadow-[0_0_20px_rgba(59,130,246,0.8)] blur-[2px]"
            />
            <motion.div
                animate={{ x: [-150, 150], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/2 w-32 h-[1px] bg-blue-400 blur-[4px]"
            />
        </div>

        {/* Structural Accents */}
        <div className="absolute right-[20%] top-1/4 bottom-1/4 w-[1px] bg-white/10" />
        <div className="absolute left-[20%] top-1/4 bottom-1/4 w-[1px] bg-white/10" />
        <div className="absolute bottom-[20%] left-1/4 right-1/4 h-[1px] bg-white/10" />
    </div>
);

const AppAbstract = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-white/10">
        {/* Richer background gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-900/20 via-zinc-900 to-zinc-900" />

        {/* Layered Glass Panes - More visible */}
        <motion.div
            animate={{ y: [0, -15, 0], rotate: [-6, -4, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-56 h-72 bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-sm rounded-2xl transform -rotate-6 translate-x-6 shadow-2xl"
        />
        <motion.div
            animate={{ y: [0, -20, 0], rotate: [3, 5, 3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute w-56 h-72 bg-gradient-to-bl from-white/10 to-transparent border border-white/20 backdrop-blur-md rounded-2xl transform rotate-3 -translate-x-6 mix-blend-overlay shadow-xl"
        />

        {/* Focal Point - Vibrant Orb */}
        <div className="absolute w-40 h-40 bg-pink-500/30 blur-[80px] rounded-full mix-blend-screen animate-pulse" />

        {/* Floating UI Hints */}
        <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[30%] right-[30%] w-12 h-12 border border-pink-400/30 rounded-full"
        />
    </div>
);

const AIAbstract = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-white/10">
        {/* Stronger Core */}
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-48 h-48 rounded-full bg-emerald-500/20 blur-[60px]"
        />

        {/* Orbiting Data Rings - Brighter */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-72 h-72 border border-emerald-500/30 rounded-full border-dashed opacity-60"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-56 h-56 border border-emerald-400/20 rounded-full"
            />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 border border-white/10 rounded-full border-dotted"
            />
        </div>

        {/* Central "Eye" */}
        <div className="relative w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.8)] z-10" />

        {/* Neural Grid Overlay */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(circle_at_center,black_50%,transparent_90%)]" />
    </div>
);

const AutomationAbstract = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-white/10 gap-8">
        {/* Brighter Flow Lines */}
        {[1, 0.6, 0.8].map((opacity, i) => (
            <div key={i} className="relative w-[85%] h-[1px] bg-white/10 overflow-hidden">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.4,
                        repeatDelay: 0.2
                    }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-[2px]"
                />
            </div>
        ))}

        {/* Defined Abstract Nodes */}
        <div className="absolute inset-0 grid grid-cols-3 gap-12 p-16 opacity-30">
            <div className="border-r border-orange-500/40 h-full relative">
                <motion.div animate={{ y: [0, 100, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-0 -right-[2px] w-1 h-4 bg-orange-400" />
            </div>
            <div className="border-r border-orange-500/40 h-full relative">
                <motion.div animate={{ y: [100, 0, 100] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-0 -right-[2px] w-1 h-4 bg-orange-400" />
            </div>
        </div>

        {/* Stronger Bottom Glow */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-orange-600/20 to-transparent opacity-70" />
    </div>
);
