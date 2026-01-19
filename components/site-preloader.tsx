"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./site-preloader.module.css";
import { cn } from "@/lib/utils";

// Define a type for our star
type Star = {
    id: number;
    top: string;
    left: string;
    size: number;
    delay: string;
    duration: string;
};

export const SitePreloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(0);

    // Stars state
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        // Generate stars only on client to avoid hydration mismatch
        const newStars: Star[] = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 15 + 10, // 10px to 25px
            delay: `${Math.random() * 4}s`,
            duration: `${Math.random() * 3 + 2}s`
        }));
        setStars(newStars);
    }, []);

    // Safety timeout to ensure loader doesn't stick forever
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (progressRef.current < 100) {
                // Force complete
                setProgress(100);
            }
        }, 8000); // 8 seconds max

        return () => clearTimeout(safetyTimer);
    }, []);

    useEffect(() => {
        // Initial check for all images
        const allImages = Array.from(document.images);
        const totalImages = allImages.length;

        // Base progress on window load + images + font
        let loadedImagesCount = 0;
        let imagesProgress = 0;

        const updateProgress = () => {
            const currentTotal = 10 + imagesProgress + (document.readyState === "complete" ? 30 : 0);
            const nextProgress = Math.min(currentTotal, 100);

            // Increment progress smoothly but don't go backwards
            if (nextProgress > progressRef.current) {
                setProgress(nextProgress);
                progressRef.current = nextProgress;
            }
        };

        // Initialize progress
        setProgress(10);
        progressRef.current = 10;

        // Image load handler
        const onImageLoad = () => {
            loadedImagesCount++;
            if (totalImages > 0) {
                imagesProgress = (loadedImagesCount / totalImages) * 60;
            } else {
                imagesProgress = 60;
            }
            updateProgress();
        };

        if (totalImages === 0) {
            imagesProgress = 60;
            updateProgress();
        } else {
            let alreadyComplete = 0;
            allImages.forEach(img => {
                if (img.complete && img.naturalWidth !== 0) {
                    alreadyComplete++;
                } else {
                    img.addEventListener('load', onImageLoad);
                    img.addEventListener('error', onImageLoad);
                }
            });

            loadedImagesCount = alreadyComplete;
            imagesProgress = (loadedImagesCount / totalImages) * 60;
            updateProgress();
        }

        const handleWindowLoad = () => {
            updateProgress();
            if (document.fonts) {
                document.fonts.ready.then(() => {
                    setProgress(100);
                    progressRef.current = 100;
                });
            } else {
                setProgress(100);
                progressRef.current = 100;
            }
        };

        if (document.readyState === "complete") {
            handleWindowLoad();
        } else {
            window.addEventListener("load", handleWindowLoad);
        }

        return () => {
            window.removeEventListener("load", handleWindowLoad);
            allImages.forEach(img => {
                img.removeEventListener('load', onImageLoad);
                img.removeEventListener('error', onImageLoad);
            });
        };
    }, []);

    // Watch progress to trigger completion
    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [progress]);

    // Handle unmounting
    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div className={cn(styles.preloaderWrapper, !isLoading && styles.hidden)}>
            {/* Background Stars - Behind Scene */}
            <div className={styles.starField}>
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className={styles.bgStar}
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: star.delay,
                            animationDuration: star.duration
                        }}
                    />
                ))}
            </div>

            <div className={styles.scene}>
                <div className={styles.objects}>
                    <div className={styles.square}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.triangle}></div>
                </div>
                <div className={styles.wizard}>
                    <div className={styles.body}></div>
                    <div className={styles.rightArm}>
                        <div className={styles.rightHand}></div>
                    </div>
                    <div className={styles.leftArm}>
                        <div className={styles.leftHand}></div>
                    </div>
                    <div className={styles.head}>
                        <div className={styles.beard}></div>
                        <div className={styles.face}>
                            <div className={styles.adds}></div>
                        </div>
                        <div className={styles.hat}>
                            <div className={styles.hatOfTheHat}></div>
                            <div className={cn(styles.fourPointStar, styles.first)}></div>
                            <div className={cn(styles.fourPointStar, styles.second)}></div>
                            <div className={cn(styles.fourPointStar, styles.third)}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.progress}>
                {/* Real Progress Bar */}
                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className={styles.noise}></div>
        </div>
    );
};
