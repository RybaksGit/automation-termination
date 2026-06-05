/**
 * Purpose:
 * Encapsulates interactions with a single todo list item.
 *
 * Responsibilities:
 * - Store item-level locators
 * - Expose actions: complete, read label, remove
 *
 * Modify when:
 * - Todo item UI structure changes.
 *
 * Do not put:
 * - Full-page flows (use TodoPage)
 * - Test expectations
 */
import type { Locator } from '@playwright/test';
import { BaseComponent } from './base.component.js';

export class TodoItemComponent extends BaseComponent {
  constructor(root: Locator) {
    super(root);
  }

  async markComplete(): Promise<void> {
    await this.root.locator('.toggle').check();
  }

  async getLabel(): Promise<string> {
    return (await this.root.locator('label').textContent()) ?? '';
  }

  async remove(): Promise<void> {
    await this.root.hover();
    await this.root.locator('.destroy').click();
  }
}
