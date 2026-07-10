"use client";

import { Clock, Maximize2, Wallet, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { WorkCase } from "@/constants/work-cases";
import { WorkCaseLightbox } from "@/features/home/work-cases/WorkCaseLightbox";
import { formatRubles } from "@/lib/formatPrice";

type WorkCaseCardProps = {
  workCase: WorkCase;
};

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        {label}
      </span>
      <span className="break-words text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

export function WorkCaseCard({ workCase }: WorkCaseCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const duration =
    workCase.durationLabel ??
    (workCase.durationHours % 1 === 0
      ? `${workCase.durationHours} ч`
      : `${workCase.durationHours.toLocaleString("ru-RU")} ч`);

  return (
    <>
      <Card className="group/card flex h-full flex-col overflow-hidden py-0 ring-1 ring-foreground/5">
        <CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6">
          <div className="flex flex-col gap-2.5">
            <Badge
              variant="secondary"
              className="w-fit max-w-full whitespace-normal rounded-full px-3 py-1 text-xs font-medium"
            >
              {workCase.serviceType}
            </Badge>
            <h3 className="text-h4 text-foreground">{workCase.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {workCase.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="group/image relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)] bg-muted text-left"
            aria-label={`Открыть фото: ${workCase.title}`}
          >
            <Image
              src={workCase.image}
              alt={workCase.imageAlt}
              width={workCase.imageWidth}
              height={workCase.imageHeight}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-[1.03]"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            />
            <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm transition-transform duration-300 group-hover/image:scale-105">
              <ZoomIn className="size-4" aria-hidden />
            </span>
          </button>

          <div className="grid grid-cols-2 gap-3 border-t border-border/60 pt-4 sm:grid-cols-3">
            <MetaItem
              icon={Maximize2}
              label="Площадь"
              value={`${formatRubles(workCase.area)} м²`}
            />
            <MetaItem icon={Clock} label="Срок" value={duration} />
            <MetaItem
              icon={Wallet}
              label="Стоимость"
              value={`${formatRubles(workCase.price)} ₽`}
            />
          </div>
        </CardContent>
      </Card>

      <WorkCaseLightbox
        open={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
        image={workCase.image}
        imageAlt={workCase.imageAlt}
        imageWidth={workCase.imageWidth}
        imageHeight={workCase.imageHeight}
        title={workCase.title}
      />
    </>
  );
}
