import {
  CLEANING_TYPE_OPTIONS,
  EXTRA_SERVICES,
  OBJECT_TYPE_OPTIONS,
  SNOW_TERRITORY_SIZE_OPTIONS,
  isSnowRemovalCleaningType,
  type CleaningTypeId,
  type ObjectTypeId,
  type RoomCount,
} from "@/constants/cleaning-calculator";
import { formatRubles } from "@/lib/formatPrice";

export function formatCalculatorServiceSummary(input: {
  objectType: ObjectTypeId;
  rooms: RoomCount;
  cleaningType: CleaningTypeId;
  extras: Record<string, number>;
  total: number;
}): string {
  const objectLabel =
    OBJECT_TYPE_OPTIONS.find((item) => item.id === input.objectType)?.label ??
    input.objectType;
  const cleaningLabel =
    CLEANING_TYPE_OPTIONS.find((item) => item.id === input.cleaningType)
      ?.label ?? input.cleaningType;

  const extrasSummary = EXTRA_SERVICES.filter(
    (service) => (input.extras[service.id] ?? 0) > 0,
  )
    .map(
      (service) =>
        `${service.name} ×${input.extras[service.id]} (${formatRubles(service.price * (input.extras[service.id] ?? 0))} ₽)`,
    )
    .join("; ");

  const sizeLabel = isSnowRemovalCleaningType(input.cleaningType)
    ? (SNOW_TERRITORY_SIZE_OPTIONS.find((item) => item.value === input.rooms)
        ?.label ?? `~${input.rooms} м²`)
    : `${input.rooms === 5 ? "5+" : input.rooms} комн.`;

  const parts = [
    `${cleaningLabel}, ${objectLabel}, ${sizeLabel}`,
    `≈ ${formatRubles(input.total)} ₽`,
  ];

  if (extrasSummary) {
    parts.push(`Доп.: ${extrasSummary}`);
  }

  return parts.join(" · ");
}

export function formatCalculatorAreaLabel(
  rooms: RoomCount,
  estimatedArea: number,
  cleaningType?: CleaningTypeId,
): string {
  if (cleaningType && isSnowRemovalCleaningType(cleaningType)) {
    const tierLabel =
      SNOW_TERRITORY_SIZE_OPTIONS.find((item) => item.value === rooms)?.label ??
      `~${estimatedArea} м²`;
    return `~${estimatedArea} м² (${tierLabel})`;
  }

  return `~${estimatedArea} м² (${rooms === 5 ? "5+" : rooms} комн.)`;
}
