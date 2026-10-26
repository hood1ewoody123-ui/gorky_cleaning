import { z } from "zod";

import { getRuPhoneDigits } from "@/lib/formatPhone";

export const leadPhoneField = z
  .string()
  .min(1, "Введите номер телефона")
  .refine((value) => {
    const digits = getRuPhoneDigits(value);
    return digits.length === 11 && digits.startsWith("7");
  }, "Введите полный номер телефона");

export const leadNameField = z.string().trim().min(2, "Укажите имя");

export const leadAreaField = z
  .string()
  .min(1, "Укажите площадь")
  .refine((value) => {
    const parsed = Number(value.replace(",", "."));
    return Number.isFinite(parsed) && parsed > 0 && parsed <= 100_000;
  }, "Укажите корректную площадь");

export const optionalLeadEmailField = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    "Укажите корректный email",
  );

/** Honeypot: real forms never send this. Non-empty → silent discard. */
export const leadHoneypotField = z.string().max(200).optional();

export const leadApiSchema = z.object({
  source: z.string().min(1).max(120),
  page: z.string().min(1).max(500),
  name: leadNameField.max(120),
  phone: leadPhoneField,
  service: z.string().min(1).max(500),
  area: z.string().min(1).max(200),
  email: optionalLeadEmailField.optional(),
  comment: z.string().max(2000).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  /** Anti-spam honeypot — must stay empty */
  website: leadHoneypotField,
});

export type LeadApiInput = z.infer<typeof leadApiSchema>;

export function isHoneypotTriggered(input: LeadApiInput): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}
