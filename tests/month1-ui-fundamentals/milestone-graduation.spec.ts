import { test, expect } from "@playwright/test";

test.describe('Month 1 Graduation - E-Commerce Configuration Suite', () => {

    test('Should fully execute ent-to-end checkout alignment configuration', async ({ page }) => {
        await page.goto('https://letcode.in/forms');

        // Verify successful target navigation landing
        const formHeader = page.getByRole('heading', { name: 'Form', exact: true });
        await expect(formHeader).toBeVisible();

        // 1. Structural Element Definitions
        const firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        const lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        const emailInput = page.getByRole('textbox', { name: 'Email' });

        // Capture the explicit role using page alignment
        const countryCodeSelect = page.getByRole('combobox').first();
        const countrySelect = page.getByRole('combobox').last();
        
        const phoneInput = page.getByRole('textbox', { name: 'Phone Number' });
        const addressLine1 = page.getByRole('textbox', { name: 'Address Line-1' });
        const addressLine2 = page.getByRole('textbox', { name: 'Address Line-2' });
        const stateInput = page.getByRole('textbox', { name: 'State' });
        const postalInput = page.getByRole('textbox', { name: 'Postal-Code' });
        const dobInput = page.getByRole('textbox', { name: 'Date Of Birth' });

        // Isolate to the single specific configuration profile we want to validate
        const targetGenderRadio = page.getByRole('radio', { name: 'Female', exact: true });
        const termsCheckbox = page.locator('input[type="checkbox"]');
        const sumbitBtn = page.getByRole('button', { name: 'Submit' });

        // 2 Linear Value Popolation Execution
        await firstNameInput.fill('Sarah');
        await lastNameInput.fill('Pretty');
        await emailInput.fill('sarrahPretty@gmail.com');
        await countryCodeSelect.selectOption({ value: '63' });
        await phoneInput.fill('9339456781');
        await addressLine1.fill('Everywhere St.');
        await addressLine2.fill('Somewhere over the rainbow');
        await stateInput.fill('No state here');
        await postalInput.fill('5000');
        await countrySelect.selectOption({ label: 'Philippines' });
        await dobInput.fill('2000-08-18');
        
        // Single, focused interactive state assertions
        await targetGenderRadio.check();
        await termsCheckbox.check();

        // 3. Form Dispatch
        await sumbitBtn.click();

        // 4. Multi-Field Structural Reser Assertions (Parallel vverification)
        await Promise.all([
            expect(firstNameInput).toBeEmpty(),
            expect(lastNameInput).toBeEmpty()
        ]);
    });
});
