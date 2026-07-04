import { test, expect } from '@playwright/test';

// =========================================================================
// CASE 1: CHECKBOX MANIPULATION
// =========================================================================
test('Portfolio Case 1: Live Checkbox Toggling', async ({ page }) => {
    console.log("🌐 Navigating to Live Checkboxes Page...");
    await page.goto('https://the-internet.herokuapp.com/checkboxes');

    // Locate the two checkboxes using a CSS structure selector
    const checkbox1 = page.locator('form#checkboxes input').nth(0); // First checkbox
    const checkbox2 = page.locator('form#checkboxes input').nth(1); // Second checkbox

    console.log("🔍 Verifying default starting states...");
    await page.waitForTimeout(2000)

    // Checkbox 1 starts unchecked, Checkbox 2 starts checked on this site
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();

    console.log("🖱️ Toggling checkboxes...");
    await page.waitForTimeout(2000)
    await checkbox1.check();     // Force check it
    await checkbox2.uncheck();   // Force uncheck it

    console.log("✅ Asserting new toggled states...");
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    console.log("🎉 Case 1 PASSED: Checkboxes manipulated flawlessly!");
    await page.waitForTimeout(2000)
});

// =========================================================================
// CASE 2: DROPDOWN MENU SELECTION
// =========================================================================
test('Portfolio Case 2: Live Dropdown Menu Selection', async ({ page }) => {
    console.log("🌐 Navigating to Live Dropdown Page...");
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // Locate the standard HTML <select> dropdown element by its ID
    const dropdownMenu = page.locator('#dropdown');

    console.log("🖱️ Selecting 'Option 2' from the menu...");
    await page.waitForTimeout(2000)
    // .selectOption() targets either the 'value' attribute or the visible text
    await dropdownMenu.selectOption('2'); 

    console.log("✅ Asserting 'Option 2' is selected...");
    await page.waitForTimeout(2000)
    // We expect the dropdown's internal data value to now equal '2'
    await expect(dropdownMenu).toHaveValue('2');
    console.log("🎉 Case 2 PASSED: Dropdown selection works perfectly!");
});

// =========================================================================
// CASE 3: RADIO BUTTON SELECTION (THE NEW ADDITION)
// =========================================================================
test('Portfolio Case 3: Live Radio Button Selection', async ({ page }) => {
    console.log("🌐 Case 3: Navigating to Live Radio Buttons Page...");
    // Open a live testing sandbox with clear radio buttons
    await page.goto('https://bootswatch.com/default/');

    // Locate the first two radio buttons in the default form template by their values
    const radioOption1 = page.locator('input[name="optionsRadios"][value="option1"]');
    const radioOption2 = page.locator('input[name="optionsRadios"][value="option2"]');

    console.log("🔍 Checking initial radio button states...");
    await page.waitForTimeout(2000)
    // Radio 1 defaults to checked on this bootstrap template layout
    await expect(radioOption1).toBeChecked();
    await page.waitForTimeout(2000)
    await expect(radioOption2).not.toBeChecked();

    console.log("🖱️ Selecting Radio Option 2...");
    await page.waitForTimeout(2000)
    // Select Option 2—this should automatically deselect Option 1!
    await radioOption2.check();

    console.log("✅ Verifying mutual exclusivity (Radio 1 turned off automatically)...");
    await page.waitForTimeout(2000)
    await expect(radioOption1).not.toBeChecked();
    await page.waitForTimeout(2000)
    await expect(radioOption2).toBeChecked();

    console.log("🎉 Case 3 PASSED: Radio group mutual exclusivity validated successfully!");
    await page.waitForTimeout(2000)
});