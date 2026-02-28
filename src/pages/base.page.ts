import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string) {
        console.log(`Navigating to: ${path}`);
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async clickElement(locator: Locator, elementName: string) {
        console.log(`Clicking on: ${elementName}`);
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async fillText(locator: Locator, text: string, elementName: string) {
        console.log(`Entering text into: ${elementName}`);
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    async isElementVisible(locator: Locator, elementName: string): Promise<boolean> {
        console.log(`Checking visibility of: ${elementName}`);
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}
