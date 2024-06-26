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

  test('Verify title', async () => {
    await expect(loginPage.page).toHaveTitle(loginPageTestData.title);
  });

  test('Verify login functionality with valid creds', async () => {
    const dashboardPage = await pageFactory.create('dashboardPage');
    await loginPage.fill(loginPage.usernameInput, credentials.username);
    await loginPage.fill(loginPage.passwordInput, credentials.password);
    await loginPage.click(loginPage.submitButton);
    await expect(dashboardPage.logoIcon).toBeVisible();
    await loginPage.logInfo('Logged in successfully');
  });

  test.describe('login functionality with invalid creds', () => {
    test('Verify login functionality with invalid username', async () => {
      await loginPage.fill(loginPage.usernameInput, loginPageTestData.invalidUsername);
      await loginPage.fill(loginPage.passwordInput, credentials.password);
      await loginPage.click(loginPage.submitButton);
      await expect(loginPage.errorMessage).toBeVisible();
      await loginPage.logInfo('Negative test passed successfully');
    });

    test('Verify login functionality with invalid password', async () => {
      await loginPage.fill(loginPage.usernameInput, credentials.username);
      await loginPage.fill(loginPage.passwordInput, loginPageTestData.invalidPassword);
      await loginPage.click(loginPage.submitButton);
      await expect(loginPage.errorMessage).toBeVisible();
      await loginPage.logInfo('Negative test passed successfully');
    });
  });
