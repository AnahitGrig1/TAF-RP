import {Then} from '@cucumber/cucumber';

Then('I wait {int} on {page}',
    { timeout: 5000 },
    async (timeout, page) => {
        await page.wait(timeout);
    }
);
