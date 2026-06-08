# Conventions

## Naming

| Item         | Convention                      | Example                      |
| ------------ | ------------------------------- | ---------------------------- |
| Spec files   | `<feature>.<layer>.spec.ts`     | `todo.smoke.spec.ts`         |
| Page objects | `<feature>.page.ts`             | `todo.page.ts`               |
| API clients  | `<service>.client.ts`           | `jsonplaceholder.client.ts`  |
| Tests        | Business sentence               | `user can complete checkout` |
| Tags         | `@smoke`, `@regression`, `@api` | In test title                |

## Folder rules

- **tests/** — scenarios only, grouped by `e2e/`, `api/`, `smoke/`, `regression/`, `visual/`.
- **pages/** — UI how, grouped by business area (`auth/`, `checkout/`).
- **api/** — HTTP how (`clients/`, `routes/`, `schemas/`, `builders/`).
- **utils/** — generic only; no `common.ts` dumping ground.

## Test structure

```ts
test.describe('Checkout', () => {
  test.beforeEach(async ({ checkoutPage }) => {
    await checkoutPage.open();
  });

  test('user can place an order @smoke @e2e', async ({ checkoutPage }) => {
    // arrange → act → assert
  });
});
```

## What to avoid

- Selectors in tests
- Giant base classes with 50+ methods
- Shared mutable state between tests
- Inline magic strings (use `data/`)
- Domain logic in `utils/`

## Imports

Use `.js` extensions in TypeScript imports (Node ESM resolution).

Single entry for tests:

```ts
import { test, expect } from '../../fixtures/index.js';
```
