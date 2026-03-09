import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.SAUCE_URL || 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  reporter: [
    ['html', { outputFolder: '../reports/playwright-report' }],
    ['allure-playwright']
  ]
});