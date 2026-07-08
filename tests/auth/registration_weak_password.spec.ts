import { test, expect } from '@playwright/test';

test('Negative Scenario - Registration using weak password', async ({ page }) => {
    // 1. Setup Test Data
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    // 2. Navigation
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.getByRole('link', { name: 'Register your account' }).click();

    // 3. Populate Profile Information
    await page.getByLabel('First name').fill('Test');
    await page.getByLabel('Last name').fill('User');
    await page.getByLabel('Date of birth').fill('2000-11-11');
    await page.getByLabel('Country').selectOption('US');
    await page.getByLabel('Postal code').fill('Test City');
    await page.getByLabel('State').fill('Test State');
    await page.getByLabel('Phone').fill('0922384753');
    await page.getByLabel('Email address').fill(uniqueEmail);

    // International Security Policy Violation: Password under required charcater threshold
    await page.getByLabel('Password').fill('123');

    // 4. Form Submission
    await page.getByRole('button', { name: 'Register' }).click();

    // 5. Validation Assertions
    const passwordError = page.getByText('Password must be minimal 6 characters long');
    await expect(passwordError).toBeVisible();
});