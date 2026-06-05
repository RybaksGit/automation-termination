# E2E Scale Framework

A production-grade **Playwright + TypeScript** automation starter built for teams who care about clarity, reliability, and scale — without the bloat.

> Calm structure. Business-oriented tests. Real implementations, not tutorial scaffolding.

---

## Vision

This repository is a **reusable automation ecosystem**: clone it, point environment variables at your apps, and grow from ten tests to thousands without redesigning the architecture.

**Philosophy:** simplicity over cleverness, readability over magic, maintainability over abstraction.

---

## Quick start

```bash
git clone <repo-url>
cd e2e-scale-framework
pnpm install
pnpm setup:env
pnpm test
```

Open the HTML report after a run:

```bash
pnpm report
```

---

## Architecture

```
framework/
├── tests/          # Scenarios only (e2e, api, smoke, regression, visual)
├── pages/          # Page Object Model — business-oriented UI layer
├── api/            # Typed HTTP clients, routes, schemas, builders
├── fixtures/       # Composed Playwright fixtures (pages, api, users)
├── data/           # Static data & generators
├── utils/          # Small generic helpers (date, waits, validation)
├── config/         # env, Playwright, constants, global-setup
├── reporters/      # Allure, custom logs, HTML
├── scripts/        # clean, setup-env, generate-data, merge-reports
├── docs/           # Architecture, onboarding, conventions
└── CI/             # GitHub Actions templates & pipeline notes
```

Deep dive: [framework/docs/architecture.md](framework/docs/architecture.md)

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm test` | Run full suite (all browsers) |
| `pnpm test:smoke` | `@smoke` tagged tests |
| `pnpm test:regression` | `@regression` tagged tests |
| `pnpm test:api` | API tests only |
| `pnpm test:e2e` | E2E folder |
| `pnpm test:visual` | Visual regression |
| `pnpm test:headed` | Headed browser |
| `pnpm test:debug` | Playwright Inspector |
| `pnpm test:ui` | Interactive UI mode |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm clean` | Remove reports & artifacts |
| `pnpm setup:env` | Create `.env` from example |
| `pnpm generate:data` | Generate mock JSON dataset |

---

## Environment switching

```bash
ENV=stage BASE_URL=https://stage.example.com pnpm test
```

Configuration lives in `framework/config/env` and loads from `.env` (see `.env.example`).

---

## Example tests

**E2E (business language):**

```ts
test('user can manage multiple tasks @regression @e2e', async ({ todoPage }) => {
  await todoPage.addTasks(['Write tests', 'Ship']);
  await expect.poll(() => todoPage.getTaskCount()).toBe(2);
});
```

**API (typed client + schema validation):**

```ts
test('client returns a valid user list @api @smoke', async ({ api }) => {
  const users = await api.getUsers();
  expect(users.length).toBeGreaterThan(0);
});
```

Demo targets: [TodoMVC](https://demo.playwright.dev/todomvc) (UI), [JSONPlaceholder](https://jsonplaceholder.typicode.com) (API).

---

## Reporting

| Reporter | Output |
|----------|--------|
| HTML | `playwright-report/` → `pnpm report` |
| Allure | `framework/reporters/allure/results/` → `pnpm report:allure` |
| Custom logs | `framework/reporters/logs/` |

On failure: screenshots, videos, traces (on retry).

---

## CI/CD

GitHub Actions runs lint + Playwright smoke/API on every push/PR.

- Workflow: `.github/workflows/ci.yml`
- Templates: `framework/CI/`

Details: [framework/docs/ci-cd.md](framework/docs/ci-cd.md)

---

## Docker

```bash
docker compose build && docker compose run tests
```

---

## Code quality

- **TypeScript** strict mode
- **ESLint** + **Prettier**
- **Husky** + **lint-staged** on commit

---

## Scaling

1. Add domains under `tests/e2e/<domain>/`
2. Tag tests for selective CI (`@smoke`, `@regression`)
3. Shard in CI (`--shard=1/4`)
4. Add Playwright projects per app/browser in `config/playwright/`

Full guide: [framework/docs/conventions.md](framework/docs/conventions.md)

---

## Documentation

| Doc | Topic |
|-----|-------|
| [architecture.md](framework/docs/architecture.md) | Layers & data flow |
| [onboarding.md](framework/docs/onboarding.md) | First week guide |
| [conventions.md](framework/docs/conventions.md) | Naming & structure |
| [ci-cd.md](framework/docs/ci-cd.md) | Pipelines & artifacts |
| [debugging.md](framework/docs/debugging.md) | Traces, logs, fixes |

---

## License

MIT — use freely as an internal starter template.
