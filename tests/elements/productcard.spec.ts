import { test, expect } from '@playwright/test';
import { ProductCardIndexPage } from '../../pages/ProductDetails';

test.describe('Tests around  ProductCard', async()=>{

    let productCard: ProductCardIndexPage;
    const cardName = 'Awesome Metal Chair';

    test.beforeEach(async({page})=>{
        productCard = new ProductCardIndexPage(page);
        productCard.goToIndexPage();
    });

    test('Identify product card by given name',async({page})=>{
        productCard.OpenProductPage(cardName);
        console.log(page.url);
        await expect(page).toHaveURL('/#/product/3');
    }); 
    
    test('Verify all elements from card are being visible to the user', async()=>{
        
        await expect(productCard.CardDisplayImage(cardName)).toBeVisible();

        await expect(productCard.CardTitle(cardName)).toBeVisible();
        const cardTitle = await productCard.CardTitle(cardName).textContent();  
        console.log('Card Title: '+cardTitle);

        await expect(productCard.CardDescription(cardName)).toBeVisible();
        const cardDescription = await productCard.CardDescription(cardName).textContent();  
        console.log('Card description: '+cardDescription);
       
        await expect(productCard.CardBasketButton(cardName)).toBeVisible();
        await expect(productCard.CardFavioritesButton(cardName)).toBeVisible();
    });
});
