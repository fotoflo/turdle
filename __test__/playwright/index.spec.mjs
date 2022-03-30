import { test, expect } from '@playwright/test';
test.describe('the index page render', ()=>{
  test('index page H1 renders', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const H1 = await page.locator('[data-testid="word-h1"]').innerText()
    expect(H1.length).toEqual(4);
  });
  test('Correct letter guesses turn green', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const H1 = await page.locator('[data-testid="word-h1"]').innerText()
    await page.keyboard.press(H1[0]);
    
    const firstChar = page.locator('[data-testid="row-0"] div').first()

    await expect(firstChar).toHaveText(H1[0])
    await expect(firstChar).toHaveCSS('background-color', "rgb(53, 229, 45)")

  });
})
