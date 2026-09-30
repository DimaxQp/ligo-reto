import { browser, expect } from '@wdio/globals';
import { PaymentLocators } from '../locators/payment.locators.js';
import type { demoPayment } from '../data/checkout-data.js';
export class PaymentScreen {
  private readonly elements = new PaymentLocators();
  async fill(payment: typeof demoPayment) {
    for (const key of ['holder', 'number', 'expiry', 'security'] as const) {
      if (!(await this.elements.get(key).isDisplayed())) await this.elements.reveal(key).waitForDisplayed();
      await this.elements.get(key).setValue(payment[key]);
      if (await browser.isKeyboardShown()) await browser.hideKeyboard();
    }
    if (!(await this.elements.get('sameAddress').isDisplayed())) await this.elements.reveal('sameAddress').waitForDisplayed();
    if ((await this.elements.get('sameAddress').getAttribute('checked')) !== 'true') await this.elements.get('sameAddress').click();
    await expect(this.elements.get('sameAddress')).toHaveAttribute('checked', 'true');
  }
  async reviewOrder() {
    if (!(await this.elements.get('next').isDisplayed())) await this.elements.reveal('next').waitForDisplayed();
    await this.elements.get('next').click();
  }
}
