import { baseUrl } from '../../core/configs';
import 'cypress-real-events/support';
import { logger } from '../../core/logger';

export class BasePage {
  constructor(page, pageUrl, pageName) {
    this.page = page;
    this.pageUrl = pageUrl;
    this.pageName = pageName;
    this.log = null;
    this.launchMenu = 'a[class*="sidebarButton__nav-link"]';
    this.notification = '[data-automation-id="notificationsContainer"] p';
    this.CYElement = (locator, indexOrText) => {
      let element = cy.get(locator);
      if (typeof indexOrText === 'number') {
        element = element.eq(indexOrText);
      }
      if (typeof indexOrText === 'string') {
        element = element.contains(indexOrText);
      }
      return element;
    };
  }

   setLogger() {
    this.log = logger(this.pageName);
  }

   logInfo(text) {
     this.log.info(text);
  }

   logErr(text) {
     this.log.error(text);
  }

  open() {
    cy.visit(`${baseUrl}/${this.pageUrl}`);
  }

  click(buttonLocator, indexOrText)  {
    this.CYElement(buttonLocator, indexOrText).click();
  }

  type(inputLocator, data)  {
    this.CYElement(inputLocator).type(data);
  }

  scrollToView(locator, indexOrText)  {
    this.CYElement(locator, indexOrText).scrollIntoView();
  }

  hover(locator) {
    this.CYElement(locator).realHover();
  }

  wait(timeout) {
    cy.wait(timeout);
  }

  shouldBeVisible(locator, indexOrText) {
    this.CYElement(locator, indexOrText).should('be.visible');
  }

  shouldHaveCss(locator, cssProperty, value) {
    this.CYElement(locator).should('have.css', cssProperty, value);
  }

  shouldBeSortedByIncrease(locator) {
   this.CYElement(locator).then($elements => {
      const original = $elements.toArray().map(el => el.innerText);
      const sorted = [...original].sort((a, b) => b.localeCompare(a));
      expect(original).to.deep.equal(sorted);
    });
  }

  shouldBeSortedByDecrease(locator) {
    this.CYElement(locator).then($elements => {
      const original = $elements.toArray().map(el => el.innerText);
      const sorted = [...original].sort((a, b) => a.localeCompare(b));
      expect(original).to.deep.equal(sorted);
    });
  }

}
