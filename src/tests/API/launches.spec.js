import { test, expect } from '@playwright/test';
import {launchFunctions} from '../../core/fixtures/helper';

let uuid_1;
test.describe('Positive cases:', () => {
    test.beforeEach(async () => {
         uuid_1 = (await launchFunctions.createLaunch()).data.id;
    });

    test('Verify that count of all launches filtered by "total = 30" is 1', async () => {
        // await launchFunctions.createLaunch();
        const launchByTotalParam = await launchFunctions.getLaunchByTotalParam(55);
        await expect(launchByTotalParam.status).toBe(200);
    });

    test('Verify that user can stop launch', async () => {
        // const uuid_1 = (await launchFunctions.createLaunch()).data.id;
        const id_1 = (await launchFunctions.getLaunchByUUID(uuid_1)).data.id;
        const stopLaunchResponse = await launchFunctions.stopLaunchProcess(id_1);
        const successfulStopMessage = stopLaunchResponse.data[0].message;
        const expectedMessage = `Launch with ID = '${id_1}' successfully stopped.`;
        await expect(successfulStopMessage).toBe(expectedMessage);
        await expect(stopLaunchResponse.status).toBe(200);
    });

    test('Verify that launch can be deleted by valid id', async () => {
        // const uuid = (await launchFunctions.createLaunch()).data.id
        const id = (await launchFunctions.getLaunchByUUID(uuid_1)).data.id;
        await launchFunctions.stopLaunchProcess(id);
        const deleteResponse = await launchFunctions.deleteLaunchByID(id);
        const deleteMessage = deleteResponse.data.message;
        const expectedMessage = `Launch with ID = '${id}' successfully deleted.`;
        await expect(deleteMessage).toBe(expectedMessage);
    });

    test('Verify that 2 launch can be merged', async () => {
        // const uuid_1 = (await launchFunctions.createLaunch()).data.id;
        const uuid_2 = (await launchFunctions.createLaunch()).data.id;
        const id_1 = (await launchFunctions.getLaunchByUUID(uuid_1)).data.id;
        const id_2 = (await launchFunctions.getLaunchByUUID(uuid_2)).data.id;
        await launchFunctions.stopLaunchProcess(id_1);
        await launchFunctions.stopLaunchProcess(id_2);
        const mergeResponse = await launchFunctions.mergeLaunches(id_1,id_2);
        const mergeDescription = `Merged Launch from ${id_1} and ${id_2}.`;
        await expect(mergeResponse.status).toBe(200);
        await expect(mergeResponse.data.description).toBe(mergeDescription);
    });
});
test.describe('Positive cases:', () => {
    test('Verify that count of all launches filtered by "total = 8" is 0', async () => {
        const launchByTotalParam = await launchFunctions.getLaunchByTotalParam('8');
        const countOfTotal = launchByTotalParam.data.page.totalElements;
        await expect(countOfTotal).toBe(0);
    });

    test('Verify that user will get 404 when deleting launch by invalid id', async () => {
        const deleteResponse = await launchFunctions.deleteLaunchByID('123');
        await expect(deleteResponse.response.status).toBe(404);
    });

    test('Verify that 2 launch cannot be merged when one of them is in process of creation', async () => {
        const uuid_1 = (await launchFunctions.createLaunch()).data.id;
        const uuid_2 = (await launchFunctions.createLaunch()).data.id;
        const id_1 = (await launchFunctions.getLaunchByUUID(uuid_1)).data.id;
        const id_2 = (await launchFunctions.getLaunchByUUID(uuid_2)).data.id;
        await launchFunctions.stopLaunchProcess(id_1);
        const mergeResponse = await launchFunctions.mergeLaunches(id_1, id_2);
        const mergeErrorMessage = `Unable to perform operation for non-finished launch. Cannot merge launch '${id_2}' with status 'IN_PROGRESS'`;
        await expect(mergeResponse.response.status).toBe(406);
        await expect(mergeResponse.response.data.message).toBe(mergeErrorMessage);
    });

    test('Verify that user can not stop already stopped launch', async () => {
        const uuid_1 = (await launchFunctions.createLaunch()).data.id;
        const id_1 = (await launchFunctions.getLaunchByUUID(uuid_1)).data.id;
        await launchFunctions.stopLaunchProcess(id_1);
        const stopLaunchResponse = await launchFunctions.stopLaunchProcess(id_1);
        await expect(stopLaunchResponse.response.status).toBe(406);
    });
});
