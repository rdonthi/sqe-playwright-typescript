import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, APIRequestContext, APIResponse } from '@playwright/test';
import { PetstoreClient } from '../api/petstore-client';

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  apiContext: APIRequestContext;
  petstoreClient: PetstoreClient;
  lastResponse?: APIResponse;
  testData: Record<string, any>;  // This now stores fetch responses too
}

export class CustomWorld extends World implements ICustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;
  petstoreClient!: PetstoreClient;
  lastResponse?: APIResponse;
  testData: Record<string, any> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);