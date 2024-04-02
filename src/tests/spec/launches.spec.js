import {
    initialize,
    pageFactory,
    performLogin
} from '../helpers/helper.js';

describe('Verify launches page:',   () => {
    initialize();
    it('Header check', async () => {
        await performLogin();
        const launchesPage = await pageFactory.create('launchesPage');
        await launchesPage.open();
       await expect(launchesPage.launchesButton.isVisible).toBeTruthy();
    });

    it('Add filter button color change check on hover', async () => {
        await performLogin();
        const launchesPage = await pageFactory.create('launchesPage');
        await launchesPage.open();
        await expect(launchesPage.addFilterButton.isVisible).toBeTruthy();
        await expect(await launchesPage.getColor(launchesPage.addFilterButton)).toBe('rgb(255, 255, 255)');
        await launchesPage.hover(launchesPage.addFilterButton);
        await expect(await launchesPage.getColor(launchesPage.addFilterButton)).toBe('rgb(33, 195, 220)');
    });
});
