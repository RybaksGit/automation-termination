/**
 * Purpose:
 * Generic date formatting and manipulation helpers.
 *
 * Responsibilities:
 * - Convert dates to ISO date strings
 * - Shift dates by a number of days
 *
 * Modify when:
 * - New date utilities are needed across multiple domains.
 *
 * Do not put:
 * - Business rules (billing cycles, SLA logic — keep in domain modules)
 */
export function toIsoDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0] ?? '';
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
