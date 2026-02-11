import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProject } from "@/constants/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Briefcase, Calendar, Copy, Monitor, Eye } from "lucide-react";

export default async function WorkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <SiteHeader />

            <main className="pt-32 pb-24">
                {/* 1. Visuvate-style Hero Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-16">

                    {/* Centered Massive Title */}
                    <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
                        <h1 className="font-serif text-[15vw] leading-[0.8] tracking-tighter md:text-[12rem] lg:text-[14rem] animate-in fade-in slide-in-from-bottom-8 duration-700">
                            {project.title}
                        </h1>
                    </div>

                    {/* Project Overview + Actions Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end border-b border-white/10 pb-16">
                        <div className="space-y-6 max-w-2xl">
                            <h2 className="text-xl font-medium text-white">Project Overview</h2>
                            <p className="text-xl md:text-2xl font-light text-zinc-400 leading-relaxed">
                                {project.shortDescription}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 lg:justify-end">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-cyan-400 transition-colors"
                                >
                                    <span>Preview site</span>
                                    <Eye className="w-4 h-4" />
                                </a>
                            )}
                            <Link
                                href="/works"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                            >
                                <span>See all work</span>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Bar with Icons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-white/10 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <Briefcase className="w-5 h-5 text-cyan-400 mb-1" />
                            <div className="text-2xl font-serif font-medium">{project.stats.industry}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500">Industry</div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Calendar className="w-5 h-5 text-cyan-400 mb-1" />
                            <div className="text-2xl font-serif font-medium">{project.stats.year}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500">Created</div>
                        </div>
                        {project.stats.pages && (
                            <div className="flex flex-col items-center gap-3">
                                <Copy className="w-5 h-5 text-cyan-400 mb-1" />
                                <div className="text-2xl font-serif font-medium">{project.stats.pages}</div>
                                <div className="text-xs uppercase tracking-widest text-zinc-500">Pages</div>
                            </div>
                        )}
                        <div className="flex flex-col items-center gap-3">
                            <Monitor className="w-5 h-5 text-cyan-400 mb-1" />
                            <div className="text-2xl font-serif font-medium">{project.stats.platform}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500">Platform</div>
                        </div>
                    </div>

                </section>

                {/* 2. Visual Gallery (Carousel) */}
                {project.gallery.length > 0 && (
                    <section className="mb-32 overflow-hidden">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                            <h3 className="text-zinc-500 text-sm uppercase tracking-wider">Project Gallery</h3>
                        </div>
                        {/* Horizontal Scroll / Carousel */}
                        <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 snap-x no-scrollbar">
                            {project.gallery.map((item, index) => (
                                <div key={index} className="flex-none w-[85vw] md:w-[60vw] lg:w-[50vw] aspect-video relative rounded-2xl overflow-hidden snap-center border border-white/10 bg-zinc-900 group">
                                    {item.type === 'video' ? (
                                        <video src={item.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                    ) : (
                                        <Image
                                            src={item.url}
                                            alt={`Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. About & Features (Stats) */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Left: Stats / Features */}
                        {/* This section is now replaced by the Stats Bar in the Hero section */}

                        {/* Right: Narrative (About) */}
                        <div className="lg:col-span-8 lg:pl-8">
                            <span className="block text-cyan-400 mb-6 font-mono text-sm">01 / THE STORY</span>
                            <h3 className="font-serif text-3xl md:text-5xl mb-10 leading-tight">About the project</h3>
                            <div className="space-y-8 text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                                {project.about.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Footer Navigation (Next Project) */}
                {project.nextProject && (
                    <section className="border-t border-white/10">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                            <Link href={`/works/${project.nextProject.slug}`} className="group block text-center">
                                <span className="block text-zinc-500 text-sm uppercase tracking-wider mb-6 group-hover:text-cyan-400 transition-colors">Next Project</span>
                                <span className="font-serif text-5xl md:text-7xl lg:text-9xl group-hover:italic transition-all duration-500 ease-out inline-block">
                                    {project.nextProject.title}
                                </span>
                            </Link>
                        </div>
                    </section>
                )}
            </main>

            <SiteFooter />
        </div>
    );
}
