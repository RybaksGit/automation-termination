/**
 * Purpose:
 * Injects page objects into tests as Playwright fixtures.
 *
 * Responsibilities:
 * - Instantiate page objects per test
 * - Expose typed fixtures (todoPage, loginPage, checkoutPage)
 *
 * Modify when:
 * - A new page object should be available in tests without manual construction.
 *
 * Do not put:
 * - Locator definitions (use framework/pages)
 * - Assertions or test flows
 */
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/login.page.js';
import { CheckoutPage } from '../pages/checkout/checkout.page.js';
import { TodoPage } from '../pages/dashboard/todo.page.js';

export type PageFixtures = {
  todoPage: TodoPage;
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
};

export const pagesTest = base.extend<PageFixtures>({
  todoPage: async ({ page }, use) => {
    await use(new TodoPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});
