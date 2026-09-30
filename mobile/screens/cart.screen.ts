import { expect } from '@wdio/globals';
import { CartLocators } from '../locators/cart.locators.js';
export class CartScreen {
  private readonly elements = new CartLocators();
  async expectProduct(name: string, quantity: number, unitPriceCents: number) {
    await expect(this.elements.title).toHaveText('My Cart');
    await expect(this.elements.itemTitle).toHaveText(name);
    await expect(this.elements.quantity).toHaveText(String(quantity));
    await expect(this.elements.count).toHaveText(quantity + ' Items');
    await expect(this.elements.total).toHaveText('$ ' + (unitPriceCents * quantity / 100).toFixed(2));
  }
  async increase() { await this.elements.increase.click(); }
  async decrease() { await this.elements.decrease.click(); }
  async remove() { await this.elements.remove.click(); }
  async checkout() { await this.elements.checkout.click(); }
  async expectEmpty() {
    await expect(this.elements.empty).toHaveText('No Items');
    await expect(this.elements.itemTitle).not.toExist();
  }
}
