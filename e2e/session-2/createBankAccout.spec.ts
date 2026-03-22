import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';

const USERNAME = 'Heath93';
const PASSWORD = 's3cret';
const BANK_NAME = `Bank_${Math.random().toString(36).substring(2, 10)}`;
const ROUTING_NUMBER = `${Math.floor(100000000 + Math.random() * 900000000)}`;
const ACCOUNT_NUMBER = `${Math.floor(100000000 + Math.random() * 900000000)}`;

test('Test Case 02: Create and delete bank account using fixture', async ({ loginPage, bankAccountsPage, page }) => {
  await loginPage.login(USERNAME, PASSWORD);
  await bankAccountsPage.gotoBankAccounts();
  await bankAccountsPage.createBankAccount(BANK_NAME, ROUTING_NUMBER, ACCOUNT_NUMBER);
  const bankParagraph = bankAccountsPage.components().bankItem.filter({ hasText: BANK_NAME }).first();
  await expect(bankParagraph).toBeVisible();
  await bankAccountsPage.deleteBankAccount(BANK_NAME);
  await expect(await bankAccountsPage.getBankAccountDeleted(BANK_NAME)).toBeVisible();
});