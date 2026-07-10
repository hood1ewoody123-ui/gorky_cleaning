import { FAQ_DESCRIPTION, FAQ_HEADING } from "@/constants/faq";
import { FaqAccordion } from "@/features/home/faq/FaqAccordion";
import { SectionIntro } from "@/shared/SectionIntro";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y">
      <div className="container-app flex flex-col gap-8 md:gap-10">
        <SectionIntro
          id="faq-heading"
          title={FAQ_HEADING}
          description={FAQ_DESCRIPTION}
        />
        <FaqAccordion />
      </div>
    </section>
  );
}
