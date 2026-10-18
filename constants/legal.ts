// Content for /terms, /privacy, /legal and /credits (rendered by components/legal-page.tsx).
// In each section's `blocks`, a string is a paragraph and an array of strings is a bullet list.

import { CONTACT_EMAIL, SITE_URL } from "@/constants/site";

export type LegalBlock = string | string[];

export type LegalSection = {
    /** Anchor for the table of contents, e.g. "data-we-collect" */
    id: string;
    heading: string;
    blocks: LegalBlock[];
};

export type LegalDocument = {
    slug: "terms" | "privacy" | "legal" | "credits";
    /** Shown in the footer, the "other documents" links and the browser tab */
    label: string;
    title: string;
    summary: string;
    lastUpdated: string;
    sections: LegalSection[];
};

const LAST_UPDATED = "18 October 2026";
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const TERMS: LegalDocument = {
    slug: "terms",
    label: "Terms of Use",
    title: "Terms of Use",
    summary: `The ground rules for using ${SITE_HOST}. Short version: browse freely, don't copy our work, and talk to us before relying on anything here for a project.`,
    lastUpdated: LAST_UPDATED,
    sections: [
        {
            id: "acceptance",
            heading: "Using this website",
            blocks: [
                `These terms apply to everyone who visits ${SITE_HOST} (the "site"), which is run by Flucks ("we", "us"). By using the site you agree to them. If you don't agree, please don't use the site.`,
            ],
        },
        {
            id: "content",
            heading: "Our content",
            blocks: [
                "The design, code, text, graphics, animations and branding on this site belong to Flucks or to the people who licensed them to us. You're welcome to view and share links to it, but you may not copy, reproduce, resell or reuse any of it without our written permission.",
                "Client names, logos and project work shown in our portfolio belong to their respective owners and appear here to illustrate work we have done.",
            ],
        },
        {
            id: "acceptable-use",
            heading: "Acceptable use",
            blocks: [
                "When using the site, please don't:",
                [
                    "send spam, abusive messages or misleading information through the contact form",
                    "try to break, overload, scrape or gain unauthorised access to the site or its servers",
                    "use the site for anything unlawful",
                ],
            ],
        },
        {
            id: "projects",
            heading: "Project work",
            blocks: [
                "Information on this site describes our services in general terms and is not an offer or a quote. Any project we take on is governed by a separate written proposal or agreement, which takes precedence over anything on this site.",
            ],
        },
        {
            id: "links",
            heading: "Links to other sites",
            blocks: [
                "The site links to third-party websites, such as social networks and live client projects. We don't control those sites and aren't responsible for their content or practices.",
            ],
        },
        {
            id: "liability",
            heading: "No warranty and limitation of liability",
            blocks: [
                'The site is provided "as is". We work to keep it accurate and available, but we don\'t guarantee that it will always be error-free, complete or online. To the extent the law allows, Flucks is not liable for any loss arising from your use of the site.',
            ],
        },
        {
            id: "law",
            heading: "Governing law",
            blocks: ["These terms are governed by the laws of India."],
        },
        {
            id: "changes",
            heading: "Changes and contact",
            blocks: [
                `We may update these terms from time to time; the date at the top shows when they last changed. Questions? Write to ${CONTACT_EMAIL}.`,
            ],
        },
    ],
};

export const PRIVACY: LegalDocument = {
    slug: "privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    summary:
        "What we collect, why, and who else sees it. We collect very little: only what you send us through the contact form. No advertising trackers, no analytics cookies, and we never sell your data.",
    lastUpdated: LAST_UPDATED,
    sections: [
        {
            id: "data-we-collect",
            heading: "What we collect",
            blocks: [
                "When you send an enquiry through the contact form, we receive the details you enter:",
                [
                    "your name and email address",
                    "your phone number and country, if you provide them",
                    "your project type, approximate size, budget range and preferred way to be contacted",
                    "your message",
                ],
                "We don't ask for, and you shouldn't send, sensitive personal information such as financial or health details.",
            ],
        },
        {
            id: "how-we-use-it",
            heading: "How we use it",
            blocks: [
                "We use your enquiry only to reply to you, understand your project and prepare a proposal. We don't add you to a mailing list, and we never sell or rent your information to anyone.",
            ],
        },
        {
            id: "who-sees-it",
            heading: "Services that handle your data",
            blocks: [
                "A few providers help us run the site and receive data as part of that:",
                [
                    "Google (Gmail) delivers contact form submissions to our inbox.",
                    "Cloudinary hosts some of the images and videos on the site, so it receives your IP address when they load.",
                    "ipapi.co is asked for your approximate country, based on your IP address, so the clock on the home page can show your local time. Only the country code is kept, in your browser.",
                    "Our hosting provider keeps standard server logs, such as IP address, browser type and pages requested, for security and reliability.",
                ],
            ],
        },
        {
            id: "storage",
            heading: "Cookies and browser storage",
            blocks: [
                "We don't use advertising or analytics cookies. The site uses your browser's session storage for two small conveniences: remembering that you've already seen the intro animation, and remembering your country for the clock. Both are cleared when you close the tab.",
            ],
        },
        {
            id: "retention",
            heading: "How long we keep it",
            blocks: [
                "We keep enquiries for as long as needed to discuss and deliver your project and for our records afterwards. You can ask us to delete your enquiry at any time.",
            ],
        },
        {
            id: "your-rights",
            heading: "Your rights",
            blocks: [
                `You can ask to see, correct or delete the personal information we hold about you, or withdraw your consent for us to use it. Email ${CONTACT_EMAIL} and we'll respond within 30 days.`,
            ],
        },
        {
            id: "changes",
            heading: "Changes to this policy",
            blocks: [
                "If we change how we handle data, we'll update this page and the date at the top.",
            ],
        },
    ],
};

export const LEGAL_NOTICE: LegalDocument = {
    slug: "legal",
    label: "Legal",
    title: "Legal Notice",
    summary: "Who runs this website and how to reach us.",
    lastUpdated: LAST_UPDATED,
    sections: [
        {
            id: "operator",
            heading: "Operator",
            blocks: [
                "This website is operated by Flucks, a design and engineering studio based in India and working with clients worldwide.",
            ],
        },
        {
            id: "contact",
            heading: "Contact",
            blocks: [[`Email: ${CONTACT_EMAIL}`, `Website: ${SITE_HOST}`]],
        },
        {
            id: "responsibility",
            heading: "Responsibility for content",
            blocks: [
                "We prepare the content of this site with care but can't guarantee that it is complete, accurate or current at all times. If you spot something wrong, please tell us and we'll fix it.",
            ],
        },
        {
            id: "trademarks",
            heading: "Trademarks and intellectual property",
            blocks: [
                "\"Flucks\" and the Flucks logo are the identity of our studio and may not be used without permission. Third-party names, logos and trademarks shown on this site belong to their respective owners.",
            ],
        },
        {
            id: "related",
            heading: "Related documents",
            blocks: [
                "How you may use this site is covered in our Terms of Use, and how we handle personal data is covered in our Privacy Policy.",
            ],
        },
    ],
};

export const CREDITS: LegalDocument = {
    slug: "credits",
    label: "Credits",
    title: "Credits",
    summary:
        "This site was designed and built in-house by Flucks, on the shoulders of some excellent open-source work. Thank you to everyone below.",
    lastUpdated: LAST_UPDATED,
    sections: [
        {
            id: "typefaces",
            heading: "Typefaces",
            blocks: [
                [
                    "Geist by Vercel, SIL Open Font License 1.1",
                    "Fraunces by Undercase Type, SIL Open Font License 1.1",
                    "Playfair Display by Claus Eggers Sørensen, SIL Open Font License 1.1",
                ],
            ],
        },
        {
            id: "icons",
            heading: "Icons",
            blocks: [["Tabler Icons, MIT License", "Lucide, ISC License"]],
        },
        {
            id: "software",
            heading: "Software",
            blocks: [
                [
                    "Next.js and React",
                    "Motion, for animation",
                    "Lenis, for smooth scrolling",
                    "Tailwind CSS",
                    "simplex-noise",
                ],
            ],
        },
        {
            id: "our-work",
            heading: "Our work",
            blocks: [
                "All projects, images and videos on the Works pages are our own work, made by Flucks for ourselves or for our clients. Some media is delivered through Cloudinary.",
            ],
        },
        {
            id: "third-party-imagery",
            heading: "Third-party imagery",
            blocks: [
                "Some decorative images in the \"Our Approach\" section of the home page are the work of other designers. They're shown as visual inspiration only, aren't presented as our work, and all rights remain with their creators:",
                [
                    "Discovery First: interface and wireframe images collected from Dribbble and other public design portfolios",
                    "Pixel Perfect: the scrolling interface gallery, collected from Dribbble and other public design portfolios",
                ],
                // Add named credits here as you identify them, e.g. "Pixel Perfect: dashboard shot by Jane Doe (dribbble.com/janedoe)"
                `If one of these is your work and you'd like it credited by name, linked or removed, email ${CONTACT_EMAIL} and we'll sort it out promptly.`,
            ],
        },
    ],
};

export const LEGAL_DOCUMENTS = [TERMS, PRIVACY, LEGAL_NOTICE, CREDITS];
