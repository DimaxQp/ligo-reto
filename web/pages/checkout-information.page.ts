import type { Page } from '@playwright/test';
import { CheckoutInformationLocators } from '../locators/checkout-information.locators';
import { expect } from '../support/assertions';

export interface Customer { firstName: string; lastName: string; postalCode: string }

export class CheckoutInformationPage {
  private readonly elements: CheckoutInformationLocators;
  constructor(private readonly page: Page) { this.elements = new CheckoutInformationLocators(page); }
  async submit(customer: Customer) {
    await this.elements.firstName.fill(customer.firstName);
    await this.elements.lastName.fill(customer.lastName);
    await this.elements.postalCode.fill(customer.postalCode);
    await this.elements.continueButton.click();
  }
  async cancel() { await this.elements.cancel.click(); }
  async expectError(message: string) { await expect(this.elements.error).toHaveText(message); }
  async expectLoaded() { await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/); }
}

