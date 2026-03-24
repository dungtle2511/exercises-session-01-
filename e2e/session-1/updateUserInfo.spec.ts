import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';

const firstName = "first"
const lastName = "last"

test('test', async ({ page }) => {
  await page.goto(`${BASE_URL}/signin`);

  await page.getByRole('textbox', { name: 'Username' }).fill('Heath93');
  await page.getByRole('textbox', { name: 'Password' }).fill('s3cret');
  await page.locator('[data-test="signin-submit"]').click();
  await page.locator('[data-test="sidenav-user-settings"]').click();
  await page.locator('[data-test="user-settings-firstName-input"]').fill(firstName);
  await page.locator('[data-test="user-settings-lastName-input"]').fill(lastName);
  await page.locator('[data-test="user-settings-submit"]').click();
  let newName = firstName + " " + lastName.charAt(0)
  console.log(newName)
  await expect(page.locator('[data-test="sidenav-user-full-name"]')).toContainText(newName);
});