import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class BankAccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  components() {  
    return {
      ...super.components(),
      bankItem: this.page.locator('p'),
      // Add any bank account specific components here if needed
    };
  }

  async gotoBankAccounts() {
    await this.page.locator('[data-test="sidenav-bankaccounts"]').click();
  }

  async createBankAccount(name: string, routing: string, account: string) {
    await this.page.locator('[data-test="bankaccount-new"]').click();
    await this.page.getByRole('textbox', { name: 'Bank Name' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Routing Number' }).fill(routing);
    await this.page.getByRole('textbox', { name: 'Account Number' }).fill(account);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async deleteBankAccount(bankName: string) {
    // Find the list item containing the bank name paragraph, then click the Delete button
    // Find the paragraph with the exact bank name, then click the Delete button in the same list item
    // Target the last matching 'Test Bank' paragraph and its sibling Delete button
    const bankParagraph = this.page.getByText(`${bankName} Delete`);
    const deleteButton = bankParagraph.locator('button', { hasText: 'Delete' });
    await deleteButton.click();
  }

  async getBankAccountDeleted(bankName: string) {
    await this.page.waitForLoadState('networkidle');
    let deleteBank = this.page.getByText(`${bankName} (Deleted)`);
    return deleteBank;
  }
}