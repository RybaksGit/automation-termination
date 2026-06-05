/**
 * Purpose:
 * Sample product data for commerce-related tests and scripts.
 *
 * Responsibilities:
 * - Define Product type
 * - Export a reference sampleProduct instance
 *
 * Modify when:
 * - Product catalog fields used in tests change.
 *
 * Do not put:
 * - Checkout logic (use page objects)
 * - API inventory calls
 */
export type Product = {
  id: string;
  name: string;
  price: number;
  sku: string;
};

export const sampleProduct: Product = {
  id: 'prod-001',
  name: 'Automation Starter Kit',
  price: 49.99,
  sku: 'AUTO-001',
};
