import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

When('I remove the product {string} from the cart page', async function (this: CustomWorld, productName: string) {
    // Logic to find remove button for a specific product on Cart page
    await this.page!.click(`[data-test="remove-sauce-labs-${productName}"]`);
});

When('I open the sidebar menu', async function (this: CustomWorld) {
    await this.page!.click('#react-burger-menu-btn');
});

When('I click on the {string} link', async function (this: CustomWorld, linkText: string) {
    await this.page!.click(`text=${linkText}`);
});

Then('I should be navigated to the {string} website', async function (this: CustomWorld, domain: string) {
    await expect(this.page!).toHaveURL(new RegExp(`.*${domain}.*`));
});
