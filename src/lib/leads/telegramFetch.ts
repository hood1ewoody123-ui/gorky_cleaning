const DEFAULT_TELEGRAM_API_BASE = "https://api.telegram.org";
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_ATTEMPTS = 3;

type TelegramFetchInit = Omit<RequestInit, "signal">;

export type TelegramFetchOptions = {
  apiBase?: string;
  proxyUrl?: string;
  proxySecret?: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isRetryableNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  const cause = error.cause as { code?: string } | undefined;

  return (
    message.includes("fetch failed") ||
    message.includes("timeout") ||
    cause?.code === "ETIMEDOUT" ||
    cause?.code === "ECONNRESET" ||
    cause?.code === "ECONNREFUSED" ||
    cause?.code === "EAI_AGAIN"
  );
}

async function createTelegramDispatcher(proxyUrl?: string) {
  if (!proxyUrl) {
    return undefined;
  }

  const { ProxyAgent } = await import("undici");
  return new ProxyAgent(proxyUrl);
}

function buildTelegramUrl(apiBase: string, path: string) {
  return `${apiBase.replace(/\/$/, "")}${path}`;
}

export async function telegramFetch(
  path: string,
  init: TelegramFetchInit,
  options: TelegramFetchOptions = {},
) {
  const apiBase = options.apiBase?.trim() || DEFAULT_TELEGRAM_API_BASE;
  const url = buildTelegramUrl(apiBase, path);
  const dispatcher = await createTelegramDispatcher(options.proxyUrl);
  const headers = new Headers(init.headers);

  if (options.proxySecret) {
    headers.set("Authorization", `Bearer ${options.proxySecret}`);
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await fetch(url, {
        ...init,
        headers,
        ...(dispatcher ? { dispatcher } : {}),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      lastError = error;

      if (!isRetryableNetworkError(error) || attempt === MAX_ATTEMPTS) {
        throw error;
      }

      console.warn(
        `[lead] Telegram request failed (attempt ${attempt}/${MAX_ATTEMPTS}), retrying…`,
        error,
      );

      await sleep(attempt * 1_000);
    }
  }

  throw lastError;
}
