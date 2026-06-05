/**
 * Purpose:
 * Assembles the Playwright reporter list used on every test run.
 *
 * Responsibilities:
 * - Register list, HTML, custom, and optional Allure reporters
 * - Respect ENABLE_ALLURE from environment config
 *
 * Modify when:
 * - Reporters are added, removed, or reordered.
 *
 * Do not put:
 * - Reporter implementation details (use reporters/allure or reporters/custom)
 */
import type { ReporterDescription } from '@playwright/test';
import { env } from '../config/env/index.js';
import { allureReporter } from './allure/allure.reporter.js';

export function createReporters(): ReporterDescription[] {
  const reporters: ReporterDescription[] = [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['./framework/reporters/custom/custom.reporter.ts'],
  ];

  if (env.allure.enabled) {
    reporters.push(allureReporter());
  }

  return reporters;
}
