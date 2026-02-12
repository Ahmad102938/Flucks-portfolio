
export type MediaType = 'image' | 'video';

export interface GalleryItem {
    type: MediaType;
    url: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface ProjectStats {
    industry: string;
    year: string;
    platform: string;
    pages?: string;
    services?: string[];
}

export interface ProjectContent {
    // Hero
    title: string;
    slug: string;
    heroMedia: {
        type: MediaType;
        url: string;
    };

    // Overview
    category: string;
    shortDescription: string;
    liveUrl?: string;

    // Metadata
    stats: ProjectStats;

    // Narrative
    about: string[];

    // Visuals
    gallery: GalleryItem[];

    // Footer Navigation
    nextProject?: {
        slug: string;
        title: string;
    };
}

export const PROJECTS: Record<string, ProjectContent> = {
    "agency": {
        title: "Agency",
        slug: "agency",
        heroMedia: {
            type: "video",
            url: "https://res.cloudinary.com/dbzb0hvnnnnlh/video/upload/v1770756081/agency-portfolio/agency-hero.mp4" // Placeholder, will use image if video fails or update later
        },
        category: "Agency",
        shortDescription: "A premium agency portfolio template designed to showcase creative work with clean typography and immersive interactions.",
        liveUrl: "https://agency-template.flucks.in",
        stats: {
            industry: "Agency",
            year: "2025",
            platform: "Next.js",
            pages: "10+",
            services: ["UI/UX Design", "Development", "Motion"]
        },
        about: [
            "The Agency template was built to solve a common problem: portfolio sites often value style over substance, or vice versa. We wanted to create a balance—a digital experience that feels premium and polished while remaining rigorously functional.",
            "Our approach focused on typography and negative space. We stripped away unnecessary decorative elements to let the work speak for itself. The result is a canvas that elevates whatever content is placed within it.",
            "Technically, the site leverages Next.js for speed and SEO. Transitions are smooth and intentional, guiding the user through the narrative of each case study without jarring interruptions."
        ],
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/Dreamblend.png" },
            { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/Ocular.png" },
            { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/NexaTech.png" }
        ],
        nextProject: { slug: "flenzo", title: "Flenzo" }
    },
    // Adding a fallback/example for testing other slugs if they exist
    "dreamblend": {
        title: "DreamBlend",
        slug: "dreamblend",
        heroMedia: { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/Dreamblend.png" },
        category: "E-commerce",
        shortDescription: "A revolutionary juice blending subscription service.",
        stats: {
            industry: "Food & Bev",
            year: "2024",
            platform: "Shopify",
            services: ["Branding", "Web Design"]
        },
        about: [
            "DreamBlend is all about freshness. We wanted the digital presence to reflect that same vitality. The design uses bold, fruity colors against clean white space to create an appetizing visual experience.",
            "Functional simplicity was key. Users can build their subscription box in just three steps. The interface is intuitive, reducing friction and increasing conversion rates significantly.",
            "We integrated a custom headless CMS to allow the marketing team to update seasonal blends instantly, keeping the content as fresh as the product."
        ],
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/Dreamblend.png" },
            { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/Ocular.png" },
            { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/NexaTech.png" }
        ],
        nextProject: { slug: "agency", title: "Agency" }
    },
    "flenzo": {
        title: "Flenzo",
        slug: "flenzo",
        heroMedia: { type: "image", url: "https://res.cloudinary.com/dbzb0hvlh/image/upload/v1770756081/agency-portfolio/Agency.png" }, // Placeholder
        category: "SaaS",
        shortDescription: "An AI-powered workflow automation platform.",
        stats: {
            industry: "Technology",
            year: "2024",
            platform: "React / Node",
            services: ["Product Design", "Development"]
        },
        about: [
            "Flenzo simplifies complex workflows. We designed a clean, distraction-free interface that helps users focus on what matters.",
            "The challenge was to make powerful automation tools feel accessible. We used a node-based visual editor that allows users to 'draw' their workflows intuitively."
        ],
        gallery: [], // Needs images
        nextProject: { slug: "dreamblend", title: "DreamBlend" }
    }
};

export function getProject(slug: string): ProjectContent | null {
    const normalizeSlug = (s: string) => s.toLowerCase().trim();
    return PROJECTS[normalizeSlug(slug)] || null;
}
