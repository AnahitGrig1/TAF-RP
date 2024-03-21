import { LoginPage } from './pageObjects/loginPage';
import { DashboardPage } from './pageObjects/dashboards';

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
      default:
        throw new Error(`No such page: ${pageName}`);
    }
  }
}
