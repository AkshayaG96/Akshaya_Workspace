import { expect } from '@wdio/globals';
import { GooglePage } from '../pages/GooglePage';
import { TestHelper } from '../utils/TestHelper';
import { testData } from '../data/testData';

describe('Google Search Tests', () => {
    let googlePage: GooglePage;

    beforeEach(async () => {
        googlePage = new GooglePage();
        await googlePage.open();
        await TestHelper.waitForPageLoad();
    });

    it('should open Google and verify title', async () => {
        const title = await googlePage.getTitle();
        await expect(title).toContain('Google');
    });

    it('should perform search successfully', async () => {
        const query = testData.search.validQueries[0];
        await googlePage.search(query);
        
        // Verify URL changed to search results page
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('search');
    });

    afterEach(async function(this: Mocha.Context) {
        if (this.currentTest?.state === 'failed') {
            await TestHelper.takeScreenshotOnFailure(this.currentTest.title);
        }
    });
});
