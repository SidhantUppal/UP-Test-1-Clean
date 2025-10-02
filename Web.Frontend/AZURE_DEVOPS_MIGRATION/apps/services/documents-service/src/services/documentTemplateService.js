import { DocumentTemplateRepository } from '../repositories/documentTemplateRepository.js';
import { DocumentTemplateTagRepository } from '../repositories/documentTemplateTagRepository.js';

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

export class DocumentTemplateService {
  constructor() {
    this.templateRepository = new DocumentTemplateRepository();
    this.tagRepository = new DocumentTemplateTagRepository();
  }

  // GET all templates with pagination and filtering
  async getAllTemplates(userAreaId, options, user) {
    try {
      console.log(`[DocumentTemplateService] Getting templates for UserArea ${userAreaId}`, 
        { userId: user.id, options });
      
      const result = await this.templateRepository.getAll(userAreaId, options);
      
      console.log(`[DocumentTemplateService] Found ${result.data.length} templates (${result.total} total)`);
      return result;
    } catch (error) {
      console.error('[DocumentTemplateService] Error getting templates:', error);
      throw error;
    }
  }

  // GET single template by ID
  async getTemplateById(templateId, userAreaId, user) {
    try {
      // Validate ID format
      const parsedId = parseInt(templateId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid template ID format');
      }

      console.log(`[DocumentTemplateService] Getting template ${parsedId} for UserArea ${userAreaId}`, 
        { userId: user.id });

      const template = await this.templateRepository.getById(parsedId, userAreaId);
      
      if (!template) {
        throw new NotFoundError('Template not found');
      }

      // Get usage statistics
      template.usageHistory = await this.templateRepository.getUsageStatistics(parsedId, userAreaId);

      console.log(`[DocumentTemplateService] Found template: ${template.Title}`);
      return template;
    } catch (error) {
      console.error('[DocumentTemplateService] Error getting template:', error);
      throw error;
    }
  }

  // CREATE new template
  async createTemplate(templateData, userId, userAreaId) {
    try {
      // Validation
      this.validateTemplateData(templateData);
      
      // Validate and extract placeholder tags from content
      const placeholderTags = await this.extractAndValidatePlaceholderTags(
        templateData.content, 
        userAreaId
      );
      templateData.placeholderTags = placeholderTags;
      
      // Check for duplicate title
      const titleCount = await this.templateRepository.checkTitleUniqueness(
        templateData.title, 
        userAreaId
      );
      if (titleCount > 0) {
        throw new ConflictError('A template with this title already exists');
      }

      console.log(`[DocumentTemplateService] Creating template: ${templateData.title}`, { 
        userId, 
        userAreaId,
        placeholderTagCount: placeholderTags.length 
      });

      const template = await this.templateRepository.create(
        templateData, 
        userId, 
        userAreaId
      );

      console.log(`[DocumentTemplateService] Created template ID ${template.DocumentTemplateID}: ${template.Title}`);
      return template;
    } catch (error) {
      console.error('[DocumentTemplateService] Error creating template:', error);
      throw error;
    }
  }

  // UPDATE existing template
  async updateTemplate(templateId, templateData, userId, userAreaId) {
    try {
      // Validate ID
      const parsedId = parseInt(templateId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid template ID format');
      }

      // Check if template exists
      const existingTemplate = await this.templateRepository.getById(parsedId, userAreaId);
      if (!existingTemplate) {
        throw new NotFoundError('Template not found');
      }

      // Check ownership (can only edit own templates unless public)
      if (existingTemplate.UserAreaID !== userAreaId && !existingTemplate.IsPublic) {
        throw new ForbiddenError('You can only edit templates from your organisation');
      }

      // Validation
      this.validateTemplateData(templateData, true);
      
      // Validate and extract placeholder tags if content changed
      if (templateData.content) {
        const placeholderTags = await this.extractAndValidatePlaceholderTags(
          templateData.content, 
          userAreaId
        );
        templateData.placeholderTags = placeholderTags;
      }
      
      // Check title uniqueness if changed
      if (templateData.title && templateData.title !== existingTemplate.Title) {
        const titleCount = await this.templateRepository.checkTitleUniqueness(
          templateData.title, 
          userAreaId, 
          parsedId
        );
        if (titleCount > 0) {
          throw new ConflictError('A template with this title already exists');
        }
      }

      // Increment version if content changed
      if (templateData.content && templateData.content !== existingTemplate.Content) {
        const currentVersion = existingTemplate.Version || '1.0';
        const versionParts = currentVersion.split('.');
        const minorVersion = parseInt(versionParts[1] || '0', 10) + 1;
        templateData.version = `${versionParts[0]}.${minorVersion}`;
      }

      console.log(`[DocumentTemplateService] Updating template ${parsedId}: ${templateData.title}`, { 
        userId, 
        userAreaId,
        newVersion: templateData.version 
      });

      const template = await this.templateRepository.update(
        parsedId, 
        templateData, 
        userId, 
        userAreaId
      );

      console.log(`[DocumentTemplateService] Updated template: ${template.Title}`);
      return template;
    } catch (error) {
      console.error('[DocumentTemplateService] Error updating template:', error);
      throw error;
    }
  }

  // DELETE template (soft delete)
  async deleteTemplate(templateId, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(templateId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid template ID format');
      }

      // Check if template exists
      const existingTemplate = await this.templateRepository.getById(parsedId, userAreaId);
      if (!existingTemplate) {
        throw new NotFoundError('Template not found');
      }

      // Check ownership
      if (existingTemplate.UserAreaID !== userAreaId) {
        throw new ForbiddenError('You can only delete templates from your organisation');
      }

      console.log(`[DocumentTemplateService] Deleting template ${parsedId}`, { 
        userId: user.id, 
        userAreaId 
      });

      await this.templateRepository.delete(parsedId, user.id, userAreaId);

      console.log(`[DocumentTemplateService] Deleted template ${parsedId}`);
    } catch (error) {
      console.error('[DocumentTemplateService] Error deleting template:', error);
      throw error;
    }
  }

  // Generate document from template
  async generateDocumentFromTemplate(templateId, tagValues, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(templateId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid template ID format');
      }

      console.log(`[DocumentTemplateService] Generating document from template ${parsedId}`, { 
        userId: user.id, 
        userAreaId 
      });

      const template = await this.templateRepository.getById(parsedId, userAreaId);
      
      if (!template) {
        throw new NotFoundError('Template not found');
      }

      // Replace placeholder tags with actual values
      let content = template.Content;
      const usedTags = {};

      if (template.PlaceholderTags && Array.isArray(template.PlaceholderTags)) {
        for (const tagName of template.PlaceholderTags) {
          const tagPattern = new RegExp(`<\\{${tagName}\\}>`, 'g');
          const value = tagValues[tagName] || `[${tagName}]`;
          content = content.replace(tagPattern, value);
          usedTags[tagName] = value;
        }
      }

      // Log template usage
      await this.templateRepository.logTemplateUsage(
        parsedId,
        null, // Document ID will be set when document is created
        user.id,
        usedTags
      );

      console.log(`[DocumentTemplateService] Generated document content from template ${parsedId}`);
      
      return {
        content,
        templateId: parsedId,
        templateTitle: template.Title,
        tagValuesUsed: usedTags
      };
    } catch (error) {
      console.error('[DocumentTemplateService] Error generating document:', error);
      throw error;
    }
  }

  // Get template categories
  async getTemplateCategories(userAreaId, user) {
    try {
      console.log(`[DocumentTemplateService] Getting template categories for UserArea ${userAreaId}`, 
        { userId: user.id });

      const categories = await this.templateRepository.getCategories(userAreaId);

      console.log(`[DocumentTemplateService] Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      console.error('[DocumentTemplateService] Error getting categories:', error);
      throw error;
    }
  }

  // Extract and validate placeholder tags from template content
  async extractAndValidatePlaceholderTags(content, userAreaId) {
    try {
      // Extract all tags in the format <{tagName}>
      const tagPattern = /<\{([^}]+)\}>/g;
      const matches = content.matchAll(tagPattern);
      const tagNames = new Set();

      for (const match of matches) {
        tagNames.add(match[1]);
      }

      // Validate that all tags exist
      const validTags = [];
      const invalidTags = [];

      for (const tagName of tagNames) {
        const tag = await this.tagRepository.getByTagName(tagName, userAreaId);
        if (tag) {
          validTags.push(tagName);
        } else {
          invalidTags.push(tagName);
        }
      }

      if (invalidTags.length > 0) {
        console.warn(`[DocumentTemplateService] Template contains invalid tags: ${invalidTags.join(', ')}`);
        // In production, you might want to throw an error here
        // throw new ValidationError(`Template contains invalid tags: ${invalidTags.join(', ')}`);
      }

      return Array.from(tagNames);
    } catch (error) {
      console.error('[DocumentTemplateService] Error extracting placeholder tags:', error);
      throw error;
    }
  }

  // Validation helper
  validateTemplateData(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.title !== undefined) {
      if (!data.title || data.title.trim().length < 1) {
        errors.push('Title is required');
      } else if (data.title.length > 255) {
        errors.push('Title must not exceed 255 characters');
      }
    }

    if (!isUpdate || data.content !== undefined) {
      if (!data.content || data.content.trim().length < 1) {
        errors.push('Content is required');
      }
    }

    if (data.documentType) {
      const validTypes = ['contract', 'agreement', 'policy', 'form', 'letter', 'certificate', 'other'];
      if (!validTypes.includes(data.documentType)) {
        errors.push(`Document type must be one of: ${validTypes.join(', ')}`);
      }
    }

    if (data.tags && !Array.isArray(data.tags)) {
      errors.push('Tags must be an array');
    }

    if (data.placeholderTags && !Array.isArray(data.placeholderTags)) {
      errors.push('Placeholder tags must be an array');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }

  // GET all template tags for the user area
  async getTemplateTags(userAreaId, user) {
    try {
      console.log(`[DocumentTemplateService] Getting template tags for UserArea ${userAreaId}`, 
        { userId: user.id });

      const tags = await this.tagRepository.getAllGroupedByCategory(userAreaId, true);

      console.log(`[DocumentTemplateService] Found tags in ${Object.keys(tags).length} categories`);
      return tags;
    } catch (error) {
      console.error('[DocumentTemplateService] Error getting template tags:', error);
      throw error;
    }
  }

  // CREATE custom template tag
  async createTemplateTag(tagData, userId, userAreaId) {
    try {
      // Validation
      this.validateTemplateTagData(tagData);
      
      // Generate tag name from display name if not provided
      if (!tagData.tagName) {
        tagData.tagName = `custom.${tagData.displayName.toLowerCase().replace(/\s+/g, '_')}`;
      }
      
      // Check for duplicate tag name
      const existingTag = await this.tagRepository.getByTagName(tagData.tagName, userAreaId);
      if (existingTag) {
        throw new ConflictError('A tag with this name already exists');
      }

      console.log(`[DocumentTemplateService] Creating template tag: ${tagData.tagName}`, { 
        userId, 
        userAreaId 
      });

      const tag = await this.tagRepository.create(tagData, userId, userAreaId);

      console.log(`[DocumentTemplateService] Created template tag: ${tag.TagName}`);
      return tag;
    } catch (error) {
      console.error('[DocumentTemplateService] Error creating template tag:', error);
      throw error;
    }
  }

  // Validation helper for template tags
  validateTemplateTagData(data) {
    const errors = [];

    if (!data.displayName || data.displayName.trim().length < 1) {
      errors.push('Display name is required');
    } else if (data.displayName.length > 255) {
      errors.push('Display name must not exceed 255 characters');
    }

    if (data.tagName && !/^[a-zA-Z0-9._]+$/.test(data.tagName)) {
      errors.push('Tag name can only contain letters, numbers, dots, and underscores');
    }

    const validDataTypes = ['text', 'number', 'date', 'boolean'];
    if (data.dataType && !validDataTypes.includes(data.dataType)) {
      errors.push(`Data type must be one of: ${validDataTypes.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }
}