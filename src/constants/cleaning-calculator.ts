export type ObjectTypeId = "apartment" | "house" | "office" | "commercial";

export type CleaningTypeId =
  "maintenance" | "general" | "after-renovation" | "regular";

export type RoomCount = 1 | 2 | 3 | 4 | 5;

export type ExtraServiceDefinition = {
  id: string;
  name: string;
  price: number;
  unit: string;
  max: number;
};

export const CALCULATOR_HEADING = "Узнайте стоимость уборки за минуту";

export const CALCULATOR_DESCRIPTION =
  "Укажите тип объекта и параметры — получите ориентировочную цену и оставьте заявку на точный расчёт от менеджера.";

export const OBJECT_TYPE_OPTIONS: Array<{ id: ObjectTypeId; label: string }> = [
  { id: "apartment", label: "Квартира" },
  { id: "house", label: "Дом" },
  { id: "office", label: "Офис" },
  { id: "commercial", label: "Коммерческое помещение" },
];

export const ROOM_COUNT_OPTIONS: Array<{ value: RoomCount; label: string }> = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5+" },
];

export const CLEANING_TYPE_OPTIONS: Array<{
  id: CleaningTypeId;
  label: string;
  shortLabel: string;
}> = [
  {
    id: "maintenance",
    label: "Поддерживающая",
    shortLabel: "Поддерживающая",
  },
  { id: "general", label: "Генеральная", shortLabel: "Генеральная" },
  {
    id: "after-renovation",
    label: "После ремонта",
    shortLabel: "После ремонта",
  },
  { id: "regular", label: "Регулярная", shortLabel: "Регулярная" },
];

export const ROOM_AREA_ESTIMATE: Record<RoomCount, number> = {
  1: 35,
  2: 55,
  3: 75,
  4: 95,
  5: 115,
};

export const CLEANING_RATES: Record<
  ObjectTypeId,
  Record<CleaningTypeId, number>
> = {
  apartment: {
    maintenance: 95,
    general: 160,
    "after-renovation": 195,
    regular: 85,
  },
  house: {
    maintenance: 120,
    general: 175,
    "after-renovation": 210,
    regular: 105,
  },
  office: {
    maintenance: 40,
    general: 65,
    "after-renovation": 85,
    regular: 38,
  },
  commercial: {
    maintenance: 55,
    general: 75,
    "after-renovation": 95,
    regular: 50,
  },
};

export const MIN_ORDER_AMOUNT: Record<ObjectTypeId, number> = {
  apartment: 3900,
  house: 4900,
  office: 3000,
  commercial: 4200,
};

export const EXTRA_SERVICES: ExtraServiceDefinition[] = [
  {
    id: "windows",
    name: "Мытьё окон",
    price: 550,
    unit: "окно",
    max: 20,
  },
  {
    id: "dry-cleaning",
    name: "Химчистка мебели",
    price: 2800,
    unit: "предмет",
    max: 10,
  },
  {
    id: "balcony",
    name: "Уборка балкона",
    price: 660,
    unit: "балкон",
    max: 5,
  },
  {
    id: "oven",
    name: "Мойка духовки",
    price: 1100,
    unit: "шт.",
    max: 3,
  },
  {
    id: "fridge",
    name: "Мойка холодильника",
    price: 1200,
    unit: "шт.",
    max: 3,
  },
  {
    id: "ironing",
    name: "Глажка",
    price: 500,
    unit: "30 мин",
    max: 8,
  },
  {
    id: "special",
    name: "Особые поручения",
    price: 800,
    unit: "час",
    max: 8,
  },
];

export const DEFAULT_CALCULATOR_STATE = {
  objectType: "apartment" as ObjectTypeId,
  rooms: 2 as RoomCount,
  cleaningType: "general" as CleaningTypeId,
  extras: {} as Record<string, number>,
};
