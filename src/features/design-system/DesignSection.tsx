import { cn } from "@/lib/utils";

type DesignSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function DesignSection({
  title,
  description,
  children,
  className,
}: DesignSectionProps) {
  return (
    <section className={cn("section-y", className)}>
      <div className="container-app flex flex-col gap-8 md:gap-12">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-h3">{title}</h2>
          {description ? (
            <p className="text-body text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

type SwatchProps = {
  name: string;
  className: string;
  value: string;
};

export function ColorSwatch({ name, className, value }: SwatchProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "h-20 rounded-[var(--radius-md)] border border-border/60 shadow-[var(--shadow-card)]",
          className,
        )}
      />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-caption text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
