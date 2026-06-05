/**
 * Purpose:
 * Visual regression tests for the Todo UI.
 *
 * Responsibilities:
 * - Compare screenshots against stored baselines (@visual @regression)
 *
 * Modify when:
 * - Layout changes require new baselines (run with --update-snapshots).
 *
 * Do not put:
 * - Functional assertions unrelated to appearance
 * - Locators beyond what TodoPage already provides
 */
import { test, expect } from '../../fixtures/index.js';

test.describe('Todo visual', () => {
  test('todo app matches baseline @visual @regression', async ({ todoPage, page }) => {
    await todoPage.open();
    await todoPage.addTasks(['Visual check', 'Second item']);

    await expect(page).toHaveScreenshot('todo-app-with-tasks.png', {
      maxDiffPixels: 100,
    });
  });
});
