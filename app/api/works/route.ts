import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await cloudinary.search
            .expression("tags:project")
            .with_field("context")
            .sort_by("created_at", "desc")
            .execute();

        const works = result.resources.map((resource: any) => {
            const title =
                resource.context?.custom?.title ||
                resource.context?.title ||
                resource.metadata?.title ||
                "Untitled Project";

            const slugify = (text: string) =>
                text
                    .toString()
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                    .replace(/\-\-+/g, "-");

            const slug = resource.context?.custom?.slug || slugify(title);

            return {
                id: resource.public_id,
                title,
                slug,
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

        return NextResponse.json(works);
    } catch (error) {
        console.error("Cloudinary fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch works" },
            { status: 500 }
        );
    }
}
