import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal-page";
import { LEGAL_NOTICE } from "@/constants/legal";

export const metadata: Metadata = pageMetadata({ title: LEGAL_NOTICE.title, description: LEGAL_NOTICE.summary, path: "/legal" });

export default function LegalNoticePage() {
    return <LegalPage doc={LEGAL_NOTICE} />;
}
