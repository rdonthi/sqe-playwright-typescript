import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { ICustomWorld } from './world';
import { env } from '../utils/env-config';

setDefaultTimeout(60000);

let browser: any;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: env.HEADLESS
  });
});

Before(async function (this: ICustomWorld, { pickle }) {

  const tags = pickle.tags.map((t: any) => t.name);
  const isApiTest = tags.includes('@api');
  
  this.testData = {
    scenario: pickle.name,
    tags: tags,
    startTime: Date.now(),
    isApiTest: isApiTest
  };
  
  if (!isApiTest) {
    this.context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: 'reports/videos/' }
    });
    this.page = await this.context.newPage();
  }
});

After(async function (this: ICustomWorld, { result }) {
  if (result?.status === 'FAILED' && this.page && !this.testData.isApiTest) {
    const screenshot = await this.page?.screenshot({ 
      path: `reports/screenshots/${this.testData.scenario}-${Date.now()}.png`,
      fullPage: true
    });
    
    if (screenshot) {
      await this.attach(screenshot, 'image/png');
    }
  }
  
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
  
});

AfterAll(async function () {
  await browser.close();
});