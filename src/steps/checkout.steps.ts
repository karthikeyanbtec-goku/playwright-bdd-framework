import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CustomWorld } from '../support/custom-world';
import { DataHelper } from '../utils/data.helper';

Given('I navigate to the cart page', async function (this: CustomWorld) {
    const inventoryPage = new InventoryPage(this.page!);
    await inventoryPage.openCart();
});

Given('I proceed to checkout', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page!);
    await cartPage.proceedToCheckout();
});

When('I fill in the shipping details for {string} user', async function (this: CustomWorld, userKey: string) {
    const checkoutPage = new CheckoutPage(this.page!);
    const shippingInfo = DataHelper.get(`shipping.${userKey}`);
    await checkoutPage.fillShippingDetails(shippingInfo.firstName, shippingInfo.lastName, shippingInfo.postalCode);
});

When('I click continue checkout', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.clickContinue();
});

When('I finish the checkout process', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.clickContinue();
    await checkoutPage.finishCheckout();
});

Then('I should see the order complete message', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page!);
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).toBeTruthy();
});

Then('I should see a checkout error message {string}', async function (this: CustomWorld, errorKey: string) {
    const checkoutPage = new CheckoutPage(this.page!);
    const actualErrorMessage = await checkoutPage.getErrorMessage();
    const expectedMessage = DataHelper.get(`errorMessages.${errorKey}`);
    expect(actualErrorMessage).toContain(expectedMessage);
});
