import { LEGAL_DISCLAIMERS } from "@/constants/legal-disclaimers";
import { cn } from "@/lib/utils";

type LegalPriceDisclaimerProps = {
  className?: string;
};

export function LegalPriceDisclaimer({ className }: LegalPriceDisclaimerProps) {
  return (
    <p
      className={cn(
        "max-w-3xl text-small leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {LEGAL_DISCLAIMERS.notPublicOffer}
    </p>
  );
}
