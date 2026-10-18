export const footerBranding = {
    logoText: "FLUCKS",
    slogan: "Engineering With Taste,",
    subSlogan: "Built to Innovate.",
    copyrightText: "© 2026 Flucks. All rights reserved."
};

// Social profiles, shown in the footer ("The Cool") and under the Let's Connect form
export const socialLinks = [
    { label: "Twitter", href: "https://x.com/imexyyyyy?s=11" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/md-masum-ahmad-36a474265/" },
    { label: "GitHub", href: "https://github.com/Flucks-Hub" },
];

export const footerLinks = [
    {
        title: "The Good",
        links: [
            { label: "Home", href: "/" },
            { label: "Works", href: "/works" },
            { label: "Services", href: "/services" },
            { label: "About", href: "/about" },
        ]
    },
    {
        title: "The Boring",
        links: [
            { label: "Terms of Use", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Legal", href: "/legal" },
            { label: "Credits", href: "/credits" },
        ]
    },
    {
        title: "The Cool",
        links: socialLinks,
    },
];
