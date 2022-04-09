import { test, expect } from '@playwright/test';

const sleep = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test.describe('the nav bar', ()=>{
  test('call-help-modal', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('[data-test-id="call-help-modal"]').click();

    await page.locator('[data-test-id="dismiss-help-modal"]').click();
  });


})
