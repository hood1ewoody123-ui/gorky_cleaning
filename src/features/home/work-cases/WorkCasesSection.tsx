import {
  WORK_CASES,
  WORK_CASES_DESCRIPTION,
  WORK_CASES_HEADING,
} from "@/constants/work-cases";
import { WorkCaseCard } from "@/features/home/work-cases/WorkCaseCard";
import { SectionIntro } from "@/shared/SectionIntro";
import { LegalPriceDisclaimer } from "@/shared/legal/LegalPriceDisclaimer";

export function WorkCasesSection() {
  return (
    <section
      id="cases"
      aria-labelledby="work-cases-heading"
      className="section-y"
    >
      <div className="container-app flex flex-col gap-8 md:gap-12">
        <SectionIntro
          id="work-cases-heading"
          title={WORK_CASES_HEADING}
          description={WORK_CASES_DESCRIPTION}
        />

        <LegalPriceDisclaimer />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {WORK_CASES.map((workCase) => (
            <li key={workCase.id}>
              <WorkCaseCard workCase={workCase} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
