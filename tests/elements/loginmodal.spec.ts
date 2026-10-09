import { test, expect } from '@playwright/test';
import { LoginActions } from '../../pages/LoginModal';
import { HomePage } from '../../pages/HomePage';

test(`Validate SignIn button is displayed in the Page's header and clickable`, async ({page}) =>{

    let loginModal: LoginActions;
    let homePageElements: HomePage;

    //Creating the page object
    loginModal = new LoginActions(page);
    homePageElements = new HomePage(page);
    await(loginModal.goToIndexPage());
    
    await expect(homePageElements.SignInButton).toBeVisible();
    homePageElements.SignInButton.click();
    await expect(loginModal.ModalTitle).toBeVisible();
 });

test(`Validate the existance of Input fields, Login button and error message`, async ({page}) =>{

    let loginModal: LoginActions;
    let homePageElements: HomePage;


    //Creating the page object
    loginModal = new LoginActions(page);
    homePageElements = new HomePage(page);
    await(loginModal.goToIndexPage());

    homePageElements.SignInButton.click();
    await expect(loginModal.UsernameInputField).toBeVisible();
    await expect(loginModal.PasswordInputField).toBeVisible();
    await expect(loginModal.LoginButton).toBeVisible();

    loginModal.LoginButton.click();
    await expect(loginModal.ErrorMessage).toBeVisible();

    const returnedErrorMessage = await loginModal.ErrorMessage.textContent();  
    console.log('Displayed error message: '+returnedErrorMessage);
});


