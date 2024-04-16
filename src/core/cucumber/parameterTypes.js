import { defineParameterType } from '@cucumber/cucumber';
import {page, pageFactory} from "./hooks.js";
import {credentials} from "../configs.js";

export let currentPage = '';

defineParameterType({
    name: 'page',
    regexp: /(\w{1,30}(\s\w{1,30}){0,2}?) page/,

    transformer: async (name) => {
        currentPage = await pageFactory.create(`${name} page`);

        return currentPage;
    },
    useForSnippets: false
});

defineParameterType({
    name: 'objectOrString',
    regexp: /(from|with)(.*)/,

    transformer: (prefix, data) => {
        if (prefix === 'from') {
            const [objectName, baseKey, key] = data.trim().split('>');

            return obj[objectName][baseKey][key];
        }

        return data;
    },

    useForSnippets: false
});

defineParameterType({
    name: 'property',
    regexp: /(from|with) ([^" ]*)/,
    transformer: (prefix, data) => {
        if (prefix === 'from') {
            return credentials[`${data}`];
        }

        return data;
    },
});

defineParameterType({
    name: 'optionalInt',
    regexp: /(\d*)/,

    transformer: int => int ? parseInt(int) : null,
    useForSnippets: false
});

defineParameterType({
    name: 'element',
    regexp: /"([^"]*)" element(?: by index (\d+))?/,
    transformer: async (locatorName, index) => {
        if (index !== undefined) {

            return page.locator(currentPage[locatorName](index));
        } else {
            return page.locator(await currentPage[locatorName])
        }
    },
    useForSnippets: false
});
