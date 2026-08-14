import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://gorkycleaning.ru"),
  NEXT_PUBLIC_YANDEX_METRIKA_ID: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  TELEGRAM_API_BASE: z.string().url().optional(),
  TELEGRAM_PROXY_URL: z.string().optional(),
  TELEGRAM_PROXY_SECRET: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  return envSchema.parse(process.env);
}
