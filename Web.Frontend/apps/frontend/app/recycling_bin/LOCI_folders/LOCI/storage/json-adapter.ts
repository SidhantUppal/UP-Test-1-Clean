import { promises as fs } from 'fs';
import path from 'path';
import { LOCIElement, LOCIPageInfo, LOCIConversation, LOCIStorage } from '../types/loci.types';

export class JSONStorageAdapter implements LOCIStorage {
  private basePath: string;

  constructor(basePath: string = '/LOCI/data') {
    this.basePath = basePath;
  }

  private getPageFilePath(pageId: string): string {
    return path.join(this.basePath, 'pages', `${pageId}.json`);
  }

  private getConversationsFilePath(): string {
    return path.join(this.basePath, 'conversations.json');
  }

  async getPageElements(pageId: string): Promise<LOCIElement[]> {
    try {
      const filePath = this.getPageFilePath(pageId);
      const data = await fs.readFile(filePath, 'utf-8');
      const pageData = JSON.parse(data);
      return Object.values(pageData.elements) as LOCIElement[];
    } catch (error) {
      console.warn(`LOCI: Could not load page data for ${pageId}:`, error);
      return [];
    }
  }

  async getElement(id: string): Promise<LOCIElement | null> {
    try {
      // Read index to find which page contains this element
      const indexPath = path.join(this.basePath, 'index.json');
      const indexData = JSON.parse(await fs.readFile(indexPath, 'utf-8'));
      
      // Search through all pages (could be optimized with element->page mapping)
      for (const [pageId, pageInfo] of Object.entries(indexData.pages)) {
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
    try {
      const filePath = this.getPageFilePath(element.pageId);
      
      // Read existing page data
      let pageData: any = { pageInfo: {}, elements: {} };
      try {
        const existingData = await fs.readFile(filePath, 'utf-8');
        pageData = JSON.parse(existingData);
      } catch (error) {
        // File doesn't exist, create new structure
      }

      // Update element
      pageData.elements[element.id] = element;
      
      // Update timestamps
      element.lastUpdated = new Date().toISOString();
      if (pageData.pageInfo) {
        pageData.pageInfo.lastScanned = new Date().toISOString();
      }

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(pageData, null, 2), 'utf-8');
      
      // Update index
      await this.updateIndex(element.pageId);
      
    } catch (error) {
      console.error(`LOCI: Could not save element ${element.id}:`, error);
    }
  }

  async getConversations(elementId: string): Promise<LOCIConversation[]> {
    try {
      const filePath = this.getConversationsFilePath();
      const data = await fs.readFile(filePath, 'utf-8');
      const conversations = JSON.parse(data);
      return conversations[elementId] || [];
    } catch (error) {
      return [];
    }
  }

  async saveConversation(elementId: string, conversation: LOCIConversation): Promise<void> {
    try {
      const filePath = this.getConversationsFilePath();
      
      let conversations: Record<string, LOCIConversation[]> = {};
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        conversations = JSON.parse(data);
      } catch (error) {
        // File doesn't exist, start fresh
      }

      if (!conversations[elementId]) {
        conversations[elementId] = [];
      }
      
      conversations[elementId].push(conversation);
      
      await fs.writeFile(filePath, JSON.stringify(conversations, null, 2), 'utf-8');
    } catch (error) {
      console.error(`LOCI: Could not save conversation for ${elementId}:`, error);
    }
  }

  private async updateIndex(pageId: string): Promise<void> {
    try {
      const indexPath = path.join(this.basePath, 'index.json');
      let indexData: any = { pages: {}, totalElements: 0 };
      
      try {
        const data = await fs.readFile(indexPath, 'utf-8');
        indexData = JSON.parse(data);
      } catch (error) {
        // Index doesn't exist, create new
      }

      // Count elements in page
      const elements = await this.getPageElements(pageId);
      
      indexData.pages[pageId] = {
        file: `pages/${pageId}.json`,
        elementCount: elements.length,
        lastUpdated: new Date().toISOString()
      };
      
      // Recalculate total
      indexData.totalElements = Object.values(indexData.pages)
        .reduce((sum: number, page: any) => sum + page.elementCount, 0);
      
      indexData.lastUpdated = new Date().toISOString();
      
      await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');
    } catch (error) {
      console.error(`LOCI: Could not update index:`, error);
    }
  }
}