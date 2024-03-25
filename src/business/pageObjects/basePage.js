import { baseUrl } from '../../core/configs';
import { logger } from '../../core/logger';
export class BasePage {
  constructor (page, pageUrl, pageName) {
    this.page = page;
    this.pageUrl = pageUrl;
    this.pageName = pageName;
     this.log = logger(pageName);
  }
  async logInfo (text) {
    await this.log.info(text);
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
}
