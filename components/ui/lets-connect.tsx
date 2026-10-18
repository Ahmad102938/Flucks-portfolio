"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { IconMail, IconBrandWhatsapp, IconMapPin, IconCheck, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { DepthTunnel } from "@/components/ui/depth-tunnel";
import { socialLinks } from "@/constants/footer";

// Right-hand column of the form: edit freely
const CONTACT_ASIDE = {
    availability: "Taking on new projects",
    nextSteps: [
        { title: "We read every enquiry", detail: "A real person on the team reviews your brief, not a bot." },
        { title: "A quick conversation", detail: "We reply with questions or a link to book a short call." },
        { title: "A clear proposal", detail: "Scope, timeline and cost in writing, before any work starts." },
    ],
};
import PhoneInput, { getCountries, isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';

export const LetsConnect = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        phone: "",
        projectType: "",
        numberOfPages: "",
        budget: "",
        message: "",
        preferredResponseMethod: "email",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [isOtherCountry, setIsOtherCountry] = useState(false);
    const [isOtherProjectType, setIsOtherProjectType] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // "Slide into" the form: the card enters tilted away like a ramp sloping into the
    // screen and rises flat by the time its top reaches the upper part of the viewport.
    const cardRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // The depth effect is a laptop/desktop treatment; phones and tablets keep the original
    // simple fade-up. Starts false so the server render matches the mobile layout.
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    const depth = isDesktop && !reduceMotion;
    const { scrollYProgress: entry } = useScroll({
        target: cardRef,
        offset: ["start end", "start 0.2"],
    });
    const cardRotateX = useTransform(entry, [0, 1], [-26, 0]);
    const cardScale = useTransform(entry, [0, 1], [0.88, 1]);
    const cardY = useTransform(entry, [0, 1], [80, 0]);
    const cardOpacity = useTransform(entry, [0, 0.35], [0, 1]);

    // Depth travel through the tunnel for the whole time the card is on screen
    const { scrollYProgress: travel } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const budgetOptions = ["< $1k", "$1k - $3k", "$3k - $5k", "$5k - $10k", "$10k+"];

    // Generate country list from library
    const countryList = getCountries().map((country) => en[country]).sort((a, b) => a.localeCompare(b));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "country" && value === "Others") {
            setIsOtherCountry(true);
            setFormData((prev) => ({ ...prev, country: "" }));
        } else if (name === "projectType" && value === "Others") {
            setIsOtherProjectType(true);
            setFormData((prev) => ({ ...prev, projectType: "" }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleRevertCountry = () => {
        setIsOtherCountry(false);
        setFormData((prev) => ({ ...prev, country: "" }));
    };

    const handleRevertProjectType = () => {
        setIsOtherProjectType(false);
        setFormData((prev) => ({ ...prev, projectType: "" }));
    };

    const handleBudgetChange = (budget: string) => {
        setFormData((prev) => ({ ...prev, budget }));
    };

    const handleMethodChange = (method: string) => {
        setFormData((prev) => ({ ...prev, preferredResponseMethod: method }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name || formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "A valid email is required";
        if (formData.phone && !isValidPhoneNumber(formData.phone)) {
            newErrors.phone = "Invalid phone number";
        }
        if (!formData.projectType) newErrors.projectType = "Project type is required";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    country: "",
                    phone: "",
                    projectType: "",
                    numberOfPages: "",
                    budget: "",
                    message: "",
                    preferredResponseMethod: "email",
                });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="lets-connect" ref={containerRef} className="relative z-10 w-full px-4 pt-10 pb-0 md:px-8 lg:pt-16 lg:pb-0">

            <div className="mx-auto max-w-7xl">
                {/* Header Title */}
                <motion.div
                    data-scroll-anchor=""
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mb-8 text-center md:mb-12"
                >
                    <h2 className="flex flex-row items-baseline justify-center gap-3 text-[3.5rem] leading-none tracking-tighter sm:text-[5rem] md:gap-6 md:text-[8rem] lg:text-[10rem]">
                        <span className="text-white font-bold">Let&apos;s</span>
                        <span className="font-fraunces font-light italic text-white">
                            Connect
                        </span>
                    </h2>
                </motion.div>

                {/* Main Card Wrapper - perspective stage for the tilt-in */}
                <div style={depth ? { perspective: "1600px", perspectiveOrigin: "50% 0%" } : undefined}>
                <motion.div
                    ref={cardRef}
                    {...(depth
                        ? {
                            // Desktop: scroll-linked tilt-in
                            style: {
                                rotateX: cardRotateX,
                                scale: cardScale,
                                y: cardY,
                                opacity: cardOpacity,
                                transformOrigin: "50% 0%",
                            },
                        }
                        : {
                            // Mobile / reduced motion: the original fade-up
                            initial: { y: 40, opacity: 0 },
                            whileInView: { y: 0, opacity: 1 },
                            viewport: { once: true, margin: "-100px" },
                            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                        })}
                    className={
                        depth
                            ? "relative rounded-[2.5rem] border border-white/10 bg-black/60 shadow-[inset_0_0_60px_rgba(0,0,0,0.6),0_40px_120px_-40px_rgba(0,0,0,0.9)] will-change-transform"
                            : // isolate: keeps the background layers above this fill once the fade-up's transform is gone
                              "relative isolate shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] rounded-[2.5rem] border border-white/10 bg-black/70"
                    }
                >
                    {/* Background Container - Rounded & Clipped (Desktop Only / Global Parent) */}
                    <div className={`absolute inset-0 -z-10 h-full w-full overflow-hidden rounded-[2.5rem]${depth ? " bg-black" : ""}`}>
                        {/* Far layer (desktop only): the tunnel you slide into */}
                        {depth && <DepthTunnel progress={travel} />}
                        {/* Slow drifting light; carries the atmosphere on phones, where there's no tunnel */}
                        {!depth && <div className="connect-aurora absolute inset-0" />}
                        {/* Near layer: dots; on desktop they clear around the vanishing point so the depth shows */}
                        <motion.div
                            style={{ y }}
                            className={
                                depth
                                    ? "absolute inset-x-0 -top-[20%] h-[140%] w-full opacity-80 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_38%,transparent_35%,black_90%)]"
                                    : "absolute inset-x-0 -top-[20%] h-[140%] w-full opacity-60 [mask-image:linear-gradient(to_bottom,transparent_8%,black_30%)]"
                            }
                        >
                            <DottedGlowBackground
                                color="rgba(255, 255, 255, 0.5)"
                                glowColor="rgba(255, 255, 255, 1)"
                                gap={15}
                                speedMin={0.5}
                                speedMax={1.5}
                            />
                        </motion.div>
                    </div>

                    {/* Fine highlight along the top edge, like light catching a glass rim */}
                    <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <div className="grid gap-4 lg:gap-0 lg:grid-cols-[1.5fr,1fr]">
                        {/* Left Column: Form */}
                        <div className="p-6 sm:p-8 lg:p-10 lg:border-r lg:border-white/10">
                            <div className="mb-6">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z" /></svg>
                                </div>
                                <h3 className="mb-2 text-2xl font-semibold text-white">
                                    Start Your Project
                                </h3>
                                <p className="text-base text-zinc-400">
                                    Let us know how we can help bring{" "}
                                    <span className="text-white">your idea to life.</span>
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="group/field space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="group/field space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className="w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="group/field space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                            Country
                                        </label>
                                        <div className="relative">
                                            {isOtherCountry ? (
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        placeholder="Enter Country"
                                                        autoFocus
                                                        className="w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleRevertCountry}
                                                        aria-label="Clear country"
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <select
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                                    >
                                                        <option value="">Select Country</option>
                                                        {countryList.map((country) => (
                                                            <option key={country} value={country}>
                                                                {country}
                                                            </option>
                                                        ))}
                                                        <option value="Others">Others</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="group/field space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                            Phone
                                        </label>
                                        <div className="rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 focus-within:border-white/40 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-white/[0.06]">
                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                value={formData.phone}
                                                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value || "" }))}
                                                defaultCountry="IN"
                                                className="bg-transparent outline-none border-none w-full"
                                                numberInputProps={{
                                                    className: "bg-transparent outline-none border-none text-zinc-200 placeholder:text-zinc-500 w-full"
                                                }}
                                            />
                                        </div>
                                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="group/field space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                            Project Type
                                        </label>
                                        <div className="relative">
                                            {isOtherProjectType ? (
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="projectType"
                                                        value={formData.projectType}
                                                        onChange={handleChange}
                                                        placeholder="Enter Project Type"
                                                        autoFocus
                                                        className="w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleRevertProjectType}
                                                        aria-label="Clear project type"
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <select
                                                        name="projectType"
                                                        value={formData.projectType}
                                                        onChange={handleChange}
                                                        className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="Web Design & Development">Web Design & Development</option>
                                                        <option value="App Design & Development">App Design & Development</option>
                                                        <option value="AI Automation">AI Automation</option>
                                                        <option value="AI Integration">AI Integration</option>
                                                        <option value="AI Workflow">AI Workflow</option>
                                                        <option value="Others">Others</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        {errors.projectType && <p className="text-xs text-red-500">{errors.projectType}</p>}
                                    </div>
                                    <div className="group/field space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                            Number of pages
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="numberOfPages"
                                                value={formData.numberOfPages}
                                                onChange={handleChange}
                                                className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                            >
                                                <option value="">Select...</option>
                                                <option value="1-5">1-5</option>
                                                <option value="5-10">5-10</option>
                                                <option value="10-20">10-20</option>
                                                <option value="20+">20+</option>
                                            </select>
                                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                        Budget range
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {budgetOptions.map((option) => (
                                            <button
                                                type="button"
                                                key={option}
                                                onClick={() => handleBudgetChange(option)}
                                                aria-pressed={formData.budget === option}
                                                className={`relative rounded-full border px-5 py-2 text-xs font-medium transition-colors duration-300 ${formData.budget === option
                                                    ? "border-white text-black"
                                                    : "border-white/10 bg-zinc-950/90 text-zinc-300 hover:border-white/25 hover:text-white"
                                                    }`}
                                            >
                                                {formData.budget === option && (
                                                    <motion.span
                                                        layoutId="budget-pill"
                                                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                                        className="absolute inset-0 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.25)]"
                                                    />
                                                )}
                                                <span className="relative">{option}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="group/field space-y-1.5 pt-1">
                                    <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                        What do you need help with?
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us what you're looking to create..."
                                            rows={2}
                                            className="w-full rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 hover:border-white/20 placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/[0.06]"
                                        />
                                        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <label className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-300 group-focus-within/field:text-white">
                                        Preferred Response Method
                                    </label>
                                    <div className="flex gap-6">
                                        <label className="flex cursor-pointer items-center gap-2" onClick={() => handleMethodChange("email")}>
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${formData.preferredResponseMethod === "email" ? "border-white" : "border-white/20"}`}>
                                                {formData.preferredResponseMethod === "email" && (
                                                    <motion.div layoutId="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                                                )}
                                            </div>
                                            <span className={`text-sm transition-colors ${formData.preferredResponseMethod === "email" ? "text-white" : "text-zinc-400"}`}>Email</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2" onClick={() => handleMethodChange("whatsapp")}>
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${formData.preferredResponseMethod === "whatsapp" ? "border-white" : "border-white/20"}`}>
                                                {formData.preferredResponseMethod === "whatsapp" && (
                                                    <motion.div layoutId="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                                                )}
                                            </div>
                                            <span className={`text-sm transition-colors ${formData.preferredResponseMethod === "whatsapp" ? "text-white" : "text-zinc-400"}`}>WhatsApp</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-2 text-center">
                                    {status === "success" && (
                                        <p className="mb-2 text-sm text-green-400">Thanks! We’ll contact you shortly.</p>
                                    )}
                                    {status === "error" && (
                                        <p className="mb-2 text-sm text-red-400">Something went wrong. Please try again.</p>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={status === "sending"}
                                        className="submit-sheen group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-12px_rgba(255,255,255,0.45)] transition-shadow duration-500 hover:shadow-[0_14px_50px_-10px_rgba(255,255,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {status === "sending" ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                                                Sending…
                                            </>
                                        ) : status === "success" ? (
                                            <>
                                                <IconCheck size={16} stroke={2.5} />
                                                Sent. Talk soon
                                            </>
                                        ) : (
                                            <>
                                                Send enquiry
                                                <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Info - Sticky Behavior */}
                        <div className="relative p-6 sm:p-8 lg:p-10">
                            <div className="static lg:sticky lg:top-24 space-y-8 flex flex-col justify-between">
                                <div className="space-y-8">
                                    {/* Availability */}
                                    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                        </span>
                                        {CONTACT_ASIDE.availability}
                                    </div>

                                    {/* Email */}
                                    <div className="group">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                                            <IconMail size={16} />
                                        </div>
                                        <h4 className="mb-1 text-xs font-medium text-zinc-400">Email us for collaborations</h4>
                                        <Link href="mailto:contact@flucks.in" className="text-lg font-medium text-white underline decoration-white/0 underline-offset-4 transition-colors hover:decoration-white/60">contact@flucks.in</Link>
                                    </div>

                                    {/* WhatsApp */}
                                    {/* <div className="group">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                                            <IconBrandWhatsapp size={16} />
                                        </div>
                                        <h4 className="mb-1 text-xs font-medium text-zinc-400">WhatsApp</h4>
                                        <Link href="#" className="text-lg font-medium text-white transition-colors hover:text-emerald-400">+91 9278388499</Link>
                                    </div> */}

                                    {/* Location */}
                                    <div className="group">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                                            <IconMapPin size={16} />
                                        </div>
                                        <h4 className="mb-1 text-xs font-medium text-zinc-400">Visit us</h4>
                                        <p className="text-lg font-medium text-white">India — Working globally</p>
                                    </div>
                                </div>

                                {/* What happens next */}
                                <div className="border-t border-white/10 pt-8">
                                    <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">What happens next</h4>
                                    <ol className="relative space-y-5 border-l border-white/10 pl-6">
                                        {CONTACT_ASIDE.nextSteps.map((step, i) => (
                                            <li key={step.title} className="relative">
                                                <span className="absolute -left-[31px] top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white/20 bg-black font-mono text-[8px] text-zinc-400">
                                                    {i + 1}
                                                </span>
                                                <p className="text-sm font-medium leading-none text-white">{step.title}</p>
                                                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{step.detail}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Footer Links */}
                                <div className="mt-8 lg:mt-12 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white hover:underline"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                </div>
            </div>
        </section>
    );
};
