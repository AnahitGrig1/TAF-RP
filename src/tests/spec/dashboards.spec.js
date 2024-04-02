// @ts-check
import {
    pageFactory,
    performLogin,
    initialize,
} from '../helpers/helper.js';

describe('Verify dashboard page:',  () => {
    initialize();

    it('Header check', async () => {
        await performLogin();
        const dashboardPage = await pageFactory.create('dashboardPage');
        await dashboardPage.open();
        await expect(dashboardPage.logoIcon.isVisible).toBeTruthy();
    });

    it('Close button functionality check of edit popup ', async () => {
        await performLogin();
        const dashboardPage = await pageFactory.create('dashboardPage');
        await dashboardPage.open();
        await expect(dashboardPage.editIcon.isVisible).toBeTruthy();
        await dashboardPage.click(dashboardPage.editIcon);
        await expect(dashboardPage.editPopup.isVisible).toBeTruthy();
        await dashboardPage.click(dashboardPage.editPopupCloseButton);
        await expect(dashboardPage.editPopup.isHidden).toBeTruthy();
    });
});

