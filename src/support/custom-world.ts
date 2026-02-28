import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page, PlaywrightTestOptions, request, APIRequestContext } from '@playwright/test';
import { EnvHelper } from '../utils/env.helper';

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export class CustomWorld extends World {
    context?: BrowserContext;
    page?: Page;
    apiRequestContext?: APIRequestContext;

    constructor(options: IWorldOptions) {
        super(options);
        EnvHelper.loadEnv(); // Ensure env variables are loaded explicitly for Cucumber
    }

    async init(context: BrowserContext, page: Page, apiContext: APIRequestContext) {
        this.context = context;
        this.page = page;
        this.apiRequestContext = apiContext;
    }
}

setWorldConstructor(CustomWorld);
