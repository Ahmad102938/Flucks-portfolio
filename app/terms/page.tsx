import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal-page";
import { TERMS } from "@/constants/legal";

export const metadata: Metadata = pageMetadata({ title: TERMS.title, description: TERMS.summary, path: "/terms" });

export default function TermsPage() {
    return <LegalPage doc={TERMS} />;
}
