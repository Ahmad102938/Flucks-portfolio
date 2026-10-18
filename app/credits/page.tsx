import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal-page";
import { CREDITS } from "@/constants/legal";

export const metadata: Metadata = pageMetadata({ title: CREDITS.title, description: CREDITS.summary, path: "/credits" });

export default function CreditsPage() {
    return <LegalPage doc={CREDITS} />;
}
