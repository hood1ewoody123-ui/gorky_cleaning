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
  /**
   * Anti-spam honeypot. Real forms send empty / omit.
   * Never shown in Telegram; stripped before DB insert.
   */
  website?: string;
};

export type LeadSubmitResult = {
  ok: boolean;
  telegramSent: boolean;
  error?: string;
};
