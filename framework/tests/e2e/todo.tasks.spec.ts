/**
 * Purpose:
 * End-to-end tests for Todo task management flows.
 *
 * Responsibilities:
 * - Verify multi-task, filter, and clear-completed behaviour (@regression @e2e)
 *
 * Modify when:
 * - New Todo user journeys or acceptance criteria are added.
 *
 * Do not put:
 * - Locators (use TodoPage; rare page access only when POM does not yet cover a case)
 * - API calls
 */
import { test, expect } from '../../fixtures/index.js';

test.describe('Todo task management', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.open();
  });

  test('user can manage multiple tasks @regression @e2e', async ({ todoPage }) => {
    const tasks = ['Write tests', 'Review PR', 'Ship feature'];
    await todoPage.addTasks(tasks);

    await expect.poll(() => todoPage.getTaskCount()).toBe(3);
    const labels = await todoPage.getTaskLabels();
    for (const task of tasks) {
      expect(labels).toContain(task);
    }
  });

  test('user can filter completed tasks @regression @e2e', async ({ todoPage, page }) => {
    await todoPage.addTask('Active task');
    await todoPage.addTask('Done task');
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await todoPage.filterBy('completed');

    await expect.poll(() => todoPage.getTaskCount()).toBe(1);
    await expect.poll(() => todoPage.getTaskLabels()).toEqual(['Done task']);
  });

  test('user can clear completed tasks @regression @e2e', async ({ todoPage, page }) => {
    await todoPage.addTask('Keep me');
    await todoPage.addTask('Remove me');
    await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    await todoPage.clearCompleted();

    await expect.poll(() => todoPage.getTaskCount()).toBe(1);
    await expect.poll(() => todoPage.getTaskLabels()).toEqual(['Keep me']);
  });
});
