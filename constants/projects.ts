// Case-study content for each project page (/works/<slug>).
//
// Cloudinary stays the source of truth for the project list. Each image tagged `project` there
// already supplies: title, slug, category, cover image and live link. This file only adds what
// Cloudinary can't hold. The key of each entry must match the project's slug in Cloudinary.
//
// Everything here is optional: leave a field empty ("" or []) and the page simply leaves that
// part out. A project with no entry at all still gets a page built from Cloudinary alone.

export type MediaType = "image" | "video";

export interface GalleryItem {
    type: MediaType;
    /** Full URL, e.g. a Cloudinary secure_url */
    url: string;
    /** Optional line shown under the image */
    caption?: string;
}

export interface ProjectContent {
    // ---- Opening ----------------------------------------------------------------------------
    /** One or two sentences under the title: what the project is and who it's for */
    summary: string;
    /** Hero shot at the top of the page. Leave url empty to use the Cloudinary cover image. */
    heroMedia: { type: MediaType; url: string };
    /** Overrides the Cloudinary link for the "Preview site" button; leave empty to use Cloudinary's */
    liveUrl: string;

    // ---- Facts row ----------------------------------------------------------------------------
    /** Client or brand name, e.g. "Urban Guest Pvt. Ltd." */
    client: string;
    /** e.g. "Hospitality" */
    industry: string;
    /** Year delivered, e.g. "2025" */
    year: string;
    /** How long it took, e.g. "6 weeks" */
    duration: string;
    /** Main tech or platform, e.g. "Next.js · Supabase" */
    platform: string;
    /** What we did, e.g. ["UI/UX Design", "Web Development", "SEO"] */
    services: string[];

    // ---- Story ----------------------------------------------------------------------------------
    // One string per paragraph. A chapter with no paragraphs is skipped.
    story: {
        /** The problem the client came with */
        challenge: string[];
        /** How we solved it: decisions, design, tech */
        approach: string[];
        /** What changed after launch */
        result: string[];
    };

    /** Up to 4 headline numbers, e.g. { value: "3x", label: "faster bookings" }. Only real figures. */
    metrics: { value: string; label: string }[];

    /** Extra screens and videos, revealed between the story chapters in this order */
    gallery: GalleryItem[];

    /** Optional quote from the client. Leave quote empty to hide it. */
    testimonial: { quote: string; name: string; role: string };
}

// One entry per Cloudinary project (key = Cloudinary slug). Fill in what you have.
export const PROJECTS: Record<string, ProjectContent> = {
    dreamblend: {
        summary: "A thoughtfully crafted iOS sleep and relaxation app that combines guided sleep experiences, immersive ambient soundscapes, and personalized presets to make winding down effortless.",
        heroMedia: { type: "image", url: "" },
        liveUrl: "https://apps.apple.com/in/app/dreamblend-fall-asleep-fast/id6745869591",
        client: "DreamBlend",
        industry: "Health & Fitness",
        year: "2025",
        duration: "3 months",
        platform: "iOS",
        services: ["iOS Development", "Mobile App Development", "Offline Playback", "Audio Experience Design"],
        story: {
            challenge: [
                "Create a focused sleep experience that helps users disconnect from everyday distractions and transition into a more peaceful bedtime routine.",
                "Bring guided sleep content, ambient audio, and personalized sound presets together in one cohesive mobile experience."
            ],

            approach: [
                "Develop an intuitive iOS experience centered around simplicity, calming visuals, and effortless navigation.",
                "Integrate guided sleep experiences, immersive ambient soundscapes, and customizable audio presets.",
                "Support offline playback so users can access their preferred sleep experiences without depending on an active internet connection."
            ],

            result: [
                "A dedicated sleep companion that brings multiple relaxation experiences into one seamless application.",
                "A personalized audio experience with reusable sound presets and offline access, designed to make bedtime feel effortless."
            ]
        },

        metrics: [
            {
                value: "10+",
                label: "Sleep Experiences",
            },
            {
                value: "4",
                label: "User-Focused Features",
            },
            {
                value: "100%",
                label: "Offline Experience",
            },
            {
                value: "iOS",
                label: "Mobile Platform",
            }
        ],
        gallery: [
            { type: "image", url: "/assets/workAsset/dreamblend-sleep-app-1.webp" },
            { type: "image", url: "/assets/workAsset/dreamblend-sleep-app-2.webp" },
            { type: "image", url: "/assets/workAsset/dreamblend-sleep-app-3.webp" },
            { type: "image", url: "/assets/workAsset/dreamblend-sleep-app-4.webp" },
        ],
        testimonial: { quote: "Working with Flucks on Dreamblend was one of the best decisions I made for this project. I came to them with a very personal idea: an app that helps people fall asleep faster, shaped by my own struggle with insomnia. They understood the vision from day one. Flucks managed every part of Dreamblend with clear communication and structure, designed a calm, creative bedtime experience, and built it with real technical skill, so the app runs smoothly offline and launched without a hitch. I highly recommend them.", name: "Tanmay Kumar", role: "Founder, Dreamblend (Nemnite Studios)" },
    },
    flenzo: {
        summary: "An AI-powered maintenance dispatch platform that transforms everyday issue reporting into intelligent ticket routing, provider matching, and faster resolutions — all through one streamlined workflow.",
        heroMedia: { type: "image", url: "/assets/workAsset/flenzo-ai-maintenance-dispatch-1.webp" },
        liveUrl: "https://audition.flucks.in",
        client: "",
        industry: "Maintenance Dispatch Platform",
        year: "2025",
        duration: "4 months",
        platform: "Web Application",
        services: ["Web Development", "UI/UX Design", "AI Integration", "Workflow Automation"],
        story: {
            challenge: [
                "Maintenance requests often get lost in manual workflows, leaving teams chasing updates, struggling to find the right service provider, and risking delayed resolutions.",
                "The challenge was to streamline issue reporting, provider assignment, and resolution tracking within one intelligent system."
            ],

            approach: [
                "Built an AI-powered classification workflow that interprets reported issues, determines categories and priorities, and initiates SLA tracking.",
                "Designed an intelligent provider-matching system that evaluates expertise, proficiency, distance, workload, and past performance to identify suitable technicians.",
                "Created role-specific workspaces for store teams, service providers, moderators, and administrators, enabling transparent coordination from reporting to resolution.",
                "Integrated verification and feedback loops to help improve future routing decisions using completed maintenance records."
            ],

            result: [
                "A unified maintenance dispatch workflow that connects issue reporting, AI-assisted classification, provider assignment, and resolution tracking.",
                "A more structured approach to maintenance operations, with role-based access, SLA visibility, provider verification, and data-informed routing."
            ]
        },
        metrics: [
            {
                value: "24/7",
                label: "SLA Monitoring",
            },
            {
                value: "4",
                label: "Dedicated Workspaces",
            },
            {
                value: "6",
                label: "Routing Signals",
            },
            {
                value: "4",
                label: "Role Based Access Control",
            }
        ],
        gallery: [
            { type: "image", url: "/assets/workAsset/flenzo-ai-maintenance-dispatch-2.webp" },
            { type: "image", url: "/assets/workAsset/flenzo-ai-maintenance-dispatch-3.webp" },
            { type: "image", url: "/assets/workAsset/flenzo-ai-maintenance-dispatch-4.webp" },
        ],
        testimonial: { quote: "“Flucks turned a complex AI dispatch system into a clean, intuitive product, with organised project management, standout creative design, and the technical skill to make every role and workflow run smoothly.", name: "Aryan Raj", role: "Independent Entrepreneur:" },
    },
    "urban-guest": {
        summary: "A modern accommodation discovery platform that helps students and working professionals explore PGs and hostels, compare pricing, discover amenities, and find a place that feels like home.",
        heroMedia: { type: "image", url: "/assets/workAsset/urban-guest-pg-hostel-platform-1.webp" },
        liveUrl: "https://urbanguest.in",
        client: "UrbanGuest Pune",
        industry: "Real Estate & Accommodation",
        year: "2026",
        duration: "1 months",
        platform: "Web Application",
        services: ["Web Development",
            "Responsive UI Development",
            "Property Listing Experience",
            "Search & Filtering",
            "Enquiry Management",],
        story: {
            challenge: [
                "Finding suitable PG and hostel accommodation can be frustrating when property details, pricing, amenities, and availability are difficult to compare.",
                "The goal was to create a streamlined digital experience that makes discovering properties and enquiring about accommodation simple and intuitive."
            ],

            approach: [
                "Designed responsive property listing pages that bring pricing, location, occupancy status, amenities, and accommodation details together.",
                "Developed intuitive property discovery interfaces with search, filtering, and sorting to help users navigate available stays.",
                "Created detailed property pages with image galleries, room information, and prominent enquiry and contact options.",
                "Built informative website sections that communicate the platform's value and make it easier for prospective residents to connect with property providers."
            ],

            result: [
                "A cohesive accommodation discovery experience that brings property exploration, essential listing information, and enquiry workflows into one platform.",
                "A responsive interface designed to simplify the journey from discovering a property to contacting its provider."
            ]
        },

        metrics: [
            {
                value: "3",
                label: "Core Discovery Tools",
            },
            {
                value: "4",
                label: "Property Detail Sections",
            },
            {
                value: "3",
                label: "Contact Channels",
            },
        ],
        gallery: [
            { type: "image", url: "/assets/workAsset/urban-guest-pg-hostel-platform-2.webp" },
            { type: "image", url: "/assets/workAsset/urban-guest-pg-hostel-platform-3.webp" },
        ],
        testimonial: { quote: "I had a clear idea of what I wanted for Urban Guest, and Flucks turned it into something even better. They listened, asked the right questions, and stayed involved at every step. The website feels welcoming and trustworthy, which matters a lot when people are looking for a place to live. It’s been a genuine pleasure working with them.", name: "Vikash Kumar", role: "Founder, UrbanGuest Pune" },
    },
    "videolab": {
        summary: "An AI-powered content creation platform that transforms ideas into engaging audio and video experiences, combining multi-speaker podcast generation with synthetic voices and streamlined video creation.",
        heroMedia: { type: "image", url: "" },
        liveUrl: "",
        client: "",
        industry: "AI & Content Creation",
        year: "2025",
        duration: "2 months",
        platform: "Web Application",
        services: ["Full-Stack Web Development",
            "AI Podcast Generation",
            "Multi-Speaker Voice Synthesis",
            "Amazon Polly Integration",
            "AI Video Generation",],
        story: {
            challenge: [
                "Creating engaging podcasts and video content traditionally requires multiple tools, voice recordings, editing workflows, and considerable production time.",
                "The goal was to simplify content creation by bringing synthetic voice generation, multi-speaker audio production, and video generation into a unified platform."
            ],

            approach: [
                "Integrated Amazon Polly to generate natural-sounding synthetic speech for audio content.",
                "Developed a multi-speaker podcast generation workflow that brings distinct voices together to create conversational audio experiences.",
                "Built an intuitive interface for accessing podcast and video creation workflows from a single platform.",
                "Designed a video generation experience that makes it easier to create and manage visual content through a streamlined production interface."
            ],

            result: [
                "A unified AI content creation platform that combines multi-speaker podcast generation and video creation in one accessible interface.",
                "An automated audio production workflow that reduces reliance on manual voice recording and simplifies the creation of conversational content."
            ]
        },

        metrics: [
            {
                value: "2",
                label: "AI Creation Workflows",
            },
            {
                value: "Multi",
                label: "Speaker Podcast Generation",
            },
            {
                value: "1",
                label: "Unified Creation Platform",
            },
            {
                value: "100+",
                label: "Voices",
            }
        ],

        gallery: [
            { type: "image", url: "/assets/workAsset/videolab-ai-video-podcast-studio-1.webp" },
            { type: "image", url: "/assets/workAsset/videolab-ai-video-podcast-studio-2.webp" },
            { type: "image", url: "/assets/workAsset/videolab-ai-video-podcast-studio-3.webp" },
        ],
        testimonial: { quote: "Honestly, I wasn’t sure multi-speaker AI podcasts could sound this natural, until Flucks built VideoLab. They took on a technically demanding idea, using Amazon Polly to generate conversations between multiple synthetic voices alongside avatar video creation, and made it feel effortless for the user. What impressed me most was how they solved problems before I even noticed them. Sharp engineering, thoughtful design, and a team that cares about getting it right.", name: "Project Team", role: "VideoLab" },
    },
    registration: {
        summary: "A thoughtfully designed audition platform for the Centre for Cognitive Activities, making it easier for students to explore teams, discover opportunities, and become part of a thriving campus community.",
        heroMedia: { type: "image", url: "/assets/workAsset/registration-audition-platform-1.webp" },
        liveUrl: "https://audition.flucks.in/",
        client: "",
        industry: "Education & Social",
        year: "2026",
        duration: "15 days",
        platform: "Web Application",
        services: ["Web Development",
            "UI/UX Development",
            "Interactive Landing Page",
            "Recruitment & Audition Workflow",
            "Responsive Design",],
        story: {
            challenge: [
                "Recruitment across multiple student teams requires a clear way to introduce opportunities, communicate the organization's culture, and guide interested students toward the audition process.",
                "The objective was to create an engaging digital entry point that makes discovering CCA and joining its community feel intuitive and welcoming."
            ],

            approach: [
                "Designed a clean, illustration-led landing page that communicates CCA's collaborative spirit and creates a strong first impression.",
                "Organized the experience around key actions, including exploring cells, learning about the organization, and registering interest in auditions.",
                "Used a distinctive visual identity, generous whitespace, and clear calls to action to make the interface approachable and easy to navigate.",
                "Structured the page to guide prospective members from discovering CCA to taking the next step toward joining."
            ],

            result: [
                "A centralized digital experience for introducing CCA and guiding prospective members toward audition opportunities.",
                "A visually engaging recruitment interface that brings organizational identity, cell discovery, and candidate interest into one cohesive journey."
            ]
        },

        metrics: [
            {
                value: "5",
                label: "Core Landing Sections",
            },
            {
                value: "1",
                label: "Centralized Audition Hub",
            },
            {
                value: "1",
                label: "Unified Audition Journey",
            },
            {
                value: "All",
                label: "Community",
            },
        ],

        gallery: [
            { type: "image", url: "/assets/workAsset/registration-audition-platform-2.webp" },
            { type: "image", url: "/assets/workAsset/registration-audition-platform-3.webp" },
        ],
        testimonial: { quote: "", name: "", role: "" },
    },
    "music-streaming": {
        summary: "A social music and nightlife platform that brings live music venues, interactive DJ experiences, and personalized song requests together - turning every outing into a shared musical experience.",
        heroMedia: { type: "image", url: "" },
        liveUrl: "",
        client: "Atul",
        industry: "Music & Entertainment",
        year: "2026",
        duration: "2 months",
        platform: "Mobile Application",
        services: ["Mobile App Development",
            "Live Music Discovery",
            "Interactive Music Requests",
            "Location-Based Discovery",
            "Social Engagement Features",],
        story: {
            challenge: [
                "Discovering venues with live music and participating in the music experience often happen across disconnected platforms.",
                "The goal was to connect venue discovery, real-time music interaction, and social expression in one engaging mobile experience."
            ],

            approach: [
                "Developed a location-aware venue discovery experience that helps users explore nearby restaurants, lounges, and live music spots.",
                "Built interactive music request and queue experiences, allowing users to request songs and engage with the music playing at participating venues.",
                "Introduced DJ gifting and song-skipping features to create a more dynamic, participatory nightlife experience.",
                "Integrated personalized shout-outs for birthdays, anniversaries, celebrations, and other meaningful occasions."
            ],

            result: [
                "A unified mobile experience that connects users with nearby music venues and gives them new ways to participate in live entertainment.",
                "An interactive platform combining music discovery, song requests, and personalized shout-outs to make shared experiences more memorable."
            ]
        },

        metrics: [
            {
                value: "3",
                label: "Core Engagement Features",
            },
            {
                value: "2",
                label: "Discovery & Music Experiences",
            },
            {
                value: "8+",
                label: "Shout-Out Occasions",
            },
            {
                value: "24/7",
                label: "Available",
            }
        ],

        gallery: [
            { type: "image", url: "/assets/workAsset/music-streaming-nightlife-app-1.webp" },
            { type: "image", url: "/assets/workAsset/music-streaming-nightlife-app-2.webp" },
            { type: "image", url: "/assets/workAsset/music-streaming-nightlife-app-3.webp" },
            { type: "image", url: "/assets/workAsset/music-streaming-nightlife-app-4.webp" },
        ],
        testimonial: { quote: "The moment it clicked for me was watching a group at a lounge send a birthday shout-out to their friend, then cheer when her song came on a few minutes later. That’s exactly what I’d imagined, and Flucks made it real. They never treated this like just another project. They asked questions I hadn’t thought of, pushed back when something wouldn’t work for users, and kept me updated without me having to chase them. The app feels simple, but I know how much went into making song requests, the queue, and DJ gifting all work live. I’m genuinely grateful I found this team.", name: "Atul", role: "" },
    }
};

// Projects we're still building (key = Cloudinary slug). Their pages show an "In development"
// state instead of a case study. Remove a slug from here once the project ships.
export const IN_PROGRESS_PROJECTS: string[] = ["acure-xpress", "beyond-bell"];

export const isInProgress = (slug: string) => IN_PROGRESS_PROJECTS.includes(slug.toLowerCase().trim());

/** Case-study content for a slug, or null when the project has no entry here. */
export function getProjectContent(slug: string): ProjectContent | null {
    return PROJECTS[slug.toLowerCase().trim()] ?? null;
}
