import { test } from '../../fixture/fixture'; // Use custom fixtures from auto/fixture
import { expect } from '@playwright/test';

test.use({ storageState: '.auth' });

test('TC-01: session 4 exercise 1', async ({ loginPage }) => {
  await loginPage.goto('/');
  await expect(loginPage.components().userSettings).toBeVisible();
});
