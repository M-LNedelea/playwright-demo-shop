import { Page, Locator } from "@playwright/test";

export class LoginModal{
    constructor(private readonly page: Page) {};

    //---Navigate to the index page---
    async goToIndexPage(){
        this.page.goto('/');
    }

    //---Sign-in Modal button---
    get ModalLoginButton(): Locator{
        return this.page.locator('button [data-icon="sign-in-alt"]');
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

    //---Modal Login button---
    get LoginButton(): Locator{
        return this.page.getByRole('button', { name: 'Login' });
    }

    //---Modal Error message for Login---
        get ErrorMessage(): Locator{
        return this.page.locator('.error');
    }

}
