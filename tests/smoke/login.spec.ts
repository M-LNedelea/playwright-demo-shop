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
            console.log(user.name+" logged in successfully!");
            await expect(homePage.LogOutButton).toBeVisible();
            await homePage.LogOutButton.click();
        });
    }

    for(const user of invalidUsers){
        test(`2 -  test login process for invalid users --- ${user.name}`, async() =>{
            await loginAction.loginUser(user);
            await expect(loginAction.ErrorMessage).toBeVisible();
            const displayedErrorMessage = await loginAction.ErrorMessage.textContent();
            console.log(`${user.name} cannot log-in. The displayed error is: ${displayedErrorMessage}`);
        })
    }

    for(const user of lockedOutUsers){
        test(`3- test login process for locked-out users --- ${user.name}`, async() =>{
            await loginAction.loginUser(user);
            await expect(loginAction.ErrorMessage).toBeVisible();
            const displayedErrorMessage = await loginAction.ErrorMessage.textContent();
            await expect(displayedErrorMessage).toContain('has been locked out');
            console.log(`${user.name} cannot log-in. The displayed error is: ${displayedErrorMessage}`);
        });
    }

    test('Verify error message when username is not inserted', async()=>{
        await homePage.SignInButton.click();
        await expect(loginAction.UsernameInputField).toBeVisible();
        await expect(loginAction.PasswordInputField).toBeVisible();
        await expect(loginAction.LoginButton).toBeVisible();

        await loginAction.UsernameInputField.fill('');
        await loginAction.LoginButton.click();
        await expect(loginAction.ErrorMessage).toBeVisible();

        const displayedErrorMessage = await loginAction.ErrorMessage.textContent();
        await expect(displayedErrorMessage).toContain('Please fill in the username!');
        console.log(`The displayed error is: ${displayedErrorMessage}`);

    });

        test('Verify error message when password is not inserted', async()=>{
        await homePage.SignInButton.click();
        await expect(loginAction.UsernameInputField).toBeVisible();
        await expect(loginAction.PasswordInputField).toBeVisible();
        await expect(loginAction.LoginButton).toBeVisible();

        await loginAction.UsernameInputField.fill('test');
        await loginAction.PasswordInputField.fill('');
        await loginAction.LoginButton.click();
        await expect(loginAction.ErrorMessage).toBeVisible();

        const displayedErrorMessage = await loginAction.ErrorMessage.textContent();
        await expect(displayedErrorMessage).toContain('Please fill in the password!');
        console.log(`The displayed error is: ${displayedErrorMessage}`);
    });
});