import type { Page } from '@playwright/test';

export class CartLocators {
  constructor(private readonly page: Page) {}
  get badge() { return this.page.getByTestId('shopping-cart-badge'); }
  get names() { return this.page.getByTestId('inventory-item-name'); }
  get prices() { return this.page.getByTestId('inventory-item-price'); }
  get quantities() { return this.page.getByTestId('item-quantity'); }
  get checkout() { return this.page.getByTestId('checkout'); }
  removeButton(slug: string) { return this.page.getByTestId(`remove-${slug}`); }
}

