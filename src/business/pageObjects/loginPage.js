import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#login';
    this.pageName = 'Login Page';
    this.usernameInput = '[name="login"]';
    this.passwordInput = '[name="password"]';
    this.submitButton = '[type="submit"]';
    this.errorMessage ='//p[contains(text(), "Bad credentials")]';
    this.setLogger();
  }
}
