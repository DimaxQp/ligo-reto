import { $ } from '@wdio/globals';
export class DetailLocators {
  get scrollToAdd() { return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartBt"))'); }
  get title() { return $('id=com.saucelabs.mydemoapp.android:id/productTV'); }
  get price() { return $('id=com.saucelabs.mydemoapp.android:id/priceTV'); }
  get quantity() { return $('id=com.saucelabs.mydemoapp.android:id/noTV'); }
  get increase() { return $('id=com.saucelabs.mydemoapp.android:id/plusIV'); }
  get decrease() { return $('id=com.saucelabs.mydemoapp.android:id/minusIV'); }
  get add() { return $('~Tap to add product to cart'); }
  get cart() { return $('~View cart'); }
}
