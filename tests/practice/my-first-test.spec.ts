import { test, expect } from '@playwright/test';

test('My first interactive search test', async ({ page }) => {
    // 1. Go to Google
    console.log("🚀 Navigating to Google...");
    await page.goto('https://www.google.com');

    // Freeze for 2 seconds so we can look at the blank Google page
    await page.waitForTimeout(2000); 

    // 2. Locate the search box and type into it
    console.log("⌨️ Typing search query...");
    await page.locator('#APjFqb').fill('Playwright automation');
    
    // Freeze for 2 seconds so we can see the text typed in the box
    await page.waitForTimeout(2000); 

    await page.keyboard.press('Enter');

    // Freeze for 3 seconds so we can look at the search results page
    await page.waitForTimeout(3000); 

    // 3. Verify the URL changed
    console.log("🔍 Verifying search results loaded...");
    await expect(page).toHaveURL(/search/);
    
    console.log("✅ SUCCESS: Search completed perfectly!");
});