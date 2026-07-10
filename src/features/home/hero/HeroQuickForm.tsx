"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CLEANING_TYPE_OPTIONS,
  HERO_CONTENT,
  OBJECT_TYPE_OPTIONS,
} from "@/constants/home";
import {
  heroQuickFormSchema,
  type HeroQuickFormValues,
} from "@/features/home/hero/heroQuickFormSchema";
import { formatRuPhoneInput, RU_PHONE_EMPTY } from "@/lib/formatPhone";
import { submitLead } from "@/lib/leads/submitLead";
import { cn } from "@/lib/utils";

type HeroQuickFormProps = {
  className?: string;
};

const labelClassName = "text-sm font-medium text-white/80";

const fieldClassName =
  "h-10 w-full min-w-0 rounded-md border-white/30 bg-white/15 px-2.5 text-sm text-white shadow-none backdrop-blur-sm placeholder:text-white/45 data-placeholder:text-white/45 focus-visible:border-white/50 focus-visible:bg-white/20 focus-visible:ring-white/20 [&_[data-slot=select-value]]:line-clamp-2 [&_[data-slot=select-value]]:text-white [&_[data-slot=select-value]]:whitespace-normal";

const selectContentClassName =
  "rounded-md border border-border bg-popover text-popover-foreground shadow-lg [&_[data-slot=select-item]]:rounded-sm";

export function HeroQuickForm({ className }: HeroQuickFormProps) {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<HeroQuickFormValues>({
    resolver: zodResolver(heroQuickFormSchema),
    defaultValues: {
      name: "",
      objectType: "",
      area: "",
      cleaningType: "",
      phone: RU_PHONE_EMPTY,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const objectLabel =
      OBJECT_TYPE_OPTIONS.find((option) => option.value === values.objectType)
        ?.label ?? values.objectType;
    const cleaningLabel =
      CLEANING_TYPE_OPTIONS.find(
        (option) => option.value === values.cleaningType,
      )?.label ?? values.cleaningType;

    try {
      await submitLead({
        source: "hero-form",
        page: pathname,
        name: values.name,
        phone: values.phone,
        service: `${cleaningLabel} — ${objectLabel}`,
        area: `${values.area} м²`,
        metadata: {
          objectType: values.objectType,
          cleaningType: values.cleaningType,
        },
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  });

  return (
    <GlassPanel
      id="order-form"
      variant="frosted"
      className={cn(
        "w-full max-w-full shrink-0 p-4 sm:max-w-[272px] lg:ml-auto xl:max-w-[288px]",
        className,
      )}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
        {submitted ? (
          <div className="flex items-start gap-3 py-1" role="status">
            <CircleCheck
              className="size-5 shrink-0 text-white"
              aria-hidden="true"
              strokeWidth={2}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Заявка принята</p>
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                Перезвоним в ближайшее время и рассчитаем стоимость.
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-white">
              {HERO_CONTENT.formTitle}
            </p>
            <div className="flex flex-col gap-1">
              <Label htmlFor="hero-name" className={labelClassName}>
                Имя
              </Label>
              <Input
                id="hero-name"
                autoComplete="name"
                placeholder="Как к вам обращаться"
                className={fieldClassName}
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
              {errors.name ? (
                <p className="text-[0.6875rem] text-red-200">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="objectType" className={labelClassName}>
                Тип объекта
              </Label>
              <Controller
                name="objectType"
                control={control}
                render={({ field }) => (
                  <Select
                    items={[...OBJECT_TYPE_OPTIONS]}
                    value={field.value || null}
                    onValueChange={(value) => field.onChange(value ?? "")}
                  >
                    <SelectTrigger
                      id="objectType"
                      className={cn(fieldClassName, "!h-10")}
                    >
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent
                      alignItemWithTrigger={false}
                      className={selectContentClassName}
                    >
                      {OBJECT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.objectType ? (
                <p className="text-[0.6875rem] text-red-200">
                  {errors.objectType.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="area" className={labelClassName}>
                Площадь, м²
              </Label>
              <Input
                id="area"
                inputMode="decimal"
                placeholder="65"
                className={fieldClassName}
                aria-invalid={Boolean(errors.area)}
                {...register("area")}
              />
              {errors.area ? (
                <p className="text-[0.6875rem] text-red-200">
                  {errors.area.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="cleaningType" className={labelClassName}>
                Тип уборки
              </Label>
              <Controller
                name="cleaningType"
                control={control}
                render={({ field }) => (
                  <Select
                    items={[...CLEANING_TYPE_OPTIONS]}
                    value={field.value || null}
                    onValueChange={(value) => field.onChange(value ?? "")}
                  >
                    <SelectTrigger
                      id="cleaningType"
                      className={cn(fieldClassName, "!h-10")}
                    >
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent
                      alignItemWithTrigger={false}
                      className={selectContentClassName}
                    >
                      {CLEANING_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.cleaningType ? (
                <p className="text-[0.6875rem] text-red-200">
                  {errors.cleaningType.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="phone" className={labelClassName}>
                Телефон
              </Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    className={fieldClassName}
                    aria-invalid={Boolean(errors.phone)}
                    value={field.value}
                    onFocus={() => {
                      if (!field.value) {
                        field.onChange(RU_PHONE_EMPTY);
                      }
                    }}
                    onChange={(event) => {
                      field.onChange(formatRuPhoneInput(event.target.value));
                    }}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.phone ? (
                <p className="text-[0.6875rem] text-red-200">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <p className="text-[0.6875rem] text-red-200">{submitError}</p>
            ) : null}

            <Button
              type="submit"
              size="pill-sm"
              className="mt-0.5 w-full text-sm"
              disabled={isSubmitting}
            >
              {HERO_CONTENT.formSubmit}
            </Button>
          </>
        )}
      </form>
    </GlassPanel>
  );
}
