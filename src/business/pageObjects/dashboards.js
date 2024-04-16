import { BasePage } from './basePage.js';

export class DashboardPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#anahit_grigoryan1_personal/dashboard';
    this.pageName = 'Dashboards Page';
    this.logoIcon =
        '//div[contains(@class,"layout__corner-area")]';
    this.editIcon = '//i[contains(@class,"icon__icon-pencil")]';
    this.editPopup = '//div[contains(@class,"modalLayout__modal-window")]';
    this.editPopupCloseButton = '//div[contains(@class,"modalHeader__close-modal")]';
  }
}
