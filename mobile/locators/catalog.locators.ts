import { $ } from '@wdio/globals';
export class CatalogLocators {
  get cart() { return $('~View cart'); }
  get backpack() {
    return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("Sauce Labs Backpack").fromParent(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productIV"))');
  }
}
