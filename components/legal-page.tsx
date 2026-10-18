import React from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalToc } from "@/components/legal-toc";
import { CONTACT_EMAIL } from "@/constants/site";
import { LEGAL_DOCUMENTS, type LegalDocument } from "@/constants/legal";

/** Turns the contact email inside a sentence into a mailto link. */
const withEmailLink = (text: string) => {
    const parts = text.split(CONTACT_EMAIL);
    return parts.map((part, i) => (
        <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
                <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                >
                    {CONTACT_EMAIL}
                </a>
            )}
        </React.Fragment>
    ));
};

export const LegalPage = ({ doc }: { doc: LegalDocument }) => {
    const others = LEGAL_DOCUMENTS.filter((d) => d.slug !== doc.slug);

    return (
        <main className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30">
            <SiteHeader />

            {/* Hero */}
            <section className="relative w-full overflow-hidden px-6 pb-12 pt-32 text-white sm:pt-40 md:px-12">
                <div className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.svg')] bg-repeat opacity-[0.03] mix-blend-overlay"></div>

                <div className="relative z-10 mx-auto w-full max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-2 w-2 rounded-full bg-white/40"></span>
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                            FLUCKS / {doc.label}
                        </span>
                    </div>

                    <h1 className="text-[13vw] font-medium leading-[0.9] tracking-tight text-white md:text-[7rem]">
                        {doc.title}
                    </h1>

                    <div className="mt-12 grid items-end gap-8 border-t border-white/10 pt-10 md:mt-16 md:grid-cols-[240px_1fr] md:gap-12 lg:gap-24">
                        <p className="text-sm text-zinc-500">
                            Last updated
                            <span className="mt-1 block text-zinc-300">{doc.lastUpdated}</span>
                        </p>
                        <p className="max-w-3xl text-xl font-normal leading-snug text-slate-200 md:text-2xl">
                            {doc.summary}
                        </p>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="w-full px-6 py-16 md:px-12 md:py-24">
                <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[240px_1fr] lg:gap-24">
                    <aside className="hidden md:block">
                        <div className="sticky top-32">
                            <LegalToc items={doc.sections.map(({ id, heading }) => ({ id, heading }))} />
                        </div>
                    </aside>

                    <article className="flex flex-col">
                        {doc.sections.map((section, idx) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-32 border-t border-white/10 py-10 first:border-t-0 first:pt-0 md:py-12"
                            >
                                <div className="mb-5 flex items-baseline gap-4">
                                    <span className="font-mono text-xs text-zinc-600">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="text-2xl font-normal tracking-tight text-white md:text-3xl">
                                        {section.heading}
                                    </h2>
                                </div>

                                <div className="flex max-w-2xl flex-col gap-4 pl-0 md:pl-9">
                                    {section.blocks.map((block, i) =>
                                        typeof block === "string" ? (
                                            <p key={i} className="text-base leading-relaxed text-zinc-400 md:text-lg">
                                                {withEmailLink(block)}
                                            </p>
                                        ) : (
                                            <ul key={i} className="flex flex-col gap-3">
                                                {block.map((item, j) => (
                                                    <li
                                                        key={j}
                                                        className="flex gap-3 text-base leading-relaxed text-zinc-400 md:text-lg"
                                                    >
                                                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-white/30"></span>
                                                        <span>{withEmailLink(item)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    )}
                                </div>
                            </section>
                        ))}
                    </article>
                </div>
            </section>

            {/* Other documents */}
            <section className="w-full border-t border-white/10 px-6 py-16 md:px-12 md:py-20">
                <div className="mx-auto w-full max-w-7xl">
                    <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Other documents</p>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {others.map((other) => (
                            <Link
                                key={other.slug}
                                href={`/${other.slug}`}
                                className="group flex items-center justify-between rounded-2xl border border-white/10 px-6 py-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.03]"
                            >
                                <span className="text-lg text-white">{other.label}</span>
                                <IconArrowUpRight className="h-5 w-5 text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
};
