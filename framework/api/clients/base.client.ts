/**
 * Purpose:
 * Abstract base for all API clients — shared HTTP helpers.
 *
 * Responsibilities:
 * - Build full URLs from base URL and paths
 * - Parse JSON responses and surface HTTP errors
 * - Provide optional auth header helper
 *
 * Modify when:
 * - Cross-cutting API behaviour changes (auth, error format, logging).
 *
 * Do not put:
 * - Service-specific endpoints (extend in concrete clients)
 * - Test assertions or Zod schemas
 */
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { env } from '../../config/env/index.js';

export type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
};

export abstract class BaseApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string = env.apiBaseUrl,
  ) {}

  // ====================
  // URL & response helpers
  // ====================

  protected url(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl.replace(/\/$/, '')}${normalized}`;
  }

  protected async parseJson<T>(response: APIResponse): Promise<T> {
    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`API ${response.status()} ${response.statusText()}: ${body}`);
    }
    return (await response.json()) as T;
  }

  protected authHeaders(token?: string): Record<string, string> {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }
}
