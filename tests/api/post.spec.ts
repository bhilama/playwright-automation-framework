import { expect, test } from "../../src/fixtures/test-fixtures";
import { CreatePostRequest } from "../../src/api/models/CreatePostRequest";
import { UpdatePostRequest } from "../../src/api/models/UpdatePostRequest";
import { PatchPostRequest } from "../../src/api/models/PatchPostRequest";

test('This is GET request.', async ( {apiClient, logger}) => {
    logger.info('Starting GET API test.');

    const response = await apiClient.get('/posts/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.userId).toBe(1);

    logger.info(await response.text());
});

test('Create POST request', async ( { apiClient, logger}) => {

    const postData: CreatePostRequest = {
        title: 'Playwright API Automation',
        body: 'Learning POST requests',
        userId: 1
    };

    logger.info('Starting POST API test');

    const response = await apiClient.post<CreatePostRequest>('/posts', postData);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(postData.title);
});

test('Create PUT request', async ({apiClient, logger}) => {

    const putData: UpdatePostRequest = {
        "id": 1,
        "title": "Updated Playwright Framework",
        "body": "Learning API automation",
        "userId": 1
    };

    logger.info('Starting PUT API test');

    const response = await apiClient.put<UpdatePostRequest>('/posts/1', putData);

    logger.info(`Response status is: ${response.status()}`);
    logger.info(`Response Body: ${response.text()}`);
});

test(`PATCH request to update selected field`, async ({apiClient, logger}) => {
    const patchData: Partial<CreatePostRequest> ={
        title: "Updated Title using PATCH"
    };

    logger.info('Starting PATCH API test');

    const response = await apiClient.patch<Partial<CreatePostRequest>>('/posts/1', patchData);

    logger.info(`Response status is: ${response.status()}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(responseBody.title).toBe(patchData.title);
});

test('DELETE request to delete selected record', async ({apiClient, logger}) => {
    
    logger.info('Starting DELETE API test');

    const response = await apiClient.delete('/posts/1');

    logger.info(`Response status is: ${response.status()}`);

    expect(response.status()).toBe(200);

})
