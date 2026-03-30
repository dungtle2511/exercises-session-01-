import { test } from '../../fixture/fixture'; // Use custom fixtures from auto/fixture
import { expect, request } from '@playwright/test';
import { API_BASE_URL } from '../../playwright.config';
import { ApiUtils } from '../../utils/ApiUtils';
import { faker } from '@faker-js/faker';

test.beforeAll(async () => {
  // Ensure the app is up
  const req = await request.newContext();
  await req.get(API_BASE_URL);
  await req.dispose();
});


test('TC-02: session 3 exercise 2s', async ({ loginPage, bankAccountsPage, request }) => {
  const api = new ApiUtils(request, API_BASE_URL);

  const firstName = faker.person.firstName();
  const username = faker.internet.username();
  const password = 's3cret';
  const BANK_NAME = `Bank_${Math.random().toString(36).substring(2, 10)}`;
  const ROUTING_NUMBER = `${Math.floor(100000000 + Math.random() * 900000000)}`;
  const ACCOUNT_NUMBER = `${Math.floor(100000000 + Math.random() * 900000000)}`;

  const userData = {
    firstName,
    lastName: faker.person.lastName(),
    username,
    password,
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    avatar: faker.image.avatar(),
    balance: 100_00,
  };

  const body = await api.createUser(userData);
  expect(body.user).toEqual(expect.objectContaining({ firstName }));
  expect(body.user.balance).toBe(100_00);

  // API login to authenticate as this new user for subsequent API calls
  await api.login(username, password);

  // UI login using fixture LoginPage
  await loginPage.login(username, password);
  await expect(loginPage.components().userOnboardingDialogTitle).toBeVisible();

  await loginPage.finishOnboarding(BANK_NAME, ROUTING_NUMBER, ACCOUNT_NUMBER);
  await expect(loginPage.components().userSettings).toBeVisible();

  await bankAccountsPage.gotoBankAccounts();
  const bankParagraph = bankAccountsPage.components().bankItem.filter({ hasText: BANK_NAME }).first();
  await expect(bankParagraph).toBeVisible();
  await bankAccountsPage.deleteBankAccountUsingApi(api, BANK_NAME);
  await expect(await bankAccountsPage.getBankAccountDeleted(BANK_NAME)).toBeVisible();

  await request.dispose();
});