export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Наши работы", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const CONTACT = {
  phoneDisplay: "+7 (910) 124-31-65",
  phoneHref: "tel:+79101243165",
  email: "gorkiyklining@yanex.ru",
  emailHref: "mailto:gorkiyklining@yanex.ru",
  region: "Нижний Новгород и область",
} as const;

export const HERO_CONTENT = {
  utp: [
    "Приедем в день обращения",
    "Расчёт стоимости за 15 минут",
    "Своё оборудование и профхимия",
    "Работаем без выходных",
  ],
  title: "Профессиональный клининг квартир, домов и офисов в Нижнем Новгороде",
  subtitle:
    "Берём на себя уборку любой сложности — от регулярного поддержания чистоты до объектов после ремонта. Быстро выезжаем, работаем по чек-листу и фиксируем стоимость до начала работ.",
  cta: "Запросить расчёт",
  headerCta: "Бесплатная консультация",
  formTitle: "Быстрый расчёт",
  formSubtitle: "Заполните форму — перезвоним за 15 минут",
  formSubmit: "Рассчитать стоимость",
} as const;

export const OBJECT_TYPE_OPTIONS = [
  { value: "apartment", label: "Квартира" },
  { value: "house", label: "Дом" },
  { value: "office", label: "Офис" },
  { value: "commercial", label: "Коммерческое помещение" },
] as const;

export const CLEANING_TYPE_OPTIONS = [
  { value: "general", label: "Генеральная уборка" },
  { value: "maintenance", label: "Поддерживающая уборка" },
  { value: "after-renovation", label: "После ремонта" },
  { value: "windows", label: "Мытьё окон" },
] as const;
