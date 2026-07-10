export function normalizeLeadEmail(email?: string): string | undefined {
  const trimmed = email?.trim();
  return trimmed ? trimmed : undefined;
}
