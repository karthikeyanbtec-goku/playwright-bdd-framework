import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async verifyItemInCart(itemName: string): Promise<boolean> {
        const item = this.cartItems.filter({ hasText: itemName });
        return await this.isElementVisible(item, `Cart Item: ${itemName}`);
    }

    async removeItem(itemName: string) {
        const item = this.cartItems.filter({ hasText: itemName });
        const removeBtn = item.locator('button', { hasText: 'Remove' });
        await this.clickElement(removeBtn, `Remove Cart Item: ${itemName}`);
    }

    async proceedToCheckout() {
        await this.clickElement(this.checkoutButton, 'Checkout Button');
    }
}
