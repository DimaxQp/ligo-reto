import { When, Then } from '@cucumber/cucumber';
import { ShopWorld } from '../support/world';
import { messages, validCustomer } from '../data/shop-data';

When('envío los datos válidos de entrega', async function (this: ShopWorld) {
  await this.checkoutInformation.submit(validCustomer);
});
When('envío los datos de entrega sin {string}', async function (this: ShopWorld, field: string) {
  if (!Object.hasOwn(validCustomer, field)) throw new Error('Campo no definido: ' + field);
  await this.checkoutInformation.submit({ ...validCustomer, [field]: '' });
});
Then('veo el error de campo obligatorio {string}', async function (this: ShopWorld, field: string) {
  if (!['firstName', 'lastName', 'postalCode'].includes(field)) throw new Error('Campo desconocido');
  await this.checkoutInformation.expectError(messages[field as keyof typeof validCustomer]);
});
Then('permanezco en el formulario de entrega', async function (this: ShopWorld) {
  await this.checkoutInformation.expectLoaded();
});
When('cancelo el checkout', async function (this: ShopWorld) { await this.checkoutInformation.cancel(); });

