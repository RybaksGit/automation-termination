/**
 * Purpose:
 * Generic string transformation helpers.
 *
 * Responsibilities:
 * - Capitalize and slugify strings for test data or labels
 *
 * Modify when:
 * - Reusable string utilities are needed in multiple places.
 *
 * Do not put:
 * - Domain-specific formatting (order IDs, invoice numbers)
 */
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
