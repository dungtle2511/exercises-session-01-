import { test } from '../../fixture/fixture';

test('TC-05: Speed up test by blocking image resources @regression', async ({ page, loginPage, bankAccountsPage }) => {
  // Block image requests to speed up and test network interception
  await page.route(/\.(png|jpg|jpeg|svg)$/i, route => route.abort());

  const USERNAME = 'Heath93';
  const PASSWORD = 's3cret';
  await loginPage.login(USERNAME, PASSWORD);
  await bankAccountsPage.gotoBankAccounts();
  await page.pause(); // Pause to visually confirm images are blocked and test runs faster
});