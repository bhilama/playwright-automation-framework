import { test, expect} from '../../src/fixtures/test-fixtures';
import { getEnvironment } from '../../src/config/environment';
import loginData from '../../src/testdata/login-testdata.json';


const env = getEnvironment();

test(`User should log in successfully with valid credentials.`, async ({loginPage, dashboardPage}) =>{
    const userName = env.username;
    const password = env.password;

    await loginPage.navigate();
    await loginPage.login(userName, password);

    await expect(dashboardPage.dashboardHeader).toBeVisible();
});


for(const data of loginData){
    test(`User should get an error message for '${data.scenario}'`, async ({loginPage}) => {
        await loginPage.navigate();
        await loginPage.login(data.username, data.password);

        if(data.messageType.trim() == "alert"){
            await expect(loginPage.invalidCredentialMsg).toHaveText('Invalid credentials');
        }
        else{
            await expect(loginPage.requiredCredentialMsg).toHaveText(data.expectedMessage);
        }        
    });
};