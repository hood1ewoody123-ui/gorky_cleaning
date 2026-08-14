import { z } from "zod";

import {
  leadAreaField,
  leadNameField,
  leadPhoneField,
  optionalLeadEmailField,
} from "@/lib/leads/leadApiSchema";

import { leadConsentAcceptedField } from "@/lib/leads/consentSchema";

export const consultationLeadSchema = z.object({
  name: leadNameField,
  phone: leadPhoneField,
  email: optionalLeadEmailField,
  consentAccepted: leadConsentAcceptedField,
});

export const promoLeadSchema = consultationLeadSchema;

export const serviceLeadSchema = z.object({
  name: leadNameField,
  phone: leadPhoneField,
  email: optionalLeadEmailField,
  comment: z.string().optional(),
  consentAccepted: leadConsentAcceptedField,
});

export const mainLeadSchema = z.object({
  name: leadNameField,
  objectType: z.string().min(1, "Выберите тип объекта"),
  area: leadAreaField,
  cleaningType: z.string().min(1, "Выберите тип уборки"),
  phone: leadPhoneField,
  consentAccepted: leadConsentAcceptedField,
});

export type ConsultationLeadValues = z.infer<typeof consultationLeadSchema>;
export type PromoLeadValues = z.infer<typeof promoLeadSchema>;
export type ServiceLeadValues = z.infer<typeof serviceLeadSchema>;
export type MainLeadValues = z.infer<typeof mainLeadSchema>;
