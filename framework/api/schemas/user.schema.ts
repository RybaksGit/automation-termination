/**
 * Purpose:
 * Runtime validation and TypeScript types for User API responses.
 *
 * Responsibilities:
 * - Define Zod schemas for single user and user list payloads
 * - Export inferred ApiUser type for clients and builders
 *
 * Modify when:
 * - API contract fields or validation rules change.
 *
 * Do not put:
 * - HTTP requests
 * - Test expectations
 */
import { z } from 'zod';

export const apiUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
});

export type ApiUser = z.infer<typeof apiUserSchema>;

export const apiUserListSchema = z.array(apiUserSchema);
