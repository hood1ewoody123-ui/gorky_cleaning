import { z } from "zod";

const optionalPositiveInt = z.coerce.number().int().positive().optional();

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://gorkycleaning.ru"),
  NEXT_PUBLIC_YANDEX_METRIKA_ID: z.string().optional(),

  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  TELEGRAM_API_BASE: z.string().url().optional(),
  TELEGRAM_PROXY_URL: z.string().optional(),
  TELEGRAM_PROXY_SECRET: z.string().optional(),

  /** postgresql://gorky_app:...@127.0.0.1:5432/gorky_db */
  DATABASE_URL: z.string().min(1).optional(),
  /** disable (local/VPS loopback) | require (TLS to remote DB) */
  DATABASE_SSL: z.enum(["disable", "require"]).optional(),
  /** Set to "false" only if using a private CA / self-signed in a controlled env */
  DATABASE_SSL_REJECT_UNAUTHORIZED: z.enum(["true", "false"]).optional(),

  /** Pepper for hashing client IPs before storage */
  LEAD_IP_HASH_PEPPER: z.string().min(8).optional(),

  LEAD_RATE_LIMIT_IP_MAX: optionalPositiveInt,
  LEAD_RATE_LIMIT_IP_WINDOW_MS: optionalPositiveInt,
  LEAD_RATE_LIMIT_PHONE_MAX: optionalPositiveInt,
  LEAD_RATE_LIMIT_PHONE_WINDOW_MS: optionalPositiveInt,
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  return envSchema.parse(process.env);
}
