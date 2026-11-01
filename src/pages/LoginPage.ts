import { Locator, Page} from "@playwright/test";
import { Logger } from "../utilities/Logger";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    private readonly userNameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;

    readonly invalidCredentialMsg: Locator;
    readonly requiredCredentialMsg: Locator;

    constructor( readonly page: Page, logger: Logger){
        super(page, logger);
        this.userNameTextbox = this.page.getByRole('textbox', {name: 'Username'});
        this.passwordTextbox = this.page.getByRole('textbox', {name: 'Password'});
        this.loginButton = this.page.getByRole('button', {name: 'Login'});
        this.invalidCredentialMsg = this.page.getByRole('alert');
        this.requiredCredentialMsg = this.page.getByText('Required');
    };    
    

    async navigate():Promise<void>{
        this.logger.info('Navigate to login page.');
        await this.page.goto('/');
        this.logger.info('Login page navigation completed.');
    };


    /*
    This method accepts any value for user name and password provided by the calling method.
    e.g. empty string, string with some spaces, string with alpha-numeric value.
    */
    async login(userName: string, password: string): Promise<void>{
        this.logger.info('Entering username.');
        await this.userNameTextbox.fill(userName);    
        
        this.logger.info('Entering password.');
        await this.passwordTextbox.fill(password);      
        
        this.logger.info('Clicking on login button.');
        await this.loginButton.click();
    }    
}