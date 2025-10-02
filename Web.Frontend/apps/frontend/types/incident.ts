// TypeScript interfaces that match the C# ViewModels exactly
// This ensures proper binding between React frontend and .NET Core API

// Incident Lookup Types
export interface IncidentSeverityType {
  IncidentSeverityTypeID: number;
  Reference: string;
  Title: string;
  SeverityLevel: number;
  ColorCode?: string;
  Description?: string;
}

export interface IncidentStatusType {
  IncidentStatusTypeID: number;
  Reference: string;
  Title: string;
  StatusOrder: number;
  ColorCode?: string;
  Description?: string;
}

export interface IncidentPriorityType {
  IncidentPriorityTypeID: number;
  Reference: string;
  Title: string;
  PriorityLevel: number;
  ColorCode?: string;
  Description?: string;
}

export interface IncidentCaseViewModel {
  IncidentCaseID: number;
  UserAreaID: number;
  CaseNumber: string;
  IncidentTypeID: number;
  IncidentDate: string; // DateTimeOffset as ISO string
  ReportedDate?: string; // DateTimeOffset as ISO string
  LocationID?: number;
  Description?: string;
  // Legacy string fields (for backward compatibility)
  Severity?: string;
  Status?: string;
  Priority?: string;
  // New TypeID fields
  IncidentSeverityTypeID?: number;
  IncidentStatusTypeID?: number;
  IncidentPriorityTypeID?: number;
  ReportedByUserID: number;
  AssignedToUserID?: number;
  InvolvedEmployeeID?: number;
  InvestigationStartDate?: string; // DateTimeOffset as ISO string
  InvestigationEndDate?: string; // DateTimeOffset as ISO string
  RootCause?: string;
  CorrectiveActions?: string;
  PreventiveActions?: string;
  ClosedDate?: string; // DateTimeOffset as ISO string
  ClosedByUserID?: number;
  ClosureNotes?: string;
  CreatedDate?: string; // DateTimeOffset as ISO string
  CreatedByUserID: number;
  ModifiedDate?: string; // DateTimeOffset as ISO string
  ModifiedByUserID: number;
  IsDeleted?: boolean;
  AdditionalReference?: string;

  // Additional Properties from ViewModel
  CreatedByUserName?: string;

  // Navigation properties for lookup types
  SeverityType?: IncidentSeverityType;
  StatusType?: IncidentStatusType;
  PriorityType?: IncidentPriorityType;
}

export interface IncidentAttachmentViewModel {
  IncidentAttachmentID: number;
  IncidentCaseID: number;
  AttachmentID: number;
  FormType?: string;
  CreatedDate: string; // DateTime as ISO string
  CreatedByUserID: number;

  // Additional Properties from ViewModel
  CreatedByUserName?: string;
}

// Request/Response DTOs for API endpoints
export interface CreateIncidentRequest {
  UserAreaID: number;
  IncidentTypeID: number;
  IncidentDate: string;
  Description?: string;
  Severity?: string;
  Priority?: string;
  LocationID?: number;
  ReportedByUserID: number;
  AdditionalReference?: string;
}

export interface CloseIncidentRequest {
  ClosureNotes?: string;
  ClosedByUserId?: number;
}

export interface ArchiveIncidentRequest {
  ArchivedByUserID: number;
}


