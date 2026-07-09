import { cn } from "@/lib/utils";

type GlassPanelProps = React.ComponentProps<"div"> & {
  variant?: "default" | "strong" | "frosted";
};

function GlassPanel({
  className,
  variant = "default",
  ...props
}: GlassPanelProps) {
  return (
    <div
      data-slot="glass-panel"
      className={cn(
        "rounded-[var(--radius-lg)] border shadow-[var(--shadow-soft)] backdrop-blur-[var(--glass-blur)]",
        variant === "default" &&
          "border-[var(--glass-border)] bg-[var(--glass-bg)]",
        variant === "strong" && "border-white/60 bg-white/85 backdrop-blur-xl",
        variant === "frosted" &&
          "border-[var(--glass-border-frosted)] bg-[var(--glass-bg-frosted)] backdrop-blur-[var(--glass-blur-frosted)]",
        className,
      )}
      {...props}
    />
  );
}

export { GlassPanel };
