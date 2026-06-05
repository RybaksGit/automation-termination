/**
 * Purpose:
 * Root Playwright entry point — re-exports the framework Playwright configuration.
 *
 * Responsibilities:
 * - Point the Playwright CLI at the shared config under framework/config/playwright
 *
 * Modify when:
 * - You need a different config file path or multiple config profiles at the repo root.
 *
 * Do not put:
 * - Test logic, fixtures, or environment parsing (use framework/config instead).
 */
import config from './framework/config/playwright/playwright.config.js';
export default config;
