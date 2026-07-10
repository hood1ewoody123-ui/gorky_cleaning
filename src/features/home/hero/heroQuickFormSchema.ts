import { z } from "zod";

import {
  leadAreaField,
  leadNameField,
  leadPhoneField,
} from "@/lib/leads/leadApiSchema";

export const heroQuickFormSchema = z.object({
  name: leadNameField,
  objectType: z.string().min(1, "Выберите тип объекта"),
  area: leadAreaField,
  cleaningType: z.string().min(1, "Выберите тип уборки"),
  phone: leadPhoneField,
});

export type HeroQuickFormValues = z.infer<typeof heroQuickFormSchema>;
