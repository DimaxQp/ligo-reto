import { $ } from '@wdio/globals';
const ids = {
  "title": "completeTV",
  "thanks": "thankYouTV",
  "message": "orderTV",
  "continue": "shoopingBt"
} as const;
export class ConfirmationLocators {
  get(key: keyof typeof ids) { return $('id=com.saucelabs.mydemoapp.android:id/' + ids[key]); }
  reveal(key: keyof typeof ids) {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/' + ids[key] + '"))');
  }
}
