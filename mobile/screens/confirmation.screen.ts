import { expect } from '@wdio/globals';
import { ConfirmationLocators } from '../locators/confirmation.locators.js';
export class ConfirmationScreen {
  private readonly elements = new ConfirmationLocators();
  async expectComplete() {
    await expect(this.elements.get('title')).toHaveText('Checkout Complete');
    await expect(this.elements.get('thanks')).toHaveText('Thank you for your order');
    await expect(this.elements.get('message')).toHaveText('Your order has been dispatched and will arrive as fast as the pony gallops!');
  }
  async continueShopping() { await this.elements.get('continue').click(); }
}
