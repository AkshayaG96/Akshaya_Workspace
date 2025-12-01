import { expect } from 'chai';

describe('WDIO Mocha TS Example', () => {
    it('should open Google and check title', async () => {
        await browser.url('https://www.google.com');
        const title = await browser.getTitle();
        console.log('Title:', title);
        expect(title).to.contain('Google');
    });
});
