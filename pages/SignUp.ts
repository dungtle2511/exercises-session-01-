import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';

export class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  components() {
    return {
      ...super.components(),
      firstNameInput: this.page.getByRole('textbox', { name: 'First Name' }),
      lastNameInput: this.page.getByRole('textbox', { name: 'Last Name' }),
      usernameInput: this.page.getByRole('textbox', { name: 'Username' }),
      passwordInput: this.page.getByRole('textbox', { name: 'Password' , exact: true }),
      confirmPasswordInput: this.page.getByRole('textbox', { name: 'Confirm Password' }),
      signUpButton: this.page.locator('[data-test="signup-submit"]'),
    }
  }

  async signup(firstName: string, lastName: string, username: string, password: string) {
    await this.goto('http://localhost:3000/signup');
    await this.components().firstNameInput.fill(firstName);
    await this.components().lastNameInput.fill(lastName);
    await this.components().usernameInput.fill(username);
    await this.components().passwordInput.fill(password);
    await this.components().confirmPasswordInput.fill(password);
    await this.components().signUpButton.click();
  }

}