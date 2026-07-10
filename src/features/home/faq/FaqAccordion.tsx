"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/constants/faq";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  className?: string;
};

export function FaqAccordion({ className }: FaqAccordionProps) {
  return (
    <Accordion
      className={cn(
        "rounded-[var(--radius-xl)] bg-white p-2 shadow-[var(--shadow-card)] ring-1 ring-foreground/5 md:p-3",
        className,
      )}
    >
      {FAQ_ITEMS.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-foreground/8 px-3 md:px-4"
        >
          <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:no-underline md:py-5 md:text-lg">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-body leading-[var(--leading-body)] text-muted-foreground md:pb-5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
