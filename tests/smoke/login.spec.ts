import {test, expect, BrowserContext, Page} from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginActions } from '../../pages/LoginModal'
import { validUsers, invalidUsers, lockedOutUsers } from '../../data/users';


test.describe(`Login process tests`, ()=>{

    let homePage: HomePage;
    let loginAction: LoginActions;
    let browserContext: BrowserContext;
    let page: Page;

    test.beforeEach(async({browser})=>{
        
        browserContext = await browser.newContext(); // new session for each test
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginAction = new LoginActions(page);
        await homePage.goToIndexPage();

    });

    test.afterEach(async()=>{
        await browserContext.close(); // close session after each test
    });

    for(const user of validUsers){
    test(`1 - test login process with valid users --- ${user.name}`, async() =>{
            await loginAction.loginUser(user);
            await expect(homePage.greetingMessage(user)).toBeVisible();
            await expect(homePage.LogOutButton).toBeVisible();
            await homePage.LogOutButton.click();
    });
}
});