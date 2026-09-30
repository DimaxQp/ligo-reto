import { expect } from '@wdio/globals';
import { ReviewLocators } from '../locators/review.locators.js';
import type { shippingAddress, demoPayment } from '../data/checkout-data.js';
export class ReviewScreen {
  private readonly elements = new ReviewLocators();
  async expectOrder(product: string, quantity: number, price: number, shipping: number, address: typeof shippingAddress, payment: typeof demoPayment) {
    const checks = {
      product, price: '$ ' + (price / 100).toFixed(2),
      name: address.fullName, address: address.address, city: address.city + ', ' + address.state,
      country: address.country + ', ' + address.zip, holder: payment.holder,
      number: payment.number.replace(/(.{4})(?=.)/g, '$1 '), expiry: 'Exp: ' + payment.expiry,
      shipping: '$' + (shipping / 100).toFixed(2),
      count: quantity + ' Items', total: '$ ' + ((price * quantity + shipping) / 100).toFixed(2),
    };
    for (const key of Object.keys(checks) as (keyof typeof checks)[]) {
      if (!(await this.elements.get(key).isDisplayed())) await this.elements.reveal(key).waitForDisplayed();
      await expect(this.elements.get(key)).toHaveText(checks[key]);
    }
  }
  async placeOrder() {
    if (!(await this.elements.get('submit').isDisplayed())) await this.elements.reveal('submit').waitForDisplayed();
    await this.elements.get('submit').click();
  }
}
