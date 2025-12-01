# WebDriverIO TypeScript Mocha Docker Framework

A complete test automation framework using WebDriverIO, TypeScript, Mocha, and Docker.

## Features

- **WebDriverIO 8** with TypeScript support
- **Mocha** test framework
- **Page Object Model** pattern
- **Docker** integration with Selenium Grid
- **Allure** reporting
- **Test harness** utilities
- **Screenshot** capture on failures

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests locally:
```bash
npm run test:local
```

3. Run tests in Docker:
```bash
npm run test:docker
```

## Project Structure

```
src/
├── tests/          # Test files
├── pages/          # Page Object Model classes
├── utils/          # Test utilities
└── data/           # Test data
```

## Docker Commands

- Start Selenium Grid: `docker-compose up selenium-hub chrome`
- Run all tests: `docker-compose up --build`
- Clean up: `docker-compose down`

## Reporting

Generate Allure reports:
```bash
npm run report
```