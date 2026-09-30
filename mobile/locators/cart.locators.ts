import { $ } from '@wdio/globals';
export class CartLocators {
  get title() { return $('id=com.saucelabs.mydemoapp.android:id/productTV'); }
  get itemTitle() { return $('id=com.saucelabs.mydemoapp.android:id/titleTV'); }
  get quantity() { return $('id=com.saucelabs.mydemoapp.android:id/noTV'); }
  get count() { return $('id=com.saucelabs.mydemoapp.android:id/itemsTV'); }
  get total() { return $('id=com.saucelabs.mydemoapp.android:id/totalPriceTV'); }
  get increase() { return $('id=com.saucelabs.mydemoapp.android:id/plusIV'); }
  get decrease() { return $('id=com.saucelabs.mydemoapp.android:id/minusIV'); }
  get remove() { return $('~Removes product from cart'); }
  get checkout() { return $('~Confirms products for checkout'); }
  get empty() { return $('id=com.saucelabs.mydemoapp.android:id/noItemTitleTV'); }
}
