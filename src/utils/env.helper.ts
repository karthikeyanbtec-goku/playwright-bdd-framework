import * as dotenv from 'dotenv';
import path from 'path';

export class EnvHelper {
    static loadEnv() {
        const env = process.env.ENV || 'qa';
        const envPath = path.resolve(process.cwd(), `.env.${env}`);
        dotenv.config({ path: envPath });

        console.log(`Environment loaded: ${env}`);
    }

    static get(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Environment variable ${key} is not set.`);
        }
        return value;
    }
}
