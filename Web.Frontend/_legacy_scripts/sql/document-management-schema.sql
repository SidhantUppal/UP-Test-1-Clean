-- ========================================
-- DOCUMENT MANAGEMENT SYSTEM TABLES
-- Migration-Friendly: All key fields nullable
-- Portal v2.0 DBA V7 Compliant
-- Assumes: Attachment table already handles blob storage
-- ========================================

-- 1. DOCUMENT FOLDERS (Hierarchy & Organization)
-- ========================================
CREATE TABLE [V7].[DocumentFolder] (
    DocumentFolderID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    ParentFolderID INT NULL,                    -- NULL = root folder (migration-friendly)
    FolderName NVARCHAR(255) NOT NULL,
    FolderPath NVARCHAR(1000) NULL,            -- Materialized path like "/Legal/Contracts" (migration-friendly)
    Description NVARCHAR(500) NULL,            -- Folder description (migration-friendly)
    FolderType NVARCHAR(50) NULL,              -- "System", "User", "Project" (migration-friendly)
    IsSystemFolder BIT DEFAULT 0,             -- System-created vs user-created
    SortOrder INT NULL,                        -- Display ordering (migration-friendly)
    FolderIcon NVARCHAR(100) NULL,             -- Icon name/path (migration-friendly)
    
    -- Portal v2.0 DBA V7 Audit Fields (nullable for migration)
    CreatedByUserID INT NULL,                  -- NULL for migration
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    -- Foreign Key Constraints
    CONSTRAINT FK_DocumentFolder_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_DocumentFolder_Parent FOREIGN KEY (ParentFolderID) REFERENCES [V7].[DocumentFolder](DocumentFolderID),
    CONSTRAINT FK_DocumentFolder_CreatedBy FOREIGN KEY (CreatedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_DocumentFolder_ModifiedBy FOREIGN KEY (ModifiedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_DocumentFolder_ArchivedBy FOREIGN KEY (ArchivedByUserID) REFERENCES [V7].[User](UserID)
);

-- 2. DOCUMENT ORGANIZATION (Links docs to folders)
-- ========================================
CREATE TABLE [V7].[DocumentOrganization] (
    DocumentOrganizationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaFormID INT NULL,                   -- Internal document (migration-friendly)
    AttachmentID INT NULL,                     -- External file attachment (migration-friendly)
    DocumentFolderID INT NULL,                 -- NULL = root level (migration-friendly)
    DocumentType NVARCHAR(50) NULL,            -- "Form", "Attachment", "Hybrid" (migration-friendly)
    DisplayName NVARCHAR(255) NULL,            -- Override document name (migration-friendly)
    DisplayOrder INT NULL,                     -- Sorting within folder (migration-friendly)
    IsStarred BIT DEFAULT 0,                   -- User favorites
    IsPinned BIT DEFAULT 0,                    -- Pinned to top of folder
    CustomTags NVARCHAR(500) NULL,             -- JSON array of tags (migration-friendly)
    DocumentStatus NVARCHAR(50) NULL,          -- "Draft", "Final", "Archived" (migration-friendly)
    
    -- Portal v2.0 DBA V7 Audit Fields (nullable for migration)
    CreatedByUserID INT NULL,                  -- NULL for migration
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    -- Foreign Key Constraints
    CONSTRAINT FK_DocumentOrganization_Form FOREIGN KEY (UserAreaFormID) REFERENCES [V7].[UserAreaForm](UserAreaFormID),
    CONSTRAINT FK_DocumentOrganization_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID),
    CONSTRAINT FK_DocumentOrganization_Folder FOREIGN KEY (DocumentFolderID) REFERENCES [V7].[DocumentFolder](DocumentFolderID),
    
    -- Ensure at least one document reference
    CONSTRAINT CK_DocumentOrganization_HasDocument CHECK (UserAreaFormID IS NOT NULL OR AttachmentID IS NOT NULL)
);

-- 3. ENHANCE EXISTING UserAreaForm FOR PRIVACY & ENCRYPTION
-- ========================================
ALTER TABLE [V7].[UserAreaForm] ADD 
    PrivacyLevel NVARCHAR(20) NULL DEFAULT 'Public',     -- 'Public', 'Private', 'Confidential', 'Secret' (migration-friendly)
    IsEncrypted BIT NULL DEFAULT 0,                      -- Client-side encryption flag (migration-friendly)
    EncryptionMethod NVARCHAR(50) NULL,                  -- 'AES256', 'RSA' (migration-friendly)
    EncryptionKeyID NVARCHAR(100) NULL,                  -- Key reference, not actual key (migration-friendly)
    OwnerUserID INT NULL,                                -- Document owner for private docs (migration-friendly)
    ExternalDocumentID NVARCHAR(100) NULL,               -- Reference to old system ID (migration-friendly)
    LegacySystemSource NVARCHAR(100) NULL;               -- Which old system this came from (migration-friendly)

-- 4. DOCUMENT VIEW TRACKING (Audit logs)
-- ========================================
CREATE TABLE [V7].[DocumentViewLog] (
    DocumentViewLogID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaFormID INT NULL,                   -- Form document viewed (migration-friendly)
    AttachmentID INT NULL,                     -- File attachment viewed (migration-friendly)
    UserID INT NOT NULL,                       -- Who viewed the document
    ViewStartTime DATETIMEOFFSET NOT NULL,     -- When viewing started
    ViewEndTime DATETIMEOFFSET NULL,           -- When viewing ended (migration-friendly)
    ViewDurationSeconds INT NULL,              -- How long document was viewed (migration-friendly)
    ViewMethod NVARCHAR(50) NULL,              -- 'Download', 'Preview', 'Stream' (migration-friendly)
    IPAddress NVARCHAR(45) NULL,               -- Client IP address (migration-friendly)
    UserAgent NVARCHAR(500) NULL,              -- Browser/app information (migration-friendly)
    DeviceType NVARCHAR(50) NULL,              -- 'Desktop', 'Mobile', 'Tablet' (migration-friendly)
    LocationInfo NVARCHAR(200) NULL,           -- Geographic location if available (migration-friendly)
    
    -- Minimal audit fields for logging
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    -- Foreign Key Constraints
    CONSTRAINT FK_DocumentViewLog_Form FOREIGN KEY (UserAreaFormID) REFERENCES [V7].[UserAreaForm](UserAreaFormID),
    CONSTRAINT FK_DocumentViewLog_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID),
    CONSTRAINT FK_DocumentViewLog_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    
    -- Ensure at least one document reference
    CONSTRAINT CK_DocumentViewLog_HasDocument CHECK (UserAreaFormID IS NOT NULL OR AttachmentID IS NOT NULL)
);

-- 5. DOCUMENT REQUIREMENT SETS (Due diligence checklists)
-- ========================================
CREATE TABLE [V7].[DocumentRequirementSet] (
    DocumentRequirementSetID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SetName NVARCHAR(255) NOT NULL,            -- "Due Diligence - ABC Company"
    SetDescription NVARCHAR(500) NULL,         -- What this requirement set is for (migration-friendly)
    Category NVARCHAR(100) NULL,               -- "Legal", "Financial", "Technical" (migration-friendly)
    ProcessType NVARCHAR(100) NULL,            -- "DueDiligence", "PermitApplication" (migration-friendly)
    IsTemplate BIT DEFAULT 0,                  -- Reusable template vs specific instance
    CompletionThreshold INT NULL,              -- How many docs needed to be "complete" (migration-friendly)
    DueDate DATETIMEOFFSET NULL,               -- When all documents are due (migration-friendly)
    Status NVARCHAR(50) NULL DEFAULT 'Active', -- "Active", "Complete", "Cancelled" (migration-friendly)
    ExternalProcessID NVARCHAR(100) NULL,      -- Link to external process/project (migration-friendly)
    
    -- Portal v2.0 DBA V7 Audit Fields (nullable for migration)
    CreatedByUserID INT NULL,                  -- NULL for migration
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    -- Foreign Key Constraints
    CONSTRAINT FK_DocumentRequirementSet_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);

-- 6. DOCUMENT REQUIREMENTS (Individual required docs)
-- ========================================
CREATE TABLE [V7].[DocumentRequirement] (
    DocumentRequirementID INT IDENTITY(1,1) PRIMARY KEY,
    DocumentRequirementSetID INT NOT NULL,
    RequiredDocumentName NVARCHAR(255) NOT NULL,     -- "Shareholders Agreement"
    RequiredDocumentType NVARCHAR(100) NULL,         -- "Legal Document", "Financial Statement" (migration-friendly)
    Description NVARCHAR(500) NULL,                  -- What specifically is needed (migration-friendly)
    IsOptional BIT DEFAULT 0,                        -- Required vs optional document
    SortOrder INT NULL,                              -- Display order in checklist (migration-friendly)
    ExpectedFormat NVARCHAR(100) NULL,               -- "PDF", "Original", "Certified Copy" (migration-friendly)
    ValidityPeriodDays INT NULL,                     -- How long document remains valid (migration-friendly)
    RequiredByDate DATETIMEOFFSET NULL,              -- Individual due date (migration-friendly)
    Category NVARCHAR(100) NULL,                     -- Group similar requirements (migration-friendly)
    
    -- Portal v2.0 DBA V7 Audit Fields (nullable for migration)
    CreatedByUserID INT NULL,                        -- NULL for migration
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    -- Foreign Key Constraints
    CONSTRAINT FK_DocumentRequirement_Set FOREIGN KEY (DocumentRequirementSetID) REFERENCES [V7].[DocumentRequirementSet](DocumentRequirementSetID)
);

-- 7. DOCUMENT REQUIREMENT FULFILLMENT (Tracks completion)
-- ========================================
CREATE TABLE [V7].[DocumentRequirementFulfillment] (
    DocumentRequirementFulfillmentID INT IDENTITY(1,1) PRIMARY KEY,
    DocumentRequirementID INT NOT NULL,
    UserAreaFormID INT NULL,                         -- Internal document fulfilling requirement (migration-friendly)
    AttachmentID INT NULL,                           -- External file fulfilling requirement (migration-friendly)
    FulfillmentStatus NVARCHAR(50) NULL DEFAULT 'Pending', -- "Provided", "Pending", "Rejected", "Approved" (migration-friendly)
    SubmittedByUserID INT NULL,                      -- Who provided the document (migration-friendly)
    ReviewedByUserID INT NULL,                       -- Who reviewed/approved it (migration-friendly)
    ReviewNotes NVARCHAR(500) NULL,                  -- Review comments, rejection reasons (migration-friendly)
    SubmissionDate DATETIMEOFFSET NULL,              -- When document was submitted (migration-friendly)
    ReviewDate DATETIMEOFFSET NULL,                  -- When review was completed (migration-friendly)
    ExpiryDate DATETIMEOFFSET NULL,                  -- When this document expires (migration-friendly)
    RejectionReason NVARCHAR(255) NULL,              -- Why document was rejected (migration-friendly)
    
    -- Portal v2.0 DBA V7 Audit Fields (nullable for migration)
    CreatedByUserID INT NULL,                        -- NULL for migration
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    -- Foreign Key Constraints
    CONSTRAINT FK_DocumentRequirementFulfillment_Requirement FOREIGN KEY (DocumentRequirementID) REFERENCES [V7].[DocumentRequirement](DocumentRequirementID),
    CONSTRAINT FK_DocumentRequirementFulfillment_Form FOREIGN KEY (UserAreaFormID) REFERENCES [V7].[UserAreaForm](UserAreaFormID),
    CONSTRAINT FK_DocumentRequirementFulfillment_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID),
    
    -- Ensure at least one document reference
    CONSTRAINT CK_DocumentRequirementFulfillment_HasDocument CHECK (UserAreaFormID IS NOT NULL OR AttachmentID IS NOT NULL)
);

-- ========================================
-- PERFORMANCE INDEXES
-- ========================================

-- Folder hierarchy and organization
CREATE INDEX IX_DocumentFolder_UserAreaID_ParentID ON [V7].[DocumentFolder](UserAreaID, ParentFolderID);
CREATE INDEX IX_DocumentFolder_Path ON [V7].[DocumentFolder](FolderPath);

-- Document organization lookups
CREATE INDEX IX_DocumentOrganization_Folder ON [V7].[DocumentOrganization](DocumentFolderID);
CREATE INDEX IX_DocumentOrganization_Form ON [V7].[DocumentOrganization](UserAreaFormID);
CREATE INDEX IX_DocumentOrganization_Attachment ON [V7].[DocumentOrganization](AttachmentID);
CREATE INDEX IX_DocumentOrganization_Type ON [V7].[DocumentOrganization](DocumentType);

-- View tracking performance
CREATE INDEX IX_DocumentViewLog_User_Date ON [V7].[DocumentViewLog](UserID, CreatedDate);
CREATE INDEX IX_DocumentViewLog_Form_Date ON [V7].[DocumentViewLog](UserAreaFormID, CreatedDate);
CREATE INDEX IX_DocumentViewLog_Attachment_Date ON [V7].[DocumentViewLog](AttachmentID, CreatedDate);

-- Requirement set lookups
CREATE INDEX IX_DocumentRequirementSet_UserArea_Status ON [V7].[DocumentRequirementSet](UserAreaID, Status);
CREATE INDEX IX_DocumentRequirementSet_ProcessType ON [V7].[DocumentRequirementSet](ProcessType);

-- Requirement fulfillment tracking
CREATE INDEX IX_DocumentRequirement_Set_Order ON [V7].[DocumentRequirement](DocumentRequirementSetID, SortOrder);
CREATE INDEX IX_DocumentRequirementFulfillment_Requirement_Status ON [V7].[DocumentRequirementFulfillment](DocumentRequirementID, FulfillmentStatus);
CREATE INDEX IX_DocumentRequirementFulfillment_User ON [V7].[DocumentRequirementFulfillment](SubmittedByUserID);

-- Privacy and encryption lookups
CREATE INDEX IX_UserAreaForm_Privacy ON [V7].[UserAreaForm](PrivacyLevel) WHERE PrivacyLevel IS NOT NULL;
CREATE INDEX IX_UserAreaForm_ExternalID ON [V7].[UserAreaForm](ExternalDocumentID) WHERE ExternalDocumentID IS NOT NULL;

GO

-- ========================================
-- MIGRATION HELPER VIEW (CREATED AFTER TABLE MODIFICATIONS)
-- ========================================

-- View to show documents (UserAreaForm only - no assumptions about Attachment table)
CREATE VIEW [V7].[vw_AllDocuments] AS
SELECT 
    'Form' as DocumentType,
    f.UserAreaFormID as DocumentID,
    f.Title as DocumentName,
    f.Description,
    f.CreatedDate,
    f.CreatedByUserID,
    f.Status,
    f.PrivacyLevel,
    f.ExternalDocumentID,
    f.LegacySystemSource,
    o.DocumentFolderID,
    o.IsStarred,
    o.CustomTags,
    folder.FolderName,
    folder.FolderPath
FROM [V7].[UserAreaForm] f
LEFT JOIN [V7].[DocumentOrganization] o ON f.UserAreaFormID = o.UserAreaFormID
LEFT JOIN [V7].[DocumentFolder] folder ON o.DocumentFolderID = folder.DocumentFolderID
WHERE f.ArchivedDate IS NULL;

GO

-- ========================================
-- SUMMARY OF WHAT THIS SCRIPT CREATES
-- ========================================
/*
NEW TABLES CREATED:
1. DocumentFolder - Folder hierarchy for organizing documents
2. DocumentOrganization - Links documents to folders  
3. DocumentViewLog - Tracks who viewed what documents when
4. DocumentRequirementSet - Document requirement checklists (due diligence)
5. DocumentRequirement - Individual required documents in a set
6. DocumentRequirementFulfillment - Tracks completion of requirements

EXISTING TABLE ENHANCED:
- UserAreaForm - Added privacy, encryption, and migration fields

PERFORMANCE INDEXES:
- 11 indexes for efficient querying

HELPER VIEW:
- vw_AllDocuments - Unified view of all documents (forms + attachments)

FEATURES ENABLED:
✅ Document folders and organization
✅ Privacy levels and client-side encryption  
✅ Document view tracking and audit logs
✅ Document requirement checklists (due diligence)
✅ Migration from legacy systems
✅ Integration with existing blob storage
✅ Portal v2.0 DBA V7 compliance
*/