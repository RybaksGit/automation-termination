/**
 * Purpose:
 * Single entry point for Playwright test and expect — all specs import from here.
 *
 * Responsibilities:
 * - Compose page, API, and user fixtures via mergeTests
 * - Re-export expect from Playwright
 *
 * Modify when:
 * - A new fixture module is added (register it in mergeTests below).
 *
 * Do not put:
 * - Fixture implementations (use pages.fixture, api.fixture, users.fixture)
 * - Test scenarios or assertions
 */
import { mergeTests } from '@playwright/test';
import { apiTest } from './api.fixture.js';
import { pagesTest } from './pages.fixture.js';
import { usersTest } from './users.fixture.js';

export const test = mergeTests(pagesTest, apiTest, usersTest);

export { expect } from '@playwright/test';
