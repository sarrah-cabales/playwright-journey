import {test, expect} from '@playwright/test';

test('Basic End to end autoamtion flow', async ({ page }) => {
    // 1. Setup Test Data
    const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
    const defaultPassword = 'PassQWER.123';

    // 2. Navigation and Registration Flow
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    // Populate registration form fields cleanly
    await page.locator('#first_name').fill('Mateo Alaric');
    await page.locator('#last_name').fill('Salvadico');
    await page.locator('#dob').fill('2000-10-10');
    await page.locator('#country').selectOption('PH');
    await page.locator('#postal_code').fill('1111');
    await page.locator('#house_number').fill('12345');
    await page.locator('#street').fill('Carter Rapid');
    await page.locator('#city').fill('Kankaloo City');
    await page.locator('#state').fill('Stateless');
    await page.locator('#phone').fill('0912345678');
    
    await page.locator('#email').fill(uniqueEmail);
    await expect(page.locator('#email')).toHaveValue(uniqueEmail);

    await page.locator('#password').fill(defaultPassword);

    // 3. Form Submission
    await page.locator('[data-test="register-submit"]').click();

    // 4. Redirection and Authentication Flow
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
    
    // Explicit locators prevent label ambiguity conflicts
    await page.locator('#email').fill(uniqueEmail);
    await page.locator('#password').fill(defaultPassword);
    await page.locator('[data-test="login-submit"]').click();

    // 5. Post-Condition Validation
    await expect(page).toHaveURL(/.*account/, { timeout: 10000});

});