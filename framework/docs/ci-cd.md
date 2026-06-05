# CI/CD

## GitHub Actions

Active workflow: `.github/workflows/ci.yml`  
Template mirror: `framework/CI/github-actions/ci.yml`

### Pipeline stages

1. **Lint** — TypeScript, ESLint, Prettier
2. **Test** — Playwright on Chromium, `@smoke` and `@api` tags

### Artifacts

Uploaded on every run (even on failure):

- `playwright-report/`
- `test-results/` (screenshots, traces, videos)
- `framework/reporters/allure/results/`

### Retries

CI sets `RETRIES=1` and Playwright `forbidOnly` when `CI=true`.

### Parallelism

- Local: default worker count
- CI: `WORKERS=2` via `framework/CI/templates/env.ci.yml`

### Sharding (large suites)

```yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: pnpm exec playwright test --shard=${{ matrix.shard }}/4
```

Merge with `npx playwright merge-reports ./blob-report`.

## Docker

```bash
docker compose build
docker compose run tests
```

## Environment template

Copy `framework/CI/templates/env.ci.yml` variables into your pipeline secrets/vars.
