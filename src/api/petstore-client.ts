import { APIRequestContext, APIResponse } from '@playwright/test';

export interface Pet {
  id: number;
  category?: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags?: {
    id: number;
    name: string;
  }[];
  status: 'available' | 'pending' | 'sold';
}

export class PetstoreClient {
  private apiKey: string;

  constructor(private request: APIRequestContext) {
    this.apiKey = process.env.PETSTORE_API_KEY || 'special-key';
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'api_key': this.apiKey  // Required authentication
    };
  }

  async createPet(pet: Pet): Promise<APIResponse> {
    const fullPet = {
      ...pet,
      category: pet.category || { id: 1, name: 'dogs' },
      photoUrls: pet.photoUrls || ['https://example.com/photo.jpg'],
      tags: pet.tags || [{ id: 1, name: 'friendly' }]
    };
    
    return await this.request.post('/pet', {
      data: fullPet,
      headers: this.getHeaders()
    });
  }

  async getPetById(petId: number): Promise<APIResponse> {
    return await this.request.get(`/pet/${petId}`, {
      headers: this.getHeaders()
    });
  }

  async updatePet(pet: Pet): Promise<APIResponse> {
    return await this.request.put('/pet', { 
      data: pet,
      headers: this.getHeaders()
    });
  }

  async deletePet(petId: number): Promise<APIResponse> {
    return await this.request.delete(`/pet/${petId}`, {
      headers: this.getHeaders()
    });
  }

  async findPetsByStatus(status: string): Promise<APIResponse> {
    return await this.request.get(`/pet/findByStatus?status=${status}`, {
      headers: this.getHeaders()
    });
  }
}