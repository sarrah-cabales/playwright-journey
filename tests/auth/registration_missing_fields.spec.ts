import {test, expect} from '@playwright/test';

test('Negative Scenario - Registration with Missing Fields', async ({ page }) => {
    // 1. Navigation
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.getByRole('link', { name: 'Register your account' }).click();

    // 2. Form Submission (Empty State)
    await page.getByRole('button', { name: 'Register' }).click();

    // 3. Validatioin Assertions
    const firstNameError = page.getByText('First name is required');
    const lastNameError = page.getByText('Last name is required');
    
    await expect(firstNameError).toBeVisible();
    await expect(lastNameError).toBeVisible();
});