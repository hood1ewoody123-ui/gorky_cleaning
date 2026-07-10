import { HeroHeader } from "@/features/home/hero/HeroHeader";
import { HeroOffer } from "@/features/home/hero/HeroOffer";
import { HeroQuickForm } from "@/features/home/hero/HeroQuickForm";

export function HeroSection() {
  return (
    <section
      aria-label="Главный экран"
      className="section-y !pb-8 !pt-4 md:!py-6"
    >
      <div className="container-app">
        <div
          data-hero-shell
          className="relative isolate min-h-0 overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-elevated)] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[680px]"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
            aria-hidden
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/30" />
          <div
            className="pointer-events-none absolute -right-16 top-8 h-[120%] w-px rotate-[32deg] bg-white/10"
            aria-hidden
          />

          <div className="relative z-10 flex min-h-[inherit] flex-col">
            <HeroHeader />

            <div className="flex flex-1 flex-col justify-end px-4 pb-5 pt-4 md:px-8 md:pb-7 md:pt-6 lg:px-10 lg:pb-8 lg:pt-8">
              <div className="grid w-full items-end gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-16">
                <HeroOffer />
                <HeroQuickForm className="mx-auto lg:mx-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
