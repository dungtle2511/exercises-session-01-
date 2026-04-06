import { test } from '../../fixture/fixture'; // Use custom fixtures from auto/fixture
import { expect, request } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';

test.beforeAll(async () => {
  // Seed database
  const req = await request.newContext();
  await req.post(`${BASE_URL}/testData/seed`);
  const usersRes = await req.get(`${BASE_URL}/testData/users`);
  const usersJson = await usersRes.json();

  await req.dispose();
});

test.describe('@regression TC-02: session 4 exercise 2', () => {
  
  const users = [
    { username: 'Arvilla_Hegmann', password: 's3cret' },
    { username: 'Dina20', password: 's3cret' }
  ];

  users.forEach((user) => {
    test(`login as ${user.username} and verify sidebar`, async ({ loginPage }) => {
      if (user.username === 'Dina20') {
        test.slow();
      }

    	await loginPage.login(user.username, user.password);
			await expect(loginPage.components().userSettings).toBeVisible();
      await expect(loginPage.components().userName).toContainText(user.username);
      await expect(loginPage.components().transactionList).toBeVisible();
    });
  });
});
