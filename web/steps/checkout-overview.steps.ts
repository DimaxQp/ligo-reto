import { When, Then, DataTable } from '@cucumber/cucumber';
import { ShopWorld } from '../support/world';
import { env } from '../config/env';
import { product } from '../data/shop-data';

Then('el resumen contiene los productos:', async function (this: ShopWorld, table: DataTable) {
  await this.checkoutOverview.expectProducts(table.hashes().map(row => product(row.producto).name));
});
Then('los importes del resumen corresponden a los productos seleccionados', async function (this: ShopWorld) {
  await this.checkoutOverview.expectTotals([...this.selectedItems.values()], env.taxBasisPoints);
});
When('confirmo la compra', async function (this: ShopWorld) { await this.checkoutOverview.finish(); });

