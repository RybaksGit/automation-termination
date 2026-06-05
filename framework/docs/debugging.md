# Debugging

## Quick paths

| Symptom | Action |
|---------|--------|
| Flaky timing | Increase timeout in `config/env` or use `expect.poll` |
| Selector broke | Fix in page object only |
| API contract change | Update `api/schemas/` |
| Need step-through | `pnpm test:debug` |
| See browser | `pnpm test:headed` |

## Artifacts on failure

Playwright captures automatically:

- Screenshot (`only-on-failure`)
- Video (`retain-on-failure`)
- Trace (`on-first-retry`)

Open trace:

```bash
pnpm exec playwright show-trace test-results/.../trace.zip
```

## Logs

Custom reporter writes:

- `framework/reporters/logs/run.log` — run summary
- `framework/reporters/logs/failures.log` — failed test titles

## Reports

```bash
pnpm report              # HTML
pnpm report:allure       # Allure (requires Allure CLI installed)
```

## Trace locally

```bash
TRACE=1 pnpm test
```

Or set in config `use.trace = 'on'` temporarily.

## Common fixes

1. **Stale `.env`** — run `pnpm setup:env` and verify `BASE_URL`.
2. **Visual diff** — update snapshots intentionally with `--update-snapshots`.
3. **Parallel collision** — ensure tests create unique data (`data/generators/`).

## Inspector tips

- `pnpm test:debug` opens Playwright Inspector
- Set breakpoint in VS Code with Playwright extension
- Use `page.pause()` sparingly in local debugging only
