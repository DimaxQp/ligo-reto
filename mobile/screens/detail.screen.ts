import { expect } from '@wdio/globals';
import { DetailLocators } from '../locators/detail.locators.js';
export class DetailScreen {
  private readonly elements = new DetailLocators();
  private async ensureControlsVisible() {
    if (!(await this.elements.add.isDisplayed())) await this.elements.scrollToAdd.waitForDisplayed();
  }
  async priceCents() {
    await this.ensureControlsVisible();
    await this.elements.price.waitForDisplayed();
    const text = await this.elements.price.getText();
    const match = /^\$\s*(\d+)\.(\d{2})$/.exec(text.trim());
    if (!match) throw new Error('Precio USD inesperado: ' + text);
    return Number(match[1]) * 100 + Number(match[2]);
  }
  async expectProduct(name: string) { await expect(this.elements.title).toHaveText(name); }
  async expectQuantity(quantity: number) { await expect(this.elements.quantity).toHaveText(String(quantity)); }
  async expectAddEnabled(enabled: boolean) {
    if (enabled) await expect(this.elements.add).toBeEnabled();
    else await expect(this.elements.add).not.toBeEnabled();
  }
  async increase() { await this.ensureControlsVisible(); await this.elements.increase.click(); }
  async decrease() { await this.ensureControlsVisible(); await this.elements.decrease.click(); }
  async add() { await this.ensureControlsVisible(); await this.elements.add.click(); }
  async openCart() { await this.elements.cart.click(); }
}
