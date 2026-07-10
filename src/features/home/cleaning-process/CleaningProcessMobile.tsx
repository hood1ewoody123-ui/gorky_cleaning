import { CLEANING_PROCESS_STEPS } from "@/constants/cleaning-process";
import { ProcessImage } from "@/features/home/cleaning-process/ProcessImage";

export function CleaningProcessMobile() {
  return (
    <div className="flex flex-col gap-12 lg:hidden">
      {CLEANING_PROCESS_STEPS.map((step) => (
        <article
          key={step.id}
          aria-labelledby={`process-${step.id}-title`}
          className="flex flex-col gap-4"
        >
          <ProcessImage step={step} />

          <div className="flex flex-col gap-2">
            <span className="text-caption font-medium tracking-[0.18em] text-primary">
              {step.id}
            </span>
            <h3
              id={`process-${step.id}-title`}
              className="text-2xl font-bold tracking-tight text-primary sm:text-3xl"
            >
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {step.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
