export const RU_PHONE_EMPTY = "+7 ";

export function formatRuPhoneInput(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 0) {
    return RU_PHONE_EMPTY;
  }

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);
  const national = digits.slice(1);

  let formatted = "+7";

  if (national.length > 0) {
    formatted += ` (${national.slice(0, 3)}`;
  }

  if (national.length >= 3) {
    formatted += ")";
  }

  if (national.length > 3) {
    formatted += ` ${national.slice(3, 6)}`;
  }

  if (national.length > 6) {
    formatted += `-${national.slice(6, 8)}`;
  }

  if (national.length > 8) {
    formatted += `-${national.slice(8, 10)}`;
  }

  return formatted;
}

export function getRuPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}
