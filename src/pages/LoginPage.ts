import { Locator, Page} from "@playwright/test";

export class LoginPage{

    private readonly userNameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    
    readonly invalidCredentialMsg: Locator;

    constructor(private readonly page: Page){
    this.userNameTextbox = this.page.getByRole('textbox', {name: 'Username'});
    this.passwordTextbox = this.page.getByRole('textbox', {name: 'Password'});
    this.loginButton = this.page.getByRole('button', {name: 'Login'});
    this.invalidCredentialMsg = this.page.getByText('Invalid credentials');
    };    
    

    async navigate():Promise<void>{
        await this.page.goto('/');
    };


    /*
    This method accepts any value for user name and password provided by the calling method.
    e.g. empty string, string with some spaces, string with alpha-numeric value.
    */
    async login(userName: string, password: string): Promise<void>{
        await this.userNameTextbox.fill(userName);         
        await this.passwordTextbox.fill(password);        
        await this.loginButton.click();
    }    
}