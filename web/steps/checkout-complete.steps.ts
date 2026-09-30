import { Then } from '@cucumber/cucumber';
import { ShopWorld } from '../support/world';
import { messages } from '../data/shop-data';

Then('recibo la confirmación del pedido', async function (this: ShopWorld) {
  await this.checkoutComplete.expectConfirmation(messages.complete);
});
Then('el indicador del carrito desaparece', async function (this: ShopWorld) {
  await this.checkoutComplete.expectEmptyBadge();
});

