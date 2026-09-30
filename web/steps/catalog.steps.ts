import { When, DataTable } from '@cucumber/cucumber';
import { ShopWorld } from '../support/world';
import { product } from '../data/shop-data';

async function addProduct(world: ShopWorld, key: string) {
  const selected = product(key);
  if (world.selectedItems.has(key)) throw new Error(`Producto ya seleccionado: ${key}`);
  const unitPriceCents = await world.catalog.add(selected.slug);
  world.selectedItems.set(key, { name: selected.name, unitPriceCents, quantity: 1 });
}

When('agrego el producto {string}', async function (this: ShopWorld, key: string) {
  await addProduct(this, key);
});
When('agrego los productos:', async function (this: ShopWorld, table: DataTable) {
  for (const row of table.hashes()) await addProduct(this, row.producto);
});
When('abro el carrito', async function (this: ShopWorld) { await this.catalog.openCart(); });

