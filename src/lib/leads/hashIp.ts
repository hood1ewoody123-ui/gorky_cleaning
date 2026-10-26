import { createHash } from "node:crypto";

import { getEnv } from "@/lib/env";

/**
 * One-way hash of the client IP for rate-limit / audit columns.
 * Never store raw IP addresses in leads.
 */
export function hashClientIp(ip: string | null | undefined): string | null {
  if (!ip) {
    return null;
  }

  const trimmed = ip.trim();
  if (!trimmed) {
    return null;
  }

  const { LEAD_IP_HASH_PEPPER } = getEnv();
  const pepper = LEAD_IP_HASH_PEPPER || "gorkycleaning-local-dev-pepper";

  return createHash("sha256").update(`${pepper}:${trimmed}`).digest("hex");
}
