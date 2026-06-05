/**
 * Purpose:
 * Fast smoke tests for the Todo application — run on every PR.
 *
 * Responsibilities:
 * - Verify critical paths still work (@smoke @e2e)
 *
 * Modify when:
 * - Minimum confidence scenarios for the Todo domain change.
 *
 * Do not put:
 * - Page locators (use TodoPage)
 * - Deep regression coverage (use tests/regression or tests/e2e)
 */
import { test, expect } from '../../fixtures/index.js';

test.describe('Todo smoke', () => {
  test('user can add a single task @smoke @e2e', async ({ todoPage }) => {
    await todoPage.open();
    await todoPage.addTask('Buy milk');

    await expect.poll(() => todoPage.getTaskCount()).toBe(1);
    await expect.poll(() => todoPage.getTaskLabels()).toContain('Buy milk');
  });
});
