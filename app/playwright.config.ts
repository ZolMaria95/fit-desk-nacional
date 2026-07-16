import { defineConfig, devices } from '@playwright/test';

/**
 * Config de Playwright para los E2E de la app Angular.
 * Los tests usan su propia BASE (prod por defecto, o `PW_BASE` para local) — no
 * arrancamos webServer aquí para poder apuntar a producción o a `ng serve`.
 *   npx playwright test
 *   PW_BASE='http://localhost:4200/#' npx playwright test
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
