import { test, expect} from '@playwright/test';

test(`Verify application is accessible.`, async ({page}) =>{
await page.goto(`/`);
console.log(`Application URL: ${page.url()}`);
})