import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import { USERS, INVALID_USERS, UserType, InvalidUserType } from '../../constants/test-data';
import { ERROR_MESSAGES, ErrorKey } from '../../constants/error-messages';

Given('I am on the Sauce Demo login page', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto();
});


When('I login as user {string}', async function (this: ICustomWorld, userType: string) {
  const loginPage = new LoginPage(this.page!);
  const user = USERS[userType as UserType];
  
  if (!user) {
    throw new Error(`Unknown user type: ${userType}`);
  }
  
  await loginPage.login(user.username, user.password);
  this.testData.currentUser = user;
});

When('I login with invalid credentials {string}', async function (this: ICustomWorld, invalidType: string) {
  const loginPage = new LoginPage(this.page!);
  const invalidUser = INVALID_USERS[invalidType as InvalidUserType];
  
  if (!invalidUser) {
    throw new Error(`Unknown invalid user type: ${invalidType}`);
  }
  
  await loginPage.login(invalidUser.username, invalidUser.password);
  this.testData.invalidAttempt = invalidUser;
});

Then('I should be redirected to the inventory page', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/.*inventory.html/);
});

Then('the inventory page should be displayed', async function (this: ICustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  const isVisible = await inventoryPage.isLoaded();
  expect(isVisible).toBeTruthy();
});

Then('I should see error {string}', async function (this: ICustomWorld, errorKey: string) {
  const loginPage = new LoginPage(this.page!);
  const actualError = await loginPage.getErrorMessage();
  const expectedError = ERROR_MESSAGES.LOGIN[errorKey as ErrorKey];
  
  if (!expectedError) {
    throw new Error(`Unknown error key: ${errorKey}`);
  }
  
  expect(actualError).toBe(expectedError);
});