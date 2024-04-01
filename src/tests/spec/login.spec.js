// @ts-check
// import {test} from '@playwright/test';
import {chromium} from 'playwright';
import { PageFactory } from '../../business/pageFactory.js';
import { loginPageTestData } from '../testData/loginPage.js';
import { credentials } from '../../core/configs.js';

let loginPage;
let pageFactory;
let browser;
describe('Verify Login page',  () => {

    beforeEach( async () => {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        pageFactory = new PageFactory(page);
        loginPage = await pageFactory.create('loginPage');
        await loginPage.open();
    });
    it('Verify title', async () => {
        expect(await loginPage.getTitle()).toBe(loginPageTestData.title);
    });

    it('Verify login functionality with valid creds', async () => {
      const dashboardPage = await pageFactory.create('dashboardPage');
        await expect(loginPage.usernameInput.isVisible).toBeTrue();
        await expect(loginPage.passwordInput.isVisible).toBeTrue();
      await loginPage.fill(loginPage.usernameInput, credentials.username);
      await loginPage.fill(loginPage.passwordInput, credentials.password);
      await loginPage.click(loginPage.submitButton);
      await expect(dashboardPage.logoIcon.isVisible).toBeTruthy();
      await loginPage.logInfo('Logged in successfully');
    });

      it('Verify login functionality with invalid username', async () => {
        await loginPage.fill(loginPage.usernameInput, loginPageTestData.invalidUsername);
        await loginPage.fill(loginPage.passwordInput, credentials.password);
        await loginPage.click(loginPage.submitButton);
        await expect(loginPage.errorMessage.isVisible).toBeTruthy();
        await loginPage.logInfo('Negative test passed successfully');
      });

      it('Verify login functionality with invalid password', async () => {
        await loginPage.fill(loginPage.usernameInput, credentials.username);
        await loginPage.fill(loginPage.passwordInput, loginPageTestData.invalidPassword);
        await loginPage.click(loginPage.submitButton);
        await expect(loginPage.errorMessage.isVisible).toBeTruthy();
        await loginPage.logInfo('Negative test passed successfully');
      });
});
