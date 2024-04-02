import { BasePage } from './basePage.js';

export class DashboardPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#anahit_grigoryan1_personal/dashboard';
    this.pageName = 'Dashboards Page';
    this.logoIcon = page.locator(
      '//div[contains(@class,"layout__corner-area")]'
    );
    this.editIcon = page.locator('//i[contains(@class,"icon__icon-pencil")]');
    this.editPopup = page.locator('//div[contains(@class,"modalLayout__modal-window")]');
    this.editPopupCloseButton = page.locator('//div[contains(@class,"modalHeader__close-modal")]');
  }
}
