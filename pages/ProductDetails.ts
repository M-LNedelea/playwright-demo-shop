import {Page, Locator} from '@playwright/test'
import { text } from 'node:stream/consumers';

export class ProductCardIndexPage{

    constructor(private readonly page: Page) {};

    //---Navigate to the index page---
    async goToIndexPage(){
        this.page.goto('/');
    }

    //---Navigate to a Product details page---
    async goToProductDetailsPage(productIndex: string){
        this.page.goto(`/product/${productIndex}`);
    }

    //---Search for a card using by a given name---
    private card(name: string): Locator{
        return this.page.locator('.card', {has: this.page.getByRole('link', {name})});
    }

    //---Open the details page of the card with the given name---
    async OpenProductPage(name: string): Promise<void>{
        await this.card(name).getByRole('link', { name }).click();
    }

    //---Card Image---
    CardDisplayImage(name: string): Locator{
        return this.card(name).getByAltText(name);
    }

    //---Card Title---
    CardTitle(name: string): Locator{
        return this.card(name).getByRole('link', { name });
    }

    //---Card description---
    CardDescription(name: string): Locator{
        return this.card(name).locator('.card-body .card-text');
    }

    //---Card Price---


    //---Basket button from the card product---
    CardBasketButton(name: string): Locator{
        return this.card(name).locator('button [data-icon="cart-plus"]');
    }

    //---Favorites button from the card product---
    CardFavioritesButton(name: string): Locator{
        return this.card(name).locator('button [data-icon="heart"]');
    }

    //---Card stock status message---

};