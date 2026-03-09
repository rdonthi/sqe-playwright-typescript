import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import { ProductDetailsPage } from '../../pages/product-details-page';
import { USERS } from '../../constants/test-data';

Given('I am logged in as a standard user', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto();
  await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
  
  const inventoryPage = new InventoryPage(this.page!);
  const isLoaded = await inventoryPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Given('my basket is empty', async function (this: ICustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  const itemCount = await inventoryPage.getCartItemCount();
  expect(itemCount).toBe(0);
});

When('I view the {string} product details', async function (this: ICustomWorld, productName: string) {
  const inventoryPage = new InventoryPage(this.page!);
  await inventoryPage.viewProductDetails(productName);
  this.testData.productName = productName;
});

When('I check the product name and price', async function (this: ICustomWorld) {
  const productPage = new ProductDetailsPage(this.page!);
  
  this.testData.actualProductName = await productPage.getProductName();
  this.testData.actualProductPrice = await productPage.getProductPrice();
  
  console.log(`Product details: "${this.testData.actualProductName}" - ${this.testData.actualProductPrice}`);
  
  expect(this.testData.actualProductName).toBeTruthy();
  expect(this.testData.actualProductPrice).toMatch(/\$\d+\.\d{2}/);
});

When('I add the product to the basket', async function (this: ICustomWorld) {
  const productPage = new ProductDetailsPage(this.page!);
  await productPage.addToCart();
});

Then('the basket should show {int} item', async function (this: ICustomWorld, expectedCount: number) {
  const inventoryPage = new InventoryPage(this.page!);
  const itemCount = await inventoryPage.getCartItemCount();
  expect(itemCount).toBe(expectedCount);
});

When('I open the basket', async function (this: ICustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  await inventoryPage.openCart();
  
  const cartPage = new CartPage(this.page!);
  const isLoaded = await cartPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should see the product with the same name and price', async function (this: ICustomWorld) {
  const cartPage = new CartPage(this.page!);
  
  const cartItem = await cartPage.getItemDetails(0);
  
  const cartPrice = cartItem.price.replace('$', '');
  const productPrice = this.testData.actualProductPrice.replace('$', '');
  
  // Assert against the values we checked earlier
  expect(cartItem.name).toBe(this.testData.actualProductName);
  expect(cartPrice).toBe(productPrice);
  expect(parseInt(cartItem.quantity)).toBe(1);
  
  console.log(`Verified: Cart contains "${cartItem.name}" at $${cartPrice}`);
});