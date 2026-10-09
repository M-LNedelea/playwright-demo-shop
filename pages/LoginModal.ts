import { Page, Locator, expect } from "@playwright/test";
import { User } from "../objects/user";
import { HomePage } from "./HomePage";


export class LoginActions{
    constructor(private readonly page: Page) {};

    //---Navigate to the index page---
    async goToIndexPage(){
        this.page.goto('/');
    }

    //---Modal Title---
    get ModalTitle(): Locator{
        return this.page.locator('small').filter({ hasText: 'Login' });
    }

    //---Modal Username input field---
    get UsernameInputField(): Locator{
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    //---Modal Password input field---
    get PasswordInputField(): Locator{
        return this.page.getByRole('textbox', { name: 'Password' });;
    }

    //---Modal Login button for the actual Login process---
    get LoginButton(): Locator{
        return this.page.getByRole('button', { name: 'Login' });
    }

    //---Modal Error message for Login---
        get ErrorMessage(): Locator{
        return this.page.locator('.error');
    }

    async loginUser(user: User): Promise<void> {
        let homePageElements: HomePage;
        homePageElements = new HomePage(this.page);
        await homePageElements.SignInButton.click();
        await this.UsernameInputField.fill(user.name);
        await this.PasswordInputField.fill(user.password);
        await this.LoginButton.click();
        console.log(user.name+" logged in successfully!");
    }

    async logoutUser(): Promise<void> {
    let homePageElements: HomePage;
    homePageElements = new HomePage(this.page);
    await expect(homePageElements.LogOutButton).toBeVisible();    
    await homePageElements.LogOutButton.click();
  }
}
