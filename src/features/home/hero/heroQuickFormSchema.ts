import { z } from "zod";

import { getRuPhoneDigits } from "@/lib/formatPhone";

export const heroQuickFormSchema = z.object({
  objectType: z.string().min(1, "Выберите тип объекта"),
  area: z
    .string()
    .min(1, "Укажите площадь")
    .refine((value) => {
      const parsed = Number(value.replace(",", "."));
      return Number.isFinite(parsed) && parsed > 0 && parsed <= 100_000;
    }, "Укажите корректную площадь"),
  cleaningType: z.string().min(1, "Выберите тип уборки"),
  phone: z
    .string()
    .min(1, "Введите номер телефона")
    .refine((value) => {
      const digits = getRuPhoneDigits(value);
      return digits.length === 11 && digits.startsWith("7");
    }, "Введите полный номер телефона"),
});

export type HeroQuickFormValues = z.infer<typeof heroQuickFormSchema>;
