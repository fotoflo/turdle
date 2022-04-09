import { test, expect } from '@playwright/test';

const sleep = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test.describe('the index page render', ()=>{
  test('index page H1 renders', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const H1 = await page.locator('[data-testid="word-h1"]').innerText()
    expect(H1.length).toEqual(4);
  });

  test('index row has correct number of guesses', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const row0 = await page.locator('[data-testid="row-0"] div').count()
    expect(row0).toEqual(4);
  });
  

  test('Correct letter guesses turn green', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const H1 = await page.locator('[data-testid="word-h1"]').innerText()
    await page.keyboard.press(H1[0]);
    
    const firstChar = page.locator('[data-testid="row-0"] div').first()

    await expect(firstChar).toHaveText(H1[0])
    await expect(firstChar).toHaveCSS('background-color', "rgb(53, 229, 45)")

  });

  test('guessing the word goes to next level', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    let H1 = await page.locator('[data-testid="word-h1"]').innerText()

    console.log("$$$$$ first pass", H1)
    
    await page.keyboard.press(H1[0]);
    await sleep()
    await page.keyboard.press(H1[1]);
    await sleep()
    await page.keyboard.press(H1[2]);
    await sleep()
    await page.keyboard.press(H1[3]);
    await sleep()
    
    H1 = await page.locator('[data-testid="word-h1"]').innerText()
    console.log("$$$$$$$ second pass", H1)
    expect(H1.length).toEqual(5);

    const row0 = await page.locator('[data-testid="row-0"] div').count()
    expect(row0).toEqual(5);
  });

})
