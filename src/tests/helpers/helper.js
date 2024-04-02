import {chromium} from "playwright";
import {PageFactory} from "../../business/pageFactory.js";
import {credentials} from "../../core/configs.js";

export let loginPage;
export let pageFactory;
export let browser;
let page;

export async function initialize() {

    beforeAll(async () => {
        browser = await chromium.launch({headless: false});
    })
    beforeEach(async () => {
        page = await browser.newPage();
        pageFactory = new PageFactory(page);
        loginPage = await pageFactory.create('loginPage');
        await loginPage.open();
    });

    afterEach(async () => {
        await page.close();
    });

    afterAll(async () => {
        await browser.close();
    });
}

export async function performLogin() {
    await loginPage.fill(await loginPage.usernameInput, credentials.username);
    await loginPage.fill(await loginPage.passwordInput, credentials.password);
    await loginPage.click(await loginPage.submitButton);
}
