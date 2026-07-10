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

export const leadApiSchema = z.object({
  source: z.string().min(1),
  page: z.string().min(1),
  name: leadNameField,
  phone: leadPhoneField,
  service: z.string().min(1),
  area: z.string().min(1),
  email: optionalLeadEmailField.optional(),
  comment: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type LeadApiInput = z.infer<typeof leadApiSchema>;
