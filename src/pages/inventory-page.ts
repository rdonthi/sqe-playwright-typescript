
import { Page, Locator } from '@playwright/test';
import { BASKET_SELECTORS } from '../constants/basket';
import { ProductDetailsPage } from './product-details-page';

export class InventoryPage {
  readonly inventoryContainer: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private page: Page) {
    this.inventoryContainer = page.locator('.inventory_container');
    this.cartBadge = page.locator(BASKET_SELECTORS.BADGE);
    this.cartLink = page.locator(BASKET_SELECTORS.LINK);
  }

  async isLoaded(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }

  async viewProductDetails(productName: string): Promise<void> {
  
    await this.page.locator(`.inventory_item_name:has-text("${productName}")`).click();
    
  }

  async addItemToCart(itemName: string): Promise<void> {
    const itemId = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
  }

  async getCartItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent() || '0');
    }
    return 0;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}