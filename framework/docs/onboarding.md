# Onboarding

## Prerequisites

- Node.js 20+
- pnpm 9+

## First run

```bash
git clone <repo-url>
cd e2e-scale-framework
pnpm install
pnpm setup:env    # creates .env from .env.example
pnpm test
```

## Daily commands

| Command | Purpose |
|---------|---------|
| `pnpm test` | Full suite |
| `pnpm test:smoke` | Fast confidence check |
| `pnpm test:regression` | Broader coverage |
| `pnpm test:api` | API layer only |
| `pnpm test:headed` | Visible browser |
| `pnpm test:debug` | Playwright Inspector |
| `pnpm test:ui` | Interactive UI mode |
| `pnpm report` | Open HTML report |

## Adding your first test

1. Create a spec under `framework/tests/e2e/<domain>/`.
2. Import `test` and `expect` from `framework/fixtures/index.ts`.
3. Use page fixtures (`todoPage`, etc.) or add new ones in `framework/fixtures/`.
4. Tag with `@smoke` or `@regression` for CI filtering.

## Adding a page object

1. Create `framework/pages/<domain>/<name>.page.ts`.
2. Extend `BasePage`, expose business methods only.
3. Register in `framework/fixtures/pages.fixture.ts`.

## Visual baselines

First run (or after UI changes):

```bash
pnpm exec playwright test framework/tests/visual --project=chromium --update-snapshots
```

## IDE setup

Install recommended extensions (`.vscode/extensions.json`):

- Playwright Test for VS Code
- ESLint
- Prettier
