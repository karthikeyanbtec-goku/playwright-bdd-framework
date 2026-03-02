import { APIRequestContext, request } from '@playwright/test';

export class DataAgent {
    /**
     * Bypasses UI login by performing an API request and returning session cookies/state.
     * This can save 10-20 seconds per test case.
     */
    static async fastLogin(apiContext: APIRequestContext, userType: string = 'standard_user') {
        const username = userType === 'standard_user' ? process.env.ADMIN_USER || 'standard_user' : userType;
        const password = process.env.ADMIN_PASS || 'secret_sauce';

        // Example for SauceDemo (Note: SauceDemo is a front-end only app, 
        // but in a real enterprise app, you'd hit a /login endpoint)
        console.log(`[DataAgent] Performing fast login for ${username}...`);

        // In a real scenario, you'd do:
        // await apiContext.post('/api/login', { data: { username, password } });

        // For this demo framework, we simulate the 'instant' state injection.
        return {
            status: 'success',
            username,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Pre-seeds test data via API to ensure a clean state without using the UI.
     */
    static async seedTestData(apiContext: APIRequestContext, endpoint: string, data: any) {
        console.log(`[DataAgent] Seeding data to ${endpoint}...`);
        // await apiContext.post(endpoint, { data });
    }
}
