// Site-wide facts used by metadata, the sitemap, sharing previews and the legal pages.

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL to override (e.g. for a staging deploy). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://flucks.in").replace(/\/$/, "");

export const SITE_NAME = "Flucks";
export const SITE_TAGLINE = "Engineering With Taste, Built to Innovate.";
/** Home page title in search results and the default browser tab title */
export const SITE_TITLE = "Flucks | Web, App & AI Development Studio · India & Worldwide";
export const SITE_DESCRIPTION =
    "Flucks is a team of designers and engineers building websites, web apps, mobile apps, MVPs and AI automation for startups and businesses in India and worldwide.";

export const CONTACT_EMAIL = "contact@flucks.in";
export const LOCATION = "India — Working globally";
