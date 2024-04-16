import {Given, When, DataTable } from '@cucumber/cucumber';
import {currentPage} from '../../core/cucumber/parameterTypes.js';

Given(
    'I navigate to {page}',
    { timeout: 5000 },
    async (page) => {
        await page.open();
    }
);

Given(
    'I am on {page}',
    { timeout: 5000 },
    async (page) => {
        await page.setLogger();
       await page.logInfo(currentPage.pageName);
    }
);

When('I fill {element} {property} text',
    { timeout: 5000 },
    async (element, text) => {

        await currentPage.fill(element, text);
    }
);

When('I click on {element}',
    { timeout: 5000 },
    async (element) => {
        await currentPage.click(element);
    }
)

When('I hover over {element}',
    { timeout: 5000 },
    async (element) => {
        await currentPage.hover(element);
        // await page.wait(2000);
    }
)
