import {
  CALCULATOR_DESCRIPTION,
  CALCULATOR_HEADING,
} from "@/constants/cleaning-calculator";
import { CleaningCalculator } from "@/features/home/calculator/CleaningCalculator";
import { SectionIntro } from "@/shared/SectionIntro";

export function CleaningCalculatorSection() {
  return (
    <section
      id="calculator"
      aria-labelledby="cleaning-calculator-heading"
      className="section-y"
    >
      <div className="container-app flex flex-col gap-8 md:gap-12">
        <SectionIntro
          id="cleaning-calculator-heading"
          title={CALCULATOR_HEADING}
          description={CALCULATOR_DESCRIPTION}
        />

        <CleaningCalculator />
      </div>
    </section>
  );
}
