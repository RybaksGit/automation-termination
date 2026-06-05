/**
 * Purpose:
 * Injects API clients into tests as Playwright fixtures.
 *
 * Responsibilities:
 * - Provide a ready-to-use API client bound to Playwright request context
 *
 * Modify when:
 * - Additional API clients should be shared across API tests.
 *
 * Do not put:
 * - HTTP implementation details (use framework/api/clients)
 * - Test assertions
 */
import { test as base } from '@playwright/test';
import { JsonPlaceholderClient } from '../api/clients/jsonplaceholder.client.js';

export type ApiFixtures = {
  api: JsonPlaceholderClient;
};

export const apiTest = base.extend<ApiFixtures>({
  api: async ({ request }, use) => {
    await use(new JsonPlaceholderClient(request));
  },
});
