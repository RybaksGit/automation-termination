/**
 * Purpose:
 * Runs once before the entire test suite (Playwright globalSetup).
 *
 * Responsibilities:
 * - Log active environment context
 * - Optional one-time setup: seed data, auth tokens, service warm-up
 *
 * Modify when:
 * - Suite-wide prerequisites are needed before any test file runs.
 *
 * Do not put:
 * - Per-test setup (use test.beforeEach or fixtures)
 * - Assertions
 */
import { env, isCI } from '../env/index.js';

async function globalSetup(): Promise<void> {
  console.log(`[global-setup] Environment: ${env.name}`);
  console.log(`[global-setup] Base URL: ${env.baseUrl}`);
  console.log(`[global-setup] CI: ${isCI()}`);

  // Extend here: seed data, warm caches, auth token bootstrap, etc.
}

export default globalSetup;
