/**
 * Purpose:
 * Centralized client for JSONPlaceholder User API endpoints.
 *
 * Responsibilities:
 * - Build and send user-related HTTP requests
 * - Return Zod-validated typed responses
 *
 * Modify when:
 * - User API endpoints or response shapes change.
 *
 * Do not put:
 * - Test assertions
 * - Playwright test logic or UI code
 */
import type { APIRequestContext } from '@playwright/test';
import { apiUserListSchema, apiUserSchema, type ApiUser } from '../schemas/user.schema.js';
import { jsonPlaceholderRoutes } from '../routes/jsonplaceholder.routes.js';
import { BaseApiClient } from './base.client.js';

export class JsonPlaceholderClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getUsers(): Promise<ApiUser[]> {
    const response = await this.request.get(this.url(jsonPlaceholderRoutes.users));
    const data = await this.parseJson<unknown>(response);
    return apiUserListSchema.parse(data);
  }

  async getUserById(id: number): Promise<ApiUser> {
    const response = await this.request.get(this.url(jsonPlaceholderRoutes.userById(id)));
    const data = await this.parseJson<unknown>(response);
    return apiUserSchema.parse(data);
  }

  async createUser(payload: Omit<ApiUser, 'id'>): Promise<ApiUser> {
    const response = await this.request.post(this.url(jsonPlaceholderRoutes.users), {
      data: payload,
    });
    const data = await this.parseJson<unknown>(response);
    return apiUserSchema.parse(data);
  }
}
