import { test, expect} from "@playwright/test";

test.describe('Toggling State Elements Suite', () => {

   test('1 Should handle HTML checkboxes and radio buttons', async ({ page }) => {
        await page.goto('https://letcode.in/radio');

        // --- CHECKBOXES ---
        const bugCheckbox = page.getByLabel('Remember me');

        // Check it and verify
        await bugCheckbox.check();
        await expect(bugCheckbox).toBeChecked();

        // Uncheck it and verify
        await bugCheckbox.uncheck();
        await expect(bugCheckbox).not.toBeChecked();

        // --- RADIO BUTTONS ---
        // Radio button are mutually exclusive (selecting one unselects the other)
        const yesRadio = page.locator('#yes');
        const noRadio = page.locator('#no');

        await yesRadio.check();
        await expect(yesRadio).toBeChecked();
        await expect(noRadio).not.toBeChecked(); // "No" should authomatically be uncheck
   }); 

   test('2. Should handle custom stylized toggles (Semantic UI)', async ({ page }) => {
    await page.goto('https://semantic-ui.com/modules/checkbox.html');

    //. Semantic UI wraps input tags inside custom styles div containers (.ui.checkbox)
    // Clicking the container is often more reliable than the hidden input tag.
    const sliderToggle = page
        .locator('.example')
        .filter({ has: page.getByRole('heading', { name: 'Slider', exact: true }) })
        .locator('.ui.slider.checkbox');

    // Check state by targeting the hidden input inside our scoped container
    const hiddenInput = sliderToggle.locator('input');

    // Action: Click/Toggle the slider
    await sliderToggle.click();
    await expect(hiddenInput).toBeAttached();

    // Togggle it back off
    await sliderToggle.click();
    await expect(hiddenInput).not.toBeChecked();
   });
});