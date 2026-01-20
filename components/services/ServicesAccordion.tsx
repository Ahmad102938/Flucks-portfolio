"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

interface ServicesAccordionProps {
    items: string[];
}

export const ServicesAccordion = ({ items }: ServicesAccordionProps) => {
    // Optional: Keep track of open items if we want multiply open. 
    // Here we'll just allow toggle on click. 
    // Usually services list is just a list, but user requested Accordion items.
    // If strict compliance with screenshot: screenshot shows items listed with a visually distinct arrow/chevron or underline.
    // I will implementation individual items that are collapsible or just list items that look interactive.
    // Re-reading request: "Accordion list of sub-services (expand/collapse)"
    // Okay, so each sub-service itself might have content? 
    // The data structure provided was just strings: "Web UI/UX Design".
    // If there's no description for sub-service, an accordion doesn't make sense unless it expands to show details not present in data
    // OR the list itself is the content of the accordion, i.e. the "Service Block" has an accordion.
    // Re-reading again: "Accordion list of sub-services". 
    // It's likely the user means the sub-services ARE the list items. 
    // I'll make them expandable but since I don't have descriptions for them in the data I essentially just built, 
    // I will render them as a sleek list where maybe hovering/clicking highlights them.
    // WAIT, "Accordion items: Web UI/UX Design...". 
    // Standard pattern: Heading is the service, Accordion expands to show the Sub-services.
    // BUT the mockup has the subservices listed plain sight? 
    // Let's look closer at the prompt: "Service Title... Description... Accordion list of sub-services".
    // I will presume the user might want to click a sub-service to see a placeholder detail or just treating it as a list.
    // A better interpretation for the "Neon Labs" style: The MAIN BLOCKS are fixed. The SUB SERVICES are the list.
    // Sometimes people say "Accordion" when they mean "List with chevrons".
    // Let's implement it as a List where clicking might just toggle a "active" unique state or purely visual.
    // ACTUALLY, to be safe and responsive to "expand/collapse", I will make the *entire list* collapsible?
    // No, standard is: Click "Web UI/UX Design" -> Shows small text underneath.
    // Since I don't have text, I will auto-generate a generic description or just make the list item itself interactive. 
    // Let's go with: List items that display a chevron and slightly expand to show a generic "Available" text or similar to demonstrate mechanic safely.

    // Better approach: Just list them with a nice border-bottom and a chevron that rotates on hover.

    return (
        <div className="w-full flex flex-col border-t border-white/10 mt-8">
            {items.map((item, idx) => (
                <AccordionItem key={idx} title={item} />
            ))}
        </div>
    );
};

const AccordionItem = ({ title }: { title: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between group text-left outline-none"
            >
                <span className={`text-base md:text-lg transition-colors duration-300 ${isOpen ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                    {title}
                </span>
                <span className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-zinc-600 group-hover:text-white"}`}>
                    <IconChevronDown size={20} />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-4 text-sm text-zinc-500 leading-relaxed pl-2 border-l-2 border-slate-700 ml-1">
                            {/* Placeholder description since we only have titles in the prompt requirements */}
                            Comprehensive solutions for {title} tailored to your business needs, ensuring high quality and performance.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
