/**
 * Purpose:
 * Shared base classes for page objects and UI components.
 *
 * Responsibilities:
 * - BaseComponent: wrap a Locator root for child components
 * - BasePage: common navigation helper for full pages
 *
 * Modify when:
 * - Cross-page or cross-component patterns are standardized (e.g. shared wait helpers).
 *
 * Do not put:
 * - Page-specific locators or flows
 * - Test assertions
 */
import type { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  constructor(protected readonly root: Locator) {}

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
}

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }
}
