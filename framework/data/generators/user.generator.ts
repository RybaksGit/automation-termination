/**
 * Purpose:
 * Creates unique user credentials at runtime for parallel-safe tests.
 *
 * Responsibilities:
 * - Define UserCredentials type
 * - Generate users with optional field overrides
 *
 * Modify when:
 * - Credential shape changes or new user attributes are required.
 *
 * Do not put:
 * - Static persona definitions (use framework/data/users)
 * - Login or API calls
 */
export type UserCredentials = {
  email: string;
  password: string;
  displayName: string;
};

let counter = 0;

export function generateUser(overrides: Partial<UserCredentials> = {}): UserCredentials {
  counter += 1;
  const id = `${Date.now()}-${counter}`;

  return {
    email: `user-${id}@example.com`,
    password: 'GeneratedPass123!',
    displayName: `Generated User ${counter}`,
    ...overrides,
  };
}
