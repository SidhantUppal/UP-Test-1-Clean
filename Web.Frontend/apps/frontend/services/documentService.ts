// Document Service - Simplified with Dummy Data
// Ready for easy migration to documents-service microservice (port 3002)

import { mockDocumentService, Document } from './mockDocumentService';

// Extended document interface matching V7 database schema
export interface DocumentSystemDoc extends Document {
  DocumentID?: number; // V7.Document.DocumentID
  UserAreaID?: number; // For multi-tenant isolation
  FolderID?: number; // V7.DocumentFolder reference
  PrivacyLevel?: 'Public' | 'Private' | 'Confidential' | 'Secret';
  Status?: 'Draft' | 'Final' | 'Archived' | 'Signed';
  IsStarred?: boolean;
  IsEncrypted?: boolean;
  ViewCount?: number;
}

class DocumentService {
  // API endpoint ready for future use
  private baseUrl = 'http://localhost:3002/api/documents';
  
  // Headers matching your microservice pattern
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-user-id': '1', // TODO: Get from UserContext
      'x-user-area-id': '1', // TODO: Get from UserContext
      'x-user-name': 'Demo User', // TODO: Get from UserContext
      'x-user-email': 'user@example.com' // TODO: Get from UserContext
    };
  }

  // ==================== CURRENT: DUMMY DATA ====================
  // When ready, uncomment the "FUTURE" sections and remove dummy returns

  // Get all documents
  getAllDocuments(): DocumentSystemDoc[] {
    // CURRENT: Return dummy data
    return mockDocumentService.getAllDocuments().map(doc => ({
      ...doc,
      DocumentID: parseInt(doc.id.replace('doc-', '')),
      UserAreaID: 1,
      FolderID: Math.floor(Math.random() * 10) + 1,
      PrivacyLevel: doc.privacy as any,
      Status: doc.status === 'active' ? 'Final' : 'Draft',
      IsStarred: false,
      IsEncrypted: doc.privacy === 'confidential' || doc.privacy === 'restricted',
      ViewCount: Math.floor(Math.random() * 100)
    }));

    // FUTURE: Real API call (uncomment when ready)
    /*
    async getAllDocuments(): Promise<DocumentSystemDoc[]> {
      const response = await fetch(this.baseUrl, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Search documents
  searchDocuments(query: string): DocumentSystemDoc[] {
    // CURRENT: Dummy search
    const results = mockDocumentService.searchDocuments(query);
    return results.map(doc => ({
      ...doc,
      DocumentID: parseInt(doc.id.replace('doc-', '')),
      UserAreaID: 1,
      Status: doc.status === 'active' ? 'Final' : 'Draft'
    }));

    // FUTURE: Real API search
    /*
    async searchDocuments(query: string): Promise<DocumentSystemDoc[]> {
      const params = new URLSearchParams({ search: query });
      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: this.getHeaders()
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Get documents by category
  getDocumentsByCategory(category: string): DocumentSystemDoc[] {
    // CURRENT: Filter dummy data
    return this.getAllDocuments().filter(doc => doc.category === category);

    // FUTURE: API call with filter
    /*
    async getDocumentsByCategory(category: string): Promise<DocumentSystemDoc[]> {
      const params = new URLSearchParams({ documentType: category });
      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: this.getHeaders()
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Get document by ID
  getDocumentById(id: string): DocumentSystemDoc | undefined {
    // CURRENT: Find in dummy data
    const doc = mockDocumentService.getDocumentById(id);
    if (!doc) return undefined;
    
    return {
      ...doc,
      DocumentID: parseInt(id.replace('doc-', '')),
      UserAreaID: 1,
      Status: doc.status === 'active' ? 'Final' : 'Draft'
    };

    // FUTURE: API call
    /*
    async getDocumentById(id: string): Promise<DocumentSystemDoc | null> {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        return null;
      }
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Get documents by IDs (batch)
  getDocumentsByIds(ids: string[]): DocumentSystemDoc[] {
    // CURRENT: Filter dummy data
    return ids
      .map(id => this.getDocumentById(id))
      .filter((doc): doc is DocumentSystemDoc => doc !== undefined);

    // FUTURE: Batch API call
    /*
    async getDocumentsByIds(ids: string[]): Promise<DocumentSystemDoc[]> {
      const response = await fetch(`${this.baseUrl}/batch`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ ids })
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Get categories
  getCategories(): string[] {
    // CURRENT: From dummy data
    return mockDocumentService.getCategories();

    // FUTURE: From API
    /*
    async getCategories(): Promise<string[]> {
      const response = await fetch(`${this.baseUrl}/categories`, {
        headers: this.getHeaders()
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Get frequently used documents for checklists
  getFrequentlyUsedDocuments(context: 'checklist' | 'training' | 'safety' = 'checklist'): DocumentSystemDoc[] {
    // CURRENT: Filter dummy data by context
    const allDocs = this.getAllDocuments();
    
    let filtered = allDocs;
    if (context === 'checklist') {
      filtered = allDocs.filter(doc => 
        doc.category === 'Safety Documentation' ||
        doc.category === 'Policies & Procedures' ||
        doc.category === 'Templates & Forms'
      );
    }
    
    return filtered.slice(0, 5);

    // FUTURE: API call with context
    /*
    async getFrequentlyUsedDocuments(context?: string): Promise<DocumentSystemDoc[]> {
      const params = context ? new URLSearchParams({ context }) : '';
      const response = await fetch(`${this.baseUrl}/frequent?${params}`, {
        headers: this.getHeaders()
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Get recently accessed documents
  getRecentlyAccessedDocuments(limit: number = 10): DocumentSystemDoc[] {
    // CURRENT: Random selection from dummy data
    const docs = this.getAllDocuments();
    return [...docs]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    // FUTURE: API call
    /*
    async getRecentlyAccessedDocuments(limit: number = 10): Promise<DocumentSystemDoc[]> {
      const params = new URLSearchParams({ limit: limit.toString() });
      const response = await fetch(`${this.baseUrl}/recent?${params}`, {
        headers: this.getHeaders()
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Filter documents
  filterDocuments(filters: {
    categories?: string[];
    privacy?: string[];
    status?: string;
    tags?: string[];
  }): DocumentSystemDoc[] {
    // CURRENT: Filter dummy data
    let docs = this.getAllDocuments();
    
    if (filters.categories && filters.categories.length > 0) {
      docs = docs.filter(doc => filters.categories!.includes(doc.category));
    }
    
    if (filters.privacy && filters.privacy.length > 0) {
      docs = docs.filter(doc => filters.privacy!.includes(doc.privacy));
    }
    
    if (filters.status) {
      const statusMap: Record<string, string> = {
        'active': 'Final',
        'draft': 'Draft',
        'archived': 'Archived'
      };
      docs = docs.filter(doc => doc.Status === statusMap[filters.status!]);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      docs = docs.filter(doc => 
        filters.tags!.some(tag => doc.tags.includes(tag))
      );
    }
    
    return docs;

    // FUTURE: API call with filters
    /*
    async filterDocuments(filters: any): Promise<DocumentSystemDoc[]> {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
      
      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: this.getHeaders()
      });
      
      const result = await response.json();
      return result.data;
    }
    */
  }

  // Track document access (for analytics)
  trackAccess(documentId: string, context?: string): void {
    // CURRENT: Log to console
    console.log(`[Mock] Document accessed: ${documentId}, Context: ${context}`);

    // FUTURE: Send to API
    /*
    async trackAccess(documentId: string, context?: string): Promise<void> {
      await fetch(`${this.baseUrl}/${documentId}/view`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ context, timestamp: new Date().toISOString() })
      });
    }
    */
  }

  // Get document URL
  getDocumentUrl(documentId: string, action: 'view' | 'download' = 'view'): string {
    // CURRENT: Mock URL
    return `/mock-documents/${documentId}?action=${action}`;

    // FUTURE: Real URL from service
    // return `${this.baseUrl}/${documentId}/${action}`;
  }
}

// Export singleton instance
export const documentService = new DocumentService();

// ==================== MIGRATION GUIDE ====================
/*
To connect to the real documents microservice:

1. Start the documents service:
   cd apps/services/documents-service
   npm run dev  # Runs on port 3002

2. Update this file:
   - Change all methods to async
   - Uncomment the "FUTURE" sections
   - Remove the "CURRENT" dummy data returns

3. Update DocumentPicker component:
   - Add async/await to useEffect hooks
   - Add loading states back

4. Update auth headers:
   - Connect to UserContext for real user data
   - Update getHeaders() to use actual user info

That's it! The API is already built and ready.
*/

export type { Document } from './mockDocumentService';
export { DocumentSystemDoc };