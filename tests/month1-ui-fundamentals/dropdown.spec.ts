import { test, expect } from "@playwright/test";

const semanticURL = "https://semantic-ui.com/modules/dropdown.html";

test.describe('Dropdown Interaction Suite', () => {

    test('1. Should selct options from a native dropdown menu', async ({ page }) => {
        await page.goto('https://letcode.in/dropdowns');
        const dropdown = page.locator('#fruits');

        // Select by Label
        await dropdown.selectOption({ label: 'Apple' });
        await expect(dropdown).toHaveValue('0');

        await dropdown.selectOption({ value: '3' });
        await expect(dropdown).toHaveValue('3');
    });

    test('2. Should handle a custom, searchable fluid dropdown', async ({ page }) => {
        await page.goto(semanticURL);

        const dropdownContainer = page.locator('.ui.fluid.search.selection.dropdown').first();
        const searchInput = dropdownContainer.locator('input.search');

        await dropdownContainer.click();
        await searchInput.fill('United States');

        const optionToselect = dropdownContainer.locator('.menu .item').filter({ hasText: 'United States' });
        await optionToselect.click();

        const textDisplay = dropdownContainer.locator('.text');
        await expect(textDisplay).toHaveText('United States');
    });

    test('3. Should handle multi-select tag dropdown via underlying select element', async ({ page }) => {
        await page.goto(semanticURL);

        // Target the unique multi-select dropsown that contains specific skills select tag
        const dropdownContainer = page.locator('.ui.dropdown.multiple').filter({
            has: page.locator('select[name="skills"]')
        });

        await dropdownContainer.click();

        const cssOption = dropdownContainer.locator('.menu .item').filter({ hasText: 'CSS' });
        await cssOption.click();

        const htmlOption = dropdownContainer.locator('.menu .item').filter({ hasText: 'HTML' });
        await htmlOption.click();

        const selectedLabels = dropdownContainer.locator('a.ui.label');
        await expect(selectedLabels).toHaveText(['CSS', 'HTML']);
    });

    test('4. Should handle lazy-loaded scroll dropdown simulation', async ({ page }) => {
        await page.goto(semanticURL);

        // Target the correct "Select Friend" dropdown specifically by scoping it
        const friendDropdown = page.locator('div.ui.selection.dropdown', { hasText: 'Select Friend ' });

        await friendDropdown.click();

        // Select option safely scoped within the parent container
        await friendDropdown.locator('.menu .item').filter({ hasText: 'Stevie Feliciano '}).click();
        
        await page.click('body'); // Safety click away to close open memus

    });

        test('5. Should select multiple items in the dropdown list visially byt section  scoping', async ({ page }) => {
            await page.goto(semanticURL);

            // Locate the main dropdown wrapper using semantic classes and heading section paarent
            const multipleSelectDropdown = page
                .locator('.example')
                .filter({ has: page.getByRole('heading', { name: 'Multiple Selection', exact: true }) })
                .locator('.ui.dropdown.multiple');

            await multipleSelectDropdown.click();

            const menu = multipleSelectDropdown.locator('.menu');

            await menu.locator('.item').filter({ hasText: 'Graphic Design '}).click();
            await menu.locator('.item').filter({ hasText: 'HTML' }).click();

            const selectedLabels = multipleSelectDropdown.locator('a.ui.label');
            await expect(selectedLabels).toContainText(['Graphic Design', 'HTML']);
            
        });
    });
