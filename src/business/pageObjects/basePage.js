import { baseUrl } from '../../core/configs.js';
import { logger } from '../../core/logger.js';

export class BasePage {
  constructor (page, pageUrl, pageName) {
    this.page = page;
    this.pageUrl = pageUrl;
    this.pageName = pageName;
    this.log = null;
    this.launchesFromMenu = '//span[contains(text(), "Launches")]//ancestor::a';
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

  async click (button) {
    await button.click();
  }

  async fill (input, data) {
    await input.fill(data);
  }

  async wait (timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitFor (element, state, timeout) {
    await element.waitFor(element, { state, timeout });
  }

  async getColor (element, propName) {
    return element.evaluate((el, propName) => {
      return getComputedStyle(el).getPropertyValue(propName);
    }, propName);
  }

  async getText (element) {
    return element.textContent();
  }

  async hover (element) {
    await element.hover();
  }
}

