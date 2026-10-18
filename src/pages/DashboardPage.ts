import { Locator, Page } from "@playwright/test";

export class DashboardPage{
    readonly dashboardHeader: Locator;

    constructor(private readonly page: Page){
        this.dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard'});
    }
}