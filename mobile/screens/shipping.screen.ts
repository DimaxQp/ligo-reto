import { browser, expect } from '@wdio/globals';
import { ShippingLocators } from '../locators/shipping.locators.js';
import type { shippingAddress } from '../data/checkout-data.js';
export class ShippingScreen {
  private readonly elements = new ShippingLocators();
  async fill(address: typeof shippingAddress) {
    for (const key of ['fullName', 'address', 'city', 'state', 'zip', 'country'] as const) {
      if (!(await this.elements.get(key).isDisplayed())) await this.elements.reveal(key).waitForDisplayed();
      await this.elements.get(key).setValue(address[key]);
      if (await browser.isKeyboardShown()) await browser.hideKeyboard();
      await expect(this.elements.get(key)).toHaveText(address[key]);
    }
  }
  async continueToPayment() {
    if (!(await this.elements.get('next').isDisplayed())) await this.elements.reveal('next').waitForDisplayed();
    await this.elements.get('next').click();
  }
}
