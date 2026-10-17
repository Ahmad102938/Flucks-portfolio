import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Testimonials } from "@/components/testimonials";
import { ReviewsShowcase } from "@/components/reviews-showcase";
import { WorksGrid, WorksHeading } from "@/components/works/works-grid";
import { getWorks } from "@/lib/works";

export const revalidate = 3600;

// "Loved by Builders" (video + text testimonials, desktop and mobile layouts) is parked for
// now, not deleted. Flip this to true to bring it back; ReviewsShowcase replaces it meanwhile.
const SHOW_LOVED_BY_BUILDERS = false;

export default async function WorksPage() {
    const works = await getWorks();

    return (
        <div className="min-h-screen bg-black pt-32 text-white sm:pt-40">
            <SiteHeader />
            <div className="container mx-auto px-4 mb-24 sm:px-6 md:mb-32 lg:px-8 lg:mb-40">
                {/* Header Section */}
                <WorksHeading />

                {/* Works Grid */}
                <WorksGrid works={works} />
            </div>

            {/* Testimonials Section */}
            {SHOW_LOVED_BY_BUILDERS ? <Testimonials /> : <ReviewsShowcase />}

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
