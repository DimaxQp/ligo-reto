import { ShippingScreen } from '../screens/shipping.screen.js';
import { PaymentScreen } from '../screens/payment.screen.js';
import { ReviewScreen } from '../screens/review.screen.js';
import { ConfirmationScreen } from '../screens/confirmation.screen.js';
import { demoAccount, shippingAddress, demoPayment, shippingCents } from '../data/checkout-data.js';
import { captureCheckoutStage } from '../support/evidence.js';
import { CatalogScreen } from '../screens/catalog.screen.js';
import { DetailScreen } from '../screens/detail.screen.js';
import { CartScreen } from '../screens/cart.screen.js';
import { LoginScreen } from '../screens/login.screen.js';

describe('Carrito Android', () => {
  const catalog = new CatalogScreen();
  const detail = new DetailScreen();
  const cart = new CartScreen();
  const login = new LoginScreen();
  const shipping = new ShippingScreen();
  const payment = new PaymentScreen();
  const review = new ReviewScreen();
  const confirmation = new ConfirmationScreen();
  const product = 'Sauce Labs Backpack';

  it('MOB-01 @smoke compra completa con pago y confirmacion', async () => {
    await catalog.openBackpack();
    await detail.expectProduct(product);
    const price = await detail.priceCents();
    await detail.increase();
    await detail.expectQuantity(2);
    await detail.add();
    await detail.openCart();
    await cart.expectProduct(product, 2, price);
    await cart.checkout();
    await login.signIn(demoAccount.username, demoAccount.password);
    await shipping.fill(shippingAddress);
    await captureCheckoutStage('01-direccion');
    await shipping.continueToPayment();
    await payment.fill(demoPayment);
    await captureCheckoutStage('02-pago-demo');
    await payment.reviewOrder();
    await review.expectOrder(product, 2, price, shippingCents, shippingAddress, demoPayment);
    await captureCheckoutStage('03-revision');
    await review.placeOrder();
    await confirmation.expectComplete();
    await captureCheckoutStage('04-confirmacion');
    await confirmation.continueShopping();
    await catalog.openCart();
    await cart.expectEmpty();
  });
  it('MOB-02 @regression modificar cantidad recalcula importe', async () => {
    await catalog.openBackpack();
    const price = await detail.priceCents();
    await detail.add();
    await detail.openCart();
    await cart.increase();
    await cart.expectProduct(product, 2, price);
    await cart.decrease();
    await cart.expectProduct(product, 1, price);
  });
  it('MOB-03 @regression eliminar ultimo producto deja carrito vacio', async () => {
    await catalog.openBackpack();
    await detail.add();
    await detail.openCart();
    await cart.remove();
    await cart.expectEmpty();
  });
  it('MOB-04 @regression cantidad cero impide agregar y no se vuelve negativa', async () => {
    await catalog.openBackpack();
    await detail.decrease();
    await detail.expectQuantity(0);
    await detail.expectAddEnabled(false);
    await detail.decrease();
    await detail.expectQuantity(0);
    await detail.increase();
    await detail.expectQuantity(1);
    await detail.expectAddEnabled(true);
  });
});
