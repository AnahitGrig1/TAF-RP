import { BasePage } from './basePage';
export class LaunchesPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#anahitrp_personal/launches/all';
    this.pageName = 'Launches Page';
    this.launchesButton = '//div[contains(text(), "All launches")]';
    this.addFilterButton = 'div[class*="launchFiltersToolbar__add-filter-button"] button';
    this.demoLaunches = 'td[class*="launchSuiteGrid__name-col"] span[class*="itemInfo__number"]';
    this.launchCheckboxes = 'td [class*="inputCheckbox__input"] div';
    this.actionsButton = '[class*="ghostMenuButton__ghost-menu-button"]';
    this.actions = '[class*="ghostMenuButton__menu"] span';
    this.deleteButton = 'button:contains("Delete")';
    this.startTimeButton = 'span[class*="headerCell__title-short"]:contains("start")';
    this.compareModal = '[class*="modalLayout__modal-window"]';
    this.setLogger();
  }
}
