import {
  CLEANING_RATES,
  EXTRA_SERVICES,
  MIN_ORDER_AMOUNT,
  ROOM_AREA_ESTIMATE,
  type CleaningTypeId,
  type ObjectTypeId,
  type RoomCount,
} from "@/constants/cleaning-calculator";

export type CalculatorInput = {
  objectType: ObjectTypeId;
  rooms: RoomCount;
  cleaningType: CleaningTypeId;
  extras: Record<string, number>;
};

export type CalculatorBreakdown = {
  estimatedArea: number;
  basePrice: number;
  extrasPrice: number;
  total: number;
};

export function calculateCleaningPrice(
  input: CalculatorInput,
): CalculatorBreakdown {
  const estimatedArea = ROOM_AREA_ESTIMATE[input.rooms];
  const rate = CLEANING_RATES[input.objectType][input.cleaningType];
  const rawBase = estimatedArea * rate;
  const basePrice = Math.max(rawBase, MIN_ORDER_AMOUNT[input.objectType]);

  let extrasPrice = 0;

  for (const service of EXTRA_SERVICES) {
    const quantity = input.extras[service.id] ?? 0;
    if (quantity > 0) {
      extrasPrice += service.price * quantity;
    }
  }

  const total = roundPrice(basePrice + extrasPrice);

  return {
    estimatedArea,
    basePrice: roundPrice(basePrice),
    extrasPrice: roundPrice(extrasPrice),
    total,
  };
}

function roundPrice(value: number): number {
  return Math.round(value / 50) * 50;
}
