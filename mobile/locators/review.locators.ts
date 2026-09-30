import { $ } from '@wdio/globals';
const ids = {
  "product": "titleTV",
  "price": "priceTV",
  "name": "fullNameTV",
  "address": "addressTV",
  "city": "cityTV",
  "country": "countryTV",
  "holder": "cardHolderTV",
  "number": "cardNumberTV",
  "expiry": "expirationDateTV",
  "shipping": "amountTV",
  "count": "itemNumberTV",
  "total": "totalAmountTV",
  "submit": "paymentBtn"
} as const;
export class ReviewLocators {
  get(key: keyof typeof ids) { return $('id=com.saucelabs.mydemoapp.android:id/' + ids[key]); }
  reveal(key: keyof typeof ids) {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/' + ids[key] + '"))');
  }
}
