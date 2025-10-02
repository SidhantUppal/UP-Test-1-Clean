import { LOCIElement, LOCIPageInfo, LOCIConversation, LOCIStorage } from '../types/loci.types';

export class BrowserStorageAdapter implements LOCIStorage {
  private basePath: string;

  constructor(basePath: string = '/LOCI/data') {
    this.basePath = basePath;
  }

  private getPageUrl(pageId: string): string {
    return `${this.basePath}/pages/${pageId}.json`;
  }

  private getConversationsUrl(): string {
    return `${this.basePath}/conversations.json`;
  }

  async getPageElements(pageId: string): Promise<LOCIElement[]> {
    try {
      const response = await fetch(this.getPageUrl(pageId));
      if (!response.ok) {
        throw new Error(`Failed to fetch page data: ${response.status}`);
      }
      
      const pageData = await response.json();
      return Object.values(pageData.elements) as LOCIElement[];
    } catch (error) {
      console.warn(`LOCI: Could not load page data for ${pageId}:`, error);
      return [];
    }
  }

  async getElement(id: string): Promise<LOCIElement | null> {
    try {
      // Read index to find which page contains this element
      const indexResponse = await fetch(`${this.basePath}/index.json`);
      if (!indexResponse.ok) {
        throw new Error('Could not load LOCI index');
      }
      
      const indexData = await indexResponse.json();
      
      // Search through all pages
      for (const [pageId] of Object.entries(indexData.pages)) {
        const elements = await this.getPageElements(pageId);
        const element = elements.find(el => el.id === id);
        if (element) {
          return element;
        }
      }
      
      return null;
    } catch (error) {
      console.warn(`LOCI: Could not find element ${id}:`, error);
      return null;
    }
  }

  async saveElement(element: LOCIElement): Promise<void> {
    // Browser version is read-only for now
    // Could implement with localStorage or IndexedDB later
    console.warn('LOCI: Save operations not supported in browser mode');
    throw new Error('Browser storage adapter is read-only');
  }

  async getConversations(elementId: string): Promise<LOCIConversation[]> {
    try {
      const response = await fetch(this.getConversationsUrl());
      if (!response.ok) {
        return [];
      }
      
      const conversations = await response.json();
      return conversations[elementId] || [];
    } catch (error) {
      return [];
    }
  }

  async saveConversation(elementId: string, conversation: LOCIConversation): Promise<void> {
    // Browser version is read-only for now
    console.warn('LOCI: Save operations not supported in browser mode');
    throw new Error('Browser storage adapter is read-only');
  }
}