/**
 * Purpose:
 * API tests for User endpoints (JSONPlaceholder).
 *
 * Responsibilities:
 * - Verify list, read, and create user behaviour
 * - Validate responses via typed client and schema
 *
 * Modify when:
 * - New user API scenarios or contract checks are required.
 *
 * Do not put:
 * - Raw fetch calls (use api fixture / clients)
 * - UI interactions
 */
import { test, expect } from '../../fixtures/index.js';
import { UserPayloadBuilder } from '../../api/builders/user.builder.js';

test.describe('Users API', () => {
  test('client returns a valid user list @api @smoke', async ({ api }) => {
    const users = await api.getUsers();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toMatchObject({
      id: expect.any(Number),
      email: expect.any(String),
      username: expect.any(String),
    });
  });

  test('client fetches user by id @api @regression', async ({ api }) => {
    const user = await api.getUserById(1);

    expect(user.id).toBe(1);
    expect(user.email).toContain('@');
  });

  test('client creates user with builder payload @api @regression', async ({ api }) => {
    const payload = new UserPayloadBuilder()
      .withName('API Test User')
      .withEmail('api-test@example.com')
      .withUsername('apitest')
      .build();

    const created = await api.createUser(payload);

    expect(created.name).toBe(payload.name);
    expect(created.email).toBe(payload.email);
  });
});
