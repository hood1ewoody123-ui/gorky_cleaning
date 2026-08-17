"use client";

import Script from "next/script";

import { useCookieConsent } from "@/components/legal/CookieConsentProvider";
import {
  YANDEX_METRIKA_ENABLED,
  YANDEX_METRIKA_ID,
} from "@/constants/analytics";

export function YandexMetrika() {
  const { isReady, analyticsAllowed } = useCookieConsent();

  if (!YANDEX_METRIKA_ENABLED || !isReady || !analyticsAllowed) {
    return null;
  }

  const initScript = `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}", "ym");

    window.dataLayer = window.dataLayer || [];

    ym(${YANDEX_METRIKA_ID}, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      accurateTrackBounce: true,
      trackLinks: true,
    });
  `;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {initScript}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
