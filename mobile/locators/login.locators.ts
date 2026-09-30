import { $ } from '@wdio/globals';
export class LoginLocators {
  get username() { return $('id=com.saucelabs.mydemoapp.android:id/nameET'); }
  get password() { return $('id=com.saucelabs.mydemoapp.android:id/passwordET'); }
  get login() { return $('id=com.saucelabs.mydemoapp.android:id/loginBtn'); }
}
