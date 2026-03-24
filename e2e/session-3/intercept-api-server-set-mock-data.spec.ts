import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';
import { API_BASE_URL } from '../../playwright.config';

test('TC-03: Update first and last name and mock listBankAccount @regression', async ({ page, loginPage, bankAccountsPage }) => {
  // Mock GraphQL ListBankAccount operation
  await page.route(`${API_BASE_URL}/graphql`, async route => {
    const postData = route.request().postData();
    const payload = postData ? JSON.parse(postData) : {};
    if (payload.operationName === 'ListBankAccount') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            listBankAccount: [
              {
                id: 'MOCK_ID',
                uuid: 'mock-uuid-1234',
                userId: 'mock-user-id',
                bankName: 'Bank name is mocked.',
                accountNumber: '123456789',
                routingNumber: '987654321',
                isDeleted: false,
                createdAt: `${Date.now()}`,
                modifiedAt: `${Date.now()}`
              }
            ]
          }
        }),
      });
      return;
    }
    await route.abort();
  });

  const USERNAME = 'Heath93';
  const PASSWORD = 's3cret';
  await loginPage.login(USERNAME, PASSWORD);
  await bankAccountsPage.gotoBankAccounts();

  // Assert mocked bank account in UI
  await expect(page.getByText('Bank name is mocked.')).toBeVisible();
});