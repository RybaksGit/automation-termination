/**
 * Purpose:
 * Configures the Allure Playwright reporter integration.
 *
 * Responsibilities:
 * - Return Allure reporter options (results directory, detail level)
 *
 * Modify when:
 * - Allure output path or reporting options change.
 *
 * Do not put:
 * - Custom logging logic (use reporters/custom)
 */
import type { ReporterDescription } from '@playwright/test';
import { env } from '../../config/env/index.js';

export function allureReporter(): ReporterDescription {
  return [
    'allure-playwright',
    {
      resultsDir: env.allure.resultsDir,
      detail: true,
      suiteTitle: true,
    },
  ];
}
