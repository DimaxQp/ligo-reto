import type { Page } from '@playwright/test';
import { LoginLocators } from '../locators/login.locators';
import { expect } from '../support/assertions';

export class LoginPage {
  private readonly elements: LoginLocators;
  constructor(private readonly page: Page) { this.elements = new LoginLocators(page); }
  async open(baseURL: string) { await this.page.goto(baseURL); }
  async login(username: string, password: string) {
    await this.elements.username.fill(username);
    await this.elements.password.fill(password);
    await this.elements.submit.click();
  }
  async expectRejected(message: string, loginURL: string) {
    await expect(this.elements.error).toHaveText(message);
    await expect(this.page).toHaveURL(loginURL);
  }
}

