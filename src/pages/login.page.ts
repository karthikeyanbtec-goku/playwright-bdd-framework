import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async login(user: string, pass: string) {
        await this.fillText(this.usernameInput, user, 'Username Field');
        await this.fillText(this.passwordInput, pass, 'Password Field');
        await this.clickElement(this.loginButton, 'Login Button');
    }

    async getErrorMessage(): Promise<string | null> {
        await this.errorMessage.waitFor({ state: 'visible' });
        return this.errorMessage.textContent();
    }
}
