# Горький Клининг — Roadmap разработки (Next.js)

**Домен:** [gorkycleaning.ru](https://gorkycleaning.ru)

## Прогресс

**Правило:** после каждого выполненного действия отмечать задачу в этом файле:

- `- [x]` — выполнено (крестик в чекбоксе)
- `- [ ]` — ожидает выполнения

**Текущий этап:** Этап 4 — Создание главной страницы

---

## Цель проекта

Разработать современный высококонверсионный сайт клининговой компании **Горький Клининг** для Нижнего Новгорода.

Основные задачи:

- Максимальная конверсия в заявку.
- Высокая скорость загрузки.
- Отличная мобильная адаптация.
- SEO-готовность.
- Удобство дальнейшего масштабирования.
- Возможность быстрого создания новых посадочных страниц под услуги и SEO-запросы.

---

# Технологический стек

## Frontend

- Next.js 15+
- React 19
- TypeScript
- App Router
- Server Components

## UI

- Tailwind CSS 4
- shadcn/ui
- Radix UI
- Material Design Principles
- Lucide Icons
- Motion (Framer Motion successor)
- Embla Carousel

## Forms

- React Hook Form
- Zod

## Notifications

- Resend
- Telegram Bot API

## Analytics

- Yandex Metrica
- Google Analytics 4
- Google Search Console

## SEO

- next-seo
- Metadata API Next.js
- Open Graph
- JSON-LD

## Images

- next/image
- Sharp

---

# Общий визуальный стиль

## Концепция

Премиальный сервисный продукт.

Не использовать:

- устаревшие синие градиенты
- дешевые стоковые изображения
- перегруженные карточки

Ориентиры:

- Material Design 3
- Linear
- Stripe
- Framer
- Arc Browser

---

# Цветовая система

## Base

Background: #F7F8FA

## Surface

White: #FFFFFF

## Primary

Deep Green / Emerald

## Accent

Warm Gold

## Text

Primary: #111827

Secondary: #6B7280

---

# Радиусы

- xs: 12px
- md: 20px
- lg: 28px
- xl: 36px

---

# Тени

Мягкие Material-подобные.

Избегать агрессивных box-shadow.

---

# Типографика

Шрифт:

- Inter
- Manrope

Иерархия:

H1:
64-72px desktop

H2:
48-56px

H3:
32px

Body:
18px

Small:
14px

---

# ЭТАП 1 ✅

## Инициализация проекта

### Задачи

- [x] Создать репозиторий
- [x] Настроить Next.js
- [x] Настроить TypeScript
- [x] Настроить ESLint
- [x] Настроить Prettier
- [x] Настроить Husky
- [x] Настроить Commitlint

### Результат

- [x] Готовый чистый проект

---

# ЭТАП 2 ✅

## Проектирование структуры

### Создать архитектуру

- [x] /app
- [x] /components
- [x] /features
- [x] /shared
- [x] /lib
- [x] /hooks
- [x] /constants
- [x] /public
- [x] /styles

### Настроить

- [x] aliases
- [x] env
- [x] конфигурации

### Результат

- [x] Утвержденная структура проекта

---

# ЭТАП 3 ✅

## Сбор дизайн-системы

### Typography

- [x] Создать все токены

### Colors

- [x] Создать палитру

### Buttons

- [x] Primary
- [x] Secondary
- [x] Ghost
- [x] Outline

### Inputs

- [x] Input

### Select

- [x] Select

### Tags

- [x] Tags

### Cards

- [x] Cards

### Badges

- [x] Badges

### Modals

- [x] Modals

### Tooltips

- [x] Tooltips

### Dialogs

- [x] Dialogs

### Drawers

- [x] Drawers

### Accordions

- [x] Accordions

### Carousels

- [x] Carousels

### Glass Components

- [x] Glass Components

### Результат

- [x] Полностью готовая UI-система

---

# ЭТАП 4

## Создание главной страницы

## Блок 1 — Hero

- [x] Видео фон
- [x] Header
- [x] Оффер
- [x] УТП
- [x] Glass форма

## Блок 2 — Цифры доверия

- [ ] Цифры доверия

## Блок 3 — Как проходит уборка

- [ ] Как проходит уборка

## Блок 4 — Что входит в уборку

- [ ] Что входит в уборку
- [ ] Интерактивные тултипы

## Блок 5 — Каталог услуг

- [ ] Фильтры
- [ ] Теги
- [ ] Карточки

## Блок 6 — Калькулятор стоимости

- [ ] Калькулятор стоимости

## Блок 7 — Дополнительные показатели

- [ ] Дополнительные показатели

## Блок 8 — Примеры работ

- [ ] Примеры работ

## Блок 9 — О руководителе

- [ ] О руководителе

## Блок 10 — Dashboard доверия

- [ ] Dashboard доверия

## Блок 11 — Этапы работы

- [ ] Этапы работы

## Блок 12 — Команда

- [ ] Команда

## Блок 13 — FAQ

- [ ] FAQ

## Блок 14 — Финальный CTA

- [ ] Финальный CTA

## Блок 15 — Footer

- [ ] Footer

---

# ЭТАП 5

## Мобильная адаптация

### Проверить breakpoints

- [ ] 320px
- [ ] 360px
- [ ] 390px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1440px
- [ ] 1920px

### Результат

- [ ] Pixel Perfect Responsive

---

# ЭТАП 6

## Формы и лидогенерация

### Подключить

- [ ] React Hook Form
- [ ] Zod

### Интеграция Telegram

Новая заявка:

- [ ] имя
- [ ] телефон
- [ ] услуга
- [ ] площадь

### Интеграция Resend

- [ ] Письма менеджеру
- [ ] Письма клиенту

### Результат

- [ ] Все заявки доставляются

---

# ЭТАП 7

## SEO

**Канонический домен:** https://gorkycleaning.ru

### Настроить

- [ ] Metadata API
- [ ] Title
- [ ] Description
- [ ] Keywords
- [ ] Canonical
- [ ] Open Graph
- [ ] Twitter Cards
- [ ] Robots
- [ ] Sitemap

### Добавить JSON-LD

- [ ] Local Business Schema
- [ ] Service Schema
- [ ] FAQ Schema
- [ ] Review Schema
- [ ] Breadcrumb Schema

### Настроить файлы

- [ ] robots.txt
- [ ] sitemap.xml

### Создать assets

- [ ] favicon
- [ ] apple-touch-icon
- [ ] webmanifest
- [ ] OG Banner 1200x630

### Результат

- [ ] Полная SEO-готовность

---

# ЭТАП 8

## Аналитика

### Подключить

- [ ] Google Analytics
- [ ] Yandex Metrica
- [ ] Goals
- [ ] Events
- [ ] Scroll Tracking
- [ ] Form Submit Tracking
- [ ] CTA Tracking

---

# ЭТАП 9

## Шаблон страницы услуги

- [ ] Создать универсальный шаблон

### Структура

- [ ] Hero
- [ ] Описание
- [ ] Преимущества
- [ ] Что входит
- [ ] Стоимость
- [ ] Калькулятор
- [ ] Кейсы
- [ ] Отзывы
- [ ] FAQ
- [ ] CTA

### Примеры страниц

- [ ] /uborka-kvartir
- [ ] /generalnaya-uborka
- [ ] /uborka-posle-remonta
- [ ] /myte-okon
- [ ] /himchistka-divana
- [ ] /uborka-ofisov

### Результат

- [ ] Новые страницы создаются через конфиг

---

# ЭТАП 10

## SEO посадочные страницы

- [ ] Создать систему генерации страниц

### Примеры

- [ ] /uborka-kvartir-nizhniy-novgorod
- [ ] /generalnaya-uborka-nizhniy-novgorod
- [ ] /myte-okon-nizhniy-novgorod

### Результат

- [ ] Масштабируемая SEO структура

---

# ЭТАП 11

## Производительность

### Lighthouse

- [ ] Performance 95+
- [ ] Accessibility 95+
- [ ] Best Practices 100
- [ ] SEO 100

### Оптимизация

- [ ] Images
- [ ] Fonts
- [ ] JS bundles
- [ ] Lazy Loading
- [ ] Dynamic Imports
- [ ] Caching

---

# ЭТАП 12

## Тестовый деплой

### Развернуть

- [ ] Vercel Preview

### Проверить

- [ ] формы
- [ ] адаптивность
- [ ] SEO
- [ ] скорость

### Результат

- [ ] Полностью протестированная версия

---

# ЭТАП 13

## Продакшен деплой

### Каноничная схема сервера

```
/var/www/
├── existing-project
├── gorkycleaning
├── nginx
└── shared
```

gorkycleaning.ru → nginx → localhost:3002  
Другой сайт → localhost:3000

### Развертывание

- [ ] Отдельный проект
- [ ] Отдельный PM2 процесс
- [ ] Отдельный build
- [ ] Отдельный .env
- [ ] nginx → gorkycleaning.ru → localhost:3002

---

# ЭТАП 14

## Финальная проверка

### Проверить

- [ ] SEO
- [ ] Метрики
- [ ] Sitemap
- [ ] Robots
- [ ] Формы
- [ ] Telegram
- [ ] Resend
- [ ] Lighthouse
- [ ] Open Graph
- [ ] Мобильные устройства
- [ ] SSL
- [ ] Индексацию

---

# Готовый результат

Полностью готовый коммерческий сайт **Горький Клининг** (gorkycleaning.ru):

- высокая конверсия
- современный дизайн
- SEO готовность
- высокая скорость
- масштабируемая архитектура
- готовность к рекламе и продвижению
- возможность быстрого добавления новых услуг и посадочных страниц
