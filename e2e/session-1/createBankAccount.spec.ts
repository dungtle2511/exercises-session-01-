import { test, expect } from '@playwright/test';

const bankName = "test bank"

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');

  await page.getByRole('textbox', { name: 'Username' }).fill('Heath93');
  await page.getByRole('textbox', { name: 'Password' }).fill('s3cret');
  await page.locator('[data-test="signin-submit"]').click();
  await page.locator('[data-test="sidenav-bankaccounts"]').click();
  await page.locator('[data-test="bankaccount-new"]').click();
  await page.getByRole('textbox', { name: 'Bank Name' }).fill(bankName);
  await page.getByRole('textbox', { name: 'Routing Number' }).fill('123456789');
  await page.getByRole('textbox', { name: 'Account Number' }).fill('123456789');
  await page.locator('[data-test="bankaccount-submit"]').click();
  await expect(page.locator('[data-test="main"]')).toContainText(bankName);
});