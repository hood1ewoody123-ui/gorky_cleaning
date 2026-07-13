import { getMessengerIcon } from "@/shared/icons/MessengerIcons";
import { cn } from "@/lib/utils";

import {
  MESSENGER_BUTTONS,
  type MessengerButtonVariant,
} from "@/constants/trust-metrics";

const VARIANT_STYLES: Record<MessengerButtonVariant, string> = {
  solid:
    "bg-primary text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary/90",
  soft: "bg-primary/15 text-primary ring-1 ring-primary/20 hover:bg-primary/20",
  outline:
    "border border-primary/25 bg-surface text-primary hover:border-primary/40 hover:bg-muted",
};

export function MessengerButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {MESSENGER_BUTTONS.map((button) => {
        const hasIcon = button.id === "vk" || button.id === "telegram";
        const Icon = hasIcon ? getMessengerIcon(button.id) : null;
        const brandStyles =
          button.id === "vk"
            ? "bg-[#0077FF] text-white hover:bg-[#0066DD] shadow-[var(--shadow-card)]"
            : null;

        return (
          <a
            key={button.id}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-10 items-center justify-center gap-2.5 rounded-[var(--radius-md)] px-4 text-sm font-medium transition-colors",
              brandStyles ?? VARIANT_STYLES[button.variant],
            )}
          >
            {Icon ? (
              <Icon
                className={cn(
                  "size-[18px] shrink-0",
                  button.id === "vk" ? "text-white" : "text-primary",
                )}
              />
            ) : null}
            <span>{button.label}</span>
          </a>
        );
      })}
    </div>
  );
}
