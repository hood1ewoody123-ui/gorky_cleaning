import { z } from "zod";

import {
  leadNameField,
  leadPhoneField,
  optionalLeadEmailField,
} from "@/lib/leads/leadApiSchema";

import { leadConsentAcceptedField } from "@/lib/leads/consentSchema";

export const calculatorLeadSchema = z.object({
  name: leadNameField,
  phone: leadPhoneField,
  email: optionalLeadEmailField,
  comment: z.string().optional(),
  consentAccepted: leadConsentAcceptedField,
});

export type CalculatorLeadValues = z.infer<typeof calculatorLeadSchema>;
