import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(private page: Page) {
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.productDescription = page.locator('.inventory_details_desc');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async isLoaded(): Promise<boolean> {
    return await this.productName.isVisible();
  }

  async getProductName(): Promise<string> {
    return await this.productName.textContent() || '';
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || '';
  }

  async getProductDescription(): Promise<string> {
    return await this.productDescription.textContent() || '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    if (await this.removeButton.isVisible()) {
      await this.removeButton.click();
    }
  }

  async goBackToProducts(): Promise<void> {
    await this.backButton.click();
  }
}