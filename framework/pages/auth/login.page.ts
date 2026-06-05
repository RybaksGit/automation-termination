/**
 * Purpose:
 * Encapsulates interactions with the Login page.
 *
 * Responsibilities:
 * - Store auth-related locators
 * - Expose login flow as a single business action
 *
 * Modify when:
 * - Login UI, fields, or authentication steps change.
 *
 * Do not put:
 * - Test expectations
 * - Test scenarios
 */
import type { Page } from '@playwright/test';
import type { UserCredentials } from '../../data/generators/user.generator.js';
import { BasePage } from '../components/base.component.js';

export class LoginPage extends BasePage {
  // ====================
  // Locators
  // ====================

  private readonly emailInput = this.page.getByRole('textbox', { name: /email/i });
  private readonly passwordInput = this.page.getByLabel(/password/i);
  private readonly submitButton = this.page.getByRole('button', { name: /sign in|log in/i });

  constructor(page: Page) {
    super(page);
  }

  // ====================
  // Actions
  // ====================

  async open(): Promise<void> {
    await this.goto('/login');
  }

  async login(user: UserCredentials): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }
}
