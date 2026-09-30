import { World, setWorldConstructor } from '@cucumber/cucumber';
import type { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CatalogPage } from '../pages/catalog.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout-information.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';

import type { SelectedItem } from './pricing';

export class ShopWorld extends World {
  context?: BrowserContext;
  page!: Page;
  login!: LoginPage;
  catalog!: CatalogPage;
  cart!: CartPage;
  checkoutInformation!: CheckoutInformationPage;
  checkoutOverview!: CheckoutOverviewPage;
  checkoutComplete!: CheckoutCompletePage;
  artifactDir!: string;
  stepNumber = 0;
  readonly selectedItems = new Map<string, SelectedItem>();
  selectedItem(key: string): SelectedItem {
    const item = this.selectedItems.get(key);
    if (!item) throw new Error(`Producto no seleccionado: ${key}`);
    return item;
  }
  async initialize(context: BrowserContext) {
    this.context = context;
    this.page = await context.newPage();
    this.login = new LoginPage(this.page);
    this.catalog = new CatalogPage(this.page);
    this.cart = new CartPage(this.page);
    this.checkoutInformation = new CheckoutInformationPage(this.page);
    this.checkoutOverview = new CheckoutOverviewPage(this.page);
    this.checkoutComplete = new CheckoutCompletePage(this.page);
  }
}
setWorldConstructor(ShopWorld);
