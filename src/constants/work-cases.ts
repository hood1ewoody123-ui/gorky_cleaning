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
    serviceType: "Плановая уборка",
    description:
      "Регулярная уборка складских зон: подметание и мытьё проездов, очистка стеллажных рядов от пыли, вынос мусора. Работали одной бригадой без остановки логистики на соседних секциях.",
    area: 2000,
    durationHours: 9,
    durationLabel: "9 часов",
    price: 8_000,
    image: "/images/cases/warehouse.jpg",
    imageAlt: "Складской комплекс после плановой уборки",
    imageWidth: 1600,
    imageHeight: 1200,
  },
  {
    id: "consulting-office",
    title: "Офис консалтинговой компании",
    serviceType: "Генеральная уборка офиса",
    description:
      "Протерли open space и переговорные, очистили стеклянные перегородки, убрали пыль с полов и рабочих поверхностей. Помыли окна и санузлы — объект приняли в тот же день.",
    area: 185,
    durationHours: 7,
    durationLabel: "7 часов",
    price: 6_500,
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
    durationHours: 5,
    durationLabel: "5 часов",
    price: 4_900,
    image: "/images/cases/lawyer-office.jpg",
    imageAlt: "Офис юриста после профессиональной уборки",
    imageWidth: 1200,
    imageHeight: 1600,
  },
];
