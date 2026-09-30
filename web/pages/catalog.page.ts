import type { Page } from '@playwright/test';
import { CatalogLocators } from '../locators/catalog.locators';
import { expect } from '../support/assertions';

import { parsePrice } from '../support/pricing';

export class CatalogPage {
  private readonly elements: CatalogLocators;
  constructor(page: Page) { this.elements = new CatalogLocators(page); }
  async add(slug: string): Promise<number> {
    const price = this.elements.price(slug);
    await expect(price).toBeVisible();
    const cents = parsePrice(await price.innerText());
    await this.elements.addButton(slug).click();
    return cents;
  }
  async openCart() { await this.elements.cartLink.click(); }
  async expectLoaded() { await expect(this.elements.inventory).toBeVisible(); }
  async expectNotLoaded() { await expect(this.elements.inventory).toHaveCount(0); }
}

