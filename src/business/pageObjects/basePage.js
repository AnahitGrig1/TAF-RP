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
    await this.page.goto(`${baseUrl}/${this.pageUrl}`, {waitUntil: 'domcontentloaded'});
  }

  async getTitle () {
    return this.page.title();
  }

  async click (button) {
    await button.click();
   await this.page.waitForLoadState();
  }

  async fill (input, data) {
    await input.fill(data);
  }

  async hover (element) {
    await element.hover();
  }

  async wait (timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitFor (element, state) {
    await element.waitFor(element, { state });
  }

  async waitUntil (element, state) {
    await element.waitUntil(element, { state });
  }

  async getColor (element) {
    return element.evaluate((el) => {
      return getComputedStyle(el).getPropertyValue('background-color');

    });
  }
}
