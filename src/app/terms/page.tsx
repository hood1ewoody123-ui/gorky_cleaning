import type { Metadata } from "next";

import { LEGAL_ENTITY, LEGAL_ROUTES } from "@/constants/legal";
import { TERMS_OF_SERVICE_SECTIONS } from "@/constants/legal-documents";
import { LegalDocumentPage } from "@/features/legal/LegalDocumentPage";
import { createLegalPageMetadata } from "@/lib/seo/site-metadata";
import { SiteFooter } from "@/shared/footer/SiteFooter";

export const metadata: Metadata = createLegalPageMetadata({
  title: "Пользовательское соглашение",
  description:
    "Условия использования сайта и заказа услуг клининговой компании Горький Клининг в Нижнем Новгороде.",
  path: LEGAL_ROUTES.terms,
});

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col pb-24 md:pb-0">
      <LegalDocumentPage
        title="Пользовательское соглашение"
        description="Условия использования сайта, оформления заявок и оказания клининговых услуг."
        updatedAt={LEGAL_ENTITY.documentsUpdatedAt}
        sections={TERMS_OF_SERVICE_SECTIONS}
      />
      <SiteFooter />
    </main>
  );
}
