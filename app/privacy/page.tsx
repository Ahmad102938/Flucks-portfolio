import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal-page";
import { PRIVACY } from "@/constants/legal";

export const metadata: Metadata = pageMetadata({ title: PRIVACY.title, description: PRIVACY.summary, path: "/privacy" });

export default function PrivacyPage() {
    return <LegalPage doc={PRIVACY} />;
}
