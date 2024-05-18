import { BasePage } from './basePage';

export class DashboardPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#dashboards';
    this.pageName = 'Dashboards Page';
  }
}
