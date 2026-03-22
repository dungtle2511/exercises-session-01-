import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  components() {
    return {
      ...super.components(),
      usernameInput: this.page.getByRole('textbox', { name: 'Username' }),
      passwordInput: this.page.getByRole('textbox', { name: 'Password' }),
      signInButton: this.page.locator('[data-test="signin-submit"]'),
      signUpLink: this.page.locator('[data-test="signup"]'),
    }
  }

  async login(username: string, password: string) {
    await this.goto('http://localhost:3000/signin');
    await this.components().usernameInput.fill(username);
    await this.components().passwordInput.fill(password);
    await this.components().signInButton.click();
  }

  async clickSignUpLink() {
    await this.components().signUpLink.click();
  }
}