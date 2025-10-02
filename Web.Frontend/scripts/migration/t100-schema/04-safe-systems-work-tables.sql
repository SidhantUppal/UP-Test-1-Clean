-- =============================================
-- Safe Systems of Work (SSOW) Module Tables
-- Purpose: Create SSOW tables for Method Statements, Safe Working Procedures
-- Author: Platform Team
-- Date: 2025-07-29
-- =============================================

USE [V7-Dev];
GO

-- =============================================
-- SSOW Configuration Tables
-- =============================================

-- SSOW Document Types
CREATE TABLE [T100].[SSOWDocumentType] (
    SSOWDocumentTypeID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(100) NOT NULL,
    TypeDescription NVARCHAR(500) NULL,
    TypeCategory NVARCHAR(50) NOT NULL, -- MethodStatement, SafeWorkingProcedure, PermitToWork, WorkInstruction
    TemplateURL NVARCHAR(500) NULL,
    RequiresApproval BIT DEFAULT 1,
    ReviewFrequencyMonths INT NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL
);
GO

-- SSOW Status Types
CREATE TABLE [T100].[SSOWStatusType] (
    SSOWStatusTypeID INT IDENTITY(1,1) PRIMARY KEY,
    StatusName NVARCHAR(50) NOT NULL,
    StatusDescription NVARCHAR(200) NULL,
    StatusCategory NVARCHAR(50) NOT NULL, -- Draft, Review, Approved, Published, Archived
    ColorCode NVARCHAR(7) NULL, -- Hex color for UI
    WorkflowOrder INT NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL
);
GO

-- SSOW Risk Categories
CREATE TABLE [T100].[SSOWRiskCategory] (
    SSOWRiskCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    RiskLevel NVARCHAR(50) DEFAULT 'Medium', -- Low, Medium, High, Critical
    ColorCode NVARCHAR(7) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SSOWRiskCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- =============================================
-- Method Statements
-- =============================================

-- Main Method Statements Table
CREATE TABLE [T100].[MethodStatement] (
    MethodStatementID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SSOWDocumentTypeID INT NOT NULL,
    SSOWStatusTypeID INT NOT NULL,
    
    -- Document Information
    DocumentNumber NVARCHAR(50) NOT NULL,
    DocumentTitle NVARCHAR(255) NOT NULL,
    DocumentVersion NVARCHAR(20) DEFAULT '1.0',
    PreviousVersionID INT NULL,
    IsCurrentVersion BIT DEFAULT 1,
    
    -- Content
    WorkDescription NVARCHAR(MAX) NOT NULL,
    Location NVARCHAR(500) NULL,
    Equipment NVARCHAR(MAX) NULL,
    Materials NVARCHAR(MAX) NULL,
    
    -- Personnel Requirements
    MinimumPersonnel INT DEFAULT 1,
    MaximumPersonnel INT NULL,
    RequiredCompetencies NVARCHAR(MAX) NULL,
    TrainingRequirements NVARCHAR(MAX) NULL,
    
    -- Risk Information
    SSOWRiskCategoryID INT NULL,
    MainHazards NVARCHAR(MAX) NULL,
    RiskAssessmentID INT NULL, -- Link to related risk assessment
    
    -- Approval and Review
    AuthorUserID INT NOT NULL,
    ReviewerUserID INT NULL,
    ApproverUserID INT NULL,
    ReviewDate DATETIMEOFFSET NULL,
    ApprovalDate DATETIMEOFFSET NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    
    -- Publication
    PublishedDate DATETIMEOFFSET NULL,
    PublishedByUserID INT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- Emergency Procedures
    EmergencyProcedures NVARCHAR(MAX) NULL,
    EmergencyContacts NVARCHAR(MAX) NULL,
    
    -- Additional Information
    LegalRequirements NVARCHAR(MAX) NULL,
    References NVARCHAR(MAX) NULL,
    AdditionalNotes NVARCHAR(MAX) NULL,
    
    -- Status
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_MethodStatement_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_MethodStatement_DocumentType FOREIGN KEY (SSOWDocumentTypeID) REFERENCES [T100].[SSOWDocumentType](SSOWDocumentTypeID),
    CONSTRAINT FK_MethodStatement_Status FOREIGN KEY (SSOWStatusTypeID) REFERENCES [T100].[SSOWStatusType](SSOWStatusTypeID),
    CONSTRAINT FK_MethodStatement_RiskCategory FOREIGN KEY (SSOWRiskCategoryID) REFERENCES [T100].[SSOWRiskCategory](SSOWRiskCategoryID),
    CONSTRAINT FK_MethodStatement_RiskAssessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_MethodStatement_Author FOREIGN KEY (AuthorUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_MethodStatement_Reviewer FOREIGN KEY (ReviewerUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_MethodStatement_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_MethodStatement_Publisher FOREIGN KEY (PublishedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_MethodStatement_PreviousVersion FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[MethodStatement](MethodStatementID)
);
GO

-- Method Statement Steps
CREATE TABLE [T100].[MethodStatementStep] (
    MethodStatementStepID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    MethodStatementID INT NOT NULL,
    
    -- Step Information
    StepNumber INT NOT NULL,
    StepTitle NVARCHAR(255) NOT NULL,
    StepDescription NVARCHAR(MAX) NOT NULL,
    StepDuration INT NULL, -- in minutes
    
    -- Personnel
    PersonnelRequired INT DEFAULT 1,
    SpecificRoles NVARCHAR(500) NULL,
    
    -- Safety Information
    KeyHazards NVARCHAR(MAX) NULL,
    SafetyPrecautions NVARCHAR(MAX) NULL,
    RequiredPPE NVARCHAR(500) NULL,
    
    -- Equipment and Tools
    RequiredEquipment NVARCHAR(MAX) NULL,
    ToolsRequired NVARCHAR(MAX) NULL,
    InspectionPoints NVARCHAR(MAX) NULL,
    
    -- Quality Controls
    QualityChecks NVARCHAR(MAX) NULL,
    AcceptanceCriteria NVARCHAR(MAX) NULL,
    
    -- Additional Information
    CriticalControlPoints NVARCHAR(MAX) NULL,
    EnvironmentalConsiderations NVARCHAR(MAX) NULL,
    Notes NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_MethodStatementStep_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_MethodStatementStep_MethodStatement FOREIGN KEY (MethodStatementID) REFERENCES [T100].[MethodStatement](MethodStatementID)
);
GO

-- =============================================
-- Safe Working Procedures
-- =============================================

-- Safe Working Procedures Table
CREATE TABLE [T100].[SafeWorkingProcedure] (
    SafeWorkingProcedureID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SSOWDocumentTypeID INT NOT NULL,
    SSOWStatusTypeID INT NOT NULL,
    
    -- Document Information
    ProcedureNumber NVARCHAR(50) NOT NULL,
    ProcedureTitle NVARCHAR(255) NOT NULL,
    ProcedureVersion NVARCHAR(20) DEFAULT '1.0',
    PreviousVersionID INT NULL,
    IsCurrentVersion BIT DEFAULT 1,
    
    -- Scope and Purpose
    Purpose NVARCHAR(MAX) NOT NULL,
    Scope NVARCHAR(MAX) NOT NULL,
    Applicability NVARCHAR(MAX) NULL,
    
    -- Procedure Content
    ProcedureDescription NVARCHAR(MAX) NOT NULL,
    Equipment NVARCHAR(MAX) NULL,
    Materials NVARCHAR(MAX) NULL,
    
    -- Safety Requirements
    SafetyRequirements NVARCHAR(MAX) NULL,
    RiskControls NVARCHAR(MAX) NULL,
    EmergencyProcedures NVARCHAR(MAX) NULL,
    
    -- Personnel Requirements
    CompetencyRequirements NVARCHAR(MAX) NULL,
    TrainingRequirements NVARCHAR(MAX) NULL,
    SupervisionLevel NVARCHAR(100) NULL,
    
    -- Approval and Review
    AuthorUserID INT NOT NULL,
    ReviewerUserID INT NULL,
    ApproverUserID INT NULL,
    ReviewDate DATETIMEOFFSET NULL,
    ApprovalDate DATETIMEOFFSET NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    
    -- Publication
    PublishedDate DATETIMEOFFSET NULL,
    PublishedByUserID INT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- References
    RelatedProcedures NVARCHAR(MAX) NULL,
    LegalRequirements NVARCHAR(MAX) NULL,
    References NVARCHAR(MAX) NULL,
    
    -- Status
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SafeWorkingProcedure_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SafeWorkingProcedure_DocumentType FOREIGN KEY (SSOWDocumentTypeID) REFERENCES [T100].[SSOWDocumentType](SSOWDocumentTypeID),
    CONSTRAINT FK_SafeWorkingProcedure_Status FOREIGN KEY (SSOWStatusTypeID) REFERENCES [T100].[SSOWStatusType](SSOWStatusTypeID),
    CONSTRAINT FK_SafeWorkingProcedure_Author FOREIGN KEY (AuthorUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_SafeWorkingProcedure_Reviewer FOREIGN KEY (ReviewerUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_SafeWorkingProcedure_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_SafeWorkingProcedure_Publisher FOREIGN KEY (PublishedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_SafeWorkingProcedure_PreviousVersion FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[SafeWorkingProcedure](SafeWorkingProcedureID)
);
GO

-- Safe Working Procedure Steps
CREATE TABLE [T100].[SafeWorkingProcedureStep] (
    SafeWorkingProcedureStepID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SafeWorkingProcedureID INT NOT NULL,
    
    -- Step Information
    StepNumber INT NOT NULL,
    StepTitle NVARCHAR(255) NOT NULL,
    StepDescription NVARCHAR(MAX) NOT NULL,
    
    -- Safety Information
    SafetyNotes NVARCHAR(MAX) NULL,
    CriticalSafetyPoints NVARCHAR(MAX) NULL,
    RequiredPPE NVARCHAR(500) NULL,
    
    -- Quality and Compliance
    QualityPoints NVARCHAR(MAX) NULL,
    ComplianceRequirements NVARCHAR(MAX) NULL,
    
    -- Additional Information
    Notes NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SafeWorkingProcedureStep_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SafeWorkingProcedureStep_Procedure FOREIGN KEY (SafeWorkingProcedureID) REFERENCES [T100].[SafeWorkingProcedure](SafeWorkingProcedureID)
);
GO

-- =============================================
-- Work Instructions
-- =============================================

-- Work Instructions Table
CREATE TABLE [T100].[WorkInstruction] (
    WorkInstructionID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SSOWDocumentTypeID INT NOT NULL,
    SSOWStatusTypeID INT NOT NULL,
    
    -- Document Information
    InstructionNumber NVARCHAR(50) NOT NULL,
    InstructionTitle NVARCHAR(255) NOT NULL,
    InstructionVersion NVARCHAR(20) DEFAULT '1.0',
    PreviousVersionID INT NULL,
    IsCurrentVersion BIT DEFAULT 1,
    
    -- Instruction Content
    TaskDescription NVARCHAR(MAX) NOT NULL,
    DetailedInstructions NVARCHAR(MAX) NOT NULL,
    Prerequisites NVARCHAR(MAX) NULL,
    
    -- Equipment and Materials
    RequiredEquipment NVARCHAR(MAX) NULL,
    RequiredMaterials NVARCHAR(MAX) NULL,
    RequiredTools NVARCHAR(MAX) NULL,
    
    -- Safety Information
    SafetyRequirements NVARCHAR(MAX) NULL,
    HazardWarnings NVARCHAR(MAX) NULL,
    RequiredPPE NVARCHAR(500) NULL,
    
    -- Quality Information
    QualityStandards NVARCHAR(MAX) NULL,
    InspectionRequirements NVARCHAR(MAX) NULL,
    AcceptanceCriteria NVARCHAR(MAX) NULL,
    
    -- Time and Resources
    EstimatedDuration INT NULL, -- in minutes
    PersonnelRequired INT DEFAULT 1,
    SkillLevelRequired NVARCHAR(100) NULL,
    
    -- Approval and Review
    AuthorUserID INT NOT NULL,
    ReviewerUserID INT NULL,
    ApproverUserID INT NULL,
    ReviewDate DATETIMEOFFSET NULL,
    ApprovalDate DATETIMEOFFSET NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    
    -- Publication
    PublishedDate DATETIMEOFFSET NULL,
    PublishedByUserID INT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- Status
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_WorkInstruction_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_WorkInstruction_DocumentType FOREIGN KEY (SSOWDocumentTypeID) REFERENCES [T100].[SSOWDocumentType](SSOWDocumentTypeID),
    CONSTRAINT FK_WorkInstruction_Status FOREIGN KEY (SSOWStatusTypeID) REFERENCES [T100].[SSOWStatusType](SSOWStatusTypeID),
    CONSTRAINT FK_WorkInstruction_Author FOREIGN KEY (AuthorUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_WorkInstruction_Reviewer FOREIGN KEY (ReviewerUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_WorkInstruction_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_WorkInstruction_Publisher FOREIGN KEY (PublishedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_WorkInstruction_PreviousVersion FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[WorkInstruction](WorkInstructionID)
);
GO

-- =============================================
-- Shared SSOW Supporting Tables
-- =============================================

-- SSOW Attachments (for all SSOW document types)
CREATE TABLE [T100].[SSOWAttachment] (
    SSOWAttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    AttachmentID INT NOT NULL,
    
    -- Document Reference
    DocumentType NVARCHAR(50) NOT NULL, -- MethodStatement, SafeWorkingProcedure, WorkInstruction
    DocumentID INT NOT NULL,
    
    -- Attachment Details
    AttachmentType NVARCHAR(50) DEFAULT 'Document', -- Document, Photo, Diagram, Checklist
    AttachmentTitle NVARCHAR(255) NOT NULL,
    AttachmentDescription NVARCHAR(500) NULL,
    SequenceOrder INT DEFAULT 0,
    IsRequired BIT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SSOWAttachment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SSOWAttachment_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID)
);
GO

-- SSOW Location Assignments
CREATE TABLE [T100].[SSOWLocation] (
    SSOWLocationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    LocationID INT NOT NULL,
    
    -- Document Reference
    DocumentType NVARCHAR(50) NOT NULL, -- MethodStatement, SafeWorkingProcedure, WorkInstruction
    DocumentID INT NOT NULL,
    
    -- Location Specific Information
    LocationSpecificNotes NVARCHAR(MAX) NULL,
    LocalVariations NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SSOWLocation_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SSOWLocation_Location FOREIGN KEY (LocationID) REFERENCES [V7].[Location](LocationID)
);
GO

-- SSOW Organization Group Assignments
CREATE TABLE [T100].[SSOWOrgGroup] (
    SSOWOrgGroupID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    OrgGroupID INT NOT NULL,
    
    -- Document Reference
    DocumentType NVARCHAR(50) NOT NULL, -- MethodStatement, SafeWorkingProcedure, WorkInstruction
    DocumentID INT NOT NULL,
    
    -- Organization Specific Information
    GroupSpecificNotes NVARCHAR(MAX) NULL,
    AdditionalRequirements NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SSOWOrgGroup_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SSOWOrgGroup_OrgGroup FOREIGN KEY (OrgGroupID) REFERENCES [V7].[OrgGroup](OrgGroupID)
);
GO

-- SSOW Approval Log (for all SSOW document types)
CREATE TABLE [T100].[SSOWApprovalLog] (
    SSOWApprovalLogID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    
    -- Document Reference
    DocumentType NVARCHAR(50) NOT NULL, -- MethodStatement, SafeWorkingProcedure, WorkInstruction
    DocumentID INT NOT NULL,
    
    -- Approval Details
    ApprovalAction NVARCHAR(50) NOT NULL, -- Submitted, Reviewed, Approved, Rejected, Published
    ApprovalLevel INT DEFAULT 1,
    ApproverUserID INT NOT NULL,
    ApprovalDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ApprovalComments NVARCHAR(MAX) NULL,
    
    -- Document State at Time of Approval
    DocumentVersion NVARCHAR(20) NULL,
    DocumentStatus NVARCHAR(50) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_SSOWApprovalLog_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SSOWApprovalLog_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID)
);
GO

-- SSOW External Links (for regulations, standards, references)
CREATE TABLE [T100].[SSOWExternalLink] (
    SSOWExternalLinkID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    
    -- Document Reference
    DocumentType NVARCHAR(50) NOT NULL, -- MethodStatement, SafeWorkingProcedure, WorkInstruction
    DocumentID INT NOT NULL,
    
    -- Link Details
    LinkTitle NVARCHAR(255) NOT NULL,
    LinkURL NVARCHAR(500) NOT NULL,
    LinkDescription NVARCHAR(500) NULL,
    LinkType NVARCHAR(50) DEFAULT 'Reference', -- Reference, Regulation, Standard, Guidance, Training
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SSOWExternalLink_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- =============================================
-- Create Indexes for Performance
-- =============================================

-- Method Statement indexes
CREATE INDEX IX_MethodStatement_UserAreaID ON [T100].[MethodStatement](UserAreaID);
CREATE INDEX IX_MethodStatement_DocumentNumber ON [T100].[MethodStatement](DocumentNumber);
CREATE INDEX IX_MethodStatement_Status ON [T100].[MethodStatement](SSOWStatusTypeID);
CREATE INDEX IX_MethodStatement_Author ON [T100].[MethodStatement](AuthorUserID);
CREATE INDEX IX_MethodStatement_NextReviewDate ON [T100].[MethodStatement](NextReviewDate);

-- Safe Working Procedure indexes
CREATE INDEX IX_SafeWorkingProcedure_UserAreaID ON [T100].[SafeWorkingProcedure](UserAreaID);
CREATE INDEX IX_SafeWorkingProcedure_ProcedureNumber ON [T100].[SafeWorkingProcedure](ProcedureNumber);
CREATE INDEX IX_SafeWorkingProcedure_Status ON [T100].[SafeWorkingProcedure](SSOWStatusTypeID);
CREATE INDEX IX_SafeWorkingProcedure_Author ON [T100].[SafeWorkingProcedure](AuthorUserID);

-- Work Instruction indexes
CREATE INDEX IX_WorkInstruction_UserAreaID ON [T100].[WorkInstruction](UserAreaID);
CREATE INDEX IX_WorkInstruction_InstructionNumber ON [T100].[WorkInstruction](InstructionNumber);
CREATE INDEX IX_WorkInstruction_Status ON [T100].[WorkInstruction](SSOWStatusTypeID);
CREATE INDEX IX_WorkInstruction_Author ON [T100].[WorkInstruction](AuthorUserID);

-- Step indexes
CREATE INDEX IX_MethodStatementStep_MethodStatementID ON [T100].[MethodStatementStep](MethodStatementID);
CREATE INDEX IX_SafeWorkingProcedureStep_ProcedureID ON [T100].[SafeWorkingProcedureStep](SafeWorkingProcedureID);

-- Supporting table indexes
CREATE INDEX IX_SSOWAttachment_DocumentType_DocumentID ON [T100].[SSOWAttachment](DocumentType, DocumentID);
CREATE INDEX IX_SSOWLocation_DocumentType_DocumentID ON [T100].[SSOWLocation](DocumentType, DocumentID);
CREATE INDEX IX_SSOWOrgGroup_DocumentType_DocumentID ON [T100].[SSOWOrgGroup](DocumentType, DocumentID);
CREATE INDEX IX_SSOWApprovalLog_DocumentType_DocumentID ON [T100].[SSOWApprovalLog](DocumentType, DocumentID);
CREATE INDEX IX_SSOWExternalLink_DocumentType_DocumentID ON [T100].[SSOWExternalLink](DocumentType, DocumentID);

PRINT 'Safe Systems of Work tables created successfully';
GO