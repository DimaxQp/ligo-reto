import { browser, expect } from '@wdio/globals';
import { LoginLocators } from '../locators/login.locators.js';
export class LoginScreen {
  private readonly elements = new LoginLocators();
  async signIn(username: string, password: string) {
    await this.expectLoaded();
    await this.elements.username.setValue(username);
    await this.elements.password.setValue(password);
    if (await browser.isKeyboardShown()) await browser.hideKeyboard();
    await this.elements.login.click();
  }
  async expectLoaded() { await expect(this.elements.login).toBeDisplayed(); }
}
