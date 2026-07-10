export type WorkCase = {
  id: string;
  title: string;
  serviceType: string;
  description: string;
  area: number;
  durationHours: number;
  durationLabel?: string;
  price: number;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const WORK_CASES_HEADING = "Объекты, которые мы уже привели в порядок";

export const WORK_CASES_DESCRIPTION =
  "Склады, офисы и кабинеты в Нижнем Новгороде — показываем реальный масштаб, сроки и стоимость каждого проекта.";

export const WORK_CASES: WorkCase[] = [
  {
    id: "warehouse",
    title: "Складской комплекс",
    serviceType: "Генеральная уборка после ремонта",
    description:
      "Убрали строительную пыль, промыли бетонные полы профессиональной техникой, очистили стеллажные ряды и проезды для погрузчиков. Работали двумя бригадами без остановки логистики на соседних секциях.",
    area: 1240,
    durationHours: 16,
    durationLabel: "2 рабочих дня",
    price: 54_500,
    image: "/images/cases/warehouse.jpg",
    imageAlt: "Складской комплекс после профессиональной уборки",
    imageWidth: 1600,
    imageHeight: 1200,
  },
  {
    id: "consulting-office",
    title: "Офис консалтинговой компании",
    serviceType: "Генеральная уборка офиса",
    description:
      "Протерли open space и переговорные, очистили стеклянные перегородки, убрали следы ремонта с полов и рабочих поверхностей. Помыли окна и санузлы — объект приняли в тот же день.",
    area: 185,
    durationHours: 8,
    durationLabel: "8 часов",
    price: 12_500,
    image: "/images/cases/consulting-office.jpg",
    imageAlt: "Офис консалтинговой компании после клининга",
    imageWidth: 1600,
    imageHeight: 900,
  },
  {
    id: "lawyer-office",
    title: "Офис юриста",
    serviceType: "Генеральная уборка",
    description:
      "Аккуратно привели в порядок кабинет и зону приёма клиентов: мебель, полки с документами, стекло и напольное покрытие. Использовали щадящие средства, чтобы сохранить отделку и фурнитуру.",
    area: 72,
    durationHours: 6.5,
    durationLabel: "6,5 часа",
    price: 7_200,
    image: "/images/cases/lawyer-office.jpg",
    imageAlt: "Офис юриста после профессиональной уборки",
    imageWidth: 1200,
    imageHeight: 1600,
  },
];
