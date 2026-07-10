export function formatRubles(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(amount);
}

export function formatServicePrice(priceFrom: number, suffix: string): string {
  return `от ${formatRubles(priceFrom)} ${suffix}`;
}
