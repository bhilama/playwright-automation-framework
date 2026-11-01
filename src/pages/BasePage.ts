import { Page } from "@playwright/test";
import { Logger } from "../utilities/Logger";

export class BasePage{
    protected page: Page;
    protected logger: Logger;

    constructor(page: Page, logger: Logger){
        this.page = page;
        this.logger = logger;
    }
}