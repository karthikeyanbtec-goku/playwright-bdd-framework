import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
        await this.fillText(this.firstNameInput, firstName, 'First Name Field');
        await this.fillText(this.lastNameInput, lastName, 'Last Name Field');
        await this.fillText(this.postalCodeInput, postalCode, 'Postal Code Field');
    }

    async clickContinue() {
        await this.clickElement(this.continueButton, 'Continue Checkout Button');
    }

    async finishCheckout() {
        await this.clickElement(this.finishButton, 'Finish Checkout Button');
    }

    async getErrorMessage(): Promise<string | null> {
        await this.errorMessage.waitFor({ state: 'visible' });
        return this.errorMessage.textContent();
    }

    async isOrderComplete(): Promise<boolean> {
        return await this.isElementVisible(this.completeHeader, 'Checkout Complete Header');
    }
}
