// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  timeout: 60000, // Timeout is shared between all tests.
  projects: [
    {
      name: 'wordcheater',
      testMatch: '/__test__/playwright/*',
      retries: 0,
    }
  ],
};
module.exports = config;