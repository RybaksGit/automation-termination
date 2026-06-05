/**
 * Purpose:
 * Entry point for merging sharded Playwright/blob reports in CI.
 *
 * Responsibilities:
 * - Detect blob-report output and print merge instructions
 * - Extend with automated merge when sharded runs are enabled
 *
 * Modify when:
 * - CI runs tests with --shard and blob reporter across multiple jobs.
 *
 * Do not put:
 * - Test execution logic
 */
import { existsSync } from 'node:fs';

const blobDir = 'blob-report';

if (!existsSync(blobDir)) {
  console.log('No blob-report directory found. Run sharded tests with blob reporter first.');
  process.exit(0);
}

console.log('Merge reports: configure blob reporter in CI and call:');
console.log('  npx playwright merge-reports ./blob-report');
