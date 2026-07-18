import { test, expect } from "@playwright/test";

test.describe('Text Matches Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://letcode.in/edit');
    });

    test('Should demonstrate the diference between toHaveText and toContainText', async ({ page }) => {
        // 1. Exact Match using toHaveText
        // Target the label for the first input box
        const nameLabel = page.locator('text=Enter your full Name');

        // This will pass only if the text is exactly "Enter your full Name"
        await expect(nameLabel).toHaveText('Enter your full Name');

        // 2. Partial/Sub-string Match using toContainText
        // Target the disclaimer info or a paragraph on the page.
        // The page footer contains a copyright note: '© 2026 LetCode · ..."
        const footer = page.locator('footer p');

        // We don't want to type oout the entire copyright layout string, we just want to verify "LetCode" is in the footer
        await expect(footer).toContainText('LetCode');

    });
});


