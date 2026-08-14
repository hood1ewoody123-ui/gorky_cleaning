import { z } from "zod";

export const LEAD_CONSENT_ERROR =
  "Подтвердите согласие на обработку персональных данных и пользовательское соглашение";

export const leadConsentAcceptedField = z.boolean().refine((value) => value, {
  message: LEAD_CONSENT_ERROR,
});

export const leadConsentDefaultValue = false;
