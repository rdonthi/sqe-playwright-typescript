import { PRODUCTS } from './products';

export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
    type: 'valid'
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    type: 'locked'
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
    type: 'valid'
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    type: 'valid'
  },
  ERROR: {
    username: 'error_user',
    password: 'secret_sauce',
    type: 'valid'
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce',
    type: 'valid'
  }
} as const;

// INVALID_USERS for negative testing
export const INVALID_USERS = {
  NULL_VALUE: {
    username: 'invalid_user',
    password: 'secret_sauce',
    errorKey: 'INVALID_CREDENTIALS'
  },
  WRONG_PASSWORD: {
    username: 'standard_user',
    password: 'wrong_password',
    errorKey: 'INVALID_CREDENTIALS'
  },
  EMPTY_USERNAME: {
    username: '',
    password: 'secret_sauce',
    errorKey: 'USERNAME_REQUIRED'
  },
  EMPTY_PASSWORD: {
    username: 'standard_user',
    password: '',
    errorKey: 'PASSWORD_REQUIRED'
  }
} as const;

// Test scenarios for basket
export const BASKET_TEST_SCENARIOS = [
  {
    product: PRODUCTS.SAUCE_LABS_BACKPACK,
    quantity: 1,
    expected: {
      name: 'Sauce Labs Backpack',
      quantity: '1',
      price: '29.99'
    }
  },
  {
    product: PRODUCTS.SAUCE_LABS_BIKE_LIGHT,
    quantity: 1,
    expected: {
      name: 'Sauce Labs Bike Light',
      quantity: '1',
      price: '9.99'
    }
  }
] as const;

export type UserType = keyof typeof USERS;
export type InvalidUserType = keyof typeof INVALID_USERS;