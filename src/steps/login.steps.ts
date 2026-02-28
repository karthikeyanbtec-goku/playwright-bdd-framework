import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CustomWorld } from '../support/custom-world';

Given('I navigate to the application login page', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.navigateTo('https://www.saucedemo.com/');
});

When('I login as a {string}', async function (this: CustomWorld, userType: string) {
    const loginPage = new LoginPage(this.page!);
    let username = '';
    // Here you would normally fetch from your test data or env
    if (userType === 'standard_user') {
        username = 'standard_user';
    }
    const password = process.env.ADMIN_PASS || 'secret_sauce';

    await loginPage.login(username, password);
});

When('I login with username {string} and password {string}', async function (this: CustomWorld, user: string, pass: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.login(user, pass);
});

Then('I should be navigated to the inventory page', async function (this: CustomWorld) {
    await expect(this.page!).toHaveURL(/.*inventory.html/);
});

Then('I should see an error message {string}', async function (this: CustomWorld, expectedErrorMessage: string) {
    const loginPage = new LoginPage(this.page!);
    const actualErrorMessage = await loginPage.getErrorMessage();
    expect(actualErrorMessage).toContain(expectedErrorMessage);
});
