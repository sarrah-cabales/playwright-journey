import { test, expect } from '@playwright/test';

test('Negative Scenario - Registration with Duplicate Email', async ({ page }) => {
    // 1. Navigation
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.getByRole('link', { name: 'Register your account'}).click();

    // 2. Populate Profile Information
    await page.getByLabel('First name').fill('Test');
    await page.getByLabel('Last name').fill('User');
    await page.getByLabel('Date of birth').fill('2000-11-11');
    await page.getByLabel('Country').selectOption('US');
    await page.getByLabel('Postal Code').fill('1234');
    await page.getByLabel('House number').fill('123');
    await page.getByLabel('Street').fill('Test City');
    await page.getByLabel('City').fill('Test City');
    await page.getByLabel('State').fill('Test State');
    await page.getByLabel('Phone').fill('09883736452');

    // Intentional Conflicts: Utilizing known admin emaiml and compromised password
    await page.getByLabel('Email address').fill('admin@practicesoftwaretesting.com');
    await page.getByLabel('Password').fill('Password123!');

    // 3. Form Submission
    await page.getByRole('button', { name: 'Register' }).click();

    // 4. VAlidation Assertions
    const duplicateAlert = page.locator('.alert-danger');

    await expect(duplicateAlert).toBeVisible();
    await expect(duplicateAlert).toContainText('A customer with this email address already exists');
    await expect(duplicateAlert).toContainText('The given password has appeared in a data leak.');
});