/**
 * Purpose:
 * Encapsulates interactions with the Todo application (dashboard).
 *
 * Responsibilities:
 * - Store page locators
 * - Expose business-oriented actions: add tasks, filter, clear completed
 *
 * Modify when:
 * - Todo UI elements or user flows change.
 *
 * Do not put:
 * - Test expectations
 * - Test scenarios
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../components/base.component.js';
import { TodoItemComponent } from '../components/todo-item.component.js';

export class TodoPage extends BasePage {
  // ====================
  // Locators
  // ====================

  private readonly newTodoInput = this.page.getByPlaceholder('What needs to be done?');
  private readonly todoList = this.page.locator('.todo-list li');

  constructor(page: Page) {
    super(page);
  }

  // ====================
  // Navigation
  // ====================

  async open(): Promise<void> {
    await this.goto('');
    await this.newTodoInput.waitFor({ state: 'visible' });
  }

  // ====================
  // Actions
  // ====================

  async addTask(title: string): Promise<void> {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press('Enter');
  }

  async addTasks(titles: string[]): Promise<void> {
    for (const title of titles) {
      await this.addTask(title);
    }
  }

  async markAllComplete(): Promise<void> {
    await this.page.locator('label[for="toggle-all"]').click();
  }

  async filterBy(status: 'all' | 'active' | 'completed'): Promise<void> {
    await this.page.locator('.filters').getByRole('link', { name: status }).click();
  }

  async clearCompleted(): Promise<void> {
    await this.page.getByRole('button', { name: 'Clear completed' }).click();
  }

  // ====================
  // Queries
  // ====================

  async getTaskCount(): Promise<number> {
    return this.todoList.count();
  }

  async getTaskLabels(): Promise<string[]> {
    const items = await this.todoList.all();
    const labels: string[] = [];
    for (const item of items) {
      labels.push(await new TodoItemComponent(item).getLabel());
    }
    return labels;
  }
}
