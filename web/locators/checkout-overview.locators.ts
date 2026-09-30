import type { Page } from '@playwright/test';

export class CheckoutOverviewLocators {
  constructor(private readonly page: Page) {}
  get names() { return this.page.getByTestId('inventory-item-name'); }
  get prices() { return this.page.getByTestId('inventory-item-price'); }
  get quantities() { return this.page.getByTestId('item-quantity'); }
  get subtotal() { return this.page.getByTestId('subtotal-label'); }
  get tax() { return this.page.getByTestId('tax-label'); }
  get total() { return this.page.getByTestId('total-label'); }
  get finish() { return this.page.getByTestId('finish'); }
}

