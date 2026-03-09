export const BASKET_MESSAGES = {
  EMPTY: 'Your cart is empty',
  ITEM_ADDED: 'Item added to cart',
  REMOVED: 'Item removed from cart'
} as const;

export const BASKET_SELECTORS = {
  BADGE: '.shopping_cart_badge',
  LINK: '.shopping_cart_link',
  CART_LIST: '.cart_list',
  CART_ITEM: '.cart_item',
  ITEM_NAME: '.inventory_item_name',
  ITEM_QUANTITY: '.cart_quantity',
  ITEM_PRICE: '.inventory_item_price'
} as const;