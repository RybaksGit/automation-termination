/**
 * Purpose:
 * Encapsulates interactions with the Checkout flow.
 *
 * Responsibilities:
 * - Store checkout locators
 * - Expose order placement and cart review actions
 *
 * Modify when:
 * - Checkout steps, payment UI, or cart layout change.
 *
 * Do not put:
 * - Test expectations
 * - Payment gateway integration logic (belongs in app or dedicated service layer)
 */
import type { Page } from '@playwright/test';
import type { Product } from '../../data/products/sample.product.js';
import { BasePage } from '../components/base.component.js';

export class CheckoutPage extends BasePage {
  // ====================
  // Locators
  // ====================

  private readonly cartSummary = this.page.getByTestId('cart-summary');
  private readonly placeOrderButton = this.page.getByRole('button', { name: /place order/i });

  constructor(page: Page) {
    super(page);
  }

  // ====================
  // Actions
  // ====================

  async open(): Promise<void> {
    await this.goto('/checkout');
  }

  async reviewProduct(product: Product): Promise<void> {
    await this.cartSummary.getByText(product.name).waitFor({ state: 'visible' });
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}
