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
      userFullName: this.page.locator('[data-test="sidenav-user-full-name"]'),
      // Add more shared components as needed
    };
  }

  async goto(url: string) {
    await this.page.goto(url);
  }
}