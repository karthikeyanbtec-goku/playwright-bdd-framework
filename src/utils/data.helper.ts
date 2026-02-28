import * as fs from 'fs';
import * as path from 'path';

export class DataHelper {
    private static testData: any = null;

    /**
     * Loads the JSON test data file corresponding to the current environment specified in process.env.ENV.
     */
    public static loadData() {
        const env = process.env.ENV || 'qa';
        const filePath = path.resolve(process.cwd(), `src/test-data/${env}.data.json`);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Test data file not found at: ${filePath}`);
        }

        const rawData = fs.readFileSync(filePath, 'utf-8');
        this.testData = JSON.parse(rawData);
        console.log(`Test Data Loaded for Environment: ${env}`);
    }

    /**
     * Retrieves a nested value from the loaded test data JSON using a dot-notation path (e.g., 'shipping.valid.firstName').
     * 
     * @param path The dot-notation string path to the desired value.
     * @returns The resolved value from the JSON.
     */
    public static get(path: string): any {
        if (!this.testData) {
            this.loadData();
        }

        return path.split('.').reduce((acc, part) => {
            if (acc && typeof acc === 'object') {
                return acc[part];
            }
            return undefined;
        }, this.testData);
    }
}
