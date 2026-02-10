"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_CONTENT, TestimonialItem } from "@/constants/services";
import { Quote, Play, Pause, Volume2, VolumeX } from "lucide-react";

export const Testimonials = () => {
    const { testimonials } = SERVICES_CONTENT;
    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

    const handleVideoPlay = (index: number) => {
        if (activeVideoIndex !== null && activeVideoIndex !== index) {
            // Stop previous video if needed (handled by effect or ref, but state is enough for UI)
        }
        setActiveVideoIndex(index === activeVideoIndex ? null : index);
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-black relative overflow-hidden">
            {/* Background Decoration - Minimal & Clean */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
                        Loved by Builders
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Stories from the founders and teams we&apos;ve helped scale.
                    </p>
                </div>

                {/* CSS Columns / Masonry Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <TestimonialCard
                                item={item}
                                index={idx}
                                isActive={activeVideoIndex === idx}
                                onTogglePlay={() => handleVideoPlay(idx)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface CardProps {
    item: TestimonialItem;
    index: number;
    isActive: boolean;
    onTogglePlay: () => void;
}

const TestimonialCard = ({ item, index, isActive, onTogglePlay }: CardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isActive) {
            videoRef.current.currentTime = 0;
            videoRef.current.muted = true; // Still muted on start
            setIsMuted(true);
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.load(); // Force poster to show
        }
    }, [isActive]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Resume/Pause click logic could be added here if needed, but user wants Play -> Play, Unmute -> Audio
    // So main container click handles Play/Pause via onTogglePlay.

    if (item.type === "text") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-6 group"
            >
                <div className="relative">
                    <Quote className="w-10 h-10 text-white mb-6 fill-white/20 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                    <p className="text-zinc-200 text-lg leading-relaxed font-light">
                        {item.quote}
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {item.author.charAt(0)}
                    </div>
                    <div>
                        <div className="text-white font-medium text-sm">
                            {item.author}
                        </div>
                        <div className="text-xs text-zinc-500">
                            {item.role}
                        </div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                        {[...Array(item.rating || 5)].map((_, i) => (
                            <span key={i} className="text-white text-xs drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">★</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }

    if (item.type === "video") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 aspect-[9/16] group cursor-pointer"
                onClick={onTogglePlay}
            >
                <video
                    ref={videoRef}
                    src={item.videoSrc}
                    poster={item.videoThumbnail}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                // No autoPlay
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-300">
                    <div className="flex justify-end">
                        {isActive && (
                            <button
                                onClick={toggleMute}
                                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors z-20"
                            >
                                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>
                        )}
                    </div>

                    <div className="self-center">
                        {!isActive && (
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                                <Play className="fill-white ml-1" size={24} />
                            </div>
                        )}
                    </div>

                    <div className={`bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 transition-opacity duration-300 ${isActive ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold ring-1 ring-white/20">
                                {item.author.charAt(0)}
                            </div>
                            <div>
                                <div className="text-white text-sm font-medium leading-tight">
                                    {item.author}
                                </div>
                                <div className="text-zinc-400 text-xs mt-0.5">
                                    {item.role}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    return null;
};
