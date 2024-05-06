import axios from 'axios';
import { launchEndpoints } from './endpoints';
import { log } from '../logger';
import {createPayload, mergePayload, stopPayload} from './payloads';

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${process.env.BEARER_TOKEN}`
};

export const launchFunctions = {

    getLaunchByName: async (name) => {
        try {
            return await axios.get(launchEndpoints.filterByName(name), {headers: headers});
        } catch (err) {
            log.error(`Error getting launches: ${err.message}`);
            return err;
        }
    },

    getLaunchByTotalParam: async (totalNumber) => {
        try {
            return await axios.get(launchEndpoints.filterByTotal(totalNumber), {headers: headers});
        } catch (err) {
            log.error(`Error getting launch: ${err.message}`);
            return err;
        }
    },

    getLaunchByUUID: async (uuid) => {
        try {
            return await axios.get(launchEndpoints.filterByUUID(uuid), {headers: headers});
        } catch (err) {
            log.error(`Error getting launch: ${err.message}`);
            return err;
        }
    },

    stopLaunchProcess: async (id) => {
        try {
            return (await axios.put(launchEndpoints.stopLaunch, stopPayload(id), {headers: headers}));
        } catch (err) {
            log.error(err.message);
            return err;
        }
    },

    createLaunch: async () => {
        try {
            return await axios.post(launchEndpoints.postLaunch, createPayload, {headers: headers});
        } catch (err) {
            log.error(err.message);
            return err;
        }
    },

    deleteLaunchByID: async (id) => {
        try {
            const response = await axios.delete(launchEndpoints.deleteById(id), {headers: headers});
            log.info(response.data.message);
            return response;
        } catch (err) {
            log.error(err.message);
            return err;
        }
    },

    mergeLaunches: async (launch1_id, launch2_id) => {
        try {
            return await axios.post(launchEndpoints.mergeLaunch, mergePayload(launch1_id, launch2_id), {headers: headers});
        } catch (err) {
            log.error(`Merging error: ${err.message}`);
            return err;
        }
    }
};

export async function  tryCatchWrapper(func) {
    try {
        return func;
    } catch (err) {
        log.error(err.message);
        return err;
    }
}
