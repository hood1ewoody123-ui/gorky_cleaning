export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Наши работы", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const CONTACT = {
  phoneDisplay: "+7 (831) 000-00-00",
  phoneHref: "tel:+78310000000",
  region: "Нижний Новгород и область",
} as const;

export const HERO_CONTENT = {
  utp: [
    "Фиксируем стоимость до начала работ",
    "Работаем без выходных",
    "Приезжаем со своим оборудованием",
    "Оплата после приемки результата",
  ],
  title: "Профессиональный клининг квартир, домов и офисов в Нижнем Новгороде",
  subtitle:
    "Берем на себя уборку любой сложности — от регулярного поддержания чистоты до объектов после ремонта. Работаем со своей техникой, профессиональной химией и гарантией результата.",
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
