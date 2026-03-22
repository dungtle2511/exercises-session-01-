import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';

const USERNAME = 'Heath93';
const PASSWORD = 's3cret';

test('Test Case 1: Perform login with credentials', async ({ loginPage }) => {
  await loginPage.login(USERNAME, PASSWORD);
  expect(loginPage.components().userSettings).toBeVisible();
});
