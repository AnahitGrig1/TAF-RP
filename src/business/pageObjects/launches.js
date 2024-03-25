import { BasePage } from '../../../../../../../../../src/business/pageObjects/basePage';
export class LaunchesPage extends BasePage {
  constructor (page, pageUrl, pageName = 'Launches Page') {
    super(page, pageUrl, pageName);
    this.pageUrl = 'launches/all';
  }
}
