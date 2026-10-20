import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";
import { getWorks } from "@/lib/works";
import { ALL_SERVICE_PAGES, SERVICE_PAGES, getServicePage, relatedServicePages } from "@/constants/service-pages";
import { isInProgress } from "@/constants/projects";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { FadeUp } from "@/components/case-study/case-study-motion";
import { ContactButton } from "@/components/services/contact-button";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import {
    DrawLine,
    FaqAccordion,
    HeadlineReveal,
    Reveal,
    StaggerItem,
    StaggerList,
} from "@/components/services/service-motion";

// Related case studies come from Cloudinary, refreshed hourly like /works
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
    return ALL_SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const page = getServicePage((await params).slug);
    if (!page) return {};
    return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/services/${page.slug}` });
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ServiceLandingPage({ params }: { params: Promise<{ slug: string }> }) {
    const page = getServicePage((await params).slug);
    if (!page) notFound();

    const index = SERVICE_PAGES.indexOf(page);
    const parent = page.parent ? getServicePage(page.parent) : null;
    const works = await getWorks();
    const related = page.relatedProjects
        .map((slug) => works.find((work) => work.slug === slug))
        .filter((work): work is NonNullable<typeof work> => !!work && !isInProgress(work.slug));
    const otherServices = relatedServicePages(page);
    const path = `/services/${page.slug}`;

    return (
        <main className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <JsonLd
                data={[
                    serviceSchema(page),
                    faqSchema(page.faqs),
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Services", path: "/services" },
                        ...(parent ? [{ name: parent.name, path: `/services/${parent.slug}` }] : []),
                        { name: page.name, path },
                    ]),
                ]}
            />
            <SiteHeader />

            <div className="pt-32 pb-12">
                {/* 1. Opening */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                        <nav aria-label="Breadcrumb">
                            <ol className="flex items-center gap-2">
                                <li>
                                    <Link href="/" className="transition-colors hover:text-white">Home</Link>
                                </li>
                                <li aria-hidden className="text-zinc-700">/</li>
                                <li>
                                    <Link href="/services" className="transition-colors hover:text-white">Services</Link>
                                </li>
                                {parent && (
                                    <>
                                        <li aria-hidden className="hidden text-zinc-700 md:block">/</li>
                                        <li className="hidden md:block">
                                            <Link href={`/services/${parent.slug}`} className="transition-colors hover:text-white">{parent.name}</Link>
                                        </li>
                                    </>
                                )}
                                <li aria-hidden className="hidden text-zinc-700 sm:block">/</li>
                                <li aria-current="page" className="hidden text-white sm:block">{page.name}</li>
                            </ol>
                        </nav>
                        {parent ? (
                            <span className="whitespace-nowrap">Specialist service</span>
                        ) : (
                            <span className="whitespace-nowrap">
                                Service <span className="text-white">{pad(index + 1)}</span>
                                <span className="text-zinc-700"> / {pad(SERVICE_PAGES.length)}</span>
                            </span>
                        )}
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-zinc-500 md:mt-14">{page.name}</p>
                    </FadeUp>
                    <HeadlineReveal
                        text={page.headline}
                        className="mt-5 max-w-5xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
                    />

                    <div className="mt-12 grid grid-cols-1 items-end gap-10 border-b border-white/10 pb-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:mt-16 md:pb-24">
                        <FadeUp delay={0.35}>
                            <p className="max-w-2xl text-xl font-light leading-relaxed text-zinc-300 md:text-2xl">{page.intro}</p>
                        </FadeUp>
                        <FadeUp delay={0.5} className="flex flex-wrap gap-4 lg:justify-end">
                            <ContactButton />
                            <Link
                                href="/works"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
                            >
                                See our work
                            </Link>
                        </FadeUp>
                    </div>
                </section>

                {/* 2. What we do */}
                <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                    <Reveal className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
                        <h2 className="font-serif text-4xl leading-tight md:text-6xl">What we do</h2>
                        <p className="max-w-md text-zinc-400">
                            One team of designers and engineers, from first idea to long-term support.
                        </p>
                    </Reveal>
                    <StaggerList className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                        {page.offerings.map((offering, i) => (
                            <StaggerItem key={offering.title} className="group relative flex flex-col gap-4 bg-black p-8 transition-colors duration-700 hover:bg-zinc-950 md:p-10">
                                {/* Soft light that gathers in the corner on hover */}
                                <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.06] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                                <span className="font-mono text-xs text-zinc-600 transition-colors duration-500 group-hover:text-zinc-400">{pad(i + 1)}</span>
                                <h3 className="font-serif text-2xl text-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 md:text-3xl">
                                    {offering.title}
                                </h3>
                                <p className="leading-relaxed text-zinc-400">{offering.description}</p>
                            </StaggerItem>
                        ))}
                    </StaggerList>
                </section>

                {/* 3. How we work */}
                <section className="border-y border-white/10 bg-zinc-950/40">
                    <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                        <Reveal as="h2" className="mb-12 font-serif text-4xl leading-tight md:mb-16 md:text-6xl">How we work</Reveal>
                        <StaggerList as="ol" className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                            {page.process.map((step, i) => (
                                <StaggerItem key={step.title} className="flex flex-col gap-4">
                                    <DrawLine delay={0.15 + i * 0.12} className="mb-2" />
                                    <span
                                        aria-hidden
                                        className="font-serif text-6xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]"
                                    >
                                        {pad(i + 1)}
                                    </span>
                                    <h3 className="text-xl font-medium text-white">{step.title}</h3>
                                    <p className="leading-relaxed text-zinc-400">{step.description}</p>
                                </StaggerItem>
                            ))}
                        </StaggerList>
                        <Reveal className="mt-16 flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                            <h3 className="shrink-0 text-xs uppercase tracking-widest text-zinc-500">Tools we use</h3>
                            <ul className="flex flex-wrap gap-2">
                                {page.stack.map((tool) => (
                                    <li key={tool} className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-200">
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </section>

                {/* 4. Proof: related case studies */}
                {related.length > 0 && (
                    <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                        <Reveal className="mb-12 flex items-end justify-between gap-6 md:mb-16">
                            <h2 className="font-serif text-4xl leading-tight md:text-6xl">Selected work</h2>
                            <Link href="/works" className="whitespace-nowrap text-sm text-zinc-400 transition-colors hover:text-white">
                                All case studies →
                            </Link>
                        </Reveal>
                        <StaggerList className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {related.map((work) => (
                                <StaggerItem key={work.slug}>
                                    <Link href={`/works/${work.slug}`} data-cursor="View" className="group block">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-white/25">
                                            <Image
                                                src={work.image}
                                                alt={`${work.title}: ${work.category} by Flucks`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="mt-5 flex items-start justify-between gap-4 px-1">
                                            <div>
                                                <h3 className="text-xl font-medium text-white">{work.title}</h3>
                                                <p className="mt-1 text-sm text-zinc-500">{work.category}</p>
                                            </div>
                                            <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
                                        </div>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerList>
                    </section>
                )}

                {/* 5. Questions people ask (also marked up as FAQ data for search engines) */}
                <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
                        <Reveal as="h2" className="font-serif text-4xl leading-tight md:text-6xl lg:sticky lg:top-32 lg:self-start">
                            Questions, answered
                        </Reveal>
                        <FaqAccordion faqs={page.faqs} />
                    </div>
                </section>

                {/* 6. The other services */}
                <section className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
                        <Reveal as="h2" className="mb-10 text-xs uppercase tracking-[0.25em] text-zinc-500">More from Flucks</Reveal>
                        <StaggerList className="divide-y divide-white/10 border-y border-white/10">
                            {otherServices.map((other) => (
                                <StaggerItem key={other.slug}>
                                    <Link href={`/services/${other.slug}`} className="group flex items-center justify-between gap-6 py-6 md:py-8">
                                        <span className="font-serif text-3xl text-zinc-300 transition-all duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-white md:text-5xl">
                                            {other.name}
                                        </span>
                                        <ArrowUpRight className="h-6 w-6 shrink-0 text-zinc-600 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerList>
                    </div>
                </section>

                <ServicesCTA />
            </div>

            <SiteFooter />
        </main>
    );
}
