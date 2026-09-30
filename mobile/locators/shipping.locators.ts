import { $ } from '@wdio/globals';
const ids = {
  "fullName": "fullNameET",
  "address": "address1ET",
  "city": "cityET",
  "state": "stateET",
  "zip": "zipET",
  "country": "countryET",
  "next": "paymentBtn"
} as const;
export class ShippingLocators {
  get(key: keyof typeof ids) { return $('id=com.saucelabs.mydemoapp.android:id/' + ids[key]); }
  reveal(key: keyof typeof ids) {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/' + ids[key] + '"))');
  }
}
