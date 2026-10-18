import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Building2, Calendar, Clock, Layers, Monitor } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
    CaseHeroMedia,
    CountUp,
    FadeUp,
    NextProject,
    ReadingProgress,
    RevealRow,
    ScrollQuote,
    StoryChapter,
    TitleReveal,
    type RevealRowItem,
} from "@/components/case-study/case-study-motion";
import { InProgressBadge, InProgressNotice } from "@/components/case-study/in-progress-notice";
import { getProjectContent, isInProgress, type GalleryItem } from "@/constants/projects";
import { getLocalImageRatio } from "@/lib/image-size";
import { getWorks, getWorkWithNext, toExternalUrl } from "@/lib/works";

// Projects come from Cloudinary (refreshed hourly, like /works); new slugs render on first visit
export const revalidate = 3600;

export async function generateStaticParams() {
    return (await getWorks()).map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const found = await getWorkWithNext(slug);
    if (!found) return {};
    const { work } = found;
    return pageMetadata({
        title: work.title,
        description:
            getProjectContent(work.slug)?.summary ||
            (isInProgress(work.slug)
                ? `${work.title} is currently in development at Flucks.`
                : `${work.title}: ${work.category} by Flucks.`),
        path: `/works/${work.slug}`,
    });
}

// Let Cloudinary serve a compressed, browser-appropriate encoding
const optimizedVideoUrl = (url: string) =>
    url.includes("res.cloudinary.com") && url.includes("/upload/v")
        ? url.replace("/upload/", "/upload/q_auto,f_auto/")
        : url;

const filled = (value: string | undefined): value is string => !!value?.trim();

// Anything at least this much wider than tall gets a row to itself
const WIDE_RATIO = 1.15;

/**
 * Lays the gallery out in rows: wide shots alone, and runs of tall (phone) screens grouped side by
 * side, at most three to a row and split evenly (four become two pairs, five become three and two).
 */
function toRows(items: RevealRowItem[]): RevealRowItem[][] {
    const rows: RevealRowItem[][] = [];
    let tall: RevealRowItem[] = [];
    const flushTall = () => {
        const count = Math.ceil(tall.length / 3);
        for (let i = 0; i < count; i++) {
            rows.push(tall.slice(Math.round((i * tall.length) / count), Math.round(((i + 1) * tall.length) / count)));
        }
        tall = [];
    };
    for (const item of items) {
        if ((item.ratio ?? 16 / 9) >= WIDE_RATIO) {
            flushTall();
            rows.push([item]);
        } else {
            tall.push(item);
        }
    }
    flushTall();
    return rows;
}

export default async function WorkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const found = await getWorkWithNext(slug);
    if (!found) notFound();

    // Cloudinary gives the basics; constants/projects.ts adds the case study where it's been written
    const { work, next, index, total } = found;
    const content = getProjectContent(work.slug);
    const inProgress = isInProgress(work.slug);

    // Nothing to preview yet while a project is still being built
    const liveUrl = inProgress ? null : toExternalUrl(content?.liveUrl || work.link);
    const hero = filled(content?.heroMedia.url)
        ? content.heroMedia
        : { type: "image" as const, url: work.image };

    const facts = [
        { icon: Building2, label: "Client", value: content?.client },
        { icon: Briefcase, label: "Industry", value: content?.industry },
        { icon: Calendar, label: "Year", value: content?.year },
        { icon: Clock, label: "Duration", value: content?.duration },
        { icon: Monitor, label: "Platform", value: content?.platform },
    ].filter((fact): fact is typeof fact & { value: string } => filled(fact.value));

    // A list, so it gets its own line of chips instead of a cramped column in the facts row
    const services = (content?.services ?? []).filter(filled);

    const metrics = (content?.metrics ?? []).filter((m) => filled(m.value) && filled(m.label)).slice(0, 4);

    // The story as chapters, with a gallery image after each one and any remaining images after the last
    const chapters = [
        { title: "The challenge", paragraphs: content?.story.challenge ?? [] },
        { title: "Our approach", paragraphs: content?.story.approach ?? [] },
        { title: "The result", paragraphs: content?.story.result ?? [] },
    ]
        .map((c) => ({ ...c, paragraphs: c.paragraphs.filter(filled) }))
        .filter((c) => c.paragraphs.length > 0);
    const gallery: RevealRowItem[] = await Promise.all(
        (content?.gallery ?? [])
            .filter((item: GalleryItem) => filled(item.url))
            .map(async (item: GalleryItem) => ({
                type: item.type,
                url: item.type === "video" ? optimizedVideoUrl(item.url) : item.url,
                alt: item.caption ?? `${work.title} screen`,
                caption: item.caption,
                // Local images are measured so their frame fits them; videos and remote media use 16:9
                ratio: item.type === "image" ? ((await getLocalImageRatio(item.url)) ?? undefined) : undefined,
            })),
    );
    const rows = toRows(gallery);
    const afterChapter = (i: number): RevealRowItem[][] =>
        i < chapters.length - 1 ? rows.slice(i, i + 1) : rows.slice(i);

    const testimonial = content && filled(content.testimonial.quote) ? content.testimonial : null;
    const hasStory = chapters.length > 0 || gallery.length > 0;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <ReadingProgress />
            <SiteHeader />

            <main className="pt-32 pb-24">
                {/* 1. Opening: case-study bar, title, summary, then the hero shot */}
                <section className="container mx-auto mb-12 space-y-14 px-4 sm:px-6 lg:px-8">
                    <div className="pt-6 md:pt-10">
                        <FadeUp className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                            <span className="flex items-center gap-4">
                                <span className="whitespace-nowrap">
                                    Case study <span className="text-white">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="text-zinc-700"> / {String(total).padStart(2, "0")}</span>
                                </span>
                                {inProgress && <InProgressBadge className="hidden whitespace-nowrap md:inline-flex" />}
                            </span>
                            <span className="hidden md:block">{work.category}</span>
                            <span>{content?.year.trim()}</span>
                        </FadeUp>
                        {inProgress && (
                            <FadeUp delay={0.1} className="mt-6 md:hidden">
                                <InProgressBadge />
                            </FadeUp>
                        )}

                        <TitleReveal
                            text={work.title}
                            className="mt-10 font-serif text-[16vw] leading-[0.85] tracking-tighter md:mt-14 md:text-[10rem] lg:text-[12.5rem]"
                        />
                    </div>

                    <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                        <FadeUp delay={0.55}>
                            <span className="mb-4 block text-xs uppercase tracking-[0.25em] text-zinc-500 md:hidden">{work.category}</span>
                            <p className="max-w-2xl text-xl font-light leading-relaxed text-zinc-300 md:text-2xl">
                                {content?.summary.trim() ||
                                    (inProgress ? "Being built in the studio right now." : work.category)}
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.7} className="flex flex-wrap gap-4 lg:justify-end">
                            {liveUrl && (
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-zinc-200"
                                >
                                    <span>Preview site</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            )}
                            <Link
                                href="/works"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
                            >
                                <span>See all work</span>
                            </Link>
                        </FadeUp>
                    </div>

                    <CaseHeroMedia
                        type={hero.type}
                        url={hero.type === "video" ? optimizedVideoUrl(hero.url) : hero.url}
                        alt={`${work.title} project`}
                    />

                    {/* Facts */}
                    {(facts.length > 0 || services.length > 0) && (
                        <div className="divide-y divide-white/10 border-y border-white/10">
                            {facts.length > 0 && (
                                <dl className="flex flex-wrap justify-center gap-y-8 py-10 text-center">
                                    {facts.map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex basis-1/2 flex-col items-center gap-3 px-2 md:flex-1 md:basis-0">
                                            <Icon className="mb-1 h-5 w-5 text-zinc-500" />
                                            <dt className="order-last text-xs uppercase tracking-widest text-zinc-500">{label}</dt>
                                            <dd className="font-serif text-xl font-medium md:text-2xl">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                            {services.length > 0 && (
                                <div className="flex flex-col items-center gap-5 py-8 md:flex-row md:justify-center md:gap-8">
                                    <span className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
                                        <Layers className="h-4 w-4" />
                                        Services
                                    </span>
                                    <ul className="flex flex-wrap justify-center gap-2">
                                        {services.map((service) => (
                                            <li
                                                key={service}
                                                className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-200"
                                            >
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Headline numbers */}
                    {metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="flex flex-col gap-2 bg-black px-6 py-8 md:py-10">
                                    <CountUp value={metric.value} className="font-serif text-4xl text-white md:text-6xl" />
                                    <span className="text-sm text-zinc-400">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* 2. The story, chapter by chapter, with the work revealed in between */}
                <section className="container mx-auto mb-24 px-4 sm:px-6 lg:px-8">
                    {chapters.map((chapter, i) => (
                        <React.Fragment key={chapter.title}>
                            <StoryChapter index={i + 1} title={chapter.title} paragraphs={chapter.paragraphs} />
                            {afterChapter(i).map((row, j) => (
                                <RevealRow key={`${i}-${j}`} items={row} className="mb-16 md:mb-24" />
                            ))}
                        </React.Fragment>
                    ))}

                    {/* Images without any written story yet */}
                    {chapters.length === 0 &&
                        rows.map((row, j) => <RevealRow key={j} items={row} className="mb-16 md:mb-24" />)}

                    {inProgress && !hasStory && <InProgressNotice title={work.title} />}

                    {!inProgress && !hasStory && (
                        <p className="mx-auto max-w-xl py-10 text-center text-lg text-zinc-500">
                            The full case study is on its way.
                            {liveUrl && " In the meantime, the project is live to explore."}
                        </p>
                    )}

                    {testimonial && (
                        <ScrollQuote quote={testimonial.quote} name={testimonial.name} role={testimonial.role} />
                    )}
                </section>

                {/* 3. Next project, in the same order as the /works grid */}
                {next && (
                    <section className="border-t border-white/10">
                        <div className="container mx-auto px-4 py-24 sm:px-6 md:py-32 lg:px-8">
                            <NextProject href={`/works/${next.slug}`} title={next.title} category={next.category} image={next.image} />
                        </div>
                    </section>
                )}
            </main>

            <SiteFooter />
        </div>
    );
}
