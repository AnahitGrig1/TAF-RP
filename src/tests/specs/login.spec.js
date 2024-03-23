// @ts-check
import { test, expect } from '@playwright/test';
import { PageFactory } from '../../business/pageFactory';
import { loginPageTestData } from '../testData/loginPage';
import { credentials } from '../../core/configs';

let loginPage;
let pageFactory;
test.beforeEach('Open login page', async ({ page }) => {
    pageFactory = new PageFactory(page);
    loginPage = await pageFactory.create('loginPage');
    await loginPage.open();
});
test('Verify title', async ({ page }) => {
    await expect(loginPage.page).toHaveTitle(loginPageTestData.title);
});
test('Verify login functionality with valid creds', async ({ page }) => {
    const dashboardPage = await pageFactory.create('dashboardPage');
    await loginPage.fill(loginPage.usernameInput, credentials.username);
    await loginPage.fill(loginPage.passwordInput, credentials.password);
    await loginPage.click(loginPage.submitButton);
    // await loginPage.click(loginPage.ghostButton);
    await expect(dashboardPage.logoIcon).toBeVisible();
    await loginPage.log.info('Logged in successfully');
});
