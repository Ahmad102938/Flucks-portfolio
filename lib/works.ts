import "server-only";
import { unstable_cache } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export interface WorkItem {
    id: string;
    title: string;
    slug: string;
    category: string;
    image: string;
    link: string | null;
}

const slugify = (text: string) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

// Cloudinary's search API is rate-limited, so results are cached and refreshed hourly
const fetchWorks = unstable_cache(
    async (): Promise<WorkItem[]> => {
        const result = await cloudinary.search
            .expression("tags:project")
            .with_field("context")
            .sort_by("created_at", "desc")
            .execute();

        return result.resources.map((resource: any) => {
            const title =
                resource.context?.custom?.title ||
                resource.context?.title ||
                resource.metadata?.title ||
                "Untitled Project";

            return {
                id: resource.public_id,
                title,
                slug: resource.context?.custom?.slug || slugify(title),
                category:
                    resource.context?.custom?.category ||
                    resource.context?.category ||
                    resource.metadata?.category ||
                    "Uncategorized",
                image: resource.secure_url,
                link:
                    resource.context?.custom?.link ||
                    resource.context?.link ||
                    resource.metadata?.link ||
                    null,
            };
        });
    },
    ["works"],
    { revalidate: 3600, tags: ["works"] }
);

export async function getWorks(): Promise<WorkItem[]> {
    try {
        return await fetchWorks();
    } catch (error) {
        console.error("Cloudinary fetch error:", error);
        return [];
    }
}

/** The Cloudinary project for a slug plus the one after it in the grid (wrapping), or null. */
export async function getWorkWithNext(
    slug: string,
): Promise<{ work: WorkItem; next: WorkItem | null; index: number; total: number } | null> {
    const works = await getWorks();
    const index = works.findIndex((w) => w.slug === slug.toLowerCase().trim());
    if (index === -1) return null;
    const next = works.length > 1 ? works[(index + 1) % works.length] : null;
    return { work: works[index], next, index, total: works.length };
}

/** Cloudinary links are sometimes saved without a scheme ("www.example.com") */
export const toExternalUrl = (link: string | null | undefined) => {
    const trimmed = link?.trim();
    if (!trimmed) return null;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};
