// Fixtures de negocio, no configuración del equipo.
export const products = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  bikeLight: { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
} as const;
export type ProductKey = keyof typeof products;
export function product(key: string) {
  if (!Object.prototype.hasOwnProperty.call(products, key)) throw new Error(`Producto desconocido: ${key}`);
  return products[key as ProductKey];
}
export const validCustomer = { firstName: 'Ana', lastName: 'Prueba', postalCode: '15001' };
export const invalidPassword = 'wrong-password-for-negative-test';
export const messages = {
  locked: 'Epic sadface: Sorry, this user has been locked out.',
  invalid: 'Epic sadface: Username and password do not match any user in this service',
  firstName: 'Error: First Name is required',
  lastName: 'Error: Last Name is required',
  postalCode: 'Error: Postal Code is required',
  complete: 'Thank you for your order!',
} as const;
export const money = (cents: number) => '$' + (cents / 100).toFixed(2);

