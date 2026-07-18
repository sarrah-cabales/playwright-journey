import { test, expect } from "@playwright/test";

test.describe('Capstone month 1 Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://letcode.in/radio');
    });

    test('Should validate comprehensive element states and text rules', async ({ page }) => {
        
        // 1. Exact text Matches on the main header
        const mainHeader = page.getByRole('heading', { name: 'Radio & Checkbox', exact: true });
        await expect(mainHeader).toBeVisible();

        // 2. Radio Button Initial State & Toggling
        const yesRadio = page.getByRole('radio', { name: 'Yes' }).first();
        const noRadio = page.getByRole('radio', { name: 'No' }).first();

        await expect(yesRadio).toBeChecked();
        await expect(noRadio).not.toBeChecked();

        await noRadio.check();

        await expect(noRadio).toBeChecked();
        await expect(yesRadio).not.toBeChecked();

        // 3. Checkbox Default State Identification
        const rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me'});
        await expect(rememberMeCheckbox).toBeChecked();

        // 4. Checkbox Assertion & Interaction
        const tcCheckbox = page.getByRole('checkbox', { name: 'I agree to the FAKE terms and conditions'});

        await expect(tcCheckbox).not.toBeChecked();
        await tcCheckbox.check();
        await expect(tcCheckbox).toBeChecked();
    });
});