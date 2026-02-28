import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
    readonly title: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly sortDropdown: Locator;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('.product_sort_container');
        this.inventoryItems = page.locator('.inventory_item');
    }

    async addItemToCart(itemName: string) {
        const itemContainer = this.inventoryItems.filter({ hasText: itemName });
        const addToCartBtn = itemContainer.locator('button', { hasText: 'Add to cart' });
        await this.clickElement(addToCartBtn, `Add to Cart: ${itemName}`);
    }

    async removeItemFromCart(itemName: string) {
        const itemContainer = this.inventoryItems.filter({ hasText: itemName });
        const removeBtn = itemContainer.locator('button', { hasText: 'Remove' });
        await this.clickElement(removeBtn, `Remove from Cart: ${itemName}`);
    }

    async sortBy(sortOption: string) {
        console.log(`Sorting items by: ${sortOption}`);
        await this.sortDropdown.waitFor({ state: 'visible' });
        await this.sortDropdown.selectOption(sortOption);
    }

    async getCartBadgeCount(): Promise<number> {
        const isVisible = await this.isElementVisible(this.shoppingCartBadge, 'Cart Badge');
        if (!isVisible) return 0;
        const text = await this.shoppingCartBadge.textContent();
        return parseInt(text || '0', 10);
    }

    async openCart() {
        await this.clickElement(this.shoppingCartLink, 'Shopping Cart Link');
    }
}
