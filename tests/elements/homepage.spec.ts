import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test(`Validate visible elements from the Page's header`, async ({page}) =>{

    let homePage: HomePage;

    //Creating the page object
    homePage = new HomePage(page);
    await(homePage.goToIndexPage());
    
    //Verify Green Bag Icon
        await expect(homePage.BagSvg).toBeVisible();

    //Verify H1 Text
        await expect(homePage.HeadingTitle).toBeVisible();

    //Verify Basket Icon
        await expect(homePage.BasketSvg).toBeVisible();

    //Verify Favorites Icon
        await expect(homePage.FavoritesSvg).toBeVisible();

    //Verify SignIn button
        await expect(homePage.SignInButton).toBeVisible();
});


test.describe('Verify redirects from the page header', () =>{

    let homePage: HomePage;

    //Creating the page object everytime a test runs
    test.beforeEach(async({page})=>{
        homePage = new HomePage(page);
        await(homePage.goToIndexPage()); 
    });

    test('Verify redirect for the Green Bag icon',async({page})=>{
        await homePage.BagSvg.click();
        await expect(page).toHaveURL('/');

    });

    test('Verify redirect for the Basket icon',async({page})=>{
        await expect(homePage.BasketHyperlink).toHaveAttribute('href','#/cart');
        await homePage.BasketSvg.click();
        await expect(page).toHaveURL('#/cart');
    });

    test('Verify redirect for the Favorites icon',async({page})=>{
        await expect(homePage.FavoritesHyperlink).toHaveAttribute('href','#/wishlist');
        await homePage.FavoritesSvg.click();
        await expect(page).toHaveURL('#/wishlist');
    });
});

test.describe('Verify searching and sorting elements', () =>{

    let homePage: HomePage;
    //Creating the page object everytime a test runs

    test.beforeEach(async({page})=>{
        homePage = new HomePage(page);
        homePage.goToIndexPage();
    });

    test('Verify elements on the page', async()=>{

        await expect(homePage.SearchInput).toBeVisible();
        await expect(homePage.SearchButton).toBeVisible();
        await expect(homePage.SortingDropdown).toBeVisible();
    });

    test('Verify sorting options for Sorting Dropdown - by value', async()=>{
        await homePage.SortingDropdown.selectOption('az');
        await homePage.SortingDropdown.selectOption('za');
        await homePage.SortingDropdown.selectOption('lohi');
        await homePage.SortingDropdown.selectOption('hilo');
    });

    test('Verify sorting options for Sorting Dropdown - by text', async()=>{
        await homePage.SortingDropdown.selectOption('Sort by name (A to Z)');
        await homePage.SortingDropdown.selectOption('Sort by name (Z to A)');
        await homePage.SortingDropdown.selectOption('Sort by price (low to high)');
        await homePage.SortingDropdown.selectOption('Sort by price (high to low)');
    });

    test('Verify Product Cards being displayed on the page', async()=>{

        await expect(homePage.BagSvg).toBeVisible();
        //the test runs too quickly and there is no time to calculate the number of cards without the first validation
        const cardCount = await homePage.AllAvailableProductCards.count();
        expect (cardCount).toBeGreaterThan(2);
        console.log('The number of available cards is '+ cardCount);

    });

    test('Verify Product Card by its name', async()=>{
        await expect(homePage.ProductCard('Awesome Granite Chips')).toBeVisible();
    });
});




