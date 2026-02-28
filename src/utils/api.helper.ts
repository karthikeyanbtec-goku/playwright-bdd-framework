import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(endpoint: string, params?: { [key: string]: string | number }): Promise<APIResponse> {
        console.log(`GET Request to: ${endpoint}`);
        return await this.request.get(endpoint, { params });
    }

    async post(endpoint: string, data: any): Promise<APIResponse> {
        console.log(`POST Request to: ${endpoint} with payload: ${JSON.stringify(data)}`);
        return await this.request.post(endpoint, { data });
    }

    async put(endpoint: string, data: any): Promise<APIResponse> {
        console.log(`PUT Request to: ${endpoint} with payload: ${JSON.stringify(data)}`);
        return await this.request.put(endpoint, { data });
    }

    async delete(endpoint: string): Promise<APIResponse> {
        console.log(`DELETE Request to: ${endpoint}`);
        return await this.request.delete(endpoint);
    }
}
