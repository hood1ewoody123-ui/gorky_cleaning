export type ObjectTypeId = "apartment" | "house" | "office" | "commercial";

export type CleaningTypeId =
  "maintenance" | "general" | "after-renovation" | "regular" | "snow-removal";

export const SNOW_REMOVAL_CLEANING_TYPE_ID = "snow-removal" as const;

export function isSnowRemovalCleaningType(
  cleaningType: CleaningTypeId,
): boolean {
  return cleaningType === SNOW_REMOVAL_CLEANING_TYPE_ID;
}

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
  {
    id: "snow-removal",
    label: "Чистка снега",
    shortLabel: "Снег",
  },
];

export const ROOM_AREA_ESTIMATE: Record<RoomCount, number> = {
  1: 35,
  2: 55,
  3: 75,
  4: 95,
  5: 115,
};

/** Ориентир площади участка для расчёта чистки снега (средняя цена за м²). */
export const SNOW_TERRITORY_AREA_ESTIMATE: Record<RoomCount, number> = {
  1: 50,
  2: 100,
  3: 150,
  4: 200,
  5: 250,
};

export const SNOW_TERRITORY_SIZE_OPTIONS: Array<{
  value: RoomCount;
  label: string;
}> = [
  { value: 1, label: "до 50 м²" },
  { value: 2, label: "до 100 м²" },
  { value: 3, label: "до 150 м²" },
  { value: 4, label: "до 200 м²" },
  { value: 5, label: "200+ м²" },
];

export const CLEANING_RATES: Record<
  ObjectTypeId,
  Record<CleaningTypeId, number>
> = {
  apartment: {
    maintenance: 85,
    general: 145,
    "after-renovation": 180,
    regular: 80,
    "snow-removal": 55,
  },
  house: {
    maintenance: 110,
    general: 160,
    "after-renovation": 195,
    regular: 95,
    "snow-removal": 50,
  },
  office: {
    maintenance: 35,
    general: 60,
    "after-renovation": 80,
    regular: 35,
    "snow-removal": 45,
  },
  commercial: {
    maintenance: 50,
    general: 70,
    "after-renovation": 85,
    regular: 45,
    "snow-removal": 40,
  },
};

export const MIN_ORDER_AMOUNT: Record<ObjectTypeId, number> = {
  apartment: 3600,
  house: 4500,
  office: 2800,
  commercial: 3900,
};

export const SNOW_MIN_ORDER_AMOUNT: Record<ObjectTypeId, number> = {
  apartment: 2500,
  house: 3500,
  office: 3000,
  commercial: 3200,
};

/** Средняя ориентировочная ставка для каталога и коммуникаций (₽/м²). */
export const SNOW_REMOVAL_AVERAGE_RATE_PER_SQM = 50;

export const EXTRA_SERVICES: ExtraServiceDefinition[] = [
  {
    id: "windows",
    name: "Мытьё окон",
    price: 500,
    unit: "окно",
    max: 20,
  },
  {
    id: "dry-cleaning",
    name: "Химчистка мебели",
    price: 2600,
    unit: "предмет",
    max: 10,
  },
  {
    id: "balcony",
    name: "Уборка балкона",
    price: 600,
    unit: "балкон",
    max: 5,
  },
  {
    id: "oven",
    name: "Мойка духовки",
    price: 1000,
    unit: "шт.",
    max: 3,
  },
  {
    id: "fridge",
    name: "Мойка холодильника",
    price: 1100,
    unit: "шт.",
    max: 3,
  },
  {
    id: "ironing",
    name: "Глажка",
    price: 450,
    unit: "30 мин",
    max: 8,
  },
  {
    id: "special",
    name: "Особые поручения",
    price: 750,
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
