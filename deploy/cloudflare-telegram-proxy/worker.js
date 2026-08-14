/**
 * Cloudflare Worker — прокси к api.telegram.org для VPS без прямого доступа.
 *
 * Deploy:
 * 1. cloudflare.com → Workers → Create worker
 * 2. Вставьте этот код, Deploy
 * 3. Settings → Variables → PROXY_SECRET = случайная длинная строка
 * 4. На VPS в .env.production:
 *    TELEGRAM_API_BASE=https://your-worker.your-subdomain.workers.dev
 *    TELEGRAM_PROXY_SECRET=та же строка
 */

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204 });
    }

    if (env.PROXY_SECRET) {
      const auth = request.headers.get("Authorization");

      if (auth !== `Bearer ${env.PROXY_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    const incoming = new URL(request.url);
    const target = new URL(
      `https://api.telegram.org${incoming.pathname}${incoming.search}`,
    );

    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("authorization");

    const hasBody =
      request.method !== "GET" &&
      request.method !== "HEAD" &&
      request.body !== null;

    return fetch(target.toString(), {
      method: request.method,
      headers,
      body: hasBody ? request.body : undefined,
    });
  },
};
