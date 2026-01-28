import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export const ABOUT_CONTENT = {
    hero: {
        title: "About us.",
        subtitle: "We build digital products that matter.",
        description: "A collective of designers, developers, and AI specialists crafting the future of digital interaction. We blend aesthetics with function to create lasting impressions.",
        cta: "Let's talk"
    },
    mission: {
        heading: "Founded with a mission to build websites, apps, and AI-powered solutions for growing businesses.",
        description: "We’re more than an agency — we’re a multidisciplinary team of designers, engineers, and AI specialists building high-quality digital products and intelligent systems.",
        subText: "We believe great products are crafted at the intersection of design, technology, and automation. Every detail is intentional. Every solution is built to scale.",
        images: [
            "/assets/office-1.webp", // Placeholder, will use dummy if not exists
            "/assets/office-2.webp"
        ]
    },
    services: [
        {
            title: "Web Design & \nDevelopment",
            description: "Crafting immersive web experiences that engage and convert.",
            tags: ["UI/UX", "React", "Next.js", "WebGL"]
        },
        {
            title: "App Design & \nDevelopment",
            description: "Building scalable, native-feeling applications for all platforms.",
            tags: ["iOS", "Android", "React Native", "Flutter"]
        },
        {
            title: "AI Integration & \nAutomation",
            description: "Leveraging intelligence to smooth workflows and enhance value.",
            tags: ["LLMs", "Automation", "Python", "Data"]
        },
        {
            title: "Workflow \nAutomation",
            description: "Optimizing business processes to save time and reduce error.",
            tags: ["Zapier", "Custom APIs", "System Design"]
        }
    ],
    metrics: [
        { label: "Projects delivered", value: "50+" },
        { label: "Years experience", value: "3+" },
        { label: "Product releases", value: "10+" },
        { label: "Support available", value: "24/7" }
    ],
    awards: [
        // {
        //     year: "2024",
        //     title: "Agency of the Year",
        //     organization: "Awwwards",
        //     description: "Nominated amongst best Digital Agencies Worldwide."
        // },
        // {
        //     year: "2023",
        //     title: "Site of the Day",
        //     organization: "FWA",
        //     description: "Recognized for outstanding innovation in web design."
        // },
        // {
        //     year: "2022",
        //     title: "Best UX Design",
        //     organization: "Webby Awards",
        //     description: "Honoring excellence on the internet."
        // }
    ],
    testimonial: {
        quote: "We founded Flucks as a one-stop home for digital solutions, built through collaboration between designers, developers, innovators, and the clients who share the vision. If you care about building something impactful, you’re already part of this journey.",
        author: "Masum Ahmad Raza",
        role: "Co-founder, Flucks",
        college: "National Institute of Technology Durgapur",
        avatar: "/assets/team/masum.jpeg" // User provided image path
    },
    team: [
        {
            name: "Alex Morgan",
            role: "Founder & Creative Director",
            image: "/assets/team/alex.webp",
            socials: { twitter: "#", linkedin: "#" }
        },
        {
            name: "Sarah Chen",
            role: "Lead Developer",
            image: "/assets/team/sarah.webp",
            socials: { github: "#", linkedin: "#" }
        },
        {
            name: "Michael Ross",
            role: "Product Designer",
            image: "/assets/team/michael.webp",
            socials: { twitter: "#", github: "#" }
        },
        {
            name: "Emily Davis",
            role: "Brand Strategist",
            image: "/assets/team/emily.webp",
            socials: { linkedin: "#" }
        },
        {
            name: "David Kim",
            role: "Backend Architect",
            image: "/assets/team/david.webp",
            socials: { github: "#" }
        },
        {
            name: "Jessica Lee",
            role: "UX Researcher",
            image: "/assets/team/jessica.webp",
            socials: { twitter: "#" }
        }
    ]
};
