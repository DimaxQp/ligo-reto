import type { Page } from '@playwright/test';

export class CheckoutInformationLocators {
  constructor(private readonly page: Page) {}
  get firstName() { return this.page.getByTestId('firstName'); }
  get lastName() { return this.page.getByTestId('lastName'); }
  get postalCode() { return this.page.getByTestId('postalCode'); }
  get continueButton() { return this.page.getByTestId('continue'); }
  get cancel() { return this.page.getByTestId('cancel'); }
  get error() { return this.page.getByTestId('error'); }
}

