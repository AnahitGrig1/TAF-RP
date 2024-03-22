import { baseUrl } from '../../core/configs';
import { logger } from '../../core/logger';
export class BasePage {
  constructor (page, pageUrl, pageName) {
    this.page = page;
    this.pageUrl = pageUrl;
    this.log = logger(pageName);
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
}
