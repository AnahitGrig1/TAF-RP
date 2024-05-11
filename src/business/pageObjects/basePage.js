import { baseUrl } from '../../core/configs';
import { logger } from '../../core/logger';
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

  async playwrightF () {
    return {
      open: async () => {
        await this.page.goto(`${baseUrl}/${this.pageUrl}`);
      },

      click: async (button) => {
        await button.click();
      },

      fill: async (input, data) => {
        await input.fill(data);
      },

      wait: async (timeout) => {
        await this.page.waitForTimeout(timeout);
      },

      waitFor: async (element, state, timeout) => {
        await element.waitFor(element, { state, timeout });
      }
    }
  }
}
