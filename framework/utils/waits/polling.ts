/**
 * Purpose:
 * Generic async polling utility when Playwright auto-wait is not sufficient.
 *
 * Responsibilities:
 * - Retry a function until a truthy result or timeout
 *
 * Modify when:
 * - Shared polling behaviour or defaults change framework-wide.
 *
 * Do not put:
 * - Page-specific waits (prefer page object methods or expect.poll in tests)
 */
export type PollOptions = {
  timeout?: number;
  interval?: number;
  message?: string;
};

export async function poll<T>(
  fn: () => Promise<T | false | null | undefined>,
  options: PollOptions = {},
): Promise<T> {
  const timeout = options.timeout ?? 10_000;
  const interval = options.interval ?? 250;
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const result = await fn();
    if (result !== false && result !== null && result !== undefined) {
      return result;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(options.message ?? `Polling timed out after ${timeout}ms`);
}
