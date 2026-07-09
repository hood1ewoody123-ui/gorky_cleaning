"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import { DesignSection } from "@/features/design-system/DesignSection";

const services = [
  "Генеральная",
  "Поддерживающая",
  "Коммерческая",
  "После ремонта",
  "Мытьё окон",
];

export function FormsTagsSection() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <>
      <DesignSection
        title="Теги услуг"
        description="Pill-чипы из референса — лёгкие, кликабельные, без перегруза."
      >
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <Tag
              key={service}
              variant={activeService === service ? "active" : "default"}
              onClick={() => setActiveService(service)}
            >
              {service}
            </Tag>
          ))}
        </div>
      </DesignSection>

      <DesignSection title="Формы">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Заявка на расчёт</CardTitle>
              <CardDescription>
                Минимум полей — максимум конверсии.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Как к вам обращаться" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (___) ___-__-__" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="service">Услуга</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="service" className="w-full">
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Генеральная уборка</SelectItem>
                    <SelectItem value="maintenance">
                      Поддерживающая уборка
                    </SelectItem>
                    <SelectItem value="office">Уборка офисов</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="comment">Комментарий</Label>
                <Textarea
                  id="comment"
                  placeholder="Площадь, пожелания..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="bg-primary text-primary-foreground ring-0">
              <CardHeader>
                <CardTitle className="text-primary-foreground">
                  &gt; 5 лет
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  опыт работы в клининге
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-2">
              <Badge>Новый клиент</Badge>
              <Badge variant="secondary">Нижний Новгород</Badge>
              <Badge variant="outline">от 250 ₽/м²</Badge>
            </div>
          </div>
        </div>
      </DesignSection>
    </>
  );
}
