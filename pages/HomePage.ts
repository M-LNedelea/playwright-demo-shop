import {Page, Locator} from '@playwright/test'

export class HomePage {
    constructor(private readonly page: Page) {};

    //---Navigate to the indedx page---
    async goToIndexPage(){
        this.page.goto('/');
    }
    
    //---Get the Page's Bag-Icon locator---
    get BagSvg(): Locator{
        return this.page.locator('a [data-icon=shopping-bag]');
    }

    //--Get the Heading locator---
    get HeadingTitle(): Locator{
        return this.page.getByRole('heading', {level:1, name:'Products'});
    }
    
    //---Get the Page's Basket-Icon locator by the data-icon---
    get BasketSvg(): Locator{
        return this.page.locator('a [data-icon=shopping-cart]');
    }

    //---Get the Basket-Icon locator by the redirecting link---
    get BasketHyperlink(): Locator{
        return this.page.locator('a[href="#/cart"]');
    }

    //---Get the Page's Favorite-Icon locator by the data-icon---
    get FavoritesSvg(): Locator{
        return this.page.locator('a [data-icon=heart]');
    }

    //---Get the Favorite-Icon locator by the redirecting link---
    get FavoritesHyperlink(): Locator{
        return this.page.locator('a[href="#/wishlist"]');
    }

    //---Get greeting for anonymous access---
    GetGenericGreetingforAnonymousAccess(givenText: string): Locator{
        return this.page.getByText(givenText);
    }

    //---Get SignIn button locator---
    get SignInButton(): Locator{
        return this.page.locator('button [data-icon="sign-in-alt"]');
    }

    //---Get Search Input---
    get SearchInput(): Locator{
        return this.page.locator('#input-search');
    }
    
    //---Get Search Button---
    get SearchButton(): Locator{
        return this.page.getByRole('button', {name: "Search"});
    }

    //---Get Sorting Dropdown with options--
    get SortingDropdown(): Locator{
        return this.page.locator('select.sort-products-select');
    }
}