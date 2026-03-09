import { Page, Locator } from '@playwright/test';
import { BASKET_SELECTORS } from '../constants/basket';

export interface CartItem {
  name: string;
  quantity: string;
  price: string;
}

export class CartPage {
  readonly cartItems: Locator;
  readonly cartList: Locator;

  constructor(private page: Page) {
    this.cartItems = page.locator(BASKET_SELECTORS.CART_ITEM);
    this.cartList = page.locator(BASKET_SELECTORS.CART_LIST);
  }

  async isLoaded(): Promise<boolean> {
    return await this.cartList.isVisible();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getItemDetails(index: number = 0): Promise<CartItem> {
    const item = this.cartItems.nth(index);
    
    return {
      name: await item.locator(BASKET_SELECTORS.ITEM_NAME).textContent() || '',
      quantity: await item.locator(BASKET_SELECTORS.ITEM_QUANTITY).textContent() || '',
      price: await item.locator(BASKET_SELECTORS.ITEM_PRICE).textContent() || ''
    };
  }

  async getAllItems(): Promise<CartItem[]> {
    const count = await this.getItemCount();
    const items: CartItem[] = [];
    
    for (let i = 0; i < count; i++) {
      items.push(await this.getItemDetails(i));
    }
    
    return items;
  }
}