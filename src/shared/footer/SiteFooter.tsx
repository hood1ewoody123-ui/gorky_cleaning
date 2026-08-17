import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import {
  FOOTER_COMPANY_LINKS,
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT,
  FOOTER_LEGAL_DISCLAIMER,
  FOOTER_LEGAL_LINKS,
  FOOTER_MESSENGERS,
  FOOTER_TAGLINE,
} from "@/constants/footer";
import { FooterServicesLinks } from "@/shared/footer/FooterServicesLinks";
import { SITE } from "@/constants/site";
import { BrandLogo } from "@/shared/brand/BrandLogo";

function FooterBrand() {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/"
        className="inline-flex items-center"
        aria-label={SITE.name}
      >
        <BrandLogo variant="dark" className="h-8 md:h-9" />
      </Link>

      <p className="max-w-sm text-small leading-[var(--leading-body)] text-muted-foreground">
        {FOOTER_TAGLINE}
      </p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="contacts"
      aria-labelledby="footer-heading"
      className="border-t border-foreground/8 bg-[var(--surface-muted)] pt-16 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-8"
    >
      <h2 id="footer-heading" className="sr-only">
        Контакты и навигация
      </h2>

      <div className="container-app flex flex-col gap-12 md:gap-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,280px)_1fr_minmax(0,220px)] lg:gap-16">
          <FooterBrand />

          <div className="flex flex-col gap-6">
            <h3 className="text-h4 text-foreground">Услуги</h3>
            <FooterServicesLinks />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-h4 text-foreground">Компания</h3>
              <ul className="flex flex-col gap-2">
                {FOOTER_COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-small text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-h4 text-foreground">Контакты</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href={FOOTER_CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 text-small text-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="size-4 shrink-0" aria-hidden />
                    {FOOTER_CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={FOOTER_CONTACT.emailHref}
                    className="inline-flex items-center gap-2 text-small text-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden />
                    {FOOTER_CONTACT.email}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2 text-small text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    {FOOTER_CONTACT.region}
                    <br />
                    {FOOTER_CONTACT.schedule}
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-2">
                {FOOTER_MESSENGERS.map((messenger) => (
                  <a
                    key={messenger.label}
                    href={messenger.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-caption font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {messenger.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-foreground/8 pt-8">
          <p className="max-w-4xl text-caption leading-relaxed text-muted-foreground">
            {FOOTER_LEGAL_DISCLAIMER}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-caption text-muted-foreground">
              {FOOTER_COPYRIGHT}
            </p>
            <ul className="flex flex-wrap gap-4">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
