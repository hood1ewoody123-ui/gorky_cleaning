import { getLeadSourceLabel } from "@/constants/lead-sources";
import { SERVICE_LANDING_GROUPS } from "@/constants/service-pages";
import type { LeadPayload } from "@/types/lead";

const HIDDEN_AREA_VALUES = new Set([
  "",
  "—",
  "-",
  "м²",
  "за объект",
  "не указана",
]);

export function formatTelegramLeadMessage(payload: LeadPayload): string {
  const lines = [
    "🧹 <b>Новая заявка — Горький Клининг</b>",
    "",
    `<b>Источник:</b> ${escapeHtml(getLeadSourceLabel(payload.source))}`,
    `<b>Страница:</b> ${escapeHtml(payload.page)}`,
    `<b>Имя:</b> ${escapeHtml(payload.name)}`,
    `<b>Телефон:</b> ${escapeHtml(payload.phone)}`,
    `<b>Услуга:</b> ${escapeHtml(payload.service)}`,
  ];

  if (shouldShowArea(payload.area)) {
    lines.push(`<b>Площадь / объект:</b> ${escapeHtml(payload.area)}`);
  }

  if (payload.email) {
    lines.push(`<b>Email:</b> ${escapeHtml(payload.email)}`);
  }

  if (payload.comment) {
    lines.push(`<b>Комментарий:</b> ${escapeHtml(payload.comment)}`);
  }

  const metadataLines = formatMetadataLines(payload.metadata, payload.source);
  if (metadataLines.length > 0) {
    lines.push("", ...metadataLines);
  }

  return lines.join("\n");
}

function shouldShowArea(area: string): boolean {
  return !HIDDEN_AREA_VALUES.has(area.trim());
}

function formatMetadataLines(
  metadata: Record<string, unknown> | undefined,
  source: string,
): string[] {
  if (!metadata || source === "calculator") {
    return [];
  }

  const lines: string[] = [];

  if (typeof metadata.categoryLabel === "string") {
    lines.push(`<b>Категория:</b> ${escapeHtml(metadata.categoryLabel)}`);
  }

  if (typeof metadata.unitLabel === "string") {
    lines.push(
      `<b>Тарификация:</b> ${escapeHtml(formatUnitLabel(metadata.unitLabel))}`,
    );
  }

  if (typeof metadata.promoDiscount === "string") {
    lines.push(`<b>Скидка:</b> ${escapeHtml(metadata.promoDiscount)}`);
  }

  const groupLine = formatFooterGroupLine(metadata);
  if (groupLine) {
    lines.push(groupLine);
  }

  return lines;
}

function formatUnitLabel(unitLabel: string): string {
  if (unitLabel === "м²") {
    return "за м²";
  }

  return unitLabel;
}

function formatFooterGroupLine(
  metadata: Record<string, unknown>,
): string | null {
  if (typeof metadata.groupId !== "string") {
    return null;
  }

  const group = SERVICE_LANDING_GROUPS.find(
    (item) => item.id === metadata.groupId,
  );

  if (!group) {
    return null;
  }

  return `<b>Раздел:</b> ${escapeHtml(group.title)}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
