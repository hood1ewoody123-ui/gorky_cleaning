import {
  SERVICES_CATALOG_DESCRIPTION,
  SERVICES_CATALOG_HEADING,
} from "@/constants/services-catalog";
import { ServicesCatalogInteractive } from "@/features/home/services-catalog/ServicesCatalogInteractive";
import { SectionIntro } from "@/shared/SectionIntro";

export function ServicesCatalogSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-catalog-heading"
      className="section-y"
    >
      <div className="container-app flex flex-col gap-8 md:gap-12">
        <SectionIntro
          id="services-catalog-heading"
          title={SERVICES_CATALOG_HEADING}
          description={SERVICES_CATALOG_DESCRIPTION}
        />

        <ServicesCatalogInteractive />
      </div>
    </section>
  );
}
