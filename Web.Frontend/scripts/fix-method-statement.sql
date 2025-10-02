-- Fix MethodStatement Tables
USE [V7-Dev];
GO

-- Create MethodStatement table WITHOUT foreign keys
CREATE TABLE [T100].[MethodStatement] (
    MethodStatementID INT IDENTITY(1,1) NOT NULL,
    UserAreaID INT NOT NULL,
    SSOWDocumentTypeID INT NOT NULL,
    SSOWStatusTypeID INT NOT NULL,
    DocumentNumber NVARCHAR(50) NOT NULL,
    DocumentTitle NVARCHAR(255) NOT NULL,
    DocumentVersion NVARCHAR(20) DEFAULT '1.0',
    PreviousVersionID INT NULL,
    IsCurrentVersion BIT DEFAULT 1,
    WorkDescription NVARCHAR(MAX) NOT NULL,
    Location NVARCHAR(500) NULL,
    Equipment NVARCHAR(MAX) NULL,
    Materials NVARCHAR(MAX) NULL,
    MinimumPersonnel INT DEFAULT 1,
    MaximumPersonnel INT NULL,
    RequiredCompetencies NVARCHAR(MAX) NULL,
    TrainingRequirements NVARCHAR(MAX) NULL,
    SSOWRiskCategoryID INT NULL,
    MainHazards NVARCHAR(MAX) NULL,
    RiskAssessmentID INT NULL,
    AuthorUserID INT NOT NULL,
    ReviewerUserID INT NULL,
    ApproverUserID INT NULL,
    ReviewDate DATETIMEOFFSET NULL,
    ApprovalDate DATETIMEOFFSET NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    PublishedDate DATETIMEOFFSET NULL,
    PublishedByUserID INT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    EmergencyProcedures NVARCHAR(MAX) NULL,
    EmergencyContacts NVARCHAR(MAX) NULL,
    LegalRequirements NVARCHAR(MAX) NULL,
    References NVARCHAR(MAX) NULL,
    AdditionalNotes NVARCHAR(MAX) NULL,
    IsActive BIT DEFAULT 1,
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    CONSTRAINT PK_MethodStatement PRIMARY KEY CLUSTERED (MethodStatementID)
);
GO

-- Create MethodStatementStep table
CREATE TABLE [T100].[MethodStatementStep] (
    MethodStatementStepID INT IDENTITY(1,1) NOT NULL,
    UserAreaID INT NOT NULL,
    MethodStatementID INT NOT NULL,
    StepNumber INT NOT NULL,
    StepTitle NVARCHAR(255) NOT NULL,
    StepDescription NVARCHAR(MAX) NOT NULL,
    StepDuration INT NULL,
    PersonnelRequired INT DEFAULT 1,
    SpecificRoles NVARCHAR(500) NULL,
    KeyHazards NVARCHAR(MAX) NULL,
    SafetyPrecautions NVARCHAR(MAX) NULL,
    RequiredPPE NVARCHAR(500) NULL,
    RequiredEquipment NVARCHAR(MAX) NULL,
    ToolsRequired NVARCHAR(MAX) NULL,
    InspectionPoints NVARCHAR(MAX) NULL,
    QualityChecks NVARCHAR(MAX) NULL,
    AcceptanceCriteria NVARCHAR(MAX) NULL,
    CriticalControlPoints NVARCHAR(MAX) NULL,
    EnvironmentalConsiderations NVARCHAR(MAX) NULL,
    Notes NVARCHAR(MAX) NULL,
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    CONSTRAINT PK_MethodStatementStep PRIMARY KEY CLUSTERED (MethodStatementStepID)
);
GO

-- Add foreign key for MethodStatementStep
ALTER TABLE [T100].[MethodStatementStep] 
ADD CONSTRAINT FK_MethodStatementStep_MethodStatement 
FOREIGN KEY (MethodStatementID) REFERENCES [T100].[MethodStatement](MethodStatementID);
GO

-- Add indexes
CREATE INDEX IX_MethodStatement_UserAreaID ON [T100].[MethodStatement](UserAreaID);
CREATE INDEX IX_MethodStatement_DocumentNumber ON [T100].[MethodStatement](DocumentNumber);
CREATE INDEX IX_MethodStatementStep_MethodStatementID ON [T100].[MethodStatementStep](MethodStatementID);
GO

PRINT 'MethodStatement tables created successfully';
GO