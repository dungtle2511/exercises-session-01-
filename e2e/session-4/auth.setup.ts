import { test } from '../../fixture/fixture'; // Use custom fixtures from auto/fixture

const USERNAME = 'Heath93';
const PASSWORD = 's3cret';

test('authenticate and save storage state', async ({ loginPage, page }) => {
  await loginPage.login(USERNAME, PASSWORD);
  await page.context().storageState({ path: '.auth' });
});
