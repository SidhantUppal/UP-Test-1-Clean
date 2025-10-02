import { DocumentAssignmentRepository } from '../repositories/documentAssignmentRepository.js';
import { DocumentRepository } from '../repositories/documentRepository.js';
import { DocumentBundleRepository } from '../repositories/documentBundleRepository.js';

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

export class DocumentAssignmentService {
  constructor() {
    this.assignmentRepository = new DocumentAssignmentRepository();
    this.documentRepository = new DocumentRepository();
    this.bundleRepository = new DocumentBundleRepository();
  }

  // GET all assignments with pagination and filtering
  async getAllAssignments(userAreaId, options, user) {
    try {
      console.log(`[DocumentAssignmentService] Getting assignments for UserArea ${userAreaId}`, 
        { userId: user.id, options });
      
      const result = await this.assignmentRepository.getAll(userAreaId, options);
      
      console.log(`[DocumentAssignmentService] Found ${result.data.length} assignments (${result.total} total)`);
      return result;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error getting assignments:', error);
      throw error;
    }
  }

  // GET my assignments (assigned to current user)
  async getMyAssignments(userAreaId, user, options = {}) {
    try {
      console.log(`[DocumentAssignmentService] Getting assignments for user ${user.id}`, 
        { userAreaId, options });
      
      const result = await this.assignmentRepository.getMyAssignments(
        user.id, 
        userAreaId, 
        options
      );
      
      console.log(`[DocumentAssignmentService] Found ${result.data.length} assignments for user`);
      return result;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error getting user assignments:', error);
      throw error;
    }
  }

  // GET single assignment by ID
  async getAssignmentById(assignmentId, userAreaId, user) {
    try {
      // Validate ID format
      const parsedId = parseInt(assignmentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid assignment ID format');
      }

      console.log(`[DocumentAssignmentService] Getting assignment ${parsedId}`, 
        { userId: user.id, userAreaId });

      const assignment = await this.assignmentRepository.getById(parsedId, userAreaId);
      
      if (!assignment) {
        throw new NotFoundError('Assignment not found');
      }

      // Get assignment history
      assignment.history = await this.assignmentRepository.getHistory(parsedId, userAreaId);

      // Log the view if the user is the assignee
      if (assignment.AssignedToUserID === user.id && assignment.Status === 'Pending') {
        await this.updateAssignmentStatus(parsedId, 'Viewed', userAreaId, user);
      }

      console.log(`[DocumentAssignmentService] Found assignment for document: ${assignment.DocumentName}`);
      return assignment;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error getting assignment:', error);
      throw error;
    }
  }

  // CREATE new assignment
  async createAssignment(assignmentData, userId, userAreaId) {
    try {
      // Validation
      this.validateAssignmentData(assignmentData);
      
      // Verify document exists
      const document = await this.documentRepository.getById(
        assignmentData.documentId, 
        userAreaId
      );
      if (!document) {
        throw new NotFoundError('Document not found');
      }

      // Determine assignment type if not specified
      if (!assignmentData.assignmentType) {
        if (assignmentData.assignedToUserId) {
          assignmentData.assignmentType = 'Individual';
        } else if (assignmentData.assignedToEmployeeId) {
          assignmentData.assignmentType = 'Employee';
        } else if (assignmentData.assignedToContractorId) {
          assignmentData.assignmentType = 'Contractor';
        } else if (assignmentData.assignedToOrgGroupId) {
          assignmentData.assignmentType = 'Group';
        } else if (assignmentData.assignedToLocationId) {
          assignmentData.assignmentType = 'Location';
        } else if (assignmentData.assignedToRoleId) {
          assignmentData.assignmentType = 'Role';
        } else {
          throw new ValidationError('No recipient specified for assignment');
        }
      }

      console.log(`[DocumentAssignmentService] Creating assignment for document: ${document.DisplayName}`, { 
        userId, 
        userAreaId,
        assignmentType: assignmentData.assignmentType 
      });

      const assignment = await this.assignmentRepository.create(
        assignmentData, 
        userId, 
        userAreaId
      );

      // Add history entry
      await this.assignmentRepository.addHistory(
        assignment.AssignmentID,
        'Created',
        userId,
        `Assignment created for ${assignmentData.assignmentType}`,
        { documentId: assignmentData.documentId }
      );

      console.log(`[DocumentAssignmentService] Created assignment ID ${assignment.AssignmentID}`);
      return assignment;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error creating assignment:', error);
      throw error;
    }
  }

  // CREATE bulk assignments
  async createBulkAssignments(documentsData, recipientData, userId, userAreaId) {
    try {
      // Validate recipient data
      if (!recipientData.recipients || recipientData.recipients.length === 0) {
        throw new ValidationError('No recipients specified');
      }

      // Validate documents
      if (!documentsData.documentIds || documentsData.documentIds.length === 0) {
        throw new ValidationError('No documents specified');
      }

      console.log(`[DocumentAssignmentService] Creating bulk assignments`, { 
        userId, 
        userAreaId,
        documentCount: documentsData.documentIds.length,
        recipientCount: recipientData.recipients.length 
      });

      const assignments = [];
      
      // Create assignments for each document-recipient combination
      for (const documentId of documentsData.documentIds) {
        // Verify document exists
        const document = await this.documentRepository.getById(documentId, userAreaId);
        if (!document) {
          console.warn(`Document ${documentId} not found, skipping`);
          continue;
        }

        for (const recipient of recipientData.recipients) {
          const assignmentData = {
            documentId,
            ...recipient,
            priority: documentsData.priority || 'Normal',
            dueDate: documentsData.dueDate,
            requiresSignature: documentsData.requiresSignature || false,
            signatureType: documentsData.signatureType,
            reminderEnabled: documentsData.reminderEnabled !== false,
            reminderFrequencyDays: documentsData.reminderFrequencyDays || 7,
            notes: documentsData.notes
          };
          
          assignments.push(assignmentData);
        }
      }

      // Create all assignments in a transaction
      const results = await this.assignmentRepository.createBulk(
        assignments, 
        userId, 
        userAreaId
      );

      console.log(`[DocumentAssignmentService] Created ${results.length} assignments`);
      return {
        created: results.length,
        assignments: results
      };
    } catch (error) {
      console.error('[DocumentAssignmentService] Error creating bulk assignments:', error);
      throw error;
    }
  }

  // UPDATE assignment status
  async updateAssignmentStatus(assignmentId, status, userAreaId, user, completionNotes = null) {
    try {
      // Validate ID
      const parsedId = parseInt(assignmentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid assignment ID format');
      }

      // Validate status
      const validStatuses = ['Pending', 'Viewed', 'InProgress', 'Completed', 'Expired', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Get existing assignment
      const existingAssignment = await this.assignmentRepository.getById(parsedId, userAreaId);
      if (!existingAssignment) {
        throw new NotFoundError('Assignment not found');
      }

      // Check permissions (only assignee or creator can update)
      if (existingAssignment.AssignedToUserID !== user.id && 
          existingAssignment.CreatedByUserID !== user.id) {
        throw new ForbiddenError('You do not have permission to update this assignment');
      }

      console.log(`[DocumentAssignmentService] Updating assignment ${parsedId} status to ${status}`, { 
        userId: user.id, 
        userAreaId 
      });

      const updated = await this.assignmentRepository.updateStatus(
        parsedId, 
        status, 
        user.id, 
        userAreaId,
        completionNotes
      );

      // Add history entry
      await this.assignmentRepository.addHistory(
        parsedId,
        `Status changed to ${status}`,
        user.id,
        completionNotes,
        { 
          oldStatus: existingAssignment.Status, 
          newStatus: status 
        }
      );

      // If part of a bundle, update bundle assignment progress
      if (existingAssignment.BundleAssignmentID && status === 'Completed') {
        await this.updateBundleProgress(existingAssignment.BundleAssignmentID, userAreaId);
      }

      console.log(`[DocumentAssignmentService] Updated assignment status to ${status}`);
      return updated;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error updating assignment status:', error);
      throw error;
    }
  }

  // UPDATE assignment details
  async updateAssignment(assignmentId, assignmentData, userId, userAreaId) {
    try {
      // Validate ID
      const parsedId = parseInt(assignmentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid assignment ID format');
      }

      // Check if assignment exists
      const existingAssignment = await this.assignmentRepository.getById(parsedId, userAreaId);
      if (!existingAssignment) {
        throw new NotFoundError('Assignment not found');
      }

      // Only creator can update assignment details
      if (existingAssignment.CreatedByUserID !== userId) {
        throw new ForbiddenError('You do not have permission to update this assignment');
      }

      // Validation
      this.validateAssignmentData(assignmentData, true);

      console.log(`[DocumentAssignmentService] Updating assignment ${parsedId}`, { 
        userId, 
        userAreaId 
      });

      const assignment = await this.assignmentRepository.update(
        parsedId, 
        assignmentData, 
        userId, 
        userAreaId
      );

      // Add history entry
      await this.assignmentRepository.addHistory(
        parsedId,
        'Assignment updated',
        userId,
        'Assignment details modified'
      );

      console.log(`[DocumentAssignmentService] Updated assignment ${parsedId}`);
      return assignment;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error updating assignment:', error);
      throw error;
    }
  }

  // DELETE assignment (cancel)
  async deleteAssignment(assignmentId, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(assignmentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid assignment ID format');
      }

      // Check if assignment exists
      const existingAssignment = await this.assignmentRepository.getById(parsedId, userAreaId);
      if (!existingAssignment) {
        throw new NotFoundError('Assignment not found');
      }

      // Only creator can delete assignment
      if (existingAssignment.CreatedByUserID !== user.id) {
        throw new ForbiddenError('You do not have permission to cancel this assignment');
      }

      console.log(`[DocumentAssignmentService] Cancelling assignment ${parsedId}`, { 
        userId: user.id, 
        userAreaId 
      });

      await this.assignmentRepository.delete(parsedId, user.id, userAreaId);

      // Add history entry
      await this.assignmentRepository.addHistory(
        parsedId,
        'Assignment cancelled',
        user.id,
        'Assignment was cancelled by creator'
      );

      console.log(`[DocumentAssignmentService] Cancelled assignment ${parsedId}`);
    } catch (error) {
      console.error('[DocumentAssignmentService] Error cancelling assignment:', error);
      throw error;
    }
  }

  // SIGN document assignment
  async signAssignment(assignmentId, signatureData, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(assignmentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid assignment ID format');
      }

      // Get assignment
      const assignment = await this.assignmentRepository.getById(parsedId, userAreaId);
      if (!assignment) {
        throw new NotFoundError('Assignment not found');
      }

      // Check if signature is required
      if (!assignment.RequiresSignature) {
        throw new ValidationError('This assignment does not require a signature');
      }

      // Check if user is the assignee
      if (assignment.AssignedToUserID !== user.id) {
        throw new ForbiddenError('Only the assignee can sign this document');
      }

      // Check if already signed
      if (assignment.SignatureStatus === 'Signed') {
        throw new ConflictError('This assignment has already been signed');
      }

      console.log(`[DocumentAssignmentService] Signing assignment ${parsedId}`, { 
        userId: user.id, 
        signatureType: assignment.SignatureType 
      });

      // Update assignment with signature
      await this.assignmentRepository.updateStatus(
        parsedId, 
        'Completed', 
        user.id, 
        userAreaId,
        'Document signed and completed'
      );

      // Store signature record (implementation depends on signature type)
      // For now, we'll add a history entry
      await this.assignmentRepository.addHistory(
        parsedId,
        'Document signed',
        user.id,
        `Signed using ${assignment.SignatureType}`,
        signatureData
      );

      console.log(`[DocumentAssignmentService] Assignment ${parsedId} signed successfully`);
      return {
        success: true,
        assignmentId: parsedId,
        signedDate: new Date(),
        signatureType: assignment.SignatureType
      };
    } catch (error) {
      console.error('[DocumentAssignmentService] Error signing assignment:', error);
      throw error;
    }
  }

  // Get assignment statistics
  async getAssignmentStatistics(userAreaId, user, filters = {}) {
    try {
      console.log(`[DocumentAssignmentService] Getting assignment statistics`, { 
        userId: user.id, 
        userAreaId,
        filters 
      });

      const stats = await this.assignmentRepository.getStatistics(userAreaId, filters);

      // Calculate additional metrics
      stats.CompletionRate = stats.TotalAssignments > 0 
        ? Math.round((stats.CompletedCount / stats.TotalAssignments) * 100) 
        : 0;
      
      stats.SignatureCompletionRate = stats.RequiringSignatureCount > 0
        ? Math.round((stats.SignedCount / stats.RequiringSignatureCount) * 100)
        : 100;

      console.log(`[DocumentAssignmentService] Retrieved statistics`, stats);
      return stats;
    } catch (error) {
      console.error('[DocumentAssignmentService] Error getting statistics:', error);
      throw error;
    }
  }

  // Update bundle assignment progress
  async updateBundleProgress(bundleAssignmentId, userAreaId) {
    try {
      // This would update the bundle assignment's completed document count
      // Implementation would query all assignments for the bundle and count completed ones
      console.log(`[DocumentAssignmentService] Updating bundle progress for ${bundleAssignmentId}`);
      
      // Placeholder for bundle progress update logic
      // Would involve querying assignments and updating DocumentBundleAssignment table
      
    } catch (error) {
      console.error('[DocumentAssignmentService] Error updating bundle progress:', error);
      // Don't throw - this is a background operation
    }
  }

  // Send reminder for assignment
  async sendReminder(assignmentId, userAreaId, user) {
    try {
      // Validate ID
      const parsedId = parseInt(assignmentId, 10);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new ValidationError('Invalid assignment ID format');
      }

      // Get assignment
      const assignment = await this.assignmentRepository.getById(parsedId, userAreaId);
      if (!assignment) {
        throw new NotFoundError('Assignment not found');
      }

      // Check if reminder is enabled
      if (!assignment.ReminderEnabled) {
        throw new ValidationError('Reminders are not enabled for this assignment');
      }

      // Check if assignment is still pending
      if (assignment.Status === 'Completed' || assignment.Status === 'Cancelled') {
        throw new ValidationError('Cannot send reminder for completed or cancelled assignment');
      }

      console.log(`[DocumentAssignmentService] Sending reminder for assignment ${parsedId}`, { 
        userId: user.id, 
        assignedTo: assignment.AssignedToUserID 
      });

      // In production, this would trigger an email/notification
      // For now, add history entry
      await this.assignmentRepository.addHistory(
        parsedId,
        'Reminder sent',
        user.id,
        `Reminder sent to assignee`,
        { 
          reminderCount: (assignment.ReminderCount || 0) + 1,
          sentAt: new Date() 
        }
      );

      console.log(`[DocumentAssignmentService] Reminder sent for assignment ${parsedId}`);
      return {
        success: true,
        assignmentId: parsedId,
        reminderCount: (assignment.ReminderCount || 0) + 1
      };
    } catch (error) {
      console.error('[DocumentAssignmentService] Error sending reminder:', error);
      throw error;
    }
  }

  // Validation helper
  validateAssignmentData(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
      if (!data.documentId) {
        errors.push('Document ID is required');
      }

      // At least one recipient must be specified
      if (!data.assignedToUserId && !data.assignedToEmployeeId && 
          !data.assignedToContractorId && !data.assignedToOrgGroupId && 
          !data.assignedToLocationId && !data.assignedToRoleId) {
        errors.push('At least one recipient must be specified');
      }
    }

    if (data.priority) {
      const validPriorities = ['Low', 'Normal', 'High', 'Urgent'];
      if (!validPriorities.includes(data.priority)) {
        errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
      }
    }

    if (data.signatureType) {
      const validTypes = ['Simple', 'DocuSign', 'AdobeSign', 'Wet'];
      if (!validTypes.includes(data.signatureType)) {
        errors.push(`Signature type must be one of: ${validTypes.join(', ')}`);
      }
    }

    if (data.dueDate && new Date(data.dueDate) < new Date()) {
      errors.push('Due date cannot be in the past');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }
}