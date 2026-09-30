import type { Page } from '@playwright/test';
import { CheckoutOverviewLocators } from '../locators/checkout-overview.locators';
import { expect } from '../support/assertions';

import { calculateTotals, SelectedItem } from '../support/pricing';
import { money } from '../data/shop-data';

export class CheckoutOverviewPage {
  private readonly elements: CheckoutOverviewLocators;
  constructor(page: Page) { this.elements = new CheckoutOverviewLocators(page); }
  async expectProducts(names: string[]) { await expect(this.elements.names).toHaveText(names); }
  async expectTotals(items: SelectedItem[], taxBasisPoints: number) {
    const totals = calculateTotals(items, taxBasisPoints);
    await expect(this.elements.names).toHaveText(items.map(item => item.name));
    await expect(this.elements.prices).toHaveText(items.map(item => money(item.unitPriceCents)));
    await expect(this.elements.quantities).toHaveText(items.map(item => String(item.quantity)));
    await expect(this.elements.subtotal).toHaveText('Item total: ' + money(totals.subtotal));
    await expect(this.elements.tax).toHaveText('Tax: ' + money(totals.tax));
    await expect(this.elements.total).toHaveText('Total: ' + money(totals.total));
  }
  async finish() { await this.elements.finish.click(); }
}

