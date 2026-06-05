/**
 * Purpose:
 * Predefined user personas for repeatable tests.
 *
 * Responsibilities:
 * - Export stable standardUser and adminUser credentials
 *
 * Modify when:
 * - Default test personas or roles change.
 *
 * Do not put:
 * - Dynamic generation logic (use framework/data/generators)
 * - Environment secrets (use .env via fixtures)
 */
import type { UserCredentials } from '../generators/user.generator.js';

export const standardUser: UserCredentials = {
  email: 'standard@example.com',
  password: 'SecurePass123!',
  displayName: 'Standard User',
};

export const adminUser: UserCredentials = {
  email: 'admin@example.com',
  password: 'AdminPass123!',
  displayName: 'Admin User',
};
