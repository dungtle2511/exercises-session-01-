import { test } from '../../fixture/fixture';

const USERNAME = 'Heath93';
const PASSWORD = 's3cret';

// This test logs in and saves storage state
// Run with: npx playwright test storageState.spec.ts

test('Login and save storage state', async ({ page, loginPage }) => {
  await loginPage.login(USERNAME, PASSWORD);
  await page.context().storageState({ path: 'storageState.json' });
});