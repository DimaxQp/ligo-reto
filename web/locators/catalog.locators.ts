import type { Page } from '@playwright/test';

export class CatalogLocators {
  constructor(private readonly page: Page) {}
  get inventory() { return this.page.getByTestId('inventory-container'); }
  get cartLink() { return this.page.getByTestId('shopping-cart-link'); }
  price(slug: string) {
    return this.page.getByTestId('inventory-item').filter({ has: this.addButton(slug) }).getByTestId('inventory-item-price');
  }
  addButton(slug: string) { return this.page.getByTestId(`add-to-cart-${slug}`); }
}

