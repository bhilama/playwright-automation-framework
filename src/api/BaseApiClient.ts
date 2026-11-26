import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from '../utilities/Logger';

export class BaseApiClient {

    private request: APIRequestContext;
    private logger: Logger;
    private baseURL: string;

    constructor(request: APIRequestContext, logger: Logger, baseURL: string) {
        this.request = request;
        this.logger = logger;
        this.baseURL = baseURL;
    }

    async get(endpoint: string): Promise<APIResponse> {
        return this.sendRequest('GET', endpoint);
    };


    async post<T>(endpoint: string, requestBody: T ): Promise<APIResponse>{        
        return this.sendRequest('POST', endpoint, requestBody);
    };


    async put<T>(endpoint: string, requestBody: T): Promise<APIResponse>{        
        return this.sendRequest('PUT', endpoint, requestBody);
    };


    async patch<T>(endpoint: string, requestBody: T): Promise<APIResponse>{
        return this.sendRequest('PATCH', endpoint, requestBody);
    };


    async delete(endpoint: string): Promise<APIResponse>{
        return this.sendRequest('DELETE', endpoint);
    };

    private async sendRequest(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        endpoint: string,
        requestBody?: unknown 
    ): Promise<APIResponse>{

        const url = new URL(endpoint, this.baseURL).toString();

        this.logger.info(`Sending ${method} request to ${url}`);

        const response = await this.request.fetch(url, {
            method: method,
            data: requestBody
        });

        this.logger.info(`${method} response status: ${response.status()}`);

        return response;
    };
}