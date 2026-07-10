export type LeadPayload = {
  source: string;
  page: string;
  name: string;
  phone: string;
  service: string;
  area: string;
  email?: string;
  comment?: string;
  metadata?: Record<string, unknown>;
};

export type LeadSubmitResult = {
  ok: boolean;
  telegramSent: boolean;
  error?: string;
};
