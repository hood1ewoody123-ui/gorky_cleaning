import { z } from "zod";

import {
  leadNameField,
  leadPhoneField,
  optionalLeadEmailField,
} from "@/lib/leads/leadApiSchema";

export const calculatorLeadSchema = z.object({
  name: leadNameField,
  phone: leadPhoneField,
  email: optionalLeadEmailField,
  comment: z.string().optional(),
});

export type CalculatorLeadValues = z.infer<typeof calculatorLeadSchema>;
