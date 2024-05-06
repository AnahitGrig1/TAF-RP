import {expect, test} from '@playwright/test';
import {tryCatchWrapper} from '../../core/fixtures/helper';
import {launchEndpoints} from '../../core/fixtures/endpoints';
import {createPayload, mergePayload, stopPayload} from '../../core/fixtures/payloads';

let uuid_1;
test.describe('Positive cases:', () => {
    test.beforeEach(async ({request}) => {
    const uuidResp_1 = await tryCatchWrapper(await request.post(launchEndpoints.postLaunch, {data: createPayload}));
        uuid_1 = (await uuidResp_1.json()).id;
    });

    test('Verify that user can filter launches by "total"', async ({request}) => {
        const launchByTotalParam = await tryCatchWrapper(await request.get(launchEndpoints.filterByTotal(55)));
        await expect(launchByTotalParam.ok).toBeTruthy();
    });

    test('Verify that launch can be deleted by valid id', async ({request}) => {
        const idResp = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_1)));
        const id = (await idResp.json()).id;
        await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id)}));
        const deleteResponse = await tryCatchWrapper(await request.delete(launchEndpoints.deleteById(id)));
        const deleteMessage = (await deleteResponse.json()).message;
        const expectedMessage = `Launch with ID = '${id}' successfully deleted.`;
        await expect(deleteMessage).toBe(expectedMessage);
    });

    test('Verify that 2 launch can be merged', async ({request}) => {
        const uuidResp_2 = await tryCatchWrapper(await request.post(launchEndpoints.postLaunch, {data: createPayload}));
        const uuid_2 = (await uuidResp_2.json()).id;
        const idResp_1 = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_1)));
        const idResp_2 = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_2)));
        const id_1 = (await idResp_1.json()).id;
        const id_2 = (await idResp_2.json()).id;
        await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id_1)}));
        await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id_2)}));
        const mergeResponse = await tryCatchWrapper(await request.post(launchEndpoints.mergeLaunch, {data: mergePayload(id_1,id_2 )}));
        const mergeDescription = `Merged Launch from ${id_1} and ${id_2}.`;
        await expect(await mergeResponse.ok()).toBeTruthy();
        await expect((await mergeResponse.json()).description).toBe(mergeDescription);
    });

    test('Verify that user can stop launch', async ({request}) => {
        const idResp_1 = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_1)));
        const id_1 = (await idResp_1.json()).id;
        const stopLaunchResponse = await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id_1)}));
        const successfulStopMessage = (await stopLaunchResponse.json())[0].message;
        const expectedMessage = `Launch with ID = '${id_1}' successfully stopped.`;
        await expect(successfulStopMessage).toBe(expectedMessage);
        await expect(await stopLaunchResponse.ok()).toBeTruthy();
    });
});

test.describe('Negative  cases:', () => {

    test('Verify that count of all launches filtered by "total = 8" is 0', async ({request}) => {
        const launchByTotalParam = await tryCatchWrapper(await request.get(launchEndpoints.filterByTotal(8)));
        const countOfTotal = (await launchByTotalParam.json()).page.totalElements;
        await expect(countOfTotal).toBe(0);
    });

    test('Verify that user will get 404 when deleting launch by invalid id', async ({request}) => {
        const deleteResponse = await tryCatchWrapper(await request.delete(launchEndpoints.deleteById('123')));
        await expect(await deleteResponse.ok()).toBeFalsy();
    });

    test('Verify that 2 launch cannot be merged when one of them is in process of creation', async ({request}) => {
        const uuidResp_1 = await tryCatchWrapper(await request.post(launchEndpoints.postLaunch, {data: createPayload}));
        const uuidResp_2 = await tryCatchWrapper(await request.post(launchEndpoints.postLaunch, {data: createPayload}));
        const uuid_1 = (await uuidResp_1.json()).id;
        const uuid_2 = (await uuidResp_2.json()).id;
        const idResp_1 = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_1),));
        const idResp_2 = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_2),));
        const id_1 = (await idResp_1.json()).id;
        const id_2 = (await idResp_2.json()).id;
        await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id_1)}));
        const mergeResponse = await tryCatchWrapper(await request.post(launchEndpoints.mergeLaunch, {data: mergePayload(id_1, id_2)}));
        const mergeErrorMessage = `Unable to perform operation for non-finished launch. Cannot merge launch '${id_2}' with status 'IN_PROGRESS'`;
        await expect(await mergeResponse.ok()).toBeFalsy();
        await expect((await mergeResponse.json()).message).toBe(mergeErrorMessage);
    });

    test('Verify that user can not stop already stopped launch', async ({request}) => {
        const uuidResp_1 = await tryCatchWrapper(await request.post(launchEndpoints.postLaunch, {data: createPayload}));
        const uuid_1 = (await uuidResp_1.json()).id;
        const idResp_1 = await tryCatchWrapper(await request.get(launchEndpoints.filterByUUID(uuid_1)));
        const id_1 = (await idResp_1.json()).id;
        await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id_1)}));
        const stopLaunchResponse = await tryCatchWrapper(await request.put(launchEndpoints.stopLaunch, {data: stopPayload(id_1)}));
        await expect(await stopLaunchResponse.ok()).toBeFalsy();
    });
});

