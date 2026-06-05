/**
 * Purpose:
 * Regression tests for Todo — broader coverage than smoke, slower paths.
 *
 * Responsibilities:
 * - Verify mark-all-complete and related regression scenarios
 *
 * Modify when:
 * - Regression scope for Todo expands beyond smoke/e2e suites.
 *
 * Do not put:
 * - Smoke-only checks (prefer tests/smoke)
 * - Visual baselines (use tests/visual)
 */
import { test, expect } from '../../fixtures/index.js';

test.describe('Todo regression', () => {
  test('user can mark all tasks complete @regression @e2e', async ({ todoPage, page }) => {
    await todoPage.open();
    await todoPage.addTasks(['One', 'Two']);
    await todoPage.markAllComplete();

    const toggles = page.locator('.todo-list li .toggle');
    await expect(toggles.nth(0)).toBeChecked();
    await expect(toggles.nth(1)).toBeChecked();
  });
});
