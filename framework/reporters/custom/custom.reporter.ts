/**
 * Purpose:
 * Lightweight custom reporter for console summary and failure logs.
 *
 * Responsibilities:
 * - Log run start/end to console and framework/reporters/logs/run.log
 * - Append failed test titles to failures.log
 *
 * Modify when:
 * - Additional run-level diagnostics or log formats are needed.
 *
 * Do not put:
 * - Per-assertion logging
 * - Test logic
 */
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LOG_DIR = 'framework/reporters/logs';

class CustomReporter implements Reporter {
  private startedAt = 0;

  onBegin(config: FullConfig, suite: Suite): void {
    this.startedAt = Date.now();
    mkdirSync(LOG_DIR, { recursive: true });
    const summary = `Run started | projects: ${config.projects.map((p) => p.name).join(', ')} | tests: ${suite.allTests().length}`;
    writeFileSync(join(LOG_DIR, 'run.log'), `${new Date().toISOString()} ${summary}\n`);
    console.log(`\n▶ ${summary}\n`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status !== 'passed') {
      const line = `${test.title} → ${result.status} (${result.duration}ms)\n`;
      appendFileSync(join(LOG_DIR, 'failures.log'), line);
    }
  }

  onEnd(result: FullResult): void {
    const duration = ((Date.now() - this.startedAt) / 1000).toFixed(1);
    const line = `Run finished | status: ${result.status} | duration: ${duration}s\n`;
    appendFileSync(join(LOG_DIR, 'run.log'), `${new Date().toISOString()} ${line}`);
    console.log(`\n■ Finished in ${duration}s — ${result.status}\n`);
  }
}

export default CustomReporter;
