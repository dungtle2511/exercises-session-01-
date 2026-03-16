import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Heath93');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('s3cret');
  await page.getByText('Remember me').click();
  await page.pause();
  await page.locator('[data-test="signin-submit"]').click();
  await expect(page.locator('div').filter({ hasText: 'Ted P@Heath93' }).nth(5)).toBeVisible();
});