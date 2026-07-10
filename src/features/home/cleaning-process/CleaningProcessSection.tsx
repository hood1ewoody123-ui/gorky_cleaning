import {
  CLEANING_PROCESS_DESCRIPTION,
  CLEANING_PROCESS_HEADING,
} from "@/constants/cleaning-process";
import { CleaningProcessDesktop } from "@/features/home/cleaning-process/CleaningProcessDesktop";
import { CleaningProcessMobile } from "@/features/home/cleaning-process/CleaningProcessMobile";
import { SectionIntro } from "@/shared/SectionIntro";

export function CleaningProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="cleaning-process-heading"
      className="section-y"
    >
      <div className="container-app mb-12 md:mb-16 lg:mb-20">
        <SectionIntro
          id="cleaning-process-heading"
          title={CLEANING_PROCESS_HEADING}
          description={CLEANING_PROCESS_DESCRIPTION}
        />
      </div>

      <div className="container-app lg:hidden">
        <CleaningProcessMobile />
      </div>
      <CleaningProcessDesktop />
    </section>
  );
}
