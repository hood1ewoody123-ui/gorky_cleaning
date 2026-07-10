"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  calculatorLeadSchema,
  type CalculatorLeadValues,
} from "@/features/home/calculator/calculatorLeadSchema";
import { formatRuPhoneInput, RU_PHONE_EMPTY } from "@/lib/formatPhone";
import { cn } from "@/lib/utils";

type LeadFormProps = {
  onSubmit: (values: CalculatorLeadValues) => Promise<void>;
  className?: string;
};

export function LeadForm({ onSubmit, className }: LeadFormProps) {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CalculatorLeadValues>({
    resolver: zodResolver(calculatorLeadSchema),
    defaultValues: {
      name: "",
      phone: RU_PHONE_EMPTY,
      email: "",
      comment: "",
    },
  });

  const submitHandler = handleSubmit(async (values) => {
    setSubmitState("loading");
    setSubmitError(null);

    try {
      await onSubmit(values);
      setSubmitState("success");
      reset({ name: "", phone: RU_PHONE_EMPTY, email: "", comment: "" });
    } catch {
      setSubmitState("error");
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  });

  if (submitState === "success") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-md)] bg-primary/5 px-5 py-6 text-center ring-1 ring-primary/10",
          className,
        )}
      >
        <p className="text-base font-medium text-primary">Заявка отправлена</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Перезвоним в течение 15 минут и уточним детали.
        </p>
        <Button
          type="button"
          variant="outline"
          size="pill-sm"
          className="mt-4"
          onClick={() => setSubmitState("idle")}
        >
          Отправить ещё
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitHandler}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="calc-name">Имя</Label>
        <Input
          id="calc-name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="calc-phone">Телефон</Label>
        <Input
          id="calc-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
          onChange={(event) => {
            setValue("phone", formatRuPhoneInput(event.target.value), {
              shouldValidate: true,
            });
          }}
        />
        {errors.phone ? (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="calc-email">Email (необязательно)</Label>
        <Input
          id="calc-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Для подтверждения заявки"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="calc-comment">Комментарий</Label>
        <Textarea
          id="calc-comment"
          rows={3}
          placeholder="Удобное время, особенности объекта…"
          {...register("comment")}
        />
      </div>

      {submitError ? (
        <p className="text-sm text-destructive">{submitError}</p>
      ) : null}

      <Button
        type="submit"
        size="pill-sm"
        disabled={submitState === "loading"}
        className="w-full"
      >
        {submitState === "loading" ? "Отправляем…" : "Оставить заявку"}
      </Button>
    </form>
  );
}
