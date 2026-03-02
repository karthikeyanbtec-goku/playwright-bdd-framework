import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CustomWorld } from '../support/custom-world';

Given('I am logged in as {string}', async function (this: CustomWorld, userType: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    const username = userType === 'standard_user' ? process.env.ADMIN_USER! : userType;
    const password = process.env.ADMIN_PASS!;
    await loginPage.login(username, password);
});

Then('I should be on the {string} page', async function (this: CustomWorld, pageName: string) {
    const urlPattern = new RegExp(`.*${pageName.toLowerCase()}.html`);
    await expect(this.page!).toHaveURL(urlPattern);
});
