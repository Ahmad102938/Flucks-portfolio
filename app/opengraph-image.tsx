import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/constants/site";

// Sharing preview (WhatsApp, LinkedIn, X, Slack...) used by every page. Generated at build time.
export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
    const logo = await readFile(join(process.cwd(), "public/assets/logo3.png"));
    const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
    const host = SITE_URL.replace(/^https?:\/\//, "");

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    background: "#000",
                    backgroundImage:
                        "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(255,255,255,0.14), rgba(255,255,255,0) 70%)",
                    color: "#fff",
                    padding: "64px 72px",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoSrc} width={56} height={56} alt="" />
                    <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 8 }}>FLUCKS</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", marginTop: 64, maxWidth: 860 }}>
                    <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
                        {SITE_TAGLINE}
                    </div>
                    <div style={{ fontSize: 26, lineHeight: 1.4, color: "#a1a1aa", marginTop: 24 }}>
                        {SITE_DESCRIPTION}
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        right: 72,
                        top: 76,
                        fontSize: 22,
                        color: "#71717a",
                        letterSpacing: 2,
                    }}
                >
                    {host}
                </div>

                {/* Oversized wordmark rising from the bottom edge, as in the site footer */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -150,
                        display: "flex",
                        justifyContent: "center",
                        fontSize: 330,
                        fontWeight: 800,
                        letterSpacing: -16,
                        lineHeight: 1,
                        color: "transparent",
                        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0))",
                        backgroundClip: "text",
                    }}
                >
                    FLUCKS
                </div>
            </div>
        ),
        size,
    );
}
