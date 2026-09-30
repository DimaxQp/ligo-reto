import type { Page } from '@playwright/test';

export class LoginLocators {
  constructor(private readonly page: Page) {}
  get username() { return this.page.getByTestId('username'); }
  get password() { return this.page.getByTestId('password'); }
  get submit() { return this.page.getByTestId('login-button'); }
  get error() { return this.page.getByTestId('error'); }
}

