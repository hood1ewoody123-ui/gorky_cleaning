import { Suspense } from "react";

import {
  WHATS_INCLUDED_DESCRIPTION,
  WHATS_INCLUDED_HEADING,
} from "@/constants/whats-included";
import { WhatsIncludedGate } from "@/features/home/whats-included/WhatsIncludedGate";
import { SectionIntro } from "@/shared/SectionIntro";

export function WhatsIncludedSection() {
  return (
    <section
      id="included"
      aria-labelledby="whats-included-heading"
      className="section-y"
    >
      <div className="container-app flex flex-col gap-8 md:gap-12">
        <SectionIntro
          id="whats-included-heading"
          title={WHATS_INCLUDED_HEADING}
          description={WHATS_INCLUDED_DESCRIPTION}
        />

        <Suspense fallback={null}>
          <WhatsIncludedGate />
        </Suspense>
      </div>
    </section>
  );
}
