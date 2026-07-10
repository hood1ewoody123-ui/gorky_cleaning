"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WorkCaseLightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
};

export function WorkCaseLightbox({
  open,
  onOpenChange,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  title,
}: WorkCaseLightboxProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-background/30 backdrop-blur-md",
            "data-open:animate-in data-open:fade-in-0",
            "data-closed:animate-out data-closed:fade-out-0",
          )}
        />

        <DialogPrimitive.Popup
          className={cn(
            "fixed inset-0 z-50 flex outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.98]",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.98]",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {imageAlt}
          </DialogPrimitive.Description>

          <div className="relative flex h-full w-full items-center justify-center p-4 md:p-8">
            <Image
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] rounded-[var(--radius-lg)] object-contain shadow-[var(--shadow-elevated)] md:max-h-[calc(100dvh-4rem)] md:max-w-[calc(100vw-4rem)]"
              sizes="100vw"
              priority
            />

            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="absolute right-4 top-4 rounded-full bg-white/90 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm hover:bg-white md:right-8 md:top-8"
                />
              }
            >
              <X className="size-5" />
              <span className="sr-only">Закрыть</span>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
