// WebDriverIO Configuration
// Supports both local and Docker Selenium Grid execution

declare const process: NodeJS.Process;
declare const global: any;
declare const browser: any;

function getSeleniumHostname(): string {
    if (process.env.SELENIUM_HUB_URL) {
        try {
            const url = new URL(process.env.SELENIUM_HUB_URL);
            
            // Validate protocol
            if (!['http:', 'https:'].includes(url.protocol)) {
                console.warn('Invalid protocol, falling back to selenium-hub');
                return 'selenium-hub';
            }
            
            // Validate port range
            const port = parseInt(url.port) || (url.protocol === 'https:' ? 443 : 80);
            if (port < 1024 || port > 65535) {
                console.warn('Invalid port range, falling back to selenium-hub');
                return 'selenium-hub';
            }
            
            // Strict hostname validation
            const allowedHosts = ['selenium-hub', 'localhost', '127.0.0.1'];
            if (allowedHosts.includes(url.hostname)) {
                return url.hostname;
            }
            
            console.warn('Hostname not in allowed list, falling back to selenium-hub');
            return 'selenium-hub';
        } catch (error) {
            console.warn('Invalid SELENIUM_HUB_URL, falling back to selenium-hub');
            return 'selenium-hub';
        }
    }
    return 'localhost';
}

export const config = {
    runner: 'local',
    specs: ['./src/tests/**/*.ts'],
    exclude: ['./src/tests/unit.test.ts'],
    maxInstances: 2,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.SELENIUM_HUB_URL ? 
                ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] :
                ['--no-sandbox', '--disable-dev-shm-usage']
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    services: ['chromedriver'],

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    },
    onPrepare: async function (config: any, capabilities: any) {
        const { TestHarness } = await import('../src/harness/TestHarness');
        await TestHarness.setup();
        console.log('Starting WebDriverIO tests...');
    },
    onComplete: async function(exitCode: number, config: any, capabilities: any, results: any) {
        const { TestHarness } = await import('../src/harness/TestHarness');
        await TestHarness.teardown();
        console.log('All tests completed with exit code:', exitCode);
    },
    beforeTest: function (test: any, context: any) {
        console.log(`Starting test: ${test.title}`);
    },
    afterTest: async function(test: any, context: any, { error, result, duration, passed, retries }: any) {
        if (error) {
            try {
                await browser.takeScreenshot();
            } catch (screenshotError) {
                console.warn('Failed to take screenshot:', screenshotError);
            }
        }
    }
};
