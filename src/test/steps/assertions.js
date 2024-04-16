import {Then} from '@cucumber/cucumber';
import {expect} from "@playwright/test";
import {currentPage} from "../../core/cucumber/parameterTypes.js";
import {page} from "../../core/cucumber/hooks.js";

Then('{element} should be visible',
    { timeout: 5000 },
    async (element) => {

    await expect(element.isVisible()).toBeTruthy()

    }
);

Then('I should wait until {element} is visible',
    { timeout: 5000 },
    async (element) => {
        await currentPage.waitFor(element, 'visible', 5000);
    }
);

Then('CSS {string} property of {element} should be {string}',
    { timeout: 5000 },
    async (property,element, propValue) => {
        const getProp = await currentPage.getColor(element, property );
        await expect(getProp).toBe(propValue);
    }
);

Then('{element} should have {string} text',
    { timeout: 5000 },
    async (element, expectedText) => {
        let text = await currentPage.getText(await element);

        await expect(text).toBe(expectedText);
    }
);

Then('CSS {string} property of following elements should be {string}:',
    { timeout: 5000 },
    async function (property, propValue, dataTable) {
    for (let { field } of dataTable.hashes()) {
        const getProp = await currentPage.getColor(page.locator(await currentPage[field]), property );
        await expect(getProp).toBe(propValue);
    }
})
