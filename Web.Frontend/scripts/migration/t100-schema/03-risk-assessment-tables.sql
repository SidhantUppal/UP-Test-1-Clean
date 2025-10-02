-- =============================================
-- Risk Assessment Module Tables
-- Purpose: Create risk assessment tables from Portal-V7
-- Author: Platform Team
-- Date: 2025-07-29
-- =============================================

USE [V7-Dev];
GO

-- =============================================
-- Risk Matrix Configuration Tables
-- =============================================

-- Risk Matrix Types
CREATE TABLE [T100].[RiskMatrixType] (
    RiskMatrixTypeID INT IDENTITY(1,1) PRIMARY KEY,
    MatrixName NVARCHAR(100) NOT NULL,
    MatrixDescription NVARCHAR(500) NULL,
    LikelihoodLevels INT DEFAULT 5,
    ConsequenceLevels INT DEFAULT 5,
    IsDefault BIT DEFAULT 0,
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

-- Risk Matrix Likelihood Types
CREATE TABLE [T100].[RiskMatrixLikelihoodType] (
    RiskMatrixLikelihoodTypeID INT IDENTITY(1,1) PRIMARY KEY,
    RiskMatrixTypeID INT NOT NULL,
    LikelihoodLevel INT NOT NULL,
    LikelihoodName NVARCHAR(100) NOT NULL,
    LikelihoodDescription NVARCHAR(500) NULL,
    Probability DECIMAL(5,2) NULL, -- Percentage chance
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskMatrixLikelihood_MatrixType FOREIGN KEY (RiskMatrixTypeID) REFERENCES [T100].[RiskMatrixType](RiskMatrixTypeID)
);
GO

-- Risk Matrix Consequence Types
CREATE TABLE [T100].[RiskMatrixConsequenceType] (
    RiskMatrixConsequenceTypeID INT IDENTITY(1,1) PRIMARY KEY,
    RiskMatrixTypeID INT NOT NULL,
    ConsequenceLevel INT NOT NULL,
    ConsequenceName NVARCHAR(100) NOT NULL,
    ConsequenceDescription NVARCHAR(500) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskMatrixConsequence_MatrixType FOREIGN KEY (RiskMatrixTypeID) REFERENCES [T100].[RiskMatrixType](RiskMatrixTypeID)
);
GO

-- Risk Level Color Types
CREATE TABLE [T100].[RiskLevelColourType] (
    RiskLevelColourTypeID INT IDENTITY(1,1) PRIMARY KEY,
    ColorName NVARCHAR(50) NOT NULL,
    ColorHex NVARCHAR(7) NOT NULL, -- #RRGGBB format
    ColorDescription NVARCHAR(200) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL
);
GO

-- Risk Matrix Color Mappings
CREATE TABLE [T100].[RiskMatrixTypeColour] (
    RiskMatrixTypeColourID INT IDENTITY(1,1) PRIMARY KEY,
    RiskMatrixTypeID INT NOT NULL,
    LikelihoodLevel INT NOT NULL,
    ConsequenceLevel INT NOT NULL,
    RiskLevelColourTypeID INT NOT NULL,
    RiskScore INT NOT NULL, -- Calculated risk score
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_RiskMatrixTypeColour_MatrixType FOREIGN KEY (RiskMatrixTypeID) REFERENCES [T100].[RiskMatrixType](RiskMatrixTypeID),
    CONSTRAINT FK_RiskMatrixTypeColour_Colour FOREIGN KEY (RiskLevelColourTypeID) REFERENCES [T100].[RiskLevelColourType](RiskLevelColourTypeID)
);
GO

-- =============================================
-- Hazard and Control Libraries
-- =============================================

-- Hazard Category Types
CREATE TABLE [T100].[HazardCategoryType] (
    HazardCategoryTypeID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryTypeName NVARCHAR(100) NOT NULL,
    CategoryTypeDescription NVARCHAR(500) NULL,
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

-- Hazard Categories
CREATE TABLE [T100].[HazardCategory] (
    HazardCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    HazardCategoryTypeID INT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    ParentCategoryID INT NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_HazardCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_HazardCategory_CategoryType FOREIGN KEY (HazardCategoryTypeID) REFERENCES [T100].[HazardCategoryType](HazardCategoryTypeID),
    CONSTRAINT FK_HazardCategory_Parent FOREIGN KEY (ParentCategoryID) REFERENCES [T100].[HazardCategory](HazardCategoryID)
);
GO

-- Hazard Library
CREATE TABLE [T100].[Hazard] (
    HazardID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    HazardCategoryID INT NULL,
    HazardName NVARCHAR(255) NOT NULL,
    HazardDescription NVARCHAR(MAX) NULL,
    HazardCode NVARCHAR(50) NULL,
    
    -- Risk Details
    InherentLikelihood INT NULL,
    InherentConsequence INT NULL,
    InherentRiskScore INT NULL,
    
    -- Additional Info
    LegalRequirements NVARCHAR(MAX) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_Hazard_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_Hazard_Category FOREIGN KEY (HazardCategoryID) REFERENCES [T100].[HazardCategory](HazardCategoryID)
);
GO

-- Control Measure Types
CREATE TABLE [T100].[ControlMeasureType] (
    ControlMeasureTypeID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(100) NOT NULL,
    TypeDescription NVARCHAR(500) NULL,
    HierarchyLevel INT NULL, -- 1=Elimination, 2=Substitution, 3=Engineering, 4=Administrative, 5=PPE
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

-- Control Measure Library
CREATE TABLE [T100].[ControlMeasure] (
    ControlMeasureID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    ControlMeasureTypeID INT NULL,
    ControlName NVARCHAR(255) NOT NULL,
    ControlDescription NVARCHAR(MAX) NULL,
    ControlCode NVARCHAR(50) NULL,
    
    -- Effectiveness
    EffectivenessRating DECIMAL(3,1) NULL, -- 1-10 scale
    CostCategory NVARCHAR(50) NULL, -- Low, Medium, High
    ImplementationDifficulty NVARCHAR(50) NULL, -- Easy, Medium, Hard
    
    -- Additional Info
    MaintenanceRequirements NVARCHAR(MAX) NULL,
    TrainingRequired NVARCHAR(MAX) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_ControlMeasure_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_ControlMeasure_Type FOREIGN KEY (ControlMeasureTypeID) REFERENCES [T100].[ControlMeasureType](ControlMeasureTypeID)
);
GO

-- People at Risk Categories
CREATE TABLE [T100].[PersonsAtRisk] (
    PersonsAtRiskID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    VulnerabilityLevel NVARCHAR(50) NULL, -- Low, Medium, High
    SpecialConsiderations NVARCHAR(MAX) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PersonsAtRisk_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- Persons in Charge
CREATE TABLE [T100].[PersonsInCharge] (
    PersonsInChargeID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    UserID INT NOT NULL,
    ResponsibilityLevel NVARCHAR(100) NOT NULL,
    ResponsibilityDescription NVARCHAR(500) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PersonsInCharge_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PersonsInCharge_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID)
);
GO

-- =============================================
-- Risk Assessment Main Tables
-- =============================================

-- Risk Assessment Types
CREATE TABLE [T100].[RiskAssessmentType] (
    RiskAssessmentTypeID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(100) NOT NULL,
    TypeDescription NVARCHAR(500) NULL,
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

-- Risk Assessment Format Types
CREATE TABLE [T100].[RiskAssessmentFormatType] (
    RiskAssessmentFormatTypeID INT IDENTITY(1,1) PRIMARY KEY,
    FormatName NVARCHAR(100) NOT NULL,
    FormatDescription NVARCHAR(500) NULL,
    TemplateURL NVARCHAR(500) NULL,
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

-- Risk Assessment Status Types
CREATE TABLE [T100].[RiskAssessmentStatusType] (
    RiskAssessmentStatusTypeID INT IDENTITY(1,1) PRIMARY KEY,
    StatusName NVARCHAR(50) NOT NULL,
    StatusDescription NVARCHAR(200) NULL,
    ColorCode NVARCHAR(7) NULL, -- Hex color for UI
    WorkflowOrder INT NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL
);
GO

-- Main Risk Assessment Table
CREATE TABLE [T100].[RiskAssessment] (
    RiskAssessmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentTypeID INT NULL,
    RiskAssessmentFormatTypeID INT NULL,
    RiskAssessmentStatusTypeID INT NOT NULL,
    RiskMatrixTypeID INT NULL,
    
    -- Basic Information
    AssessmentNumber NVARCHAR(50) NOT NULL,
    AssessmentTitle NVARCHAR(255) NOT NULL,
    AssessmentDescription NVARCHAR(MAX) NULL,
    
    -- Scope
    Activity NVARCHAR(500) NULL,
    Location NVARCHAR(500) NULL,
    Equipment NVARCHAR(500) NULL,
    
    -- Assessment Details
    AssessmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    AssessedByUserID INT NOT NULL,
    ReviewDate DATETIMEOFFSET NULL,
    ReviewedByUserID INT NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    
    -- Risk Scoring
    OverallRiskScore INT NULL,
    ResidualRiskScore INT NULL,
    RiskRating NVARCHAR(50) NULL, -- Low, Medium, High, Critical
    
    -- Approval
    ApprovalRequired BIT DEFAULT 1,
    ApprovedDate DATETIMEOFFSET NULL,
    ApprovedByUserID INT NULL,
    ApprovalComments NVARCHAR(MAX) NULL,
    
    -- Version Control
    Version NVARCHAR(20) DEFAULT '1.0',
    PreviousVersionID INT NULL,
    IsCurrentVersion BIT DEFAULT 1,
    
    -- Status
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessment_Type FOREIGN KEY (RiskAssessmentTypeID) REFERENCES [T100].[RiskAssessmentType](RiskAssessmentTypeID),
    CONSTRAINT FK_RiskAssessment_Format FOREIGN KEY (RiskAssessmentFormatTypeID) REFERENCES [T100].[RiskAssessmentFormatType](RiskAssessmentFormatTypeID),
    CONSTRAINT FK_RiskAssessment_Status FOREIGN KEY (RiskAssessmentStatusTypeID) REFERENCES [T100].[RiskAssessmentStatusType](RiskAssessmentStatusTypeID),
    CONSTRAINT FK_RiskAssessment_Matrix FOREIGN KEY (RiskMatrixTypeID) REFERENCES [T100].[RiskMatrixType](RiskMatrixTypeID),
    CONSTRAINT FK_RiskAssessment_AssessedBy FOREIGN KEY (AssessedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_RiskAssessment_ReviewedBy FOREIGN KEY (ReviewedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_RiskAssessment_ApprovedBy FOREIGN KEY (ApprovedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_RiskAssessment_PreviousVersion FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID)
);
GO

-- =============================================
-- Risk Assessment Detail Tables
-- =============================================

-- Hazards Identified in Risk Assessment
CREATE TABLE [T100].[RiskAssessmentHazard] (
    RiskAssessmentHazardID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    HazardID INT NULL, -- Reference to library hazard or NULL for custom
    
    -- Custom Hazard Details (if not from library)
    CustomHazardName NVARCHAR(255) NULL,
    CustomHazardDescription NVARCHAR(MAX) NULL,
    
    -- Risk Scoring
    InherentLikelihood INT NULL,
    InherentConsequence INT NULL,
    InherentRiskScore INT NULL,
    ResidualLikelihood INT NULL,
    ResidualConsequence INT NULL,
    ResidualRiskScore INT NULL,
    
    -- Additional Details
    HazardNotes NVARCHAR(MAX) NULL,
    SequenceOrder INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessmentHazard_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentHazard_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentHazard_Hazard FOREIGN KEY (HazardID) REFERENCES [T100].[Hazard](HazardID)
);
GO

-- Control Measures Applied in Risk Assessment
CREATE TABLE [T100].[RiskAssessmentControlMeasure] (
    RiskAssessmentControlMeasureID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    RiskAssessmentHazardID INT NULL, -- Link to specific hazard or NULL for general controls
    ControlMeasureID INT NULL, -- Reference to library control or NULL for custom
    
    -- Custom Control Details (if not from library)
    CustomControlName NVARCHAR(255) NULL,
    CustomControlDescription NVARCHAR(MAX) NULL,
    
    -- Implementation Details
    ImplementationStatus NVARCHAR(50) DEFAULT 'Planned', -- Planned, InProgress, Implemented, NotApplicable
    ImplementationDate DATETIMEOFFSET NULL,
    ResponsiblePersonID INT NULL,
    
    -- Effectiveness
    EffectivenessRating DECIMAL(3,1) NULL,
    MonitoringRequired BIT DEFAULT 0,
    MonitoringFrequency NVARCHAR(100) NULL,
    
    -- Additional Details
    ControlNotes NVARCHAR(MAX) NULL,
    Cost DECIMAL(10,2) NULL,
    SequenceOrder INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessmentControlMeasure_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentControlMeasure_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentControlMeasure_Hazard FOREIGN KEY (RiskAssessmentHazardID) REFERENCES [T100].[RiskAssessmentHazard](RiskAssessmentHazardID),
    CONSTRAINT FK_RiskAssessmentControlMeasure_Control FOREIGN KEY (ControlMeasureID) REFERENCES [T100].[ControlMeasure](ControlMeasureID),
    CONSTRAINT FK_RiskAssessmentControlMeasure_ResponsiblePerson FOREIGN KEY (ResponsiblePersonID) REFERENCES [V7].[User](UserID)
);
GO

-- Location Assignments
CREATE TABLE [T100].[RiskAssessmentLocation] (
    RiskAssessmentLocationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    LocationID INT NOT NULL,
    LocationSpecificNotes NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_RiskAssessmentLocation_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentLocation_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentLocation_Location FOREIGN KEY (LocationID) REFERENCES [V7].[Location](LocationID),
    CONSTRAINT UQ_RiskAssessmentLocation UNIQUE (RiskAssessmentID, LocationID)
);
GO

-- Organization Group Assignments
CREATE TABLE [T100].[RiskAssessmentOrgGroup] (
    RiskAssessmentOrgGroupID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    OrgGroupID INT NOT NULL,
    OrgGroupSpecificNotes NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_RiskAssessmentOrgGroup_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentOrgGroup_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentOrgGroup_OrgGroup FOREIGN KEY (OrgGroupID) REFERENCES [V7].[OrgGroup](OrgGroupID),
    CONSTRAINT UQ_RiskAssessmentOrgGroup UNIQUE (RiskAssessmentID, OrgGroupID)
);
GO

-- Operations Covered
CREATE TABLE [T100].[RiskAssessmentOperation] (
    RiskAssessmentOperationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    OperationName NVARCHAR(255) NOT NULL,
    OperationDescription NVARCHAR(MAX) NULL,
    OperationSequence INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessmentOperation_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentOperation_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID)
);
GO

-- Persons at Risk in Assessment
CREATE TABLE [T100].[RiskAssessmentPersonsAtRisk] (
    RiskAssessmentPersonsAtRiskID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    PersonsAtRiskID INT NULL, -- Reference to library category or NULL for custom
    
    -- Custom Category (if not from library)
    CustomCategoryName NVARCHAR(255) NULL,
    CustomCategoryDescription NVARCHAR(500) NULL,
    
    -- Risk Details
    NumberOfPeople INT NULL,
    VulnerabilityNotes NVARCHAR(MAX) NULL,
    SpecificPrecautions NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessmentPersonsAtRisk_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentPersonsAtRisk_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentPersonsAtRisk_Category FOREIGN KEY (PersonsAtRiskID) REFERENCES [T100].[PersonsAtRisk](PersonsAtRiskID)
);
GO

-- =============================================
-- Risk Assessment Supporting Tables
-- =============================================

-- Approval Log
CREATE TABLE [T100].[RiskAssessmentApprovalLog] (
    RiskAssessmentApprovalLogID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    ApprovalAction NVARCHAR(50) NOT NULL, -- Submitted, Approved, Rejected, Returned
    ApprovalLevel INT DEFAULT 1,
    ApproverUserID INT NOT NULL,
    ApprovalDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ApprovalComments NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_RiskAssessmentApprovalLog_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentApprovalLog_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentApprovalLog_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID)
);
GO

-- Attachments
CREATE TABLE [T100].[RiskAssessmentAttachment] (
    RiskAssessmentAttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    AttachmentID INT NOT NULL,
    AttachmentType NVARCHAR(50) DEFAULT 'Document', -- Document, Photo, Report, Certificate
    Description NVARCHAR(255) NULL,
    SequenceOrder INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessmentAttachment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentAttachment_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID),
    CONSTRAINT FK_RiskAssessmentAttachment_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID)
);
GO

-- External Links
CREATE TABLE [T100].[RiskAssessmentExternalLink] (
    RiskAssessmentExternalLinkID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    RiskAssessmentID INT NOT NULL,
    LinkTitle NVARCHAR(255) NOT NULL,
    LinkURL NVARCHAR(500) NOT NULL,
    LinkDescription NVARCHAR(500) NULL,
    LinkType NVARCHAR(50) DEFAULT 'Reference', -- Reference, Regulation, Standard, Guidance
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_RiskAssessmentExternalLink_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_RiskAssessmentExternalLink_Assessment FOREIGN KEY (RiskAssessmentID) REFERENCES [T100].[RiskAssessment](RiskAssessmentID)
);
GO

-- =============================================
-- Create Indexes for Performance
-- =============================================

-- Risk Assessment indexes
CREATE INDEX IX_RiskAssessment_UserAreaID ON [T100].[RiskAssessment](UserAreaID);
CREATE INDEX IX_RiskAssessment_AssessmentNumber ON [T100].[RiskAssessment](AssessmentNumber);
CREATE INDEX IX_RiskAssessment_Status ON [T100].[RiskAssessment](RiskAssessmentStatusTypeID);
CREATE INDEX IX_RiskAssessment_AssessedBy ON [T100].[RiskAssessment](AssessedByUserID);
CREATE INDEX IX_RiskAssessment_AssessmentDate ON [T100].[RiskAssessment](AssessmentDate);
CREATE INDEX IX_RiskAssessment_NextReviewDate ON [T100].[RiskAssessment](NextReviewDate);

-- Hazard indexes
CREATE INDEX IX_RiskAssessmentHazard_AssessmentID ON [T100].[RiskAssessmentHazard](RiskAssessmentID);
CREATE INDEX IX_Hazard_UserAreaID ON [T100].[Hazard](UserAreaID);
CREATE INDEX IX_Hazard_Category ON [T100].[Hazard](HazardCategoryID);

-- Control Measure indexes
CREATE INDEX IX_RiskAssessmentControlMeasure_AssessmentID ON [T100].[RiskAssessmentControlMeasure](RiskAssessmentID);
CREATE INDEX IX_RiskAssessmentControlMeasure_HazardID ON [T100].[RiskAssessmentControlMeasure](RiskAssessmentHazardID);
CREATE INDEX IX_ControlMeasure_UserAreaID ON [T100].[ControlMeasure](UserAreaID);
CREATE INDEX IX_ControlMeasure_Type ON [T100].[ControlMeasure](ControlMeasureTypeID);

-- Location and Organization indexes
CREATE INDEX IX_RiskAssessmentLocation_LocationID ON [T100].[RiskAssessmentLocation](LocationID);
CREATE INDEX IX_RiskAssessmentOrgGroup_OrgGroupID ON [T100].[RiskAssessmentOrgGroup](OrgGroupID);

-- Approval indexes
CREATE INDEX IX_RiskAssessmentApprovalLog_AssessmentID ON [T100].[RiskAssessmentApprovalLog](RiskAssessmentID);
CREATE INDEX IX_RiskAssessmentApprovalLog_ApproverID ON [T100].[RiskAssessmentApprovalLog](ApproverUserID);

PRINT 'Risk Assessment tables created successfully';
GO