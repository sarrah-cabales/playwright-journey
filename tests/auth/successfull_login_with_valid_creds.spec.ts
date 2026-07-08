import {test, expect} from '@playwright/test'

test('Happy Path - Successfull Login with Valid Credentials', async ({ page }) => {
    // 1. Configuration and Test Data Setup
    const baseURL = 'Https://practice.expandtesting.com';
    const uniqueUser = `user_${Date.now()}`;
    const targetPassword = 'SuperSecretPassword!';

    // 2. Account Registration Flow
    await page.goto(`${baseURL}/register`);

    await page.getByLabel('Username').fill(uniqueUser);
    await page.getByLabel('Password', { exact: true }).fill(targetPassword);
    await page.getByLabel('Confirm Password').fill(targetPassword);

    //Explicit form validations before submission
    await expect(page.getByLabel('Username')).toHaveValue(uniqueUser);
    await expect(page.getByLabel('Password', { exact: true })).toHaveValue(targetPassword);

    await page.getByRole('button', { name: 'Register' }).click();

    // 3. User Authentication Flow
    await page.goto(`${baseURL}/login`);

    // NOTE: Sandbox environment dodes not persist registrations.
    //Switching to platform's hardcoded static profile to test post-login states.
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password', { exact: true }).fill(targetPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Post-Condition Assertions
    const successHeader = page.getByRole('heading', {
        name: 'Secure Area page for Automation Testing Practice'
    });
    await expect(successHeader).toBeVisible();
});