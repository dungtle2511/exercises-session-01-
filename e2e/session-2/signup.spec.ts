import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';

const firstName = "test"
const lastName = "test"
const USERNAME = 'test';
const PASSWORD = 'Test@123';

test('Test Case 1: Perform sign up an account', async ({ signUpPage, loginPage }) => {
  await signUpPage.signup(firstName, lastName, USERNAME, PASSWORD);
  await loginPage.login(USERNAME, PASSWORD);
  await expect(loginPage.components().userOnboardingDialogTitle).toBeVisible();
});