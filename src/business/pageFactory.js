import { LoginPage } from './pageObjects/loginPage.js';
import { DashboardPage } from './pageObjects/dashboards.js';
import {LaunchesPage} from './pageObjects/launches.js';

export class PageFactory {
  constructor (page) {
    this.page = page;
  }

  async create (pageName) {
    switch (pageName) {
      case 'Login page':
        return new LoginPage(this.page);
      case 'Dashboard page':
        return new DashboardPage(this.page);
      case 'Launches page':
        return new LaunchesPage(this.page);
      default:
        throw new Error(`No such page: ${pageName}`);
    }
  }
}
