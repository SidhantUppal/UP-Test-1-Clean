import { DocumentRepository } from '../repositories/documentRepository.js';
import { DocumentFolderRepository } from '../repositories/documentFolderRepository.js';

// Custom error classes
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class DocumentService {
  constructor() {
    this.documentRepository = new DocumentRepository();
    this.folderRepository = new DocumentFolderRepository();
  }

  // GET all documents with pagination and filtering
  async getAllDocuments(userAreaId, options, user) {
    try {
      console.log(`[DocumentService] Getting documents for UserArea ${userAreaId}`, 
        { userId: user.id, options });
      
      const result = await this.documentRepository.getAll(userAreaId, options);
      
      console.log(`[DocumentService] Found ${result.data.length} documents (${result.total} total)`);
      return result;
    } catch (error) {
      console.error('[DocumentService] Error getting documents:', error);
      throw error;
    }
  }

  // GET single document by ID
  async getDocumentById(documentId, userAreaId, user) {
    try {
      // Validate ID format
      const parsedId = parseInt(documentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid document ID format');
      }

      console.log(`[DocumentService] Getting document ${parsedId} for UserArea ${userAreaId}`, 
        { userId: user.id });

      const document = await this.documentRepository.getById(parsedId, userAreaId);
      
      if (!document) {
        throw new NotFoundError('Document not found');
      }

      // Log the view
      await this.documentRepository.logDocumentView(
        parsedId, 
        user.id, 
        'view'
      );

      console.log(`[DocumentService] Found document: ${document.DisplayName}`);
      return document;
    } catch (error) {
      console.error('[DocumentService] Error getting document:', error);
      throw error;
    }
  }

  // CREATE new document
  async createDocument(documentData, userId, userAreaId) {
    try {
      // Validation
      this.validateDocumentData(documentData);
      
      // Check folder exists if specified
      if (documentData.folderId) {
        const folder = await this.folderRepository.getById(documentData.folderId, userAreaId);
        if (!folder) {
          throw new NotFoundError('Specified folder does not exist');
        }
      }
      
      // Check for duplicate name in folder
      const nameCount = await this.documentRepository.checkNameUniqueness(
        documentData.displayName, 
        documentData.folderId,
        userAreaId
      );
      if (nameCount > 0) {
        throw new ConflictError('A document with this name already exists in the folder');
      }

      console.log(`[DocumentService] Creating document: ${documentData.displayName}`, { 
        userId, 
        userAreaId 
      });

      const document = await this.documentRepository.create(
        documentData, 
        userId, 
        userAreaId
      );

      console.log(`[DocumentService] Created document ID ${document.DocumentID}: ${document.DisplayName}`);
      return document;
    } catch (error) {
      console.error('[DocumentService] Error creating document:', error);
      throw error;
    }
  }

  // UPDATE existing document
  async updateDocument(documentId, documentData, userId, userAreaId) {
    try {
      // Validate ID
      const parsedId = parseInt(documentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid document ID format');
      }

      // Check if document exists
      const existingDocument = await this.documentRepository.getById(parsedId, userAreaId);
      if (!existingDocument) {
        throw new NotFoundError('Document not found');
      }

      // Validation
      this.validateDocumentData(documentData, true);
      
      // Check folder exists if changing folder
      if (documentData.folderId !== undefined && documentData.folderId !== existingDocument.FolderID) {
        if (documentData.folderId) {
          const folder = await this.folderRepository.getById(documentData.folderId, userAreaId);
          if (!folder) {
            throw new NotFoundError('Specified folder does not exist');
          }
        }
      }
      
      // Check name uniqueness if changed
      if (documentData.displayName !== existingDocument.DisplayName || 
          documentData.folderId !== existingDocument.FolderID) {
        const nameCount = await this.documentRepository.checkNameUniqueness(
          documentData.displayName, 
          documentData.folderId || existingDocument.FolderID,
          userAreaId, 
          parsedId
        );
        if (nameCount > 0) {
          throw new ConflictError('A document with this name already exists in the folder');
        }
      }

      console.log(`[DocumentService] Updating document ${parsedId}: ${documentData.displayName}`, { 
        userId, 
        userAreaId 
      });

      const document = await this.documentRepository.update(
        parsedId, 
        documentData, 
        userId, 
        userAreaId
      );

      console.log(`[DocumentService] Updated document: ${document.DisplayName}`);
      return document;
    } catch (error) {
      console.error('[DocumentService] Error updating document:', error);
      throw error;
    }
  }

  // DELETE document (soft delete)
  async deleteDocument(documentId, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(documentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid document ID format');
      }

      // Check if document exists
      const existingDocument = await this.documentRepository.getById(parsedId, userAreaId);
      if (!existingDocument) {
        throw new NotFoundError('Document not found');
      }

      console.log(`[DocumentService] Deleting document ${parsedId}`, { 
        userId: user.id, 
        userAreaId 
      });

      await this.documentRepository.delete(parsedId, user.id, userAreaId);

      console.log(`[DocumentService] Deleted document ${parsedId}`);
    } catch (error) {
      console.error('[DocumentService] Error deleting document:', error);
      throw error;
    }
  }

  // Get document view history
  async getDocumentViewHistory(documentId, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(documentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid document ID format');
      }

      // Check if document exists
      const document = await this.documentRepository.getById(parsedId, userAreaId);
      if (!document) {
        throw new NotFoundError('Document not found');
      }

      console.log(`[DocumentService] Getting view history for document ${parsedId}`, { 
        userId: user.id, 
        userAreaId 
      });

      const history = await this.documentRepository.getViewHistory(parsedId, userAreaId);

      console.log(`[DocumentService] Found ${history.length} view records`);
      return history;
    } catch (error) {
      console.error('[DocumentService] Error getting view history:', error);
      throw error;
    }
  }

  // Download document and log it
  async downloadDocument(documentId, userAreaId, user, ipAddress = null, userAgent = null) {
    try {
      // Validate ID
      const parsedId = parseInt(documentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid document ID format');
      }

      console.log(`[DocumentService] Downloading document ${parsedId}`, { 
        userId: user.id, 
        userAreaId 
      });

      const document = await this.documentRepository.getById(parsedId, userAreaId);
      
      if (!document) {
        throw new NotFoundError('Document not found');
      }

      // Check privacy level permissions
      if (document.PrivacyLevel === 'Confidential' || document.PrivacyLevel === 'Secret') {
        // In production, check user permissions here
        console.log(`[DocumentService] Document ${parsedId} has privacy level: ${document.PrivacyLevel}`);
      }

      // Log the download
      await this.documentRepository.logDocumentView(
        parsedId, 
        user.id, 
        'download',
        ipAddress,
        userAgent
      );

      console.log(`[DocumentService] Document ${parsedId} downloaded by user ${user.id}`);
      return document;
    } catch (error) {
      console.error('[DocumentService] Error downloading document:', error);
      throw error;
    }
  }

  // Validation helper
  validateDocumentData(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.displayName !== undefined) {
      if (!data.displayName || data.displayName.trim().length < 1) {
        errors.push('Display name is required');
      } else if (data.displayName.length > 255) {
        errors.push('Display name must not exceed 255 characters');
      }
    }

    if (!isUpdate) {
      if (!data.originalFileName || data.originalFileName.trim().length < 1) {
        errors.push('Original file name is required');
      }
    }

    if (data.documentType && !['Form', 'Attachment'].includes(data.documentType)) {
      errors.push('Document type must be either Form or Attachment');
    }

    if (data.privacyLevel && !['Public', 'Private', 'Confidential', 'Secret'].includes(data.privacyLevel)) {
      errors.push('Invalid privacy level');
    }

    if (data.status && !['Draft', 'Final', 'Archived', 'Signed'].includes(data.status)) {
      errors.push('Invalid status');
    }

    if (data.tags && !Array.isArray(data.tags)) {
      errors.push('Tags must be an array');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }
}