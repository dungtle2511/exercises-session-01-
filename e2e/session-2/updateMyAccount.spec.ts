import { test } from '../../fixture/fixture';
import { expect } from '@playwright/test';


const USERNAME = 'Heath93';
const PASSWORD = 's3cret';
const timestamp = Date.now();
const NEW_FIRST_NAME = `First${timestamp}`;
const NEW_LAST_NAME = `Last${timestamp}`;

test('Test Case 3: Update first and last name', async ({ loginPage, myAccountPage }) => {
  await loginPage.login(USERNAME, PASSWORD);
  await myAccountPage.gotoMyAccount();
  await myAccountPage.updateName(NEW_FIRST_NAME, NEW_LAST_NAME);
  let newName = NEW_FIRST_NAME + " " + NEW_LAST_NAME.charAt(0);

  await expect(myAccountPage.components().userFullName).toContainText(newName);
});