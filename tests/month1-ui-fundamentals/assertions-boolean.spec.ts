import { test, expect } from "@playwright/test";

test.describe('Boolean State Validation Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://letcode.in/radio');
    });

test('Should validate check, enabled, and disabled states', async ({ page }) => {
    // 1. Validate check state
    // The "Bar" radio buttom is checled by default on this page
    const barRadio = page.locator('#notfoo');
    await expect(barRadio).toBeChecked();

    // The "Foo" radio button should NOT be check by default
    const fooRadio = page.locator('#foo');
    await expect(fooRadio).not.toBeChecked();

    // 2. Validate disabled/enabled states
    // Under "Confirm last field is disabled", the "Maybe" radio is disabled
    const maybeRadio = page.locator('#maybe');
    await expect(maybeRadio).toBeDisabled();

    // The "Going" radio in that same group is active and enabled
    const goingRadio = page.locator('#going');
    await expect(goingRadio).toBeEnabled();
});
});