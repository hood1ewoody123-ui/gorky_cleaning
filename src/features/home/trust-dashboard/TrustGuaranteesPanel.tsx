import type { TrustGuarantee } from "@/constants/trust-dashboard";
import { TRUST_GUARANTEES } from "@/constants/trust-dashboard";

export function TrustGuaranteesPanel() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {TRUST_GUARANTEES.map((guarantee) => (
        <GuaranteeItem key={guarantee.id} guarantee={guarantee} />
      ))}
    </div>
  );
}

function GuaranteeItem({ guarantee }: { guarantee: TrustGuarantee }) {
  const Icon = guarantee.icon;

  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-primary/5 px-4 py-4 ring-1 ring-primary/10">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <p className="text-sm font-medium leading-snug text-foreground">
        {guarantee.label}
      </p>
    </div>
  );
}
