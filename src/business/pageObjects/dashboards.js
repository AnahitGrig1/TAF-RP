import { BasePage } from './basePage.js';

export class DashboardPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#dashboards';
    this.pageName = 'Dashboards Page';
    this.logoIcon = page.locator(
      '//div[contains(@class,"layout__corner-area")]'
    );
  }
}
