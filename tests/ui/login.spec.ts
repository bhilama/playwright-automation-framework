import { test, expect} from '../../src/fixtures/test-fixtures';
import { getEnvironment } from '../../src/config/environment';

const env = getEnvironment();

test(`User should log in successfully with valid credentials.`, async ({loginPage, dashboardPage}) =>{
    const userName = env.username;
    const password = env.password;

    await loginPage.navigate();
    await loginPage.login(userName, password);

    await expect(dashboardPage.dashboardHeader).toBeVisible();
});


test(`User should display an error message for invalid credentials.`, async ({loginPage}) => {
    await loginPage.navigate();
    await loginPage.login('abc', 'pqr');

    await expect(loginPage.invalidCredentialMsg).toBeVisible();
})