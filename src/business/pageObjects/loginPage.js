import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#login';
    this.pageName = 'Login Page';
     this.usernameInput = '[name="login"]';
     this.passwordInput = '[name="password"]';
    this.submitButton = '//button[contains(text(), "Login")]';
    this.errorMessage = '//p[contains(text(), "Bad credentials")]';
    this.setLogger();
  }
}
