export const PRODUCTS = {
  SAUCE_LABS_BACKPACK: {
    id: 'sauce-labs-backpack',
    displayName: 'Sauce Labs Backpack',
    price: '29.99',
    testId: 'add-to-cart-sauce-labs-backpack'
  },
  SAUCE_LABS_BIKE_LIGHT: {
    id: 'sauce-labs-bike-light',
    displayName: 'Sauce Labs Bike Light',
    price: '9.99',
    testId: 'add-to-cart-sauce-labs-bike-light'
  },
  SAUCE_LABS_BOLT_TSHIRT: {
    id: 'sauce-labs-bolt-t-shirt',
    displayName: 'Sauce Labs Bolt T-Shirt',
    price: '15.99',
    testId: 'add-to-cart-sauce-labs-bolt-t-shirt'
  },
  SAUCE_LABS_FLEECE_JACKET: {
    id: 'sauce-labs-fleece-jacket',
    displayName: 'Sauce Labs Fleece Jacket',
    price: '49.99',
    testId: 'add-to-cart-sauce-labs-fleece-jacket'
  }
} as const;

export type ProductKey = keyof typeof PRODUCTS;