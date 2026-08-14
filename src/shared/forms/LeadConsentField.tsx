"use client";

import Link from "next/link";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { LEGAL_ROUTES } from "@/constants/legal";
import { cn } from "@/lib/utils";

type LeadConsentFieldProps<T extends FieldValues> = {
  id: string;
  register: UseFormRegister<T>;
  name?: Path<T>;
  error?: FieldError;
  variant?: "default" | "hero";
  className?: string;
};

export function LeadConsentField<T extends FieldValues>({
  id,
  register,
  name = "consentAccepted" as Path<T>,
  error,
  variant = "default",
  className,
}: LeadConsentFieldProps<T>) {
  const isHero = variant === "hero";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3",
          isHero ? "text-white/85" : "text-muted-foreground",
        )}
      >
        <input
          id={id}
          type="checkbox"
          className={cn(
            "mt-0.5 size-4 shrink-0 rounded-[4px] border accent-primary",
            isHero
              ? "border-white/40 bg-white/10"
              : "border-input bg-background",
          )}
          aria-invalid={Boolean(error)}
          {...register(name)}
        />
        <span className="text-[0.6875rem] leading-relaxed md:text-xs">
          Я согласен на{" "}
          <Link
            href={LEGAL_ROUTES.privacy}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline underline-offset-2",
              isHero
                ? "text-white hover:text-white/90"
                : "text-primary hover:text-primary/80",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            обработку персональных данных
          </Link>{" "}
          и принимаю{" "}
          <Link
            href={LEGAL_ROUTES.terms}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline underline-offset-2",
              isHero
                ? "text-white hover:text-white/90"
                : "text-primary hover:text-primary/80",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            пользовательское соглашение
          </Link>
          .
        </span>
      </label>
      {error ? (
        <p
          className={cn(
            "text-[0.6875rem]",
            isHero ? "text-red-200" : "text-destructive",
          )}
        >
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
