export class TestHelper {
    static async waitForPageLoad(timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => await browser.execute(() => document.readyState === 'complete'),
            { timeout, timeoutMsg: 'Page did not load within timeout' }
        );
    }

    static async scrollToElement(element: WebdriverIO.Element): Promise<void> {
        await element.scrollIntoView();
    }

    static generateRandomString(length: number = 8): string {
        return Math.random().toString(36).substring(2, length + 2);
    }

    static async takeScreenshotOnFailure(testName: string): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await browser.saveScreenshot(`./reports/failure-${testName}-${timestamp}.png`);
    }
}