import { BasePage } from './basePage';
export class LaunchesPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'launches/all';
    this.pageName = 'Launches Page';
  }
}
