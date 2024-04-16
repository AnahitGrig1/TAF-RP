import { BasePage } from './basePage.js';
export class LaunchesPage extends BasePage {
  constructor (page) {
    super(page);
    this.pageUrl = 'ui/#anahit_grigoryan1_personal/launches/all';
    this.pageName = 'Launches Page';
    this.launchesButton = '//div[contains(text(), "All launches")]';
    this.addFilterButton = '//span[contains(text(),"Add filter")]/parent::button';
    this.nameField = '//span[contains(text(), "name") and contains(@class, "headerCell__title-short")]';
    this.startTimeField = '//span[contains(text(), "start") and contains(@class, "headerCell__title-short")]';
    this.totalField = '//span[contains(text(), "ttl") and contains(@class, "headerCell__title-short")]';
    this.skippedField = '//span[contains(text(), "skp") and contains(@class, "headerCell__title-short")]';
    this.passedField = '//span[contains(text(), "ps") and contains(@class, "headerCell__title-short")]';
    this.failedField = '//span[contains(text(), "fl") and contains(@class, "headerCell__title-short")]';
    this.productBugField = '//span[contains(text(), "product bug") and contains(@class, "headerCell__title-short")]';
    this.autoBugField = '//span[contains(text(), "auto bug") and contains(@class, "headerCell__title-short")]';
    this.systemIssueField = '//span[contains(text(), "system issue") and contains(@class, "headerCell__title-short")]';
    this.toInvestigateField = '//span[contains(text(), "to invest") and contains(@class, "headerCell__title-short")]';
    this.demo_launch = (index) => `(//div[contains(@class, "gridRow__grid-row-wrapper")])[${index}]`;
    this.demo_total = (index) => `(//div[contains(@class, "launchSuiteGrid__total-col")]//a)[${index}]`;
    this.demo_passed = (index) => `(//div[contains(@class, "launchSuiteGrid__passed-col")]//a)[${index}]`;
  }

}
