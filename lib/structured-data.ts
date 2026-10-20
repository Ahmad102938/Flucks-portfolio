// schema.org structured data (JSON-LD). It tells search engines in a machine-readable way who
// Flucks is, what each service is, and how pages relate, which can earn richer search results.

import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";
import { socialLinks } from "@/constants/footer";
import { ALL_SERVICE_PAGES, type ServicePage } from "@/constants/service-pages";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

const AREA_SERVED = [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Worldwide" },
];

/** The studio itself, plus the website. Rendered once in the root layout. */
export const organizationSchema = () => [
    {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absolute("/assets/logo3.png"),
        image: absolute("/opengraph-image"),
        email: CONTACT_EMAIL,
        description: SITE_DESCRIPTION,
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        areaServed: AREA_SERVED,
        sameAs: socialLinks.map((link) => link.href),
        knowsAbout: [
            "Web development",
            "Full-stack development",
            "Mobile app development",
            "MVP development",
            "AI automation",
            "AI chatbots",
            "RAG pipelines",
            "Workflow automation",
            "UI/UX design",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: ALL_SERVICE_PAGES.map((page) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: page.name, url: absolute(`/services/${page.slug}`) },
            })),
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "en",
    },
];

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: absolute(item.path),
    })),
});

export const serviceSchema = (page: ServicePage) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    serviceType: page.name,
    description: page.metaDescription,
    url: absolute(`/services/${page.slug}`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: page.name,
        itemListElement: page.offerings.map((offering) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: offering.title, description: offering.description },
        })),
    },
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
});

export const caseStudySchema = ({
    title,
    description,
    path,
    image,
    year,
    keywords,
}: {
    title: string;
    description: string;
    path: string;
    image: string;
    year?: string;
    keywords: string[];
}) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    headline: `${title} case study`,
    description,
    url: absolute(path),
    image: absolute(image),
    creator: { "@id": ORGANIZATION_ID },
    ...(year ? { dateCreated: year } : {}),
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
});
