import type { Page } from '@playwright/test';
import { CheckoutCompleteLocators } from '../locators/checkout-complete.locators';
import { expect } from '../support/assertions';

export class CheckoutCompletePage {
  private readonly elements: CheckoutCompleteLocators;
  constructor(page: Page) { this.elements = new CheckoutCompleteLocators(page); }
  async expectConfirmation(message: string) { await expect(this.elements.confirmation).toHaveText(message); }
  async expectEmptyBadge() { await expect(this.elements.badge).toHaveCount(0); }
}

