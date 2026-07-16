import { test, expect } from "@playwright/test";

//Declare the error text one time gloally
const LOGIN_ERROR_MSG = 'The login information you entered is incorrect.';


// This block runs automatically before Test 1 AND before test 2
test.beforeEach(async ({ page }) => {
    const baseURL = "https://www.instagram.com/?hm=en";
    await page.goto(baseURL);

    // Handle Cookies Banner if it pops up
    const cookieButton = page.getByRole('button', { name: 'Allow all cookies'});
    if (await cookieButton.isVisible()) {
        await cookieButton.click();
    }
});

test('Negative Scenario - Login with Unregistered Email', async ({ page }) => {
    // 1. Unique Test Data
    const unregisteredEmail = "thisisnotrealacccount@gamil.com";
    const dummyPassword = "Password123!";

    // 2. Unique Actions for this test
    await page.locator('input[name="email"]').fill(unregisteredEmail);
    await page.locator('input[name="pass"]').fill(dummyPassword);
    await page.getByRole('button', { name: 'Log In', exact: true }).click();

    // 3. Assertion
    const errorMessage = page.getByText(LOGIN_ERROR_MSG, { exact: false });
    await expect(errorMessage).toBeVisible();
});

test('Negative Scenario - Incorrect Password', async ({ page }) => {
    // 1. Unique Test Data
    const registeredUser = "Share_Testing_account";
    const wrongPass = "NOtarealpas123";

    // 2. Unique Actions fot this test
    await page.locator('input[name="email"]').fill(registeredUser);
    await page.locator('input[name="pass"]').fill(wrongPass);
    await page.getByRole('button', { name: 'Log In', exact: true }).click();

    // 3. Assertion
    const errorMessage = page.getByText(LOGIN_ERROR_MSG, { exact: false });
    await expect(errorMessage).toBeVisible();
})