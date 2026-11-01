import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utilities/Logger";

export class DashboardPage extends BasePage{
    readonly dashboardHeader: Locator;

    constructor(readonly page: Page, logger: Logger){
        super(page, logger);
        this.dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard'});
    }
}