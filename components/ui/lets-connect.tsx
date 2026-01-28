"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IconMail, IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
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
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
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

                {/* Main Card Wrapper */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-xl"
                >
                    {/* Background Container - Rounded & Clipped (Desktop Only / Global Parent) */}
                    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden rounded-[2.5rem]">
                        <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full">
                            <DottedGlowBackground
                                color="rgba(255, 255, 255, 0.4)"
                                glowColor="rgba(255, 255, 255, 1)"
                                gap={15}
                                speedMin={0.5}
                                speedMax={1.5}
                            />
                        </motion.div>
                    </div>

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
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-500 focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-500 focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">
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
                                                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-500 focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleRevertCountry}
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
                                                        className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
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
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">
                                            Phone
                                        </label>
                                        <div className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all focus-within:bg-zinc-800 focus-within:border-white focus-within:ring-2 focus-within:ring-white/20">
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
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">
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
                                                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-500 focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleRevertProjectType}
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
                                                        className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
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
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">
                                            Number of pages
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="numberOfPages"
                                                value={formData.numberOfPages}
                                                onChange={handleChange}
                                                className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
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
                                    <label className="text-xs font-medium text-white">
                                        Budget range
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {budgetOptions.map((option) => (
                                            <button
                                                type="button"
                                                key={option}
                                                onClick={() => handleBudgetChange(option)}
                                                className={`rounded-full border px-5 py-2 text-xs font-medium transition-all duration-300 ${formData.budget === option
                                                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                                                    : "border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                    <label className="text-xs font-medium text-white">
                                        What do you need help with?
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us what you're looking to create..."
                                            rows={2}
                                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-500 focus:bg-zinc-800 focus:border-white focus:ring-2 focus:ring-white/20"
                                        />
                                        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <label className="text-xs font-medium text-white">
                                        Preferred Response Method
                                    </label>
                                    <div className="flex gap-6">
                                        <label className="flex cursor-pointer items-center gap-2" onClick={() => handleMethodChange("email")}>
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${formData.preferredResponseMethod === "email" ? "border-cyan-500" : "border-white/20"}`}>
                                                {formData.preferredResponseMethod === "email" && (
                                                    <motion.div layoutId="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                                                )}
                                            </div>
                                            <span className={`text-sm transition-colors ${formData.preferredResponseMethod === "email" ? "text-white" : "text-zinc-400"}`}>Email</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2" onClick={() => handleMethodChange("whatsapp")}>
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${formData.preferredResponseMethod === "whatsapp" ? "border-emerald-500" : "border-white/20"}`}>
                                                {formData.preferredResponseMethod === "whatsapp" && (
                                                    <motion.div layoutId="radio-indicator" className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
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
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={status === "sending"}
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-black transition-colors hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "sending" ? "Sending..." : "Submit"}
                                    </motion.button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Info - Sticky Behavior */}
                        <div className="relative p-6 sm:p-8 lg:p-10">
                            <div className="static lg:sticky lg:top-24 space-y-8 flex flex-col justify-between">
                                <div className="space-y-8">
                                    {/* Email */}
                                    <div className="group">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                                            <IconMail size={16} />
                                        </div>
                                        <h4 className="mb-1 text-xs font-medium text-zinc-400">Give us a Mail/collaboration</h4>
                                        <Link href="mailto:contact@flucks.in" className="text-lg font-medium text-white transition-colors hover:text-cyan-400">flucks.dev@gmail.com</Link>
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
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-400">
                                            <IconMapPin size={16} />
                                        </div>
                                        <h4 className="mb-1 text-xs font-medium text-zinc-400">Visit us</h4>
                                        <p className="text-lg font-medium text-white">India - Working globally</p>
                                    </div>
                                </div>

                                {/* Footer Links */}
                                <div className="mt-8 lg:mt-12 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                                    <Link href="https://www.facebook.com/flucksCo" className="hover:text-white hover:underline">Facebook</Link>
                                    <Link href="https://www.instagram.com/flucksCo" className="hover:text-white hover:underline">Instagram</Link>
                                    <Link href="https://www.linkedin.com/in/md-masum-ahmad-36a474265/" className="hover:text-white hover:underline">LinkedIn</Link>
                                    <Link href="https://x.com/flucksCo" className="hover:text-white hover:underline">Twitter</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
