/**
 * Purpose:
 * Generates a JSON dataset for local mock data or manual exploration.
 *
 * Responsibilities:
 * - Write users and products to framework/data/mock-data/generated/dataset.json
 *
 * Modify when:
 * - Generated dataset shape or volume requirements change.
 *
 * Do not put:
 * - Tests or API calls
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { generateUser } from '../data/generators/user.generator.js';
import { sampleProduct } from '../data/products/sample.product.js';

const outputDir = 'framework/data/mock-data/generated';
mkdirSync(outputDir, { recursive: true });

const users = Array.from({ length: 5 }, () => generateUser());
const payload = {
  generatedAt: new Date().toISOString(),
  users,
  products: [sampleProduct],
};

const filePath = join(outputDir, 'dataset.json');
writeFileSync(filePath, JSON.stringify(payload, null, 2));
console.log(`Generated ${filePath}`);
