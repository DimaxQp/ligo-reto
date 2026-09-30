import { When, Then, DataTable } from '@cucumber/cucumber';
import { ShopWorld } from '../support/world';
import { product, money } from '../data/shop-data';

When('elimino el producto {string}', async function (this: ShopWorld, key: string) {
  this.selectedItem(key);
  await this.cart.remove(product(key).slug);
  this.selectedItems.delete(key);
});
Then('el carrito contiene:', async function (this: ShopWorld, table: DataTable) {
  await this.cart.expectContents(table.hashes().map(row => ({
    name: product(row.producto).name, price: money(this.selectedItem(row.producto).unitPriceCents), quantity: row.cantidad,
  })));
});
When('inicio el checkout', async function (this: ShopWorld) { await this.cart.startCheckout(); });
Then('regreso al carrito', async function (this: ShopWorld) { await this.cart.expectLoaded(); });

