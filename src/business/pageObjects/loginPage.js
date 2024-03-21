import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor (page, pageUrl, pageName = 'Login Page') {
    super(page, pageUrl, pageName);
    this.usernameInput = page.locator('[name="login"]');
    this.passwordInput = page.locator('[name="password"]');
    this.submitButton = page.locator('//button[contains(text(), "Login")]');
  }
}
