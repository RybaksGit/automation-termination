/**
 * Purpose:
 * Central environment configuration loaded from .env and process variables.
 *
 * Responsibilities:
 * - Load dotenv at startup
 * - Expose typed URLs, credentials, timeouts, and feature flags
 * - Provide CI detection helper
 *
 * Modify when:
 * - New environments, URLs, secrets, or feature flags are introduced.
 *
 * Do not put:
 * - Playwright-specific options (use framework/config/playwright)
 * - Test assertions or API/page logic
 */
import { config as loadDotenv } from 'dotenv';
import { resolve } from 'node:path';

loadDotenv({ path: resolve(process.cwd(), '.env') });

export type Environment = 'local' | 'stage' | 'prod';

// ====================
// Parsers
// ====================

const parseEnv = (): Environment => {
  const value = process.env.ENV ?? 'local';
  if (value === 'local' || value === 'stage' || value === 'prod') {
    return value;
  }
  throw new Error(`Invalid ENV "${value}". Expected: local | stage | prod`);
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
};

const parseNumber = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

// ====================
// Exported configuration
// ====================

export const env = {
  name: parseEnv(),
  baseUrl: process.env.BASE_URL ?? 'https://demo.playwright.dev/todomvc/',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  credentials: {
    email: process.env.TEST_USER_EMAIL ?? 'test@example.com',
    password: process.env.TEST_USER_PASSWORD ?? 'changeme',
  },
  headless: parseBoolean(process.env.HEADLESS, true),
  workers: parseNumber(process.env.WORKERS, 0) || undefined,
  retries: parseNumber(process.env.RETRIES, 0),
  timeout: parseNumber(process.env.TIMEOUT, 30_000),
  allure: {
    enabled: parseBoolean(process.env.ENABLE_ALLURE, true),
    resultsDir: process.env.ALLURE_RESULTS_DIR ?? 'framework/reporters/allure/results',
  },
  features: {
    newCheckout: parseBoolean(process.env.FEATURE_NEW_CHECKOUT, false),
  },
} as const;

export const isCI = (): boolean => Boolean(process.env.CI);
