import { BasePage } from './basePage';

export class DashboardPage extends BasePage {
  constructor (page, pageUrl, pageName = 'Dashboard Page') {
    super(page, pageUrl, pageName);
    this.logoIcon = page.locator(
      '//div[contains(@class,"layout__corner-area")]'
    );
  }
}
