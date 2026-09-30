// Datos ficticios para la aplicación demo. No utilizar tarjetas reales.
export const demoAccount = {
  username: process.env.MOBILE_USERNAME || 'bod@example.com',
  password: process.env.MOBILE_PASSWORD || '10203040',
};
export const shippingAddress = {
  fullName: 'Ana Prueba', address: '123 Demo Street', city: 'Lima',
  state: 'Lima', zip: '15001', country: 'Peru',
};
export const demoPayment = {
  holder: 'Ana Prueba', number: '4111111111111111',
  expiry: '12/' + String(new Date().getFullYear() + 3).slice(-2), security: '123',
};
// Regla esperada de la release: tarifa de envío, independiente del total mostrado.
export const shippingCents = Number(process.env.MOBILE_SHIPPING_CENTS ?? '599');
if (!Number.isSafeInteger(shippingCents) || shippingCents < 0) throw new Error('MOBILE_SHIPPING_CENTS debe ser un entero no negativo');
