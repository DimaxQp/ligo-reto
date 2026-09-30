import type { Page } from '@playwright/test';
import { CartLocators } from '../locators/cart.locators';
import { expect } from '../support/assertions';

export interface ExpectedCartItem { name: string; price: string; quantity: string }

export class CartPage {
  private readonly elements: CartLocators;
  constructor(private readonly page: Page) { this.elements = new CartLocators(page); }
  async remove(slug: string) { await this.elements.removeButton(slug).click(); }
  async startCheckout() { await this.elements.checkout.click(); }
  async expectLoaded() { await expect(this.page).toHaveURL(/\/cart\.html$/); }
  async expectContents(items: ExpectedCartItem[]) {
    await expect(this.elements.badge).toHaveText(String(items.reduce((n, item) => n + Number(item.quantity), 0)));
    await expect(this.elements.names).toHaveText(items.map(item => item.name));
    await expect(this.elements.prices).toHaveText(items.map(item => item.price));
    await expect(this.elements.quantities).toHaveText(items.map(item => item.quantity));
  }
}

