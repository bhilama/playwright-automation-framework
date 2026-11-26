import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

import { BaseApiClient } from '../api/BaseApiClient';

import { Logger } from '../utilities/Logger';
import { getEnvironment } from '../config/environment';

const environment = getEnvironment();


type TestFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    testLifeCycle: void;
    logger: Logger;
    apiClient: BaseApiClient;
};

export const test = base.extend<TestFixtures>({
    loginPage: async ({page, logger}, use) =>{
        const loginPage = new LoginPage(page, logger);

        await use(loginPage);
    },

    dashboardPage: async ({page, logger}, use) =>{
        const dashboardPage = new DashboardPage(page, logger);
        
        await use(dashboardPage);
    },

    logger: async ({}, use) => {
        const logger = new Logger();

        await use(logger);
    },

    apiClient: async ({request, logger}, use) => {
        const apiClient = new BaseApiClient(request, logger, environment.apiBaseURL);

        await use(apiClient);
    },

    testLifeCycle: [async ({logger}, use, testInfo) => {
        const testName = testInfo.title;

        logger.info(`Test execution started: ${testName}`);

        try{
            await use();
        }
        finally{
            if(testInfo.status === 'passed'){
                logger.info(`Test execution passed: ${testName}`);
            }
            else{
                logger.error(`Test execution ${testInfo.status}: ${testName}`);
            }
        }
    }, {auto:true}],

})

export { expect };