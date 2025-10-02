import { LOCIElement } from '../types/loci.types';
// TODO: Replace with API route when save operations are needed
import loci1Data from '../data/pages/loci1.json';
import loci2Data from '../data/pages/loci2.json';

// Development-only LOCI loader
// TEMPORARY: Using direct imports, will migrate to API route later
const pageDataMap: Record<string, any> = {
  'loci1': loci1Data,
  'loci2': loci2Data
};

// Convenience functions for pages
export const loadLOCIPage = async (pageId: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  try {
    console.log(`🔍 LOCI: Loading page data for ${pageId}...`);
    
    const pageData = pageDataMap[pageId];
    if (!pageData) {
      console.warn(`LOCI: No data found for page ${pageId}`);
      return null;
    }

    // Convert elements object to the format expected by the page
    const elementsObject: Record<string, LOCIElement> = pageData.elements || {};
    
    console.log(`✅ LOCI: Loaded ${Object.keys(elementsObject).length} elements for ${pageId}`);
    return elementsObject;
  } catch (error) {
    console.warn(`LOCI: Could not load page ${pageId}:`, error);
    return null;
  }
};

export const loadLOCIElement = async (elementId: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  try {
    // Search through all pages for the element
    for (const [pageId, pageData] of Object.entries(pageDataMap)) {
      const elements = pageData.elements || {};
      if (elements[elementId]) {
        return elements[elementId] as LOCIElement;
      }
    }
    
    return null;
  } catch (error) {
    console.warn(`LOCI: Could not load element ${elementId}:`, error);
    return null;
  }
};

// Legacy class interface (keep for future API route migration)
export class LOCILoader {
  private static instance: LOCILoader;

  private constructor() {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('LOCI is only available in development mode');
    }
  }

  static getInstance(): LOCILoader {
    if (!LOCILoader.instance) {
      LOCILoader.instance = new LOCILoader();
    }
    return LOCILoader.instance;
  }

  async getPageElements(pageId: string): Promise<LOCIElement[]> {
    const elementsObject = await loadLOCIPage(pageId);
    return elementsObject ? Object.values(elementsObject) : [];
  }

  async getElement(elementId: string): Promise<LOCIElement | null> {
    return loadLOCIElement(elementId);
  }

  async saveElement(element: LOCIElement): Promise<void> {
    console.warn('LOCI: Save operations not supported in direct import mode');
    throw new Error('Save operations will be available when we migrate to API route');
  }

  async getConversations(elementId: string) {
    console.warn('LOCI: Conversations not supported in direct import mode');
    return [];
  }

  async saveConversation(elementId: string, conversation: any) {
    console.warn('LOCI: Save operations not supported in direct import mode');
    throw new Error('Save operations will be available when we migrate to API route');
  }
}