/**
 * Purpose:
 * Provides reusable user credentials and generators as test fixtures.
 *
 * Responsibilities:
 * - Expose standard and environment-based test users
 * - Re-export generateUser for specs that need unique users
 *
 * Modify when:
 * - New default personas or credential sources are required in tests.
 *
 * Do not put:
 * - Login flows (use page objects)
 * - Hardcoded credentials for production systems without env vars
 */
import { test as base } from '@playwright/test';
import { standardUser } from '../data/users/standard.user.js';
import type { UserCredentials } from '../data/generators/user.generator.js';
import { generateUser } from '../data/generators/user.generator.js';
import { env } from '../config/env/index.js';

export type UserFixtures = {
  testUser: UserCredentials;
  envCredentials: UserCredentials;
};

export const usersTest = base.extend<UserFixtures>({
  testUser: async ({}, use) => {
    await use(standardUser);
  },
  envCredentials: async ({}, use) => {
    await use({
      email: env.credentials.email,
      password: env.credentials.password,
      displayName: 'Environment User',
    });
  },
});

export { generateUser };
