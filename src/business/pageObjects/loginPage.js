import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#login';
    this.pageName = 'Login Page';
    this.usernameInput = page.locator('[name="login"]');
    this.passwordInput = page.locator('[name="password"]');
    this.submitButton = page.locator('//button[contains(text(), "Login")]');
    this.errorMessage = page.locator('//p[contains(text(), "Bad credentials")]');
    this.setLogger();
  }
}
