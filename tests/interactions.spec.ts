import { test, expect } from '@playwright/test';

// =========================================================================
// CASE 1: E-COMMERCE USER FLOW (SEARCH FUNCTIONALITY)
// =========================================================================
test('Portfolio Case 1: Live E-Commerce Search Validation', async ({ page }) => {
    console.log("🌐 Case 1: Navigating to the live E-Commerce store...");
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    const searchInput = page.locator('input[name="search"]').first();

    console.log("⌨️ Typing 'Phone' into the search bar...");
    await searchInput.fill('Phone');
    await expect(searchInput).toHaveValue('Phone');

    console.log("🖱️ Pressing Enter to execute search...");
    await searchInput.press('Enter');

    const resultsHeader = page.locator('h1.h4');
    await expect(resultsHeader).toContainText('Search - Phone');
    console.log("🎉 Case 1 PASSED: Live e-commerce search handles inputs perfectly.");
});

// =========================================================================
// CASE 2: SECURE PORTAL VALIDATION (FORM SUBMISSION)
// =========================================================================
test('Portfolio Case 2: Secure Portal Form Submission & Error Handling', async ({ page }) => {
    console.log("🌐 Case 2: Navigating to the Secure Practice Login Portal...");
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('input[type="submit"]');

    console.log("⌨️ Entering credentials into login fields...");
    await emailInput.fill('fake-hacker-account@example.com');
    await passwordInput.fill('WrongPassword123!');

    await expect(emailInput).toHaveValue('fake-hacker-account@example.com');
    await expect(passwordInput).toHaveValue('WrongPassword123!');

    console.log("🖱️ Submitting the form...");
    await loginButton.click();

    console.log("🔍 Waiting for the login error message to appear...");
    const errorAlert = page.getByText('Invalid email or password');
    await expect(errorAlert).toBeVisible();
    console.log("🎉 Case 2 PASSED: Security validation and form handling work perfectly.");
});

// =========================================================================
// CASE 3: WIKIPEDIA CORE INPUT CHALLENGE (FIXED & LOCK-GUARDED)
// =========================================================================
test('Portfolio Case 3: Wikipedia Live Input & Navigation Check', async ({ page }) => {
    console.log("🌐 Case 3: Navigating to the live English Wikipedia home page...");
    await page.goto('https://en.wikipedia.org/');

    // Combined Force Protection: Grab by placeholder text AND take the first visible one
    const wikiSearchInput = page.getByPlaceholder('Search Wikipedia').first();

    console.log("⌨️ Typing 'Software testing' into Wikipedia...");
    await wikiSearchInput.fill('Software testing');

    // Assert that the string was successfully populated inside the input
    await expect(wikiSearchInput).toHaveValue('Software testing');

    console.log("🖱️ Submitting search query via Enter key...");
    await wikiSearchInput.press('Enter');

    // Wait and verify that the page successfully transitioned to the actual article page
    const wikiHeading = page.locator('h1#firstHeading');
    await expect(wikiHeading).toContainText('Software testing');

    console.log("🎉 Case 3 PASSED: Wikipedia successfully navigated to the correct topic page.");
});