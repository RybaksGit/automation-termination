/**
 * Purpose:
 * Bootstraps a local .env file for first-time framework setup.
 *
 * Responsibilities:
 * - Copy .env.example to .env when .env does not exist
 *
 * Modify when:
 * - Onboarding env template or default variables change.
 *
 * Do not put:
 * - Secret values committed to the repository
 */
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const envPath = resolve(root, '.env');
const examplePath = resolve(root, '.env.example');

if (existsSync(envPath)) {
  console.log('.env already exists — skipping.');
  process.exit(0);
}

if (!existsSync(examplePath)) {
  console.error('.env.example not found.');
  process.exit(1);
}

copyFileSync(examplePath, envPath);
console.log('Created .env from .env.example');
console.log('Edit .env to match your target environment, then run: pnpm test');
