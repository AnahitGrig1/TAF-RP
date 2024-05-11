import {BasePage} from "../business/pageObjects/basePage";

export class ElementHandler extends BasePage {
    constructor(page) {
        super(page);
    }

    async getElement(locator) {
        return this.page.locator(locator);
    }
}
