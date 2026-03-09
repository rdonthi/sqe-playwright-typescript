import dotenv from 'dotenv';
dotenv.config();

export const env = {
  // API
  PETSTORE_API_URL: process.env.PETSTORE_API_URL || 'https://petstore.swagger.io/v2',
  PETSTORE_API_KEY: process.env.PETSTORE_API_KEY || 'special-key',
  
  // UI
  SAUCE_URL: process.env.SAUCE_URL || 'https://www.saucedemo.com',
  
  // Test credentials
  STANDARD_USER: process.env.STANDARD_USER || 'standard_user',
  LOCKED_OUT_USER: process.env.LOCKED_OUT_USER || 'locked_out_user',
  PASSWORD: process.env.PASSWORD || 'secret_sauce',
  
  // Test execution
  HEADLESS: process.env.HEADLESS === 'true',
  CI: process.env.CI === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};