"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import {
  CLEANING_PROCESS_STEPS,
  type CleaningProcessStep,
} from "@/constants/cleaning-process";
import { ProcessImage } from "@/features/home/cleaning-process/ProcessImage";
import { cn } from "@/lib/utils";

const STEPS = CLEANING_PROCESS_STEPS;

export function CleaningProcessDesktop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          rootMargin: "-42% 0px -42% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  const activeStep: CleaningProcessStep = STEPS[activeIndex];

  return (
    <div className="relative hidden lg:block">
      <div className="container-app grid grid-cols-[minmax(0,1fr)_auto] items-start gap-12 xl:gap-20">
        <ol className="flex flex-col gap-10 py-4 xl:gap-12">
          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={step.id}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                aria-current={isActive ? "step" : undefined}
              >
                <div className="flex max-w-2xl flex-col gap-2.5 transition-colors duration-300">
                  <span
                    className={cn(
                      "text-caption font-medium tracking-[0.18em] transition-colors duration-300",
                      isActive ? "text-primary" : "text-muted-foreground/55",
                    )}
                  >
                    {step.id}
                  </span>

                  <h3
                    className={cn(
                      "text-[clamp(1.75rem,2.8vw,3.25rem)] leading-[1.05] tracking-tight transition-colors duration-300",
                      isActive
                        ? "font-extrabold text-primary"
                        : "font-medium text-muted-foreground/40",
                    )}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={cn(
                      "max-w-lg text-sm leading-relaxed transition-colors duration-300 md:text-[0.9375rem]",
                      isActive
                        ? "text-muted-foreground"
                        : "text-muted-foreground/45",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="sticky top-28 flex w-[340px] max-w-full shrink-0 items-start justify-end pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              className={
                activeStep.orientation === "portrait"
                  ? "w-[260px]"
                  : "w-[340px]"
              }
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={transition}
            >
              <ProcessImage step={activeStep} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
