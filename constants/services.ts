export type TextTestimonial = {
    type: "text";
    quote: string;
    author: string;
    role: string;
    rating: number;
};

export type VideoTestimonial = {
    type: "video";
    videoSrc: string;
    videoThumbnail?: string;
    author: string;
    role: string;
};

export type TestimonialItem = TextTestimonial | VideoTestimonial;

export type ServiceItem = {
    title: string;
    description: string;
    subServices: string[];
    iconType: "web" | "app" | "ai" | "automation";
    imageSrc: string;
};

export const SERVICES_CONTENT = {
    hero: {
        title: "Our Services",
        subtitle: "Comprehensive digital solutions for modern brands",
        description: "We combine aesthetic excellence with technical precision to build digital products that stand out. From core web platforms to advanced AI integrations, we have the expertise to scale your vision."
    },
    services: [
        {
            title: "App Design & Development",
            description: "Native-quality mobile experiences for iOS and Android. We build responsive, intuitive applications that users love to touch and interact with.",
            iconType: "app",
            imageSrc: "/assets/services/appdesign.jpg",
            subServices: [
                "Mobile UI/UX Design",
                "Cross-platform Development (React Native/Flutter)",
                "Native Integrations",
                "App Store Deployment",
                "Post-launch Support"
            ]
        },
        {
            title: "Web Design & Development",
            description: "We craft immersive, high-performance websites that captivate audiences and convert visitors. Our web solutions are built on modern stacks for speed, SEO, and scalability.",
            iconType: "web",
            imageSrc: "/assets/services/aset2.webp",
            subServices: [
                "Web UI/UX Design",
                "Frontend Development (Next.js/React)",
                "Backend Development (APIs, Auth)",
                "Performance & SEO Optimization",
                "Deployment & Maintenance"
            ]
        },
        {
            title: "AI Integration",
            description: "Future-proof your business with cutting-edge Artificial Intelligence. We integrate smart agents and workflows that automate tasks and provide actionable insights.",
            iconType: "ai",
            imageSrc: "/assets/services/aiautomation.webp",
            subServices: [
                "RAG + Knowledge Base Chatbots",
                "AI Assistants for internal tools",
                "LLM API Integration (OpenAI/Gemini)",
                "AI workflows for business tasks",
                "Monitoring + Cost Optimization"
            ]
        },
        {
            title: "Workflow Automation",
            description: "Streamline operations and reduce manual error. We build custom automation pipelines that connect your favorite tools and save you countless hours.",
            iconType: "automation",
            imageSrc: "/assets/services/aiworkflow.png",
            subServices: [
                "Automation pipelines (Zapier/n8n/custom)",
                "CRM + Email automation",
                "Scraping + Data pipelines",
                "Notification + reporting automation",
                "Internal admin dashboards"
            ]
        }
    ] as ServiceItem[],
    cta: {
        title: "Let's Create Something Amazing Together!",
        button: "Start a Project"
    },
    testimonials: [
        // Column 1
        {
            type: "text",
            quote: "Flucks transformed our digital presence completely. The attention to detail in the UI and the smoothness of the animations are just world-class.",
            author: "Sarah Jenkins",
            role: "CMO, BrightPath",
            rating: 5
        },
        {
            type: "video",
            videoSrc: "/assets/ourApproach/mobile/mobilefirst.mp4",
            videoThumbnail: "/assets/services/appdesign.jpg",
            author: "David Ross",
            role: "Founder, NexaTech"
        },

        // Column 2
        {
            type: "video",
            videoSrc: "/assets/ourApproach/mobile/mobilefirst.mp4",
            videoThumbnail: "/assets/services/appdesign.jpg",
            author: "Elena Rodriguez", // Using Elena for video variety in name at least
            role: "Product Lead, Ocular"
        },
        {
            type: "text",
            quote: "From the initial design concepts to the final mobile app deployment, the process was seamless. Highly recommended for any serious startup.",
            author: "Michael Chen",
            role: "CTO, FinFlow",
            rating: 5
        },

        // Column 3
        {
            type: "text",
            quote: "The AI integration they built for our internal dashboard saved us 20 hours a week per employee. It's not just code; it's business logic perfected.",
            author: "Emily White",
            role: "VP of Product, DataSync",
            rating: 5
        },
        {
            type: "video",
            videoSrc: "/assets/ourApproach/mobile/mobilefirst.mp4",
            videoThumbnail: "/assets/services/appdesign.jpg",
            author: "James Wilson",
            role: "Director, TechCorp"
        }
    ] as TestimonialItem[]
};
