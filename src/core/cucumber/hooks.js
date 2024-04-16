import {chromium} from '@playwright/test';
import {After, BeforeAll, AfterAll, Before} from '@cucumber/cucumber';
import {PageFactory} from '../../business/pageFactory.js';
export let loginPage;
export let pageFactory;
export let browser;
export let page;
BeforeAll(async () => {
    browser = await chromium.launch({headless: true});

});
Before(async () => {
    page = await browser.newPage();
    pageFactory = new PageFactory(page);
});

After(async () => {
    await page.close();
});

AfterAll(async () => {
    await page.close();
    await browser.close();
});
