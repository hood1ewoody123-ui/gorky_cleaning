"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { CONTACT } from "@/constants/home";
import { MESSENGER_LINKS } from "@/constants/trust-metrics";
import { TelegramIcon, VkIcon } from "@/shared/icons/MessengerIcons";
import { cn } from "@/lib/utils";

type FloatingAction = {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  className?: string;
};

function MaxIcon() {
  return (
    <span
      aria-hidden
      className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-foreground"
    >
      M
    </span>
  );
}

const ACTION_BUTTON_CLASS =
  "inline-flex size-12 items-center justify-center rounded-full shadow-[var(--shadow-elevated)] transition-transform hover:scale-105";

export function FloatingContactWidget() {
  const [expanded, setExpanded] = useState(false);

  const actions: FloatingAction[] = [
    {
      id: "call",
      label: "Позвонить",
      href: CONTACT.phoneHref,
      icon: <Phone className="size-5" aria-hidden />,
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      id: "vk",
      label: "ВКонтакте",
      href: MESSENGER_LINKS.vk,
      icon: <VkIcon className="size-5" aria-hidden />,
      className: "bg-[#0077FF] text-white hover:bg-[#0066DD]",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: MESSENGER_LINKS.telegram,
      icon: <TelegramIcon className="size-5" aria-hidden />,
      className: "bg-[#2AABEE] text-white hover:bg-[#229AD8]",
    },
    {
      id: "max",
      label: "MAX",
      href: MESSENGER_LINKS.max,
      icon: <MaxIcon />,
      className:
        "bg-white text-foreground ring-1 ring-foreground/10 hover:bg-muted",
    },
  ];

  return (
    <div
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-3 md:right-6 md:bottom-6"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-3 transition-all duration-300",
          expanded
            ? "max-h-64 opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0",
        )}
      >
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            target={action.id === "call" ? undefined : "_blank"}
            rel={action.id === "call" ? undefined : "noopener noreferrer"}
            aria-label={action.label}
            title={action.label}
            className={cn(ACTION_BUTTON_CLASS, action.className)}
          >
            {action.icon}
          </a>
        ))}
      </div>

      <Button
        type="button"
        size="icon-lg"
        className="size-14 shrink-0 rounded-full shadow-[var(--shadow-elevated)]"
        aria-expanded={expanded}
        aria-label="Контакты и связь"
        onClick={() => setExpanded((current) => !current)}
      >
        <MessageCircle className="size-6" aria-hidden />
      </Button>
    </div>
  );
}
