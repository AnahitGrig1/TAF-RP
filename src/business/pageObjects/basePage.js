import { baseUrl } from '../../core/configs.js';
import { logger }  from '../../core/logger.js';
export class BasePage {
  constructor (page, pageUrl, pageName) {
    this.page = page;
    this.pageUrl = pageUrl;
    this.pageName = pageName;
    this.log = null;
  }

   setLogger() {
    this.log = logger(this.pageName);
  }

  async logInfo (text) {
    await this.log.info(text);
  }

  async logErr (text) {
    await this.log.error(text);
  }
  async open () {
    await this.page.goto(`${baseUrl}/${this.pageUrl}`);
  }

  async getTitle () {
    console.log('title===', await this.page.title());
    return this.page.title();
  }

  async click (button) {
    await button.click();
  }

  async fill (input, data) {
    await input.fill(data);
  }

  async wait (timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitFor (element, state) {
    await element.waitFor(element, { state });
  }
}
