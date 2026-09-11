import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export interface EnvironmentConfig {
    name: string;
    baseURL: string;
    username?: string;
    password?: string;
}

export function getEnvironment(): EnvironmentConfig {

    // Read TEST_ENV from environment variable
    const environmentName = process.env.TEST_ENV || 'dev';

    // Build path to environment file based on the actual project structure
    const envFilePath = path.resolve(
        __dirname,
        '../environments',
        `${environmentName}.env`
    );

    // Check if environment file exists
    if (!fs.existsSync(envFilePath)) {
        throw new Error(
            `Environment file not found: ${envFilePath}\n` +
            `Valid environments: dev, uat, prod`
        );
    }

    // Load .env file
    const envConfig = dotenv.config({
        path: envFilePath,
        override: true
    });

    if (envConfig.error) {
        throw new Error(
            `Failed to load environment file: ${envFilePath}\n` +
            envConfig.error.message
        );
    }

    // Validate required configuration
    if (!process.env.BASE_URL) {
        throw new Error(
            `BASE_URL is missing in ${environmentName}.env`
        );
    }
    

    return {
        name: environmentName,
        baseURL: process.env.BASE_URL,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    };
}