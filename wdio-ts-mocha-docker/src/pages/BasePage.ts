export class BasePage {
    protected url: string;

    constructor(url: string = '') {
        this.url = url;
    }

    async open(): Promise<void> {
        await browser.url(this.url);
    }

    async getTitle(): Promise<string> {
        return await browser.getTitle();
    }

    async waitForElement(selector: string, timeout: number = 5000): Promise<WebdriverIO.Element> {
        return await $(selector).waitForExist({ timeout });
    }

    async takeScreenshot(name: string): Promise<void> {
        await browser.saveScreenshot(`./reports/${name}.png`);
    }
}