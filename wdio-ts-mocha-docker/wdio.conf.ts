//brain of webdriverIO.
//It tells wdio things like
//where your tests are located(src/tests/**/*.ts)
//which browser to run in (chrome)
//which framework you use(Mocha)
//how many tests to run at once
//Whether to use Typescript loader,etc.

export const config = {
    runner: 'local',
    specs: ['./src/tests/**/*.ts'],
    maxInstances: 1,
    capabilities: [
        {
            browserName: 'chrome'
        }
    ],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
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
    }
};
