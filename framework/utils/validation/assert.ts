/**
 * Purpose:
 * Small TypeScript assertion helpers for non-Playwright code paths.
 *
 * Responsibilities:
 * - Narrow types at runtime with clear error messages
 *
 * Modify when:
 * - Additional generic guards are needed outside of expect().
 *
 * Do not put:
 * - Playwright expect assertions (use test expect in specs)
 * - Business validation rules
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message = 'Expected value to be defined',
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

export function assertNonEmptyString(
  value: string | null | undefined,
  message = 'Expected non-empty string',
): asserts value is string {
  if (!value?.trim()) {
    throw new Error(message);
  }
}
