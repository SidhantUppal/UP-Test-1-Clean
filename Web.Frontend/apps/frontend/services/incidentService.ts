// Incident API Service
import { authHeaderService } from './authHeaderService';

const INCIDENTS_SERVICE_URL = process.env.NEXT_PUBLIC_INCIDENTS_SERVICE_URL || 'http://localhost:3014';

export interface IncidentCategory {
  IncidentCategoryTypeID?: number;
  Title: string;
  Reference: string;
  Description?: string;
  UserAreaID?: number;
  IsSystemCategory: boolean;
  DisplayOrder: number;
  IsActive: boolean;
  ColorCode?: string;
  Icon?: string;
  TypeCount?: number;
}

export interface IncidentType {
  IncidentTypeID?: number;
  Title: string;
  Reference: string;
  Description?: string;
  IncidentCategoryTypeID?: number;
  FormTemplateID?: number;
  IsActive: boolean;
  DisplayOrder: number;
  UserAreaID?: number;
  IsSystemType: boolean;
}

export interface FormTemplate {
  FormTemplateID?: number;
  TemplateName: string;
  TemplateCode: string;
  Description?: string;
  FormDefinition: any; // JSON structure
  Version: number;
  IsActive: boolean;
  IsPublished: boolean;
  UserAreaID?: number;
  IsSystemTemplate: boolean;
  IncidentCategoryTypeID?: number;
}

export interface Incident {
  IncidentID?: number;
  IncidentTypeID: number;
  Title?: string;
  CaseNumber?: string;
  IncidentDate: string;
  ReportedDate?: string;
  ReportedByUserID: number;
  ReporterName?: string;
  
  // Dynamic form data
  FormData: any; // JSON structure
  
  // Common fields
  Severity?: 'Low' | 'Medium' | 'High' | 'Critical';
  Status?: 'Open' | 'In Progress' | 'Closed' | 'Resolved';
  Priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  
  // Location
  LocationID?: number;
  LocationName?: string;
  CustomLocation?: string;
  
  // Assignment
  AssignedToUserID?: number;
  AssignedToName?: string;
  
  // Audit
  CreatedDate?: string;
  ModifiedDate?: string;
}

export interface CreateIncidentRequest {
  incidentTypeId: number;
  incidentDate: string;
  formData: any;
  severity?: string;
  priority?: string;
  locationId?: number;
  customLocation?: string;
}

export interface IncidentStats {
  totalIncidents: number;
  openIncidents: number;
  closedIncidents: number;
  incidentsByCategory: Array<{
    categoryName: string;
    count: number;
  }>;
  incidentsByType: Array<{
    typeName: string;
    count: number;
  }>;
  incidentsBySeverity: Array<{
    severity: string;
    count: number;
  }>;
  recentIncidents: number;
  averageResolutionTime: number;
}

export interface IncompleteIncident {
  incidentCaseId: number;
  formId: string;
  type: string;
  typeCode: string;
  dateStarted: string;
  lastModified: string;
  completionPercentage: number;
  location: string;
  startedBy: string;
  status: string;
  formStatus?: string;
  severity?: string;
}

export interface LinkedCase {
  linkId: number;
  linkedRecordType: string;
  linkedRecordId: number;
  linkedRecordTitle?: string;
  linkComments?: string;
  linkType: string;
  direction: 'outgoing' | 'incoming';
  createdDate: string;
  createdByUserId: number;
  ModifiedDate?: string;
  ModifiedByUserID?: number;
  sourceIncidentId?: number; // For incoming links
  incidentDetails?: {
    caseNumber: string;
    status: string;
    severity: string;
    typeName: string;
  };
}

export interface IncidentSearchResult {
  incidentCaseId: number;
  caseNumber: string;
  description: string;
  severity: string;
  status: string;
  incidentDate: string;
  typeName: string;
  typeCode: string;
  displayText: string;
}

class IncidentService {
  private getHeaders() {
    return authHeaderService.getAuthHeaders();
  }

  // Delegate to centralized static data service
  async getIncidentSeverities(): Promise<any[]> {
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const result = await incidentStaticDataService.getIncidentSeverityTypes();
    return Array.isArray(result.data) ? result.data : [];
  }

  async getIncidentStatuses(): Promise<any[]> {
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const result = await incidentStaticDataService.getIncidentStatusTypes();
    return Array.isArray(result.data) ? result.data : [];
  }

  async getIncidentPriorities(): Promise<any[]> {
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const result = await incidentStaticDataService.getIncidentPriorityTypes();
    return Array.isArray(result.data) ? result.data : [];
  }

  // Categories
  async getIncidentCategories(includeInactive = false): Promise<IncidentCategory[]> {
    try {
      const response = await fetch(
        `/api/incident/categories${includeInactive ? '?includeInactive=true' : ''}`,
        {
          headers: this.getHeaders(),
          credentials: 'include'
        }
      );

      if (!response.ok) {
        console.warn('Incidents service unavailable, using mock data');
        return this.getMockIncidentCategories();
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching incident categories:', error);
      return this.getMockIncidentCategories();
    }
  }

  async createIncidentCategory(data: Partial<IncidentCategory>): Promise<IncidentCategory> {
    const response = await fetch('/api/incident/categories', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create incident category');
    }

    const result = await response.json();
    return result.data;
  }

  // Incident Types
  async getIncidentTypes(params?: {
    categoryId?: number;
    includeInactive?: boolean;
  }): Promise<IncidentType[]> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    try {
      const response = await fetch(`/api/incident/types?${queryParams}`, {
        headers: this.getHeaders(),
        credentials: 'include'
      });

      if (!response.ok) {
        // Return mock data if backend is unavailable
        console.warn('Incidents service unavailable, using mock data');
        return this.getMockIncidentTypes();
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching incident types:', error);
      // Return mock data on network error
      return this.getMockIncidentTypes();
    }
  }

  async createIncidentType(data: Partial<IncidentType>): Promise<IncidentType> {
    const response = await fetch('/api/incident/types', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create incident type');
    }

    const result = await response.json();
    return result.data;
  }

  // Form Templates
  async getFormTemplates(params?: {
    categoryId?: number;
    includeDrafts?: boolean;
  }): Promise<FormTemplate[]> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`/api/incident/form-templates?${queryParams}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch form templates');
    }

    const result = await response.json();
    return result.data || [];
  }

  async getFormTemplate(id: number): Promise<FormTemplate> {
    const response = await fetch(`/api/incident/form-templates/${id}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch form template');
    }

    const result = await response.json();
    return result.data;
  }

  async createFormTemplate(data: {
    templateName: string;
    templateCode: string;
    description?: string;
    formDefinition: any;
    categoryId?: number;
  }): Promise<FormTemplate> {
    const response = await fetch('/api/incident/form-templates', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create form template');
    }

    const result = await response.json();
    return result.data;
  }

  async updateFormTemplate(id: number, data: Partial<FormTemplate>): Promise<FormTemplate> {
    const response = await fetch(`/api/incident/form-templates/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update form template');
    }

    const result = await response.json();
    return result.data;
  }

  // High Potential Modal - Create initial incident from modal data
  async createInitialIncident(modalData: {
    incidentDate: string;
    incidentTime: string;
    additionalReference?: string;
    orgGroupId?: number | null;
    severity?: string;
  }): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentDate: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    CreatedDate: string;
  }> {
    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(modalData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create initial incident');
    }

    const result = await response.json();
    return result.data;
  }

  // Near Miss Modal - Create initial Near Miss incident from modal data
  async createInitialNearMissIncident(modalData: {
    incidentDate: string;
    incidentTime: string;
    additionalReference?: string;
    orgGroupId?: number | null;
    severity?: string;
  }): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentDate: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    CreatedDate: string;
  }> {
    // Load static data to get actual IDs
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const severitiesResult = await incidentStaticDataService.getIncidentSeverityTypes();
    const severities = severitiesResult.data || [];

    // Map severity from dropdown to database ID using static data
    let severityId = 1; // Default to Low
    if (modalData.severity && Array.isArray(severities) && severities.length > 0) {
      const severityMatch = severities.find(s =>
        s.Title.toLowerCase() === modalData.severity?.toLowerCase() ||
        modalData.severity?.toLowerCase().includes(s.Title.toLowerCase())
      );
      if (severityMatch) {
        severityId = severityMatch.IncidentSeverityTypeID || 1;
      }
    }

    // Transform to PascalCase for database-first consistency
    const payload = {
      IncidentTypeID: 3, // Near Miss from static data
      IncidentDate: modalData.incidentDate + 'T' + (modalData.incidentTime || '00:00'),
      AdditionalReference: modalData.additionalReference,
      Description: 'Near Miss incident',
      CaseNumber: '', // Will be auto-generated by backend
      UserAreaID: 1, // Default user area
      IncidentStatusTypeID: 1, // Open status from static data
      IncidentSeverityTypeID: severityId, // From static data lookup
      IncidentPriorityTypeID: 1 // Default priority from static data
    };

    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create initial Near Miss incident');
    }

    const result = await response.json();
    return result; // API returns the incident directly, not wrapped in data
  }

  // Road Traffic Modal - Create initial Road Traffic incident from modal data
  async createInitialRoadTrafficIncident(modalData: {
    incidentDate: string;
    incidentTime: string;
    additionalReference?: string;
    orgGroupId?: number | null;
    severity?: string;
  }): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentDate: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    CreatedDate: string;
  }> {
    // Load static data to get actual IDs
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const severitiesResult = await incidentStaticDataService.getIncidentSeverityTypes();
    const severities = severitiesResult.data || [];

    // Map severity from dropdown to database ID using static data
    let severityId = 1; // Default to Low
    if (modalData.severity && Array.isArray(severities) && severities.length > 0) {
      const severityMatch = severities.find(s =>
        s.Title.toLowerCase() === modalData.severity?.toLowerCase() ||
        modalData.severity?.toLowerCase().includes(s.Title.toLowerCase())
      );
      if (severityMatch) {
        severityId = severityMatch.IncidentSeverityTypeID || 1;
      }
    }

    // Transform to PascalCase for database-first consistency
    const payload = {
      IncidentTypeID: 5, // Road Traffic from static data
      IncidentDate: modalData.incidentDate + 'T' + (modalData.incidentTime || '00:00'),
      AdditionalReference: modalData.additionalReference,
      Description: 'Road Traffic incident',
      CaseNumber: '', // Will be auto-generated by backend
      UserAreaID: 1, // Default user area
      IncidentStatusTypeID: 1, // Open status from static data
      IncidentSeverityTypeID: severityId, // From static data lookup
      IncidentPriorityTypeID: 1 // Default priority from static data
    };

    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create initial Road Traffic incident');
    }

    const result = await response.json();
    return result; // API returns the incident directly, not wrapped in data
  }

  // Accident Book Modal - Create initial incident
  async createInitialAccidentBookIncident(modalData: {
    incidentDate: string;
    incidentTime: string;
    additionalReference?: string;
    orgGroupId?: number | null;
    severity?: string;
  }): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentDate: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    CreatedDate: string;
  }> {
    // Load static data to get actual IDs
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const severitiesResult = await incidentStaticDataService.getIncidentSeverityTypes();
    const severities = severitiesResult.data || [];

    // Map severity from dropdown to database ID using static data
    let severityId = 1; // Default to Low
    if (modalData.severity && Array.isArray(severities) && severities.length > 0) {
      const severityMatch = severities.find(s =>
        s.Title.toLowerCase() === modalData.severity?.toLowerCase() ||
        modalData.severity?.toLowerCase().includes(s.Title.toLowerCase())
      );
      if (severityMatch) {
        severityId = severityMatch.IncidentSeverityTypeID || 1;
      }
    }

    // Transform to PascalCase for database-first consistency
    const payload = {
      IncidentTypeID: 7, // Accident Book from static data
      IncidentDate: modalData.incidentDate + 'T' + (modalData.incidentTime || '00:00'),
      AdditionalReference: modalData.additionalReference,
      Description: 'Accident Book incident',
      CaseNumber: '', // Will be auto-generated by backend
      UserAreaID: 1, // Default user area
      IncidentStatusTypeID: 1, // Open status from static data
      IncidentSeverityTypeID: severityId, // From static data lookup
      IncidentPriorityTypeID: 1 // Default priority from static data
    };

    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create initial Accident Book incident');
    }

    const result = await response.json();
    return result; // API returns the incident directly, not wrapped in data
  }

  // Dangerous Occurrence Modal - Create initial incident
  async createInitialDangerousOccurrenceIncident(modalData: {
    incidentDate: string;
    incidentTime: string;
    additionalReference?: string;
    orgGroupId?: number | null;
    severity?: string;
  }): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentDate: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    CreatedDate: string;
  }> {
    // Load static data to get actual IDs
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const severitiesResult = await incidentStaticDataService.getIncidentSeverityTypes();
    const severities = severitiesResult.data || [];

    // Map severity from dropdown to database ID using static data
    let severityId = 1; // Default to Low
    if (modalData.severity && Array.isArray(severities) && severities.length > 0) {
      const severityMatch = severities.find(s =>
        s.Title.toLowerCase() === modalData.severity?.toLowerCase() ||
        modalData.severity?.toLowerCase().includes(s.Title.toLowerCase())
      );
      if (severityMatch) {
        severityId = severityMatch.IncidentSeverityTypeID || 1;
      }
    }

    // Transform to PascalCase for database-first consistency
    const payload = {
      IncidentTypeID: 4, // Dangerous Occurrence from static data
      IncidentDate: modalData.incidentDate + 'T' + (modalData.incidentTime || '00:00'),
      AdditionalReference: modalData.additionalReference,
      Description: 'Dangerous Occurrence incident',
      CaseNumber: '', // Will be auto-generated by backend
      UserAreaID: 1, // Default user area
      IncidentStatusTypeID: 1, // Open status from static data
      IncidentSeverityTypeID: severityId, // From static data lookup
      IncidentPriorityTypeID: 1 // Default priority from static data
    };

    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create initial Dangerous Occurrence incident');
    }

    const result = await response.json();
    return result; // API returns the incident directly, not wrapped in data
  }

  // High Potential Modal - Create initial incident
  async createInitialHighPotentialIncident(modalData: {
    incidentDate: string;
    incidentTime: string;
    additionalReference?: string;
    orgGroupId?: number | null;
    severity?: string;
  }): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentDate: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    CreatedDate: string;
  }> {
    // Load static data to get actual IDs
    const { incidentStaticDataService } = await import('./incidentStaticDataService');
    const severitiesResult = await incidentStaticDataService.getIncidentSeverityTypes();
    const severities = severitiesResult.data || [];

    // Map severity from dropdown to database ID using static data
    let severityId = 1; // Default to Low
    if (modalData.severity && Array.isArray(severities) && severities.length > 0) {
      const severityMatch = severities.find(s =>
        s.Title.toLowerCase() === modalData.severity?.toLowerCase() ||
        modalData.severity?.toLowerCase().includes(s.Title.toLowerCase())
      );
      if (severityMatch) {
        severityId = severityMatch.IncidentSeverityTypeID || 1;
      }
    }

    // Transform to PascalCase for database-first consistency
    const payload = {
      IncidentTypeID: 6, // High Potential (WOBBLE) from static data
      IncidentDate: modalData.incidentDate + 'T' + (modalData.incidentTime || '00:00'),
      AdditionalReference: modalData.additionalReference,
      Description: 'High Potential incident',
      CaseNumber: '', // Will be auto-generated by backend
      UserAreaID: 1, // Default user area
      IncidentStatusTypeID: 1, // Open status from static data
      IncidentSeverityTypeID: severityId, // From static data lookup
      IncidentPriorityTypeID: 1 // Default priority from static data
    };

    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create initial High Potential incident');
    }

    const result = await response.json();
    return result; // API returns the incident directly, not wrapped in data
  }

  // High Potential Modal - Get incident for editing/prepopulation
  async getIncidentForEdit(incidentCaseId: number): Promise<{
    IncidentCaseID: number;
    CaseNumber: string;
    IncidentTypeID: number;
    Title: string;
    Reference: string;
    IncidentDate: string;
    ReportedDate: string;
    Description: string;
    IncidentSeverityTypeID: number;
    IncidentStatusTypeID: number;
    IncidentPriorityTypeID: number;
    FormData: any;
    CreatedDate: string;
    CreatedByUserID: number;
    ModifiedDate?: string;
    ModifiedByUserID?: number;
  }> {
    const response = await fetch(`/api/incident/${incidentCaseId}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get incident: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // The endpoint now returns data directly, not wrapped in .data
    return result;
  }

  // High Potential Modal - Update incident case and form data
  async updateIncidentCase(incidentCaseId: number, updateData: any): Promise<any> {
    const response = await fetch(`/api/incident/${incidentCaseId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update incident');
    }

    const result = await response.json();
    return result.data;
  }

  // Incidents CRUD (Existing)
  async createIncident(data: CreateIncidentRequest): Promise<Incident> {
    const response = await fetch('/api/incident', {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create incident');
    }

    const result = await response.json();
    return result.data;
  }

  async getIncidents(params?: {
    typeId?: number;
    categoryId?: number;
    status?: string;
    severity?: string;
    assignedToUserId?: number;
    fromDate?: string;
    toDate?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ incidents: Incident[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`/api/incident?${queryParams}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Incident API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: `/api/incident?${queryParams}`,
        queryParams: Object.fromEntries(queryParams.entries())
      });
      throw new Error(`Failed to fetch incidents: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();

    // Handle both old format and new paginated format
    if (result.Data && result.Pagination) {
      // New paginated format from Bus.Core filtering
      return {
        incidents: result.Data || [],
        pagination: {
          page: result.Pagination.Page || 1,
          pageSize: result.Pagination.PageSize || 50,
          totalCount: result.Pagination.TotalCount || 0,
          totalPages: result.Pagination.TotalPages || 0,
          hasFilters: result.Pagination.HasFilters || false
        }
      };
    } else {
      // Legacy format
      return {
        incidents: result.data || [],
        pagination: result.pagination || {
          page: 1,
          pageSize: 50,
          totalCount: 0,
          totalPages: 0,
          hasFilters: false
        }
      };
    }
  }

  async getIncident(id: number): Promise<Incident> {
    const response = await fetch(`/api/incident/${id}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch incident');
    }

    const result = await response.json();
    return result.data;
  }

  async updateIncident(id: number, data: Partial<Incident>): Promise<Incident> {
    const response = await fetch(`/api/incident/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update incident');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteIncident(id: number): Promise<void> {
    const response = await fetch(`/api/incident/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to delete incident');
    }
  }

  // Statistics
  async getIncidentStats(): Promise<IncidentStats> {
    const response = await fetch('/api/incident/stats', {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch incident statistics');
    }

    const result = await response.json();
    return result.data;
  }

  // Get incomplete incidents
  async getIncompleteIncidents(params?: {
    search?: string;
    typeCode?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ 
    incidents: IncompleteIncident[];
    pagination: any;
  }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`/api/incident/incomplete?${queryParams}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch incomplete incidents');
    }

    const result = await response.json();
    return {
      incidents: result.data || [],
      pagination: result.pagination
    };
  }

  // Helper method to get incident type with form template
  async getIncidentTypeWithForm(typeCode: string): Promise<{
    type: IncidentType;
    formTemplate: FormTemplate | null;
  }> {
    // Get all types
    const types = await this.getIncidentTypes();
    const type = Array.isArray(types) ? types.find(t => t.Reference === typeCode) : undefined;
    
    if (!type) {
      throw new Error(`Incident type ${typeCode} not found`);
    }

    let formTemplate: FormTemplate | null = null;
    if (type.FormTemplateID) {
      try {
        formTemplate = await this.getFormTemplate(type.FormTemplateID);
      } catch (error) {
        console.error('Failed to load form template:', error);
      }
    }

    return { type, formTemplate };
  }

  // Linked Cases API methods
  async getLinkedCases(incidentId: number): Promise<{
    outgoingLinks: LinkedCase[];
    incomingLinks: LinkedCase[];
    totalCount: number;
  }> {
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/incident/${incidentId}/linked-cases`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch linked cases');
    }

    const result = await response.json();
    return result.data;
  }

  async createLinkedCase(incidentId: number, linkData: {
    linkedRecordType: string;
    linkedRecordId: number;
    linkedRecordTitle?: string;
    linkComments?: string;
    linkType?: string;
  }): Promise<LinkedCase> {
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/incident/${incidentId}/linked-cases`, {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(linkData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create linked case');
    }

    const result = await response.json();
    return result.data;
  }

  async updateLinkedCase(incidentId: number, linkId: number, linkData: {
    linkedRecordTitle?: string;
    linkComments?: string;
    linkType?: string;
  }): Promise<LinkedCase> {
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/incident/${incidentId}/linked-cases/${linkId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(linkData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update linked case');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteLinkedCase(incidentId: number, linkId: number): Promise<void> {
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/incident/${incidentId}/linked-cases/${linkId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete linked case');
    }
  }

  async searchIncidentsForLinking(incidentId: number, searchParams: {
    search?: string;
    limit?: number;
  } = {}): Promise<IncidentSearchResult[]> {
    const queryParams = new URLSearchParams();
    if (searchParams.search) {
      queryParams.append('search', searchParams.search);
    }
    if (searchParams.limit) {
      queryParams.append('limit', searchParams.limit.toString());
    }

    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/incident/${incidentId}/search-for-linking?${queryParams}`, {
      headers: this.getHeaders(),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to search incidents for linking');
    }

    const result = await response.json();
    return result.data;
  }


  // Mock data methods
  private getMockIncidentCategories(): IncidentCategory[] {
    return [
      {
        IncidentCategoryTypeID: 1,
        Title: 'Safety',
        Reference: 'SAFETY',
        Description: 'Safety-related incidents and near misses',
        IsSystemCategory: true,
        DisplayOrder: 1,
        IsActive: true,
        ColorCode: 'bg-red-100 text-red-600',
        Icon: 'shield'
      },
      {
        IncidentCategoryTypeID: 2,
        Title: 'HR',
        Reference: 'HR',
        Description: 'Human resources and personnel incidents',
        IsSystemCategory: true,
        DisplayOrder: 2,
        IsActive: true,
        ColorCode: 'bg-blue-100 text-blue-600',
        Icon: 'users'
      },
      {
        IncidentCategoryTypeID: 3,
        Title: 'Cyber',
        Reference: 'CYBER',
        Description: 'Cybersecurity and data protection incidents',
        IsSystemCategory: true,
        DisplayOrder: 3,
        IsActive: true,
        ColorCode: 'bg-purple-100 text-purple-600',
        Icon: 'shield-lock'
      },
      {
        IncidentCategoryTypeID: 4,
        Title: 'Whistleblowing',
        Reference: 'WHISTLEBLOWING',
        Description: 'Whistleblowing and ethics concerns',
        IsSystemCategory: true,
        DisplayOrder: 4,
        IsActive: true,
        ColorCode: 'bg-orange-100 text-orange-600',
        Icon: 'megaphone'
      }
    ];
  }

  private getMockIncidentTypes(): IncidentType[] {
    return [
      {
        IncidentTypeID: 1,
        Title: 'Wobble',
        Reference: 'WOBBLE',
        Description: 'General safety incident or concern',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 1,
        IsSystemType: true
      },
      {
        IncidentTypeID: 2,
        Title: 'Accident Book',
        Reference: 'ACCIDENT_BOOK',
        Description: 'Record workplace accidents',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 2,
        IsSystemType: true
      },
      {
        IncidentTypeID: 3,
        Title: 'Accident Report',
        Reference: 'ACCIDENT_REPORT',
        Description: 'Detailed accident investigation report',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 3,
        IsSystemType: true
      },
      {
        IncidentTypeID: 4,
        Title: 'Dangerous Occurrence',
        Reference: 'DANGEROUS_OCCURRENCE',
        Description: 'Report dangerous situations or occurrences',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 4,
        IsSystemType: true
      },
      {
        IncidentTypeID: 5,
        Title: 'Near Miss',
        Reference: 'NEAR_MISS',
        Description: 'Report incidents that could have caused harm',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 5,
        IsSystemType: true
      },
      {
        IncidentTypeID: 6,
        Title: 'Road Traffic Incident',
        Reference: 'ROAD_TRAFFIC',
        Description: 'Vehicle or road-related incidents',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 6,
        IsSystemType: true
      },
      {
        IncidentTypeID: 7,
        Title: 'Farming Incident',
        Reference: 'FARMING',
        Description: 'Agricultural and farming-related incidents',
        IncidentCategoryTypeID: 1,
        IsActive: true,
        DisplayOrder: 7,
        IsSystemType: true
      },
      {
        IncidentTypeID: 8,
        Title: 'HR Complaint',
        Reference: 'HR_COMPLAINT',
        Description: 'Human resources related complaint',
        IncidentCategoryTypeID: 2,
        IsActive: true,
        DisplayOrder: 1,
        IsSystemType: true
      },
      {
        IncidentTypeID: 9,
        Title: 'Data Breach',
        Reference: 'DATA_BREACH',
        Description: 'Report potential or actual data breach',
        IncidentCategoryTypeID: 3,
        IsActive: true,
        DisplayOrder: 1,
        IsSystemType: true
      },
      {
        IncidentTypeID: 10,
        Title: 'Ethics Concern',
        Reference: 'ETHICS_CONCERN',
        Description: 'Report ethical concerns or violations',
        IncidentCategoryTypeID: 4,
        IsActive: true,
        DisplayOrder: 1,
        IsSystemType: true
      }
    ];
  }

  // Note: Static data methods moved to incidentStaticDataService.ts for centralized management
  // Use incidentStaticDataService.getIncidentSeverityTypes(), etc. instead
}

export const incidentService = new IncidentService();