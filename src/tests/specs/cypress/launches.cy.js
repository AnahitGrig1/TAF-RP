import {PageFactory} from '../../../business/pageFactory';
import {LaunchesPage} from '../../../business/pageObjects/launches';
import {successfulDeleteMessage} from "../../testData/launchPage";

let cypressPage;
let launchesPage;// = new LaunchesPage();

describe('example to-do app', {
    viewportHeight: 700,
    viewportWidth: 1050,
}, async () => {
    const pageFactory = new PageFactory();
    const loginPage = await pageFactory.create('loginPage');
    const launchesPage = await pageFactory.create('launchesPage');

    beforeEach(() => {
        // cypressPage = loginPage.cypressFunctions();
        loginPage.open();
        loginPage.shouldBeVisible(loginPage.usernameInput);
        loginPage.type(loginPage.usernameInput, Cypress.env('USERNAME'));
        loginPage.shouldBeVisible(loginPage.passwordInput);
        loginPage.type(loginPage.passwordInput, Cypress.env('PASSWORD'));
        loginPage.shouldBeVisible(loginPage.submitButton);
        loginPage.click(loginPage.submitButton);
        cy.end();
        launchesPage.open();
        launchesPage.shouldBeVisible(launchesPage.addFilterButton);
        launchesPage.click(launchesPage.notification);
        launchesPage.shouldBeVisible(launchesPage.launchMenu, 1);
        launchesPage.click(loginPage.launchMenu, 1);
    });

   afterEach(  () => {
       cy.end();
   });

    it('"Add filter" button color change check on hover',  () => {
        launchesPage.shouldHaveCss(launchesPage.addFilterButton, 'background-color', 'rgb(255, 255, 255)');
        launchesPage.hover(launchesPage.addFilterButton);
        launchesPage.shouldHaveCss(launchesPage.addFilterButton, 'background-color', 'rgb(33, 195, 220)');
  });

      it('Verify page scroll',    () => {
          launchesPage.shouldBeVisible(launchesPage.demoLaunches,1);
          launchesPage.scrollToView(launchesPage.demoLaunches, 4);
          launchesPage.shouldBeVisible(launchesPage.demoLaunches,4);
      });

    it('Verify user is able to see launches list sorted by most recent by default',   () => {
        launchesPage.shouldBeVisible(launchesPage.demoLaunches,1);
        launchesPage.shouldBeSortedByIncrease(launchesPage.demoLaunches);
    });

    it('Verify user is able to resort launches',   () => {
        launchesPage.shouldBeVisible(launchesPage.demoLaunches,1);
        launchesPage.click(launchesPage.startTimeButton);
        launchesPage.wait(2000);
        launchesPage.shouldBeSortedByDecrease(launchesPage.demoLaunches);
    });

    it('Verify user is able to compare two launches',   () => {
        launchesPage.shouldBeVisible(launchesPage.launchCheckboxes, 0);
        launchesPage.click(launchesPage.launchCheckboxes, 0);
        launchesPage.click(launchesPage.launchCheckboxes, 1);
        launchesPage.shouldBeVisible(launchesPage.actionsButton);
        launchesPage.click(launchesPage.actionsButton);
        launchesPage.shouldBeVisible(launchesPage.actions,'Compare');
        launchesPage.click(launchesPage.actions, 'Compare');
        launchesPage.shouldBeVisible(launchesPage.compareModal);
    });

    it('Verify user is able to delete launch',   () => {
        launchesPage.shouldBeVisible(launchesPage.launchCheckboxes, 0);
        launchesPage.click(launchesPage.launchCheckboxes, 0);
        launchesPage.shouldBeVisible(launchesPage.actionsButton);
        launchesPage.click(launchesPage.actionsButton);
        launchesPage.shouldBeVisible(launchesPage.actions,'Delete');
        launchesPage.click(launchesPage.actions, 'Delete');
        launchesPage.click(launchesPage.deleteButton);
        launchesPage.shouldBeVisible(launchesPage.notification);
        launchesPage.shouldBeVisible(launchesPage.notification, successfulDeleteMessage);
    });
});
