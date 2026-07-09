"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DesignSection } from "@/features/design-system/DesignSection";
import { Text } from "@/shared/typography/Typography";

const faqItems = [
  {
    question: "Сколько времени занимает уборка?",
    answer:
      "Зависит от площади и типа уборки. Стандартная квартира 50 м² — около 3–4 часов.",
  },
  {
    question: "Какие средства вы используете?",
    answer:
      "Профессиональная химия, безопасная для детей и домашних животных после проветривания.",
  },
];

export function OverlaysSection() {
  return (
    <>
      <DesignSection
        title="Glass Panel"
        description="Для hero-формы поверх фото — лёгкое стекло, не перегружает кадр."
      >
        <GlassPanel className="max-w-md p-8">
          <div className="flex flex-col gap-4">
            <p className="text-h4">Бесплатный расчёт</p>
            <Text muted>Оставьте телефон — перезвоним за 15 минут</Text>
            <div className="flex flex-col gap-2">
              <Label htmlFor="glass-phone">Телефон</Label>
              <Input id="glass-phone" placeholder="+7 (___) ___-__-__" />
            </div>
            <Button size="pill" className="w-full">
              Отправить
            </Button>
          </div>
        </GlassPanel>
      </DesignSection>

      <DesignSection title="Overlay-компоненты">
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Заявка отправлена</DialogTitle>
                <DialogDescription>
                  Менеджер свяжется с вами в ближайшее время.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Drawer
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Меню услуг</DrawerTitle>
                <DrawerDescription>
                  Быстрый доступ с мобильного экрана.
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" />}>
              Tooltip
            </TooltipTrigger>
            <TooltipContent>
              <p>Подсказка к элементу уборки</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </DesignSection>

      <DesignSection title="Accordion & Carousel">
        <div className="grid gap-8 lg:grid-cols-2">
          <Accordion defaultValue={["item-0"]}>
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Carousel className="mx-auto w-full max-w-sm">
            <CarouselContent>
              {["Квартира", "Офис", "После ремонта"].map((item) => (
                <CarouselItem key={item}>
                  <div className="flex aspect-[4/3] items-end rounded-[var(--radius-lg)] bg-muted p-6">
                    <p className="text-h4">{item}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DesignSection>
    </>
  );
}
