/**
 * Purpose:
 * Primary Playwright Test configuration for the framework.
 *
 * Responsibilities:
 * - Define test directory, parallelism, retries, and timeouts
 * - Configure browsers, artifacts (trace, screenshot, video)
 * - Wire reporters and global setup
 *
 * Modify when:
 * - Execution strategy changes (workers, projects, retries, artifacts).
 *
 * Do not put:
 * - Test cases, page objects, or API clients
 * - Environment variable parsing (use framework/config/env)
 */
import { defineConfig, devices } from '@playwright/test';
import { env, isCI } from '../env/index.js';
import { createReporters } from '../../reporters/index.js';

// ====================
// Runtime tuning
// ====================

const workers = env.workers ?? (isCI() ? 2 : undefined);
const retries = isCI() ? Math.max(env.retries, 1) : env.retries;

export default defineConfig({
  testDir: 'framework/tests',
  fullyParallel: true,
  forbidOnly: isCI(),
  retries,
  workers,
  timeout: env.timeout,
  expect: { timeout: 10_000 },
  globalSetup: 'framework/config/global-setup/global-setup.ts',

  // ====================
  // Default test options
  // ====================

  use: {
    baseURL: env.baseUrl,
    headless: env.headless,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  // ====================
  // Browser projects
  // ====================

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  reporter: createReporters(),

  outputDir: 'test-results',
});
