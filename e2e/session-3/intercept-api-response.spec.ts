import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';
import { API_BASE_URL } from '../../playwright.config';

test('TC-03: Update first and last name and mock listBankAccount by modifying API response @regression', async ({ page, loginPage, bankAccountsPage }) => {
  // Intercept GraphQL ListBankAccount operation and modify the real API response
  await page.route(`${API_BASE_URL}/graphql`, async route => {
    const postData = route.request().postData();
    const payload = postData ? JSON.parse(postData) : {};
    if (payload.operationName !== 'ListBankAccount') {
      // Let all other GraphQL operations hit the real server
      return route.continue();
    }

    // Fetch the real response from the API server first
    const originalResponse = await route.fetch();
    let body: any;
    try {
      body = await originalResponse.json();
    } catch {
      body = null;
    }

    // If for some reason the body isn't in the expected shape, just fall back to a simple mock
    if (!body || !body.data || !Array.isArray(body.data.listBankAccount)) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            listBankAccount: [
              {
                id: 'MOCK_ID',
                uuid: 'mock-uuid-1234',
                userId: 'mock-user-id',
                bankName: 'Bank name in original response is not in expected format.',
                accountNumber: '123456789',
                routingNumber: '987654321',
                isDeleted: false,
                createdAt: `${Date.now()}`,
                modifiedAt: `${Date.now()}`
              },
            ],
          },
        }),
      });
    }

    const modifiedBody = {
      ...body,
      data: {
        ...body.data,
        listBankAccount: body.data.listBankAccount.map((account: any, index: number) =>
          index === 0
            ? { ...account, bankName: 'Bank name is mocked in response.' }
            : account
        ),
      },
    };

    await route.fulfill({
      // Reuse all original response details but override the body
      response: originalResponse,
      body: JSON.stringify(modifiedBody),
    });
  });

  const USERNAME = 'Heath93';
  const PASSWORD = 's3cret';
  await loginPage.login(USERNAME, PASSWORD);
  await bankAccountsPage.gotoBankAccounts();
  // Assert mocked bank account in UI (coming from modified API response)
  await expect(page.getByText('Bank name is mocked in response.')).toBeVisible();
});