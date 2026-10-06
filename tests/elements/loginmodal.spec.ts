import { test, expect } from '@playwright/test';
import { LoginModal } from '../../pages/LoginModal';

test(`Validate SignIn button is displayed in the Page's header and clickable`, async ({page}) =>{

    let loginModal: LoginModal;

    //Creating the page object
    loginModal = new LoginModal(page);
    await(loginModal.goToIndexPage());
    
    await expect(loginModal.ModalLoginButton).toBeVisible();
    loginModal.ModalLoginButton.click();
    await expect(loginModal.ModalTitle).toBeVisible();
});