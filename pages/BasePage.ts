import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  components() {
    return {
      userSettings: this.page.locator('[data-test="sidenav-user-settings"]'),
      home: this.page.locator('[data-test="sidenav-home"]'),
      signInSubmit: this.page.locator('[data-test="signin-submit"]'),
      userOnboardingDialogTitle: this.page.locator('[data-test="user-onboarding-dialog-title"]'),
      userOnboardingNextButton: this.page.locator('[data-test="user-onboarding-next"]'),
      userOnboardingBankNameInput: this.page.getByRole('textbox', { name: 'Bank Name' }),
      userOnboardingRoutingNumberInput: this.page.getByRole('textbox', { name: 'Routing Number' }),
      userOnboardingAccountNumberInput: this.page.getByRole('textbox', { name: 'Account Number' }),
      userOnboardingSubmitButton: this.page.locator('[data-test="bankaccount-submit"]'),
      userFullName: this.page.locator('[data-test="sidenav-user-full-name"]'),
      // Add more shared components as needed
    };
  }

  async goto(url: string) {
    await this.page.goto(url);
  }
}