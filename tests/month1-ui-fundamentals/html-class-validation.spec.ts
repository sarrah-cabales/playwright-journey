import { test, expect } from "@playwright/test";

test.describe('Attribute and Class Validations Suite', () => {
    
    test.beforeEach(async({ page }) => {
        await page.goto('https://letcode.in/edit');
    });

    test('Should validate HTML attributes and CSS classes', async ({ page }) => {
        // 1. Validate an attribute (check the placeholder text)
        // Target the first input box (Enter your full name)
        const fullNameInput = page.locator('#fullName');

        //Assert that the placeholder attribute has the exact value 'Enter first and last name'
        await expect(fullNameInput).toHaveAttribute('placeholder', 'Enter first & last name');

        // 2. Validate CSS Classes using a partial RegEx match
        const pageHeader = page.locator('h1');

         // Use a regular expression to assert that the class string contains 'font-extrabold'
         await expect(pageHeader).toHaveClass(/font-extrabold/);
    });
});