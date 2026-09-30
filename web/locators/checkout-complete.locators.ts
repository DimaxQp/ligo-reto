import type { Page } from '@playwright/test';

export class CheckoutCompleteLocators {
  constructor(private readonly page: Page) {}
  get confirmation() { return this.page.getByTestId('complete-header'); }
  get badge() { return this.page.getByTestId('shopping-cart-badge'); }
}

