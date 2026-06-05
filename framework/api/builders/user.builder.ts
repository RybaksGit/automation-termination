/**
 * Purpose:
 * Generates valid user payloads for API tests.
 *
 * Responsibilities:
 * - Provide fluent customization of user request bodies
 * - Supply sensible defaults via build()
 *
 * Modify when:
 * - User payload schema or required fields change.
 *
 * Do not put:
 * - API calls
 * - Assertions
 */
import type { ApiUser } from '../schemas/user.schema.js';

export class UserPayloadBuilder {
  private payload: Partial<ApiUser> = {};

  // ====================
  // Fluent customization
  // ====================

  withName(name: string): this {
    this.payload.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.payload.email = email;
    return this;
  }

  withUsername(username: string): this {
    this.payload.username = username;
    return this;
  }

  // ====================
  // Build
  // ====================

  build(): Omit<ApiUser, 'id'> {
    return {
      name: this.payload.name ?? 'Test User',
      username: this.payload.username ?? 'testuser',
      email: this.payload.email ?? 'test@example.com',
      phone: '555-0100',
      website: 'example.com',
    };
  }
}
