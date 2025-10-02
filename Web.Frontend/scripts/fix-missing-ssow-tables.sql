-- =============================================
-- Fix Missing SSOW Tables
-- Purpose: Create MethodStatement and SafeWorkingProcedure tables
-- Date: 2025-07-30
-- =============================================

USE [V7-Dev];
GO

-- Drop tables if they exist (in case of partial creation)
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[T100].[MethodStatementStep]') AND type in (N'U'))
    DROP TABLE [T100].[MethodStatementStep];
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[T100].[SafeWorkingProcedureStep]') AND type in (N'U'))
    DROP TABLE [T100].[SafeWorkingProcedureStep];
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[T100].[MethodStatement]') AND type in (N'U'))
    DROP TABLE [T100].[MethodStatement];
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[T100].[SafeWorkingProcedure]') AND type in (N'U'))
    DROP TABLE [T100].[SafeWorkingProcedure];
GO

-- =============================================
-- Create Method Statement Table (without foreign keys first)
-- =============================================
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
    RiskAssessmentID INT NULL,
    
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
    ArchivedDate DATETIMEOFFSET NULL
);
GO

-- Create indexes
CREATE INDEX IX_MethodStatement_UserAreaID ON [T100].[MethodStatement](UserAreaID);
CREATE INDEX IX_MethodStatement_DocumentNumber ON [T100].[MethodStatement](DocumentNumber);
CREATE INDEX IX_MethodStatement_Status ON [T100].[MethodStatement](SSOWStatusTypeID);
GO

-- =============================================
-- Create Method Statement Steps Table
-- =============================================
CREATE TABLE [T100].[MethodStatementStep] (
    MethodStatementStepID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    MethodStatementID INT NOT NULL,
    
    -- Step Information
    StepNumber INT NOT NULL,
    StepTitle NVARCHAR(255) NOT NULL,
    StepDescription NVARCHAR(MAX) NOT NULL,
    StepDuration INT NULL,
    
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
    
    CONSTRAINT FK_MethodStatementStep_MethodStatement FOREIGN KEY (MethodStatementID) 
        REFERENCES [T100].[MethodStatement](MethodStatementID) ON DELETE CASCADE
);
GO

-- Create indexes
CREATE INDEX IX_MethodStatementStep_UserAreaID ON [T100].[MethodStatementStep](UserAreaID);
CREATE INDEX IX_MethodStatementStep_MethodStatementID ON [T100].[MethodStatementStep](MethodStatementID);
GO

-- =============================================
-- Create Safe Working Procedure Table
-- =============================================
CREATE TABLE [T100].[SafeWorkingProcedure] (
    SafeWorkingProcedureID INT IDENTITY(1,1) PRIMARY KEY,
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
    Purpose NVARCHAR(MAX) NOT NULL,
    Scope NVARCHAR(MAX) NOT NULL,
    Responsibilities NVARCHAR(MAX) NULL,
    
    -- Safety Requirements
    SSOWRiskCategoryID INT NULL,
    HazardIdentification NVARCHAR(MAX) NULL,
    RiskAssessmentID INT NULL,
    RequiredPPE NVARCHAR(MAX) NULL,
    SafetyEquipment NVARCHAR(MAX) NULL,
    
    -- Training and Competency
    RequiredTraining NVARCHAR(MAX) NULL,
    CompetencyRequirements NVARCHAR(MAX) NULL,
    SupervisionRequirements NVARCHAR(500) NULL,
    
    -- Environmental
    EnvironmentalRequirements NVARCHAR(MAX) NULL,
    WasteDisposal NVARCHAR(MAX) NULL,
    
    -- Emergency Procedures
    EmergencyProcedures NVARCHAR(MAX) NULL,
    EmergencyContacts NVARCHAR(MAX) NULL,
    FirstAidRequirements NVARCHAR(MAX) NULL,
    
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
    LegalRequirements NVARCHAR(MAX) NULL,
    StandardsReferences NVARCHAR(MAX) NULL,
    RelatedDocuments NVARCHAR(MAX) NULL,
    
    -- Status
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

-- Create indexes
CREATE INDEX IX_SafeWorkingProcedure_UserAreaID ON [T100].[SafeWorkingProcedure](UserAreaID);
CREATE INDEX IX_SafeWorkingProcedure_DocumentNumber ON [T100].[SafeWorkingProcedure](DocumentNumber);
CREATE INDEX IX_SafeWorkingProcedure_Status ON [T100].[SafeWorkingProcedure](SSOWStatusTypeID);
GO

-- =============================================
-- Create Safe Working Procedure Steps Table
-- =============================================
CREATE TABLE [T100].[SafeWorkingProcedureStep] (
    SafeWorkingProcedureStepID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SafeWorkingProcedureID INT NOT NULL,
    
    -- Step Information
    StepNumber INT NOT NULL,
    StepTitle NVARCHAR(255) NOT NULL,
    StepDescription NVARCHAR(MAX) NOT NULL,
    
    -- Safety Controls
    HazardControls NVARCHAR(MAX) NULL,
    CriticalControlPoint BIT DEFAULT 0,
    VerificationRequired BIT DEFAULT 0,
    VerificationMethod NVARCHAR(500) NULL,
    
    -- Resources
    RequiredResources NVARCHAR(MAX) NULL,
    RequiredDocuments NVARCHAR(MAX) NULL,
    
    -- Additional Information
    WarningsAndCautions NVARCHAR(MAX) NULL,
    Notes NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SafeWorkingProcedureStep_SafeWorkingProcedure FOREIGN KEY (SafeWorkingProcedureID) 
        REFERENCES [T100].[SafeWorkingProcedure](SafeWorkingProcedureID) ON DELETE CASCADE
);
GO

-- Create indexes
CREATE INDEX IX_SafeWorkingProcedureStep_UserAreaID ON [T100].[SafeWorkingProcedureStep](UserAreaID);
CREATE INDEX IX_SafeWorkingProcedureStep_SafeWorkingProcedureID ON [T100].[SafeWorkingProcedureStep](SafeWorkingProcedureID);
GO

-- =============================================
-- Add Foreign Keys for MethodStatement
-- =============================================
ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_UserArea 
    FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID);

ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_DocumentType 
    FOREIGN KEY (SSOWDocumentTypeID) REFERENCES [T100].[SSOWDocumentType](SSOWDocumentTypeID);

ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_Status 
    FOREIGN KEY (SSOWStatusTypeID) REFERENCES [T100].[SSOWStatusType](SSOWStatusTypeID);

ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_RiskCategory 
    FOREIGN KEY (SSOWRiskCategoryID) REFERENCES [T100].[SSOWRiskCategory](SSOWRiskCategoryID);

ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_RiskAssessment 
    FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID);

ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_Author 
    FOREIGN KEY (AuthorUserID) REFERENCES [V7].[User](UserID);

ALTER TABLE [T100].[MethodStatement] ADD CONSTRAINT FK_MethodStatement_PreviousVersion 
    FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[MethodStatement](MethodStatementID);
GO

-- =============================================
-- Add Foreign Keys for MethodStatementStep
-- =============================================
ALTER TABLE [T100].[MethodStatementStep] ADD CONSTRAINT FK_MethodStatementStep_UserArea 
    FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID);
GO

-- =============================================
-- Add Foreign Keys for SafeWorkingProcedure
-- =============================================
ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_UserArea 
    FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID);

ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_DocumentType 
    FOREIGN KEY (SSOWDocumentTypeID) REFERENCES [T100].[SSOWDocumentType](SSOWDocumentTypeID);

ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_Status 
    FOREIGN KEY (SSOWStatusTypeID) REFERENCES [T100].[SSOWStatusType](SSOWStatusTypeID);

ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_RiskCategory 
    FOREIGN KEY (SSOWRiskCategoryID) REFERENCES [T100].[SSOWRiskCategory](SSOWRiskCategoryID);

ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_RiskAssessment 
    FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID);

ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_Author 
    FOREIGN KEY (AuthorUserID) REFERENCES [V7].[User](UserID);

ALTER TABLE [T100].[SafeWorkingProcedure] ADD CONSTRAINT FK_SafeWorkingProcedure_PreviousVersion 
    FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[SafeWorkingProcedure](SafeWorkingProcedureID);
GO

-- =============================================
-- Add Foreign Keys for SafeWorkingProcedureStep
-- =============================================
ALTER TABLE [T100].[SafeWorkingProcedureStep] ADD CONSTRAINT FK_SafeWorkingProcedureStep_UserArea 
    FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID);
GO

PRINT 'MethodStatement and SafeWorkingProcedure tables created successfully';
GO