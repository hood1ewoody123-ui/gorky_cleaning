import {
  WORK_STAGES,
  WORK_STAGES_DESCRIPTION,
  WORK_STAGES_HEADING,
} from "@/constants/work-stages";
import { WorkStageItem } from "@/features/home/work-stages/WorkStageItem";
import { BrandMark } from "@/shared/brand/BrandMark";

export function WorkStagesSection() {
  return (
    <section
      id="work-stages"
      aria-labelledby="work-stages-heading"
      className="section-y"
    >
      <div className="container-app">
        <div className="rounded-[var(--radius-xl)] bg-primary px-5 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:gap-8">
              <div className="flex min-w-0 max-w-2xl flex-col gap-4">
                <h2 id="work-stages-heading" className="text-h2 text-white">
                  {WORK_STAGES_HEADING}
                </h2>
                <p className="text-body text-white/80">
                  {WORK_STAGES_DESCRIPTION}
                </p>
              </div>

              <BrandMark
                variant="light"
                className="hidden h-10 shrink-0 sm:block sm:h-12 md:h-14 lg:h-16"
              />
            </div>

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {WORK_STAGES.map((stage, index) => (
                <WorkStageItem key={stage.id} stage={stage} index={index + 1} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
