// Site-wide facts used by metadata, the sitemap, sharing previews and the legal pages.

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL to override (e.g. for a staging deploy). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://flucks.in").replace(/\/$/, "");

export const SITE_NAME = "Flucks";
export const SITE_TAGLINE = "Engineering With Taste, Built to Innovate.";
export const SITE_DESCRIPTION =
    "A team of designers and engineers delivering web & app experiences, AI automation, and workflow integrations";

export const CONTACT_EMAIL = "contact@flucks.in";
export const LOCATION = "India — Working globally";
