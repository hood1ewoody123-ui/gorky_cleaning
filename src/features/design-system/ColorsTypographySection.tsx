import {
  ColorSwatch,
  DesignSection,
} from "@/features/design-system/DesignSection";
import { Heading, Text } from "@/shared/typography/Typography";

export function ColorsSection() {
  return (
    <DesignSection
      title="Цвета"
      description="Muted olive как primary — спокойный, премиальный, не перегружает интерфейс."
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        <ColorSwatch
          name="Background"
          className="bg-background"
          value="#FAFAF8"
        />
        <ColorSwatch name="Surface" className="bg-surface" value="#FFFFFF" />
        <ColorSwatch name="Primary" className="bg-primary" value="Olive" />
        <ColorSwatch name="Muted" className="bg-muted" value="#F3F4F0" />
        <ColorSwatch name="Accent" className="bg-accent" value="Warm Gold" />
        <ColorSwatch
          name="Foreground"
          className="bg-foreground"
          value="#1A1D18"
        />
      </div>
    </DesignSection>
  );
}

export function TypographySection() {
  return (
    <DesignSection
      title="Типографика"
      description="Inter с generous line-height — много воздуха, как в референсе."
    >
      <div className="flex max-w-3xl flex-col gap-8 rounded-[var(--radius-lg)] bg-surface p-8 shadow-[var(--shadow-card)] md:p-12">
        <Heading as="h1">
          Клининг для частной и коммерческой недвижимости
        </Heading>
        <Heading as="h2">Профессиональная уборка в Нижнем Новгороде</Heading>
        <Heading as="h3">Генеральная уборка</Heading>
        <Text variant="lead" muted>
          Чистота без лишней суеты — аккуратно, прозрачно и с вниманием к
          деталям.
        </Text>
        <Text>
          Более 500 довольных клиентов. Работаем с квартирами, офисами и
          помещениями после ремонта.
        </Text>
        <Text variant="small" muted>
          от 250 ₽ / м² · бесплатная консультация
        </Text>
      </div>
    </DesignSection>
  );
}
