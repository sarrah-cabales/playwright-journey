import { test, expect } from '@playwright/test';

test('Basic End to end automation flow', async ({ page }) => {
//1. Setup Data & Navigate
const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
const defaultPassword = 'PassQWER.123';

console.log("Navigating to practice sofware testing registration page...");
await page.goto('https://practicesoftwaretesting.com/auth/register');

//2. Define Locators
const locators = {
    firstName: page.locator('#first_name'),
    lastName: page.locator('#last_name'),
    dob: page.locator('#dob'),
    country: page.locator('#country'),
    postalCode: page.locator('#postal_code'),
    houseNumber: page.locator('#house_number'),
    street: page.locator('#street'),
    city: page.locator('#city'),
    state: page.locator('#state'),
    phone: page.locator('#phone'),
    email: page.locator('#email'),
    password: page.locator('#password'),
    registerBtn: page.locator('[data-test="register-submit"]'),
    loginSubmitBtn: page.locator('[data-test="login-submit"]')
};

//3. Populate Registration Form
console.log("Filling out registration details...");

await locators.firstName.fill('Mateo Alaric');
await locators.lastName.fill('Salvadico');
await locators.dob.fill('2000-10-10');
await locators.country.selectOption('PH');

await locators.postalCode.fill('1111');
await locators.houseNumber.fill('12345');
await locators.street.fill('Carter Rapid');
await locators.city.fill('Kankaloo City');
await locators.state.fill('Stateless');

await locators.phone.fill('0912345678');


console.log(`Generated Email: ${uniqueEmail}`);
await locators.email.fill(uniqueEmail);
await expect(locators.email).toHaveValue(uniqueEmail);

await locators.email.press('Tab');

await locators.password.fill(defaultPassword);

//4. Form Submissioin and Redirection Check
console.log("Clicking Register button...");
await locators.registerBtn.click();

console.log("Waiting for automated redirection to login page...");
await expect(page).toHaveURL(/.*login/, { timeout: 10000 });

//5. Execute User Login
console.log("On login page Entering credentials...");
await locators.email.fill(uniqueEmail);
await locators.password.fill(defaultPassword);

console.log("Clicking Login Submit...")
await locators.loginSubmitBtn.click();

//6. Final dashboard validation
console.log("Verifying successful dashboard access...");
await expect(page).toHaveURL(/.*account/, { timeout: 10000 });

console.log("Success: Ent-to-end Registration and login flow is 100% complete!");




});