import { BasePage } from './basePage.js';
export class LaunchesPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#anahit_grigoryan1_personal/launches/all';
    this.pageName = 'Launches Page';
    this.launchesButton = page.locator('//div[contains(text(), "All launches")]');
    this.addFilterButton = page.locator('//span[contains(text(),"Add filter")]/parent::button');
  }
}
