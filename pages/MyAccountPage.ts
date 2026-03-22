import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class MyAccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  components() {
    return {
      ...super.components(),
    }
  }

  async gotoMyAccount() {
    await this.page.locator('[data-test="sidenav-user-settings"]').click();
  }

  async updateName(firstName: string, lastName: string) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async getFirstName() {
    return await this.page.locator('[data-test="user-settings-firstName-input"]').inputValue();
  }
}