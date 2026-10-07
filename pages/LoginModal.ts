import { Page, Locator, expect } from "@playwright/test";
import { User } from "../objects/user";
import { HomePage } from "./HomePage";

export class LoginModal{
    constructor(readonly page: Page) {};

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
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    //---Modal Login button for the actual Login process---
    get LoginButton(): Locator{
        return this.page.getByRole('button', { name: 'Login' });
    }

    //---Modal Error message for Login---
        get ErrorMessage(): Locator{
        return this.page.locator('.error');
    }
}

export class LoginActions extends LoginModal{
     constructor( page: Page) {
         super(page);
     };

    homePageElements = new HomePage(this.page);

    async loginUser(user: User): Promise<void> {
        this.homePageElements.SignInButton.click();

        this.UsernameInputField.fill(user.name);
        this.PasswordInputField.fill(user.password);
        this.LoginButton.click();
    }

    async loginStatus(user: User): Promise<void>{
        await expect(this.homePageElements.greetingMessage(user)).toBeVisible();
    };
}
