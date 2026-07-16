import { test, expect, Page } from '@playwright/test';

// Base con hash routing. Por defecto apunta a producción; para probar local exporta
// PW_BASE, p. ej.:  PW_BASE='http://localhost:4200/#' npx playwright test
const BASE = process.env.PW_BASE || 'https://zolmaria95.github.io/fitScrum/angular/#';

async function login(page: Page) {
  await page.goto(`${BASE}/login`);
  await page.fill('input[name="usuario"]', 'JPHP001');
  await page.fill('input[name="password"]', 'fit2');
  await page.getByRole('button', { name: /Ingresar/i }).click();
  await page.waitForURL(/#\/board/);
}

// Navega por el menú lateral (abre el drawer en móvil; en escritorio el link ya es visible).
async function navTo(page: Page, label: string) {
  const menuBtn = page.getByRole('button', { name: /menú|menu/i });
  if (await menuBtn.isVisible().catch(() => false)) await menuBtn.click();
  await page.getByRole('link', { name: new RegExp(label, 'i') }).click();
}

// Invariante que NUNCA debe violarse tras navegar: el contenido no puede quedar `inert`.
async function assertContentInteractive(page: Page, ruta: string) {
  await page.waitForURL(new RegExp(`#/${ruta}`));
  const inert = await page.locator('.mat-drawer-content').first().evaluate((el) => el.hasAttribute('inert'));
  expect(inert, `'.mat-drawer-content' quedó inert en /${ruta}`).toBe(false);
}

test('la zona de contenido acepta clics tras navegar repetidamente por el menú', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 }); // escritorio
  await login(page);

  // Ciclo board → tickets → board → tickets (el caso que reproduce el bug).
  for (let i = 0; i < 3; i++) {
    await navTo(page, 'Tickets');
    await assertContentInteractive(page, 'tickets');

    // Click REAL en una tab de la derecha y comprobar que responde (cambia la activa).
    const tab = page.locator('.hd-tab', { hasText: 'Asignados a mí' });
    await tab.click();
    await expect(tab).toHaveClass(/active/);

    await navTo(page, 'Board');
    await assertContentInteractive(page, 'board');
  }
});

test('en escritorio el sidenav usa el mismo modo en todas las rutas', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await login(page);
  const modos: string[] = [];
  for (const ruta of ['tickets', 'board', 'tickets']) {
    await navTo(page, ruta[0].toUpperCase() + ruta.slice(1));
    await page.waitForURL(new RegExp(`#/${ruta}`));
    modos.push(
      await page.locator('mat-sidenav').first().evaluate((el) => (el.classList.contains('mat-drawer-side') ? 'side' : 'over')),
    );
  }
  // Todos los modos deben ser iguales (idealmente 'side' en escritorio).
  expect(new Set(modos).size, `modos inconsistentes: ${modos.join(',')}`).toBe(1);
});
