import { $ } from '@wdio/globals';
const ids = {
  "holder": "nameET",
  "number": "cardNumberET",
  "expiry": "expirationDateET",
  "security": "securityCodeET",
  "sameAddress": "billingAddressCB",
  "next": "paymentBtn"
} as const;
export class PaymentLocators {
  get(key: keyof typeof ids) { return $('id=com.saucelabs.mydemoapp.android:id/' + ids[key]); }
  reveal(key: keyof typeof ids) {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/' + ids[key] + '"))');
  }
}
