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
            quote: "I had a clear idea of what I wanted for Urban Guest, and Flucks turned it into something even better. They listened, asked the right questions, and stayed involved at every step. The website feels welcoming and trustworthy, which matters a lot when people are looking for a place to live. It’s been a genuine pleasure working with them.",
            name: "Vikash Kumar",
            designation: "Founder, Urban Guest Pune",
            rating: 5,
        },
        {
            quote: "Working with Flucks on Dreamblend was one of the best decisions I made for this project. I came to them with a very personal idea: an app that helps people fall asleep faster, shaped by my own struggle with insomnia. They understood the vision from day one. Flucks managed every part of Dreamblend with clear communication and structure, designed a calm, creative bedtime experience, and built it with real technical skill, so the app runs smoothly offline and launched without a hitch. I highly recommend them.",
            name: "Tanmay Kumar",
            designation: "Founder, Dreamblend (Nemnite Studios)",
            rating: 5,
        },
        {
            quote: "The moment it clicked for me was watching a group at a lounge send a birthday shout-out to their friend, then cheer when her song came on a few minutes later. That’s exactly what I’d imagined, and Flucks made it real. They never treated this like just another project. They asked questions I hadn’t thought of, pushed back when something wouldn’t work for users, and kept me updated without me having to chase them. The app feels simple, but I know how much went into making song requests, the queue, and DJ gifting all work live. I’m genuinely grateful I found this team.",
            name: "Atul",
            designation: "Project Team",
            rating: 5,
        },
    ] satisfies [ReviewCard, ReviewCard, ReviewCard],
};
