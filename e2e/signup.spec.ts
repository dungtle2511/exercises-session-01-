import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');
  await page.locator('[data-test="signup"]').click();
  await page.locator('[data-test="signup"]').click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Username' }).fill('testuser');
  await page.locator('[data-test="signup-password"]').getByRole('textbox', { name: 'Password' }).fill('test123');
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('test123');
  await page.locator('[data-test="signup-submit"]').click();
  await page.getByRole('textbox', { name: 'Username' }).fill('testuser');
  await page.getByRole('textbox', { name: 'Password' }).fill('test123');
  await page.locator('[data-test="signin-submit"]').click();
  await expect(page.locator('[data-test="user-onboarding-dialog-title"]')).toBeVisible();
});