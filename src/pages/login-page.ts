import { Page, Locator } from '@playwright/test';
import { env } from '../utils/env-config';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(env.SAUCE_URL);
  }

  async login(username: string, password: string) {
    console.log(`Logging in with username: "${username}", password: "${password}"`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    const message = await this.errorMessage.textContent() || '';
    console.log(`Error message displayed: "${message}"`);
    return message;
  }
}