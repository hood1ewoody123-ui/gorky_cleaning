import {
  countRecentLeadsByIpHash,
  countRecentLeadsByPhone,
} from "@/lib/leads/leadRepository";
import { getEnv } from "@/lib/env";

export class LeadRateLimitError extends Error {
  readonly code = "LEAD_RATE_LIMIT" as const;

  constructor(message = "Too many requests") {
    super(message);
    this.name = "LeadRateLimitError";
  }
}

/**
 * Soft spam guard: recent submissions by IP hash and by phone.
 * Does not change form UX for normal users.
 */
export async function assertLeadNotRateLimited(input: {
  ipHash: string | null;
  phone: string;
}): Promise<void> {
  const {
    LEAD_RATE_LIMIT_IP_MAX,
    LEAD_RATE_LIMIT_IP_WINDOW_MS,
    LEAD_RATE_LIMIT_PHONE_MAX,
    LEAD_RATE_LIMIT_PHONE_WINDOW_MS,
  } = getEnv();

  const ipMax = LEAD_RATE_LIMIT_IP_MAX ?? 8;
  const ipWindowMs = LEAD_RATE_LIMIT_IP_WINDOW_MS ?? 10 * 60_000;
  const phoneMax = LEAD_RATE_LIMIT_PHONE_MAX ?? 5;
  const phoneWindowMs = LEAD_RATE_LIMIT_PHONE_WINDOW_MS ?? 60 * 60_000;

  if (input.ipHash) {
    const ipCount = await countRecentLeadsByIpHash(input.ipHash, ipWindowMs);
    if (ipCount >= ipMax) {
      throw new LeadRateLimitError();
    }
  }

  const phoneCount = await countRecentLeadsByPhone(input.phone, phoneWindowMs);
  if (phoneCount >= phoneMax) {
    throw new LeadRateLimitError();
  }
}
