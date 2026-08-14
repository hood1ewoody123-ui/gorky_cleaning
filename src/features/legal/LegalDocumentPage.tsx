import Link from "next/link";

import { LEGAL_ROUTES, type LegalDocumentSection } from "@/constants/legal";
import { cn } from "@/lib/utils";

type LegalDocumentPageProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalDocumentSection[];
  className?: string;
};

export function LegalDocumentPage({
  title,
  description,
  updatedAt,
  sections,
  className,
}: LegalDocumentPageProps) {
  return (
    <article className={cn("section-y", className)}>
      <div className="container-app flex max-w-3xl flex-col gap-8 md:gap-10">
        <header className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            ← На главную
          </Link>
          <div className="flex flex-col gap-3">
            <h1 className="text-h1 text-pretty text-foreground">{title}</h1>
            <p className="text-body text-muted-foreground">{description}</p>
            <p className="text-small text-muted-foreground">
              Дата обновления: {updatedAt}
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8 rounded-[var(--radius-lg)] bg-surface p-6 shadow-[var(--shadow-card)] md:gap-10 md:p-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="flex flex-col gap-3"
            >
              <h2
                id={`${section.id}-heading`}
                className="text-h3 text-foreground"
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-body text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="flex list-disc flex-col gap-2 pl-5 text-body text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <p className="text-small text-muted-foreground">
          См. также:{" "}
          <Link
            href={LEGAL_ROUTES.privacy}
            className="text-primary underline-offset-4 hover:underline"
          >
            Политика конфиденциальности
          </Link>
          {" · "}
          <Link
            href={LEGAL_ROUTES.terms}
            className="text-primary underline-offset-4 hover:underline"
          >
            Пользовательское соглашение
          </Link>
        </p>
      </div>
    </article>
  );
}
