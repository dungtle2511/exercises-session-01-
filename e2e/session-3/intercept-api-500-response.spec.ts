import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';
import { API_BASE_URL } from '../../playwright.config';

test('TC-04: Update first and last name and mock listBankAccount (500 server error) @regression', async ({ page, loginPage, bankAccountsPage }) => {
  // Mock GraphQL ListBankAccount operation with 500 error
  await page.route(`${API_BASE_URL}/graphql`, async route => {
    const postData = route.request().postData();
    const payload = postData ? JSON.parse(postData) : {};

    if (payload.operationName === 'ListBankAccount') {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: 'Internal server error while fetching bank accounts',
              locations: [],
              path: ['listBankAccount'],
            },
          ],
        }),
      });
      return;
    }

    // Allow other GraphQL operations to proceed normally
    await route.continue();
  });

  // Wait for the ListBankAccount GraphQL response so we can assert the 500 status
  const listBankResponsePromise = page.waitForResponse(response => {
    if (!response.url().includes('/graphql')) return false;
    const postData = response.request().postData();
    return !!postData && postData.includes('"operationName":"ListBankAccount"');
  });

  const USERNAME = 'Heath93';
  const PASSWORD = 's3cret';
  await loginPage.login(USERNAME, PASSWORD);
  await bankAccountsPage.gotoBankAccounts();
  
  await bankAccountsPage.expectNoBankAccountsHeadingVisible();
  const listBankResponse = await listBankResponsePromise;
  await expect(listBankResponse.status()).toBe(500);
});