import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUp';
import { MyAccountPage } from '../pages/MyAccountPage';
import { BankAccountsPage } from '../pages/BankAccountPage';

type Fixtures = {
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  bankAccountsPage: BankAccountsPage;
  myAccountPage: MyAccountPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    // Setup logic
    console.log('Setting up LoginPage fixture');
    await use(new LoginPage(page));
    // Teardown logic
    console.log('Tearing down LoginPage fixture');
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  bankAccountsPage: async ({ page }, use) => {
    await use(new BankAccountsPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
});