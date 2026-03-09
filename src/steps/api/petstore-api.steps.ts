import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import fetch from 'node-fetch';

interface ApiResponse {
  status: number;
  body: any;
  headers: any;
}

// Get base URL from environment variable
const BASE_URL = process.env.PETSTORE_API_URL || 'https://petstore.swagger.io/v2';
const API_KEY = process.env.PETSTORE_API_KEY;

Given('I have API access to Petstore', async function (this: ICustomWorld) {
  console.log(`Base URL: ${BASE_URL} (from env: ${process.env.PETSTORE_API_URL})`);
  if (API_KEY) {
    console.log(`API Key: ${API_KEY.substring(0, 3)}... (present)`);
  }
  this.testData.apiResponses = [];
});

When('I create a pet with name {string} and status {string}', 
  async function (this: ICustomWorld, name: string, status: string) {
    const petId = Math.floor(Math.random() * 1000000);
    const pet = {
      id: petId,
      name: name,
      status: status,
      photoUrls: ['https://example.com/photo.jpg']
    };
    
    const url = `${BASE_URL}/pet`;
    console.log(`POST ${url}`);
    console.log(`Payload:`, JSON.stringify(pet));
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    if (API_KEY) {
      headers['api_key'] = API_KEY;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(pet)
    });
    
    const apiResponse: ApiResponse = {
      status: response.status,
      headers: response.headers,
      body: null
    };
    
    console.log(`Response status: ${response.status}`);
    
    if (response.status === 200) {
      apiResponse.body = await response.json();
      console.log(`Success:`, JSON.stringify(apiResponse.body));
    } else {
      const errorText = await response.text();
      console.log(`Error:`, errorText.substring(0, 200));
    }
    
    this.testData.apiResponses = this.testData.apiResponses || [];
    this.testData.apiResponses.push(apiResponse);
    this.testData.lastResponse = apiResponse;
    this.testData.createdPet = pet;
    this.testData.petId = petId;
});

When('I create a pet with empty name', async function (this: ICustomWorld) {
  const petId = Math.floor(Math.random() * 1000000);
  const pet = {
    id: petId,
    name: '',
    status: 'available',
    photoUrls: ['https://example.com/photo.jpg']
  };
  
  const url = `${BASE_URL}/pet`;
  console.log(`POST ${url} with empty name`);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (API_KEY) {
    headers['api_key'] = API_KEY;
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(pet)
  });
    
  const apiResponse: ApiResponse = {
    status: response.status,
    headers: response.headers,
    body: null
  };
  
  console.log(`Response status: ${response.status}`);
  
  if (response.status === 200) {
    apiResponse.body = await response.json();
    console.log(`Pet created with empty name:`, JSON.stringify(apiResponse.body));
  } else {
    const errorText = await response.text();
    console.log(`Error:`, errorText.substring(0, 200));
  }
  
  this.testData.apiResponses = this.testData.apiResponses || [];
  this.testData.apiResponses.push(apiResponse);
  this.testData.lastResponse = apiResponse;
  this.testData.emptyNamePet = pet;
});

When('I search for pets with status {string}', 
  async function (this: ICustomWorld, status: string) {
    const url = `${BASE_URL}/pet/findByStatus?status=${status}`;
    console.log(`GET ${url}`);
    
    const headers: Record<string, string> = {};
    if (API_KEY) {
      headers['api_key'] = API_KEY;
    }
    
    const response = await fetch(url, { headers });
    
    const apiResponse: ApiResponse = {
      status: response.status,
      headers: response.headers,
      body: null
    };
    
    console.log(`Response status: ${response.status}`);
    
    if (response.status === 200) {
      apiResponse.body = await response.json();
      console.log(`Found ${apiResponse.body.length} pets with status ${status}`);
    } else {
      const errorText = await response.text();
      console.log(`Error:`, errorText.substring(0, 200));
    }
    
    this.testData.apiResponses = this.testData.apiResponses || [];
    this.testData.apiResponses.push(apiResponse);
    this.testData.lastResponse = apiResponse;
    this.testData.searchStatus = status;
});

Then('the response status should be {int}', 
  async function (this: ICustomWorld, expectedStatus: number) {
    const actualStatus = this.testData.lastResponse?.status;
    console.log(`Expected: ${expectedStatus}, Got: ${actualStatus}`);
    expect(actualStatus).toBe(expectedStatus);
});

Then('the pet should have id, name {string}, and status {string}', 
  async function (this: ICustomWorld, expectedName: string, expectedStatus: string) {
    const response = this.testData.lastResponse;
    
    if (!response || !response.body) {
      throw new Error('No response body found');
    }
    
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(expectedName);
    expect(response.body.status).toBe(expectedStatus);
    console.log(`Verified pet: ${response.body.name} (ID: ${response.body.id})`);
});

Then('all returned pets should have status {string}', 
  async function (this: ICustomWorld, expectedStatus: string) {
    const response = this.testData.lastResponse;
    
    if (!response || !response.body) {
      throw new Error('No response body found');
    }
    
    expect(Array.isArray(response.body)).toBeTruthy();
    
    const pets = response.body;
    console.log(`Found ${pets.length} pets with status ${expectedStatus}`);
    
    pets.forEach((pet: any, index: number) => {
      expect(pet.status).toBe(expectedStatus);
    });
    
    console.log(`All ${pets.length} pets have status: ${expectedStatus}`);
});

Then('the pet should be created with empty name', async function (this: ICustomWorld) {
  const response = this.testData.lastResponse;
  
  if (!response) {
    throw new Error('No response found in test data');
  }
  
  if (!response.body) {
    throw new Error('Response body is null - the API might not have returned data');
  }
  
  console.log(`Verifying empty name pet:`, JSON.stringify(response.body));
  
  expect(response.body.id).toBeDefined();
  expect(response.body.name).toBe('');
  expect(response.body.status).toBe('available');
  
  console.log(`Verified pet created with empty name, ID: ${response.body.id}`);
});

Then('the error message should indicate invalid input', 
  async function (this: ICustomWorld) {
    const response = this.testData.lastResponse;
    expect(response?.status).toBeGreaterThanOrEqual(400);
    console.log(`Error status: ${response?.status} - Expected failure for invalid input`);
});