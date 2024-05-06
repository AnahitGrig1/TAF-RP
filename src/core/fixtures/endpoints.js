import {apiBaseUrl, baseUrl} from '../configs';

export const launchEndpoints = {
    filterByName: (name) => `${apiBaseUrl}/launch/?filter.eq.name=${name}`,
    filterByUUID: (UUID) => `${apiBaseUrl}/launch/uuid/${UUID}`,
    filterByTotal: (totalNumber) => `${apiBaseUrl}/launch/?filter.eq.statistics%24executions%24total=${totalNumber}`,
    deleteById: (id) => `${apiBaseUrl}/launch/${id}`,
    postLaunch: `${apiBaseUrl}/launch`,
    generateData: `${baseUrl}/api/v1/demo/anahitrp_personal/generate`,
    stopLaunch: `${apiBaseUrl}/launch/stop`,
    mergeLaunch: `${apiBaseUrl}/launch/merge`
};

// export const filterByName = (name) => `${apiBaseUrl}/launch/?filter.eq.name=${name}`;
// export const filterByUUID = (UUID) => `${apiBaseUrl}/launch/uuid/${UUID}`
// export const filterByTotal = (totalNumber) => `${apiBaseUrl}/launch/?filter.eq.statistics%24executions%24total=${totalNumber}`;
// export const deleteById = (id) => `${apiBaseUrl}/launch/${id}`
// export const postLaunch = `${apiBaseUrl}/launch`
// export const generateData = `${baseUrl}/api/v1/demo/anahitrp_personal/generate`
// export const stopLaunch = `${apiBaseUrl}/launch/stop`
// export const mergeLaunch = `${apiBaseUrl}/launch/merge`

