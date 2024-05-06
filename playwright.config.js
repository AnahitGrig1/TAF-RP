// @ts-check
// const { defineConfig, devices } = require('@playwright/test');
import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from 'allure-playwright/dist/testplan';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: 'src/tests',
  testMatch: '**/**/**/*spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  grep: testPlanFilter(),
  reporter: 'allure-playwright',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.BEARER_TOKEN}`
    },
  },
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ]
});
