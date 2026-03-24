import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

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

  async waitTheBankAccountListIsDisplayed(bankName: string): Promise<boolean> {
    const bankParagraph = this.page.locator('p').filter({ hasText: bankName }).first();
    try {
      await bankParagraph.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async deleteBankAccountUsingApi(api: ApiUtils, bankName: string) {
    const ok = await api.deleteBankAccountByName(bankName);
    if (!ok) {
      throw new Error(`Failed to delete bank account "${bankName}" via API`);
    }
    await this.page.reload();
  }

  async expectNoBankAccountsHeadingVisible() {
    await this.page.getByRole('heading', { name: 'No Bank Accounts' }).waitFor({ state: 'visible' });
  }
}