/**
 * Purpose:
 * Framework-wide constant values shared across tests and automation code.
 *
 * Responsibilities:
 * - Define standard timeouts for waits and navigation
 * - Define storage keys for browser/session state
 *
 * Modify when:
 * - Global timeout strategy changes or new shared keys are required.
 *
 * Do not put:
 * - Environment-specific URLs (use framework/config/env)
 * - Test tags (declare @tags inline in test titles)
 * - Domain or page-specific values
 */
export const TIMEOUTS = {
  short: 5_000,
  medium: 15_000,
  long: 30_000,
  navigation: 60_000,
} as const;

export const STORAGE_KEYS = {
  authToken: 'auth_token',
  sessionId: 'session_id',
} as const;
