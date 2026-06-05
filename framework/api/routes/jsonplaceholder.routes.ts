/**
 * Purpose:
 * Centralized path definitions for JSONPlaceholder API endpoints.
 *
 * Responsibilities:
 * - Store route templates and path builders
 * - Avoid hardcoded URL strings in clients
 *
 * Modify when:
 * - API paths are added, renamed, or versioned.
 *
 * Do not put:
 * - HTTP verbs or request bodies
 * - Base URLs (use framework/config/env)
 */
export const jsonPlaceholderRoutes = {
  users: '/users',
  userById: (id: number | string) => `/users/${id}`,
  posts: '/posts',
  postById: (id: number | string) => `/posts/${id}`,
} as const;
