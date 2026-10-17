// Content for the reviews section on /works (components/reviews-showcase.tsx).
// Edit the values below; the section updates from here.

export type ReviewCard = {
    /** The review itself, without quote marks (they're added automatically) */
    quote: string;
    name: string;
    /** Role and company, e.g. "CMO, BrightPath" */
    designation: string;
    /** 1 to 5; halves are rounded to the nearest star */
    rating: number;
};

export const REVIEWS_CONTENT = {
    // Section heading above the panel
    heading: "Loved by Builders",
    subheading: "Stories from the founders and teams we've helped scale.",

    // Overall score shown at the top of the panel: stars, number, and (count)
    overallRating: 5.0,
    reviewCount: 3,

    // Headline inside the panel, one entry per line
    headline: ["Clients ship it.", "Then come back."],
    ctaLabel: "Start your project",

    // Exactly three cards, shown left to right (stacked top to bottom on phones)
    cards: [
        {
            quote: "Flucks transformed our digital presence completely. The attention to detail in the UI and the smoothness of the animations are just world-class.",
            name: "Sarah Jenkins",
            designation: "CMO, BrightPath",
            rating: 5,
        },
        {
            quote: "From the initial design concepts to the final mobile app deployment, the process was seamless. Highly recommended for any serious startup.",
            name: "Michael Chen",
            designation: "CTO, FinFlow",
            rating: 5,
        },
        {
            quote: "The AI integration they built for our internal dashboard saved us 20 hours a week per employee. It's not just code; it's business logic perfected.",
            name: "Emily White",
            designation: "VP of Product, DataSync",
            rating: 5,
        },
    ] satisfies [ReviewCard, ReviewCard, ReviewCard],
};
