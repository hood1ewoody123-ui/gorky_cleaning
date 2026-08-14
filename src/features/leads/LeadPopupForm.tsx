"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  useForm,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CLEANING_TYPE_OPTIONS, OBJECT_TYPE_OPTIONS } from "@/constants/home";
import { LEAD_FORM_COPY, type LeadDialogVariant } from "@/constants/lead-forms";
import {
  consultationLeadSchema,
  mainLeadSchema,
  serviceLeadSchema,
  type ConsultationLeadValues,
  type MainLeadValues,
  type ServiceLeadValues,
} from "@/features/leads/leadFormSchemas";
import { formatRuPhoneInput, RU_PHONE_EMPTY } from "@/lib/formatPhone";
import { leadConsentDefaultValue } from "@/lib/leads/consentSchema";
import { normalizeLeadEmail } from "@/lib/leads/normalizeLeadEmail";
import { submitLead } from "@/lib/leads/submitLead";
import { LeadConsentField } from "@/shared/forms/LeadConsentField";
import { cn } from "@/lib/utils";

const LEAD_INPUT_CLASS = "h-10 rounded-[var(--radius-xs)] px-3 text-sm";
const LEAD_SELECT_CLASS =
  "h-10 w-full rounded-[var(--radius-xs)] px-3 data-[size=default]:h-10";
const LEAD_TEXTAREA_CLASS =
  "min-h-[96px] rounded-[var(--radius-xs)] px-3 py-2.5 text-sm";
const LEAD_SUBMIT_CLASS =
  "mt-1 h-11 w-full rounded-[var(--radius-md)] text-sm font-medium";

type LeadPopupFormProps = {
  variant: LeadDialogVariant;
  source: string;
  service?: string;
  area?: string;
  metadata?: Record<string, unknown>;
  onSuccess?: () => void;
  className?: string;
};

function getObjectLabel(value: string) {
  return OBJECT_TYPE_OPTIONS.find((option) => option.value === value)?.label;
}

function getCleaningLabel(value: string) {
  return CLEANING_TYPE_OPTIONS.find((option) => option.value === value)?.label;
}

export function LeadPopupForm({
  variant,
  source,
  service,
  area,
  metadata,
  onSuccess,
  className,
}: LeadPopupFormProps) {
  const pathname = usePathname();
  const copy = LEAD_FORM_COPY[variant];
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (variant === "main") {
    return (
      <MainLeadPopupForm
        className={className}
        copy={copy}
        metadata={metadata}
        onSuccess={onSuccess}
        pathname={pathname}
        setSubmitError={setSubmitError}
        setSubmitState={setSubmitState}
        source={source}
        submitError={submitError}
        submitState={submitState}
      />
    );
  }

  if (variant === "service") {
    return (
      <ServiceLeadPopupForm
        area={area}
        className={className}
        copy={copy}
        metadata={metadata}
        onSuccess={onSuccess}
        pathname={pathname}
        service={service}
        setSubmitError={setSubmitError}
        setSubmitState={setSubmitState}
        source={source}
        submitError={submitError}
        submitState={submitState}
      />
    );
  }

  return (
    <SimpleLeadPopupForm
      className={className}
      copy={copy}
      metadata={metadata}
      onSuccess={onSuccess}
      pathname={pathname}
      service={
        variant === "promo"
          ? "Скидка 15% на первый заказ"
          : "Бесплатная консультация"
      }
      setSubmitError={setSubmitError}
      setSubmitState={setSubmitState}
      source={source}
      submitError={submitError}
      submitState={submitState}
      variant={variant}
    />
  );
}

type SharedFormStateProps = {
  copy: (typeof LEAD_FORM_COPY)[LeadDialogVariant];
  source: string;
  pathname: string;
  metadata?: Record<string, unknown>;
  submitState: "idle" | "loading" | "success" | "error";
  submitError: string | null;
  setSubmitState: (state: "idle" | "loading" | "success" | "error") => void;
  setSubmitError: (error: string | null) => void;
  onSuccess?: () => void;
  className?: string;
};

function SuccessState({
  copy,
  onReset,
}: {
  copy: (typeof LEAD_FORM_COPY)[LeadDialogVariant];
  onReset: () => void;
}) {
  return (
    <div
      className="rounded-[var(--radius-md)] bg-primary/5 px-5 py-6 text-center ring-1 ring-primary/10"
      role="status"
    >
      <p className="text-base font-medium text-primary">{copy.successTitle}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {copy.successDescription}
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-4 h-10 rounded-[var(--radius-md)] px-6"
        onClick={onReset}
      >
        Закрыть
      </Button>
    </div>
  );
}

function MainLeadPopupForm({
  copy,
  source,
  pathname,
  metadata,
  submitState,
  submitError,
  setSubmitState,
  setSubmitError,
  onSuccess,
  className,
}: SharedFormStateProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MainLeadValues>({
    resolver: zodResolver(mainLeadSchema),
    defaultValues: {
      name: "",
      objectType: "",
      area: "",
      cleaningType: "",
      phone: RU_PHONE_EMPTY,
      consentAccepted: leadConsentDefaultValue,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("loading");
    setSubmitError(null);

    try {
      await submitLead({
        source,
        page: pathname,
        name: values.name,
        phone: values.phone,
        service: `${getCleaningLabel(values.cleaningType) ?? values.cleaningType} — ${getObjectLabel(values.objectType) ?? values.objectType}`,
        area: `${values.area} м²`,
        metadata: {
          ...metadata,
          objectType: values.objectType,
          cleaningType: values.cleaningType,
        },
      });
      setSubmitState("success");
      reset({
        name: "",
        objectType: "",
        area: "",
        cleaningType: "",
        phone: RU_PHONE_EMPTY,
        consentAccepted: leadConsentDefaultValue,
      });
    } catch {
      setSubmitState("error");
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  });

  if (submitState === "success") {
    return (
      <SuccessState
        copy={copy}
        onReset={() => {
          setSubmitState("idle");
          onSuccess?.();
        }}
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-main-name">Имя</Label>
        <Input
          id="lead-main-name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          className={LEAD_INPUT_CLASS}
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-objectType">Тип объекта</Label>
        <Controller
          name="objectType"
          control={control}
          render={({ field }) => (
            <Select
              items={[...OBJECT_TYPE_OPTIONS]}
              value={field.value || null}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <SelectTrigger id="lead-objectType" className={LEAD_SELECT_CLASS}>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
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
          <p className="text-xs text-destructive">
            {errors.objectType.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-area">Площадь, м²</Label>
        <Input
          id="lead-area"
          inputMode="decimal"
          placeholder="65"
          className={LEAD_INPUT_CLASS}
          aria-invalid={Boolean(errors.area)}
          {...register("area")}
        />
        {errors.area ? (
          <p className="text-xs text-destructive">{errors.area.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-cleaningType">Тип уборки</Label>
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
                id="lead-cleaningType"
                className={LEAD_SELECT_CLASS}
              >
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
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
          <p className="text-xs text-destructive">
            {errors.cleaningType.message}
          </p>
        ) : null}
      </div>

      <PhoneField
        control={control}
        error={errors.phone?.message}
        id="lead-main-phone"
        name="phone"
      />

      {submitError ? (
        <p className="text-sm text-destructive">{submitError}</p>
      ) : null}

      <LeadConsentField
        id="lead-main-consent"
        register={register}
        error={errors.consentAccepted}
      />

      <Button
        type="submit"
        className={LEAD_SUBMIT_CLASS}
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? "Отправляем…" : copy.submit}
      </Button>
    </form>
  );
}

function ServiceLeadPopupForm({
  copy,
  source,
  pathname,
  service,
  area,
  metadata,
  submitState,
  submitError,
  setSubmitState,
  setSubmitError,
  onSuccess,
  className,
}: SharedFormStateProps & { service?: string; area?: string }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ServiceLeadValues>({
    resolver: zodResolver(serviceLeadSchema),
    defaultValues: {
      name: "",
      phone: RU_PHONE_EMPTY,
      email: "",
      comment: "",
      consentAccepted: leadConsentDefaultValue,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("loading");
    setSubmitError(null);

    try {
      await submitLead({
        source,
        page: pathname,
        name: values.name,
        phone: values.phone,
        email: normalizeLeadEmail(values.email),
        service: service ?? "Заявка на услугу",
        area: area ?? "—",
        comment: values.comment,
        metadata,
      });
      setSubmitState("success");
      reset({
        name: "",
        phone: RU_PHONE_EMPTY,
        email: "",
        comment: "",
        consentAccepted: leadConsentDefaultValue,
      });
    } catch {
      setSubmitState("error");
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  });

  if (submitState === "success") {
    return (
      <SuccessState
        copy={copy}
        onReset={() => {
          setSubmitState("idle");
          onSuccess?.();
        }}
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      {service ? (
        <div className="rounded-[var(--radius-xs)] bg-muted px-3 py-2.5">
          <p className="text-xs text-muted-foreground">Услуга</p>
          <p className="text-sm font-medium text-foreground">{service}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-service-name">Имя</Label>
        <Input
          id="lead-service-name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          className={LEAD_INPUT_CLASS}
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <PhoneField
        control={control}
        error={errors.phone?.message}
        id="lead-service-phone"
        name="phone"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-service-email">Email (необязательно)</Label>
        <Input
          id="lead-service-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Для подтверждения заявки"
          className={LEAD_INPUT_CLASS}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lead-service-comment">Комментарий</Label>
        <Textarea
          id="lead-service-comment"
          rows={3}
          placeholder="Удобное время, особенности объекта…"
          className={LEAD_TEXTAREA_CLASS}
          {...register("comment")}
        />
      </div>

      {submitError ? (
        <p className="text-sm text-destructive">{submitError}</p>
      ) : null}

      <LeadConsentField
        id="lead-service-consent"
        register={register}
        error={errors.consentAccepted}
      />

      <Button
        type="submit"
        className={LEAD_SUBMIT_CLASS}
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? "Отправляем…" : copy.submit}
      </Button>
    </form>
  );
}

function SimpleLeadPopupForm({
  copy,
  source,
  pathname,
  service,
  metadata,
  variant,
  submitState,
  submitError,
  setSubmitState,
  setSubmitError,
  onSuccess,
  className,
}: SharedFormStateProps & {
  service: string;
  variant: LeadDialogVariant;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ConsultationLeadValues>({
    resolver: zodResolver(consultationLeadSchema),
    defaultValues: {
      name: "",
      phone: RU_PHONE_EMPTY,
      email: "",
      consentAccepted: leadConsentDefaultValue,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("loading");
    setSubmitError(null);

    try {
      await submitLead({
        source,
        page: pathname,
        name: values.name,
        phone: values.phone,
        email: normalizeLeadEmail(values.email),
        service,
        area: "—",
        metadata: {
          ...metadata,
          ...(variant === "promo" ? { promoDiscount: "15%" } : {}),
        },
      });
      setSubmitState("success");
      reset({
        name: "",
        phone: RU_PHONE_EMPTY,
        email: "",
        consentAccepted: leadConsentDefaultValue,
      });
    } catch {
      setSubmitState("error");
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  });

  if (submitState === "success") {
    return (
      <SuccessState
        copy={copy}
        onReset={() => {
          setSubmitState("idle");
          onSuccess?.();
        }}
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor={`lead-${variant}-name`}>Имя</Label>
        <Input
          id={`lead-${variant}-name`}
          autoComplete="name"
          placeholder="Как к вам обращаться"
          className={LEAD_INPUT_CLASS}
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <PhoneField
        control={control}
        error={errors.phone?.message}
        id={`lead-${variant}-phone`}
        name="phone"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor={`lead-${variant}-email`}>Email (необязательно)</Label>
        <Input
          id={`lead-${variant}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Для подтверждения заявки"
          className={LEAD_INPUT_CLASS}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      {submitError ? (
        <p className="text-sm text-destructive">{submitError}</p>
      ) : null}

      <LeadConsentField
        id={`lead-${variant}-consent`}
        register={register}
        error={errors.consentAccepted}
      />

      <Button
        type="submit"
        className={LEAD_SUBMIT_CLASS}
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? "Отправляем…" : copy.submit}
      </Button>
    </form>
  );
}

function PhoneField<T extends FieldValues>({
  control,
  error,
  id,
  name,
}: {
  control: Control<T>;
  error?: string;
  id: string;
  name: Path<T>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>Телефон</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            className={LEAD_INPUT_CLASS}
            aria-invalid={Boolean(error)}
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
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
