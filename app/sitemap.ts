import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { getWorks } from "@/lib/works";
import { LEGAL_DOCUMENTS } from "@/constants/legal";
import { ALL_SERVICE_PAGES } from "@/constants/service-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
    });

    return [
        page("/", 1, "weekly"),
        page("/works", 0.9, "weekly"),
        page("/services", 0.8, "monthly"),
        ...ALL_SERVICE_PAGES.map((service) => page(`/services/${service.slug}`, service.parent ? 0.8 : 0.9, "monthly")),
        page("/about", 0.7, "monthly"),
        ...(await getWorks()).map((work) => page(`/works/${work.slug}`, 0.8, "monthly")),
        ...LEGAL_DOCUMENTS.map((doc) => page(`/${doc.slug}`, 0.2, "yearly")),
    ];
}
