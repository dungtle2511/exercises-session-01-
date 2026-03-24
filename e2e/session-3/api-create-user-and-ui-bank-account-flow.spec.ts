import { test } from '../../fixture/fixture'; // Use custom fixtures from auto/fixture
import { expect } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';
import { API_BASE_URL } from '../../playwright.config';

let faker: any;

test.beforeAll(async () => {
  const { faker: fakerModule } = await import('@faker-js/faker');
  faker = fakerModule;
});

test('TC-05: API create user and UI bank account flow', async ({ loginPage, bankAccountsPage, request }) => {
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

  // Authenticate API client as this new user so subsequent
  // bank account API calls run under the correct user
  await api.login(username, password);

  // UI login using fixture LoginPage
  await loginPage.login(username, password);

  // Assert login success
//   const loginSuccess = await loginPage.isLoginSuccess();
//   expect(loginSuccess).toBe(true);
  expect(loginPage.components().userSettings).toBeVisible();


  // Now create a bank account for the user
    await bankAccountsPage.createBankAccount(BANK_NAME, ROUTING_NUMBER, ACCOUNT_NUMBER);
    await bankAccountsPage.gotoBankAccounts()
    const waitTheBankAccountListIsDisplayed = await bankAccountsPage.waitTheBankAccountListIsDisplayed(BANK_NAME);
    expect(waitTheBankAccountListIsDisplayed).toBe(true);
    //await bankAccountsPage.deleteBankAccount(BANK_NAME);
    await bankAccountsPage.deleteBankAccountUsingApi(api, BANK_NAME);
    // expect(await bankAccountsPage.isBankAccountDeleted(BANK_NAME)).toBe(true);
    await expect(await bankAccountsPage.getBankAccountDeleted(BANK_NAME)).toBeVisible();
    
});