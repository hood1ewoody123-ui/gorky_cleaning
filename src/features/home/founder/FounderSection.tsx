import Image from "next/image";

import { FOUNDER_CONTENT } from "@/constants/founder";

export function FounderSection() {
  return (
    <section id="about" aria-labelledby="founder-name" className="section-y">
      <div className="container-app">
        <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] xl:gap-16">
          <div className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]">
              <Image
                src={FOUNDER_CONTENT.image}
                alt={FOUNDER_CONTENT.imageAlt}
                width={FOUNDER_CONTENT.imageWidth}
                height={FOUNDER_CONTENT.imageHeight}
                className="aspect-[4/5] h-auto w-full object-cover object-top"
                sizes="(min-width: 1024px) 300px, 280px"
                priority={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            <div className="flex flex-col gap-2">
              <h2
                id="founder-name"
                className="text-h3 text-foreground md:text-[clamp(1.75rem,2.5vw,2.25rem)]"
              >
                {FOUNDER_CONTENT.name}
              </h2>
              <p className="text-sm font-medium tracking-wide text-primary md:text-base">
                {FOUNDER_CONTENT.role}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {FOUNDER_CONTENT.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
