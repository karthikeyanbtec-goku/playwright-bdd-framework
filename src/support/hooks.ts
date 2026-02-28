import { Before, BeforeAll, After, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page, request } from '@playwright/test';
import { CustomWorld } from './custom-world';
import { EnvHelper } from '../utils/env.helper';

// 30 seconds default timeout
setDefaultTimeout(30 * 1000);

let browser: Browser;

BeforeAll(async function () {
    EnvHelper.loadEnv();
    const browserName = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS === 'true';

    switch (browserName) {
        case 'firefox':
            browser = await firefox.launch({ headless });
            break;
        case 'webkit':
            browser = await webkit.launch({ headless });
            break;
        default:
            browser = await chromium.launch({ headless });
    }
});

Before(async function (this: CustomWorld, scenario) {
    const context = await browser.newContext({
        baseURL: process.env.BASE_URL,
        recordVideo: { dir: './videos' }
    });

    const page = await context.newPage();

    const apiContext = await request.newContext({
        baseURL: process.env.API_URL
    });

    await this.init(context, page, apiContext);
});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        if (this.page) {
            const screenshot = await this.page.screenshot({
                path: `./reports/screenshots/${scenario.pickle.name.replace(/ /g, '_')}.png`,
            });
            this.attach(screenshot, 'image/png');
        }
    }

    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.apiRequestContext) await this.apiRequestContext.dispose();
});

AfterAll(async function () {
    if (browser) await browser.close();
});
