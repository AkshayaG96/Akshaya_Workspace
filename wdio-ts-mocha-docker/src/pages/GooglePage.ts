import { BasePage } from './BasePage';

export class GooglePage extends BasePage {
    constructor() {
        super('https://www.google.com');
    }

    get searchBox(): Promise<WebdriverIO.Element> {
        return $('textarea[name="q"]');
    }

    get searchButton(): Promise<WebdriverIO.Element> {
        return $('input[value="Google Search"]');
    }

    async search(query: string): Promise<void> {
        await (await this.searchBox).setValue(query);
        await browser.keys('Enter');
    }

    async getSearchResults(): Promise<WebdriverIO.ElementArray> {
        await $('h3').waitForExist();
        return $$('h3');
    }
}