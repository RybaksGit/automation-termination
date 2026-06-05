/**
 * Purpose:
 * CLI script to remove test artifacts and generated output directories.
 *
 * Responsibilities:
 * - Delete playwright-report, test-results, Allure output, and logs
 *
 * Modify when:
 * - New artifact paths should be included in cleanup.
 *
 * Do not put:
 * - Test logic
 */
import { rmSync, existsSync } from 'node:fs';

const paths = [
  'test-results',
  'playwright-report',
  'blob-report',
  'framework/reporters/allure/results',
  'framework/reporters/allure/report',
  'framework/reporters/logs',
  'framework/data/mock-data/generated',
];

for (const path of paths) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    console.log(`Removed ${path}`);
  }
}

console.log('Cleanup complete.');
