// @ts-check
import { test, expect } from '@playwright/test';
import { PageFactory } from '../../business/pageFactory';
import { loginPageTestData } from '../testData/loginPage';
import { credentials } from '../../core/configs';

let loginPage;
let pageFactory;
let playwrightPage;
test.beforeEach('Open login page', async ({ page }) => {
  pageFactory = new PageFactory(page);
  loginPage = await pageFactory.create('loginPage');
  playwrightPage = await loginPage.playwrightFunctions();
  await playwrightPage.open();
});

  test('Verify title', async () => {
    await expect(loginPage.page).toHaveTitle(loginPageTestData.title);
  });

  test('Verify login functionality with valid creds', async () => {
    const dashboardPage = await pageFactory.create('dashboardPage');
    await playwrightPage.fill(loginPage.usernameInput, credentials.username);
    await playwrightPage.fill(loginPage.passwordInput, credentials.password);
    await playwrightPage.click(loginPage.submitButton);
    await expect(dashboardPage.logoIcon).toBeVisible();
    await loginPage.logInfo('Logged in successfully');
  });

  test.describe('login functionality with invalid creds', () => {
    test('Verify login functionality with invalid username', async () => {
      await playwrightPage.fill(loginPage.usernameInput, loginPageTestData.invalidUsername);
      await playwrightPage.fill(loginPage.passwordInput, credentials.password);
      await playwrightPage.click(loginPage.submitButton);
      await playwrightPage.shouldBeVisible(loginPage.errorMessage);
      await loginPage.logInfo('Negative test passed successfully');
    });

    test('Verify login functionality with invalid password', async () => {
      await playwrightPage.fill(loginPage.usernameInput, credentials.username);
      await playwrightPage.fill(loginPage.passwordInput, loginPageTestData.invalidPassword);
      await playwrightPage.click(loginPage.submitButton);
      await playwrightPage.shouldBeVisible(loginPage.errorMessage);
      await loginPage.logInfo('Negative test passed successfully');
    });
  });
