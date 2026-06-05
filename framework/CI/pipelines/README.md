# Pipelines

Use this folder for pipeline definitions beyond GitHub Actions (e.g. Azure DevOps, GitLab CI, Jenkins).

## Sharded execution

For large suites, shard Playwright across jobs:

```bash
pnpm exec playwright test --shard=1/4 --project=chromium
```

Merge blob reports after all shards complete:

```bash
npx playwright merge-reports ./blob-report
```

See `framework/scripts/merge-reports.ts` for integration notes.
