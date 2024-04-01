import { LoginPage } from './pageObjects/loginPage.js';
import { DashboardPage } from './pageObjects/dashboards.js';
import {LaunchesPage} from './pageObjects/launches.js';

  export class PageFactory {
  constructor (page) {
    this.page = page;
  }

  async create (pageName) {
    switch (pageName) {
      case 'loginPage':
        return new LoginPage(this.page);
      case 'dashboardPage':
        return new DashboardPage(this.page);
      case 'launchesPage':
        return new LaunchesPage(this.page);
      default:
        throw new Error(`No such page: ${pageName}`);
    }
  }
}
