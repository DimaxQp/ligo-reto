import { CatalogLocators } from '../locators/catalog.locators.js';
export class CatalogScreen {
  private readonly elements = new CatalogLocators();
  async openCart() { await this.elements.cart.click(); }
  async openBackpack() {
    await this.elements.backpack.waitForDisplayed();
    await this.elements.backpack.click();
  }
}
