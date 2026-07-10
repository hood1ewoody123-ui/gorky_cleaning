# Горький Клининг — Roadmap разработки (Next.js)

**Домен:** [gorkycleaning.ru](https://gorkycleaning.ru)

## Прогресс

**Правило:** после каждого выполненного действия отмечать задачу в этом файле:

- `- [x]` — выполнено (крестик в чекбоксе)
- `- [ ]` — ожидает выполнения

**Текущий этап:** Этап 13 — деплой на Timeweb (рядом с другим сайтом)

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
- [x] конфигурации
- [ ] env — см. **Этап 12** (ключи перед деплоем)

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

- [x] Цифры доверия

## Блок 3 — Как проходит уборка

- [x] Как проходит уборка

## Блок 4 — Что входит в уборку

- [x] Что входит в уборку
- [x] Интерактивные тултипы

## Блок 5 — Каталог услуг

- [x] Фильтры
- [x] Теги
- [x] Карточки

## Блок 6 — Калькулятор стоимости

- [x] Калькулятор стоимости

## Блок 7 — Дополнительные показатели

- [x] Дополнительные показатели

## Блок 8 — Примеры работ

- [x] Примеры работ

## Блок 9 — О руководителе

- [x] О руководителе

## Блок 10 — Dashboard доверия

- [x] Dashboard доверия

## Блок 11 — Этапы работы

- [x] Этапы работы

## Блок 12 — Команда

- [ ] Команда

## Блок 13 — FAQ

- [x] FAQ

## Блок 14 — Финальный CTA

- [x] Финальный CTA

## Блок 15 — Footer

- [x] Footer

---

# ЭТАП 5

## Мобильная адаптация

### Проверить breakpoints

- [x] 320px
- [x] 360px
- [x] 390px
- [x] 430px
- [x] 768px
- [x] 1024px
- [x] 1280px
- [x] 1440px
- [x] 1920px

### Результат

- [x] Pixel Perfect Responsive

---

# ЭТАП 6

## Формы и лидогенерация

### Подключить

- [x] React Hook Form
- [x] Zod

### Доставка заявок (Telegram)

- [x] Уведомление менеджеру в Telegram
- [x] имя, телефон, услуга, площадь (+ email/комментарий в сообщении, если указаны)

### Результат

- [x] Все заявки доставляются

---

# ЭТАП 7

## SEO

**Канонический домен:** https://gorkycleaning.ru

### Настроить

- [x] Metadata API
- [x] Title
- [x] Description
- [x] Keywords
- [x] Canonical
- [x] Open Graph
- [x] Twitter Cards
- [x] Robots
- [x] Sitemap

### Добавить JSON-LD

- [x] Local Business Schema
- [x] Service Schema
- [x] FAQ Schema
- [x] Review Schema
- [x] Breadcrumb Schema

### Настроить файлы

- [x] robots.txt
- [x] sitemap.xml

### Создать assets

- [x] favicon
- [x] apple-touch-icon
- [x] webmanifest
- [x] OG Banner 1200x630

### Результат

- [x] Полная SEO-готовность

---

# ЭТАП 8

## Аналитика

### Подключить

- [ ] Google Analytics
- [x] Yandex Metrica
- [x] Goals
- [x] Events
- [x] Scroll Tracking
- [x] Form Submit Tracking
- [x] CTA Tracking

---

# ЭТАП 11

## Производительность

### Lighthouse

- [ ] Performance 95+
- [ ] Accessibility 95+
- [ ] Best Practices 100
- [ ] SEO 100

### Оптимизация

- [x] Images (AVIF/WebP, cache)
- [x] Fonts (display: swap)
- [x] JS bundles (dynamic imports тяжёлых секций)
- [x] Lazy Loading (deferred sections, hero video metadata)
- [x] Dynamic Imports (калькулятор, каталог, отзывы, motion)
- [x] Caching (static assets headers)

---

# ЭТАП 12

## ENV и ключи (перед деплоем)

> **Да — ключи лучше подготовить до первого деплоя.**  
> `NEXT_PUBLIC_*` попадают в билд при `npm run build`, поэтому на сервере `.env.production` нужен **до сборки**.

### Локально (проверка форм, опционально)

- [ ] Скопировать `.env.example` → `.env.local`
- [ ] Заполнить ключи и проверить отправку заявки локально

### Переменные

- [ ] `NEXT_PUBLIC_SITE_URL=https://gorkycleaning.ru`
- [ ] `NEXT_PUBLIC_YANDEX_METRIKA_ID=110396882`
- [ ] `TELEGRAM_BOT_TOKEN`
- [ ] `TELEGRAM_CHAT_ID` (chat id аккаунта @prtcreator или группы)

### На сервере

- [ ] `/var/www/gorkycleaning/.env.production` — **не коммитить в git**
- [ ] Права на файл: только владелец (`chmod 600`)

---

# ЭТАП 13

## Продакшен деплой (Timeweb VPS)

Рядом с другим сайтом на том же сервере. **Правило:** не редактировать конфиги другого сайта — только добавить новые файлы.

Конфиги в репо: `deploy/nginx/gorkycleaning.conf`, `deploy/ecosystem.config.cjs`, `deploy/deploy.sh`

### Схема (изоляция)

```
/var/www/
├── <другой-сайт>/          → 127.0.0.1:3000  (не трогаем)
└── gorkycleaning/          → 127.0.0.1:3002  (этот проект)

nginx:
  other-domain.ru     → server block A → :3000
  gorkycleaning.ru    → server block B → :3002   ← новый файл
```

Фавиконы, manifest, sitemap — у каждого домена свои: nginx маршрутизирует по `server_name`, конфликтов нет.

### 0. Перед началом (локально)

- [x] `.env.local` — формы и Telegram проверены
- [ ] `git push` в remote
- [ ] Записать IP VPS и домен второго сайта

### 1. DNS — переключение с Tilda

| Запись | Было     | Станет                      |
| ------ | -------- | --------------------------- |
| `@` A  | IP Tilda | **IP VPS**                  |
| `www`  | Tilda    | **IP VPS** или CNAME на `@` |

- [ ] Сначала деплой на VPS + проверка через `curl -H "Host: gorkycleaning.ru" http://IP_VPS`
- [ ] Потом смена DNS (Tilda оставить резервом 1–2 дня)
- [ ] `dig gorkycleaning.ru +short` → IP VPS

### 2. Сервер — только добавление

```bash
ssh user@IP_VPS
sudo nginx -T | grep server_name   # существующие домены — их файлы не трогать
```

- [ ] Node.js 20+, PM2, nginx, certbot

### 3. Клонирование и env

```bash
sudo mkdir -p /var/www/gorkycleaning && sudo chown $USER:$USER /var/www/gorkycleaning
git clone <repo-url> /var/www/gorkycleaning
cd /var/www/gorkycleaning
cp .env.example .env.production && nano .env.production && chmod 600 .env.production
```

- [ ] `.env.production` **до** `npm run build`

### 4. Сборка и PM2 (порт 3002)

```bash
npm ci && npm run build
pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup
curl -I http://127.0.0.1:3002
```

### 5. nginx — новый файл

```bash
sudo cp deploy/nginx/gorkycleaning.conf /etc/nginx/sites-available/gorkycleaning
sudo ln -sf /etc/nginx/sites-available/gorkycleaning /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 6. SSL

```bash
sudo certbot --nginx -d gorkycleaning.ru -d www.gorkycleaning.ru
```

### 7. Обновления

```bash
bash deploy/deploy.sh
```

### 8. После переключения DNS

- [ ] Яндекс Вебмастер, Метрика, формы, favicon/manifest
- [ ] Tilda отключить через 2–3 дня

### Результат

- [ ] https://gorkycleaning.ru — новый сайт
- [ ] Другой сайт на VPS не затронут

---

# ЭТАП 14

## Финальная проверка

### Проверить

- [ ] SEO (title, OG, sitemap.xml, robots.txt)
- [ ] Яндекс Метрика (визиты в «Онлайн»)
- [ ] Формы → Telegram
- [ ] Мобильная версия
- [ ] SSL (https)
- [ ] Lighthouse (быстрая проверка)
- [ ] Яндекс Вебмастер

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
