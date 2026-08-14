import type { Metadata } from "next";

import { LEGAL_ENTITY, LEGAL_ROUTES } from "@/constants/legal";
import { PRIVACY_POLICY_SECTIONS } from "@/constants/legal-documents";
import { LegalDocumentPage } from "@/features/legal/LegalDocumentPage";
import { createLegalPageMetadata } from "@/lib/seo/site-metadata";
import { SiteFooter } from "@/shared/footer/SiteFooter";

export const metadata: Metadata = createLegalPageMetadata({
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных компании Горький Клининг: цели, сроки хранения, права пользователей и использование cookies.",
  path: LEGAL_ROUTES.privacy,
});

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col pb-24 md:pb-0">
      <LegalDocumentPage
        title="Политика конфиденциальности"
        description="Документ описывает порядок обработки и защиты персональных данных пользователей сайта gorkycleaning.ru."
        updatedAt={LEGAL_ENTITY.documentsUpdatedAt}
        sections={PRIVACY_POLICY_SECTIONS}
      />
      <SiteFooter />
    </main>
  );
}
