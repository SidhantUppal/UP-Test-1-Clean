-- =============================================
-- Competency Module Tables (Skills, Qualifications, Certifications)
-- Purpose: Create competency management tables for T100 platform
-- Author: Platform Team  
-- Date: 2025-08-05
-- =============================================

USE [V7-Dev];
GO

-- =============================================
-- Skills Tables
-- =============================================

-- Skill Categories
CREATE TABLE [T100].[SkillCategory] (
    SkillCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    ParentCategoryID INT NULL,
    IsActive BIT DEFAULT 1,
    DisplayOrder INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_SkillCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_SkillCategory_Parent FOREIGN KEY (ParentCategoryID) REFERENCES [T100].[SkillCategory](SkillCategoryID)
);
GO

-- Skills Master Table
CREATE TABLE [T100].[Skill] (
    SkillID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    SkillCode NVARCHAR(50) NOT NULL,
    SkillName NVARCHAR(255) NOT NULL,
    SkillDescription NVARCHAR(MAX) NULL,
    SkillCategoryID INT NULL,
    
    -- Skill Properties
    SkillType NVARCHAR(50) DEFAULT 'Technical', -- Technical, Soft, Physical, Cognitive, Leadership
    ProficiencyLevels NVARCHAR(MAX) NULL, -- JSON array: ["Novice", "Competent", "Proficient", "Expert"]
    DefaultProficiencyLevel NVARCHAR(50) DEFAULT 'Competent',
    
    -- Validation Settings
    ValidationMethod NVARCHAR(50) DEFAULT 'Assessment', -- Assessment, Training, Documentation, Observation
    ValidityMonths INT NULL, -- NULL = permanent skill
    RequiresRecertification BIT DEFAULT 0,
    
    -- Assessment Details
    AssessmentCriteria NVARCHAR(MAX) NULL,
    PassingScore DECIMAL(5,2) NULL,
    
    -- Flags
    IsCriticalForSafety BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_Skill_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_Skill_Category FOREIGN KEY (SkillCategoryID) REFERENCES [T100].[SkillCategory](SkillCategoryID),
    CONSTRAINT UQ_Skill_Code UNIQUE (UserAreaID, SkillCode, ArchivedDate)
);
GO

-- =============================================
-- Qualifications Tables
-- =============================================

-- Qualification Types
CREATE TABLE [T100].[QualificationType] (
    QualificationTypeID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(100) NOT NULL,
    TypeDescription NVARCHAR(500) NULL,
    DefaultValidityMonths INT NULL,
    RequiresRenewal BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL
);
GO

-- Qualification Categories
CREATE TABLE [T100].[QualificationCategory] (
    QualificationCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    ParentCategoryID INT NULL,
    IsActive BIT DEFAULT 1,
    DisplayOrder INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_QualificationCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_QualificationCategory_Parent FOREIGN KEY (ParentCategoryID) REFERENCES [T100].[QualificationCategory](QualificationCategoryID)
);
GO

-- Qualifications Master Table
CREATE TABLE [T100].[Qualification] (
    QualificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    QualificationCode NVARCHAR(50) NOT NULL,
    QualificationName NVARCHAR(255) NOT NULL,
    QualificationDescription NVARCHAR(MAX) NULL,
    QualificationTypeID INT NULL,
    QualificationCategoryID INT NULL,
    
    -- Qualification Properties
    Level NVARCHAR(50) NULL, -- Entry, Intermediate, Advanced, Expert
    IssuingAuthority NVARCHAR(255) NULL,
    IssuingCountry NVARCHAR(50) NULL,
    
    -- Validity Settings
    ValidityMonths INT NULL, -- NULL = permanent
    RequiresRenewal BIT DEFAULT 0,
    RenewalRequirements NVARCHAR(MAX) NULL,
    
    -- Prerequisites
    PrerequisiteQualifications NVARCHAR(MAX) NULL, -- JSON array of QualificationIDs
    MinimumExperience NVARCHAR(255) NULL,
    
    -- Recognition Details
    IsInternalQualification BIT DEFAULT 0,
    ExternalBody NVARCHAR(255) NULL,
    RecognitionLevel NVARCHAR(50) NULL, -- Local, National, International
    
    -- Flags
    IsCriticalForSafety BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_Qualification_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_Qualification_Type FOREIGN KEY (QualificationTypeID) REFERENCES [T100].[QualificationType](QualificationTypeID),
    CONSTRAINT FK_Qualification_Category FOREIGN KEY (QualificationCategoryID) REFERENCES [T100].[QualificationCategory](QualificationCategoryID),
    CONSTRAINT UQ_Qualification_Code UNIQUE (UserAreaID, QualificationCode, ArchivedDate)
);
GO

-- =============================================
-- Certifications Tables
-- =============================================

-- Certification Bodies
CREATE TABLE [T100].[CertificationBody] (
    CertificationBodyID INT IDENTITY(1,1) PRIMARY KEY,
    BodyName NVARCHAR(255) NOT NULL,
    BodyDescription NVARCHAR(500) NULL,
    BodyWebsite NVARCHAR(500) NULL,
    ContactDetails NVARCHAR(MAX) NULL, -- JSON format
    Country NVARCHAR(50) NULL,
    RecognitionLevel NVARCHAR(50) NULL, -- Local, National, International
    AccreditationStatus NVARCHAR(50) NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL
);
GO

-- Certification Categories
CREATE TABLE [T100].[CertificationCategory] (
    CertificationCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    ParentCategoryID INT NULL,
    IsActive BIT DEFAULT 1,
    DisplayOrder INT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CertificationCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CertificationCategory_Parent FOREIGN KEY (ParentCategoryID) REFERENCES [T100].[CertificationCategory](CertificationCategoryID)
);
GO

-- Certifications Master Table
CREATE TABLE [T100].[Certification] (
    CertificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CertificationCode NVARCHAR(50) NOT NULL,
    CertificationName NVARCHAR(255) NOT NULL,
    CertificationDescription NVARCHAR(MAX) NULL,
    CertificationBodyID INT NULL,
    CertificationCategoryID INT NULL,
    
    -- Certification Properties
    Level NVARCHAR(50) NULL, -- Foundation, Associate, Professional, Expert
    Version NVARCHAR(50) NULL,
    
    -- Validity Settings
    ValidityMonths INT NULL, -- NULL = permanent
    RequiresRenewal BIT DEFAULT 0,
    RenewalPeriodMonths INT NULL,
    ContinuingEducationRequired BIT DEFAULT 0,
    CERequirements NVARCHAR(MAX) NULL,
    
    -- Exam Details
    HasExam BIT DEFAULT 1,
    ExamDuration INT NULL, -- minutes
    PassingScore DECIMAL(5,2) NULL,
    MaxAttempts INT NULL,
    RetakeWaitingPeriod INT NULL, -- days
    
    -- Prerequisites
    PrerequisiteCertifications NVARCHAR(MAX) NULL, -- JSON array of CertificationIDs
    PrerequisiteExperience NVARCHAR(255) NULL,
    PrerequisiteTraining NVARCHAR(MAX) NULL, -- JSON array of CourseIDs
    
    -- Cost Information
    ExamFee DECIMAL(10,2) NULL,
    RenewalFee DECIMAL(10,2) NULL,
    Currency NVARCHAR(3) DEFAULT 'USD',
    
    -- Flags
    IsInternalCertification BIT DEFAULT 0,
    IsCriticalForSafety BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_Certification_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_Certification_Body FOREIGN KEY (CertificationBodyID) REFERENCES [T100].[CertificationBody](CertificationBodyID),
    CONSTRAINT FK_Certification_Category FOREIGN KEY (CertificationCategoryID) REFERENCES [T100].[CertificationCategory](CertificationCategoryID),
    CONSTRAINT UQ_Certification_Code UNIQUE (UserAreaID, CertificationCode, ArchivedDate)
);
GO

-- =============================================
-- Employee Competency Records
-- =============================================

-- Employee Skills
CREATE TABLE [T100].[EmployeeSkill] (
    EmployeeSkillID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    UserID INT NOT NULL,
    SkillID INT NOT NULL,
    
    -- Skill Assessment Details
    ProficiencyLevel NVARCHAR(50) NOT NULL,
    AssessedDate DATETIMEOFFSET NOT NULL,
    AssessedByUserID INT NOT NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- Assessment Results
    AssessmentScore DECIMAL(5,2) NULL,
    AssessmentMethod NVARCHAR(50) NULL,
    AssessmentNotes NVARCHAR(MAX) NULL,
    
    -- Status
    Status NVARCHAR(50) DEFAULT 'Active', -- Active, Expired, Suspended
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_EmployeeSkill_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_EmployeeSkill_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_EmployeeSkill_Skill FOREIGN KEY (SkillID) REFERENCES [T100].[Skill](SkillID),
    CONSTRAINT FK_EmployeeSkill_AssessedBy FOREIGN KEY (AssessedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT UQ_EmployeeSkill UNIQUE (UserID, SkillID, ArchivedDate)
);
GO

-- Employee Qualifications
CREATE TABLE [T100].[EmployeeQualification] (
    EmployeeQualificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    UserID INT NOT NULL,
    QualificationID INT NOT NULL,
    
    -- Qualification Details
    AwardedDate DATETIMEOFFSET NOT NULL,
    AwardingBody NVARCHAR(255) NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    CertificateNumber NVARCHAR(100) NULL,
    
    -- Verification
    VerificationStatus NVARCHAR(50) DEFAULT 'Pending', -- Verified, Pending, Failed
    VerifiedByUserID INT NULL,
    VerifiedDate DATETIMEOFFSET NULL,
    
    -- Supporting Documents
    CertificateDocumentID INT NULL,
    TranscriptDocumentID INT NULL,
    
    -- Status
    Status NVARCHAR(50) DEFAULT 'Active', -- Active, Expired, Suspended
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_EmployeeQualification_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_EmployeeQualification_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_EmployeeQualification_Qualification FOREIGN KEY (QualificationID) REFERENCES [T100].[Qualification](QualificationID),
    CONSTRAINT FK_EmployeeQualification_VerifiedBy FOREIGN KEY (VerifiedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_EmployeeQualification_Certificate FOREIGN KEY (CertificateDocumentID) REFERENCES [V7].[Attachment](AttachmentID),
    CONSTRAINT FK_EmployeeQualification_Transcript FOREIGN KEY (TranscriptDocumentID) REFERENCES [V7].[Attachment](AttachmentID)
);
GO

-- Employee Certifications
CREATE TABLE [T100].[EmployeeCertification] (
    EmployeeCertificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    UserID INT NOT NULL,
    CertificationID INT NOT NULL,
    
    -- Certification Details
    CertifiedDate DATETIMEOFFSET NOT NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    CertificateNumber NVARCHAR(100) NULL,
    
    -- Exam Details
    ExamDate DATETIMEOFFSET NULL,
    ExamScore DECIMAL(5,2) NULL,
    ExamLocation NVARCHAR(255) NULL,
    AttemptNumber INT DEFAULT 1,
    
    -- Verification
    VerificationStatus NVARCHAR(50) DEFAULT 'Pending', -- Verified, Pending, Failed
    VerificationReference NVARCHAR(255) NULL,
    VerifiedByUserID INT NULL,
    VerifiedDate DATETIMEOFFSET NULL,
    
    -- Supporting Documents
    CertificateDocumentID INT NULL,
    
    -- Renewal Tracking
    RenewalDueDate DATETIMEOFFSET NULL,
    CECreditsEarned DECIMAL(5,2) NULL,
    CECreditsRequired DECIMAL(5,2) NULL,
    
    -- Status
    Status NVARCHAR(50) DEFAULT 'Active', -- Active, Expired, Suspended, Revoked
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_EmployeeCertification_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_EmployeeCertification_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_EmployeeCertification_Certification FOREIGN KEY (CertificationID) REFERENCES [T100].[Certification](CertificationID),
    CONSTRAINT FK_EmployeeCertification_VerifiedBy FOREIGN KEY (VerifiedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_EmployeeCertification_Certificate FOREIGN KEY (CertificateDocumentID) REFERENCES [V7].[Attachment](AttachmentID)
);
GO

-- =============================================
-- Competency Framework Integration
-- =============================================

-- Competency Elements (links competencies to their component parts)
CREATE TABLE [T100].[CompetencyElement] (
    CompetencyElementID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CompetencyID INT NOT NULL, -- References main competency (to be created)
    ElementType NVARCHAR(50) NOT NULL, -- 'Skill', 'Qualification', 'Certification', 'Training'
    ElementID INT NOT NULL, -- ID of the specific element
    
    -- Element Requirements
    IsRequired BIT DEFAULT 1,
    IsAlternative BIT DEFAULT 0, -- Part of alternative group
    AlternativeGroup NVARCHAR(50) NULL,
    MinimumLevel NVARCHAR(50) NULL,
    
    -- Weighting
    Weight DECIMAL(5,2) DEFAULT 1.0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CompetencyElement_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- =============================================
-- Create Indexes for Performance
-- =============================================

-- Skills indexes
CREATE INDEX IX_Skill_UserAreaID ON [T100].[Skill](UserAreaID);
CREATE INDEX IX_Skill_Category ON [T100].[Skill](SkillCategoryID);
CREATE INDEX IX_Skill_Code ON [T100].[Skill](SkillCode);
CREATE INDEX IX_Skill_Type ON [T100].[Skill](SkillType);

-- Qualifications indexes
CREATE INDEX IX_Qualification_UserAreaID ON [T100].[Qualification](UserAreaID);
CREATE INDEX IX_Qualification_Category ON [T100].[Qualification](QualificationCategoryID);
CREATE INDEX IX_Qualification_Code ON [T100].[Qualification](QualificationCode);
CREATE INDEX IX_Qualification_Type ON [T100].[Qualification](QualificationTypeID);

-- Certifications indexes
CREATE INDEX IX_Certification_UserAreaID ON [T100].[Certification](UserAreaID);
CREATE INDEX IX_Certification_Category ON [T100].[Certification](CertificationCategoryID);
CREATE INDEX IX_Certification_Code ON [T100].[Certification](CertificationCode);
CREATE INDEX IX_Certification_Body ON [T100].[Certification](CertificationBodyID);

-- Employee competency indexes
CREATE INDEX IX_EmployeeSkill_UserID ON [T100].[EmployeeSkill](UserID);
CREATE INDEX IX_EmployeeSkill_SkillID ON [T100].[EmployeeSkill](SkillID);
CREATE INDEX IX_EmployeeSkill_Status ON [T100].[EmployeeSkill](Status);
CREATE INDEX IX_EmployeeSkill_ExpiryDate ON [T100].[EmployeeSkill](ExpiryDate);

CREATE INDEX IX_EmployeeQualification_UserID ON [T100].[EmployeeQualification](UserID);
CREATE INDEX IX_EmployeeQualification_QualificationID ON [T100].[EmployeeQualification](QualificationID);
CREATE INDEX IX_EmployeeQualification_Status ON [T100].[EmployeeQualification](Status);
CREATE INDEX IX_EmployeeQualification_ExpiryDate ON [T100].[EmployeeQualification](ExpiryDate);

CREATE INDEX IX_EmployeeCertification_UserID ON [T100].[EmployeeCertification](UserID);
CREATE INDEX IX_EmployeeCertification_CertificationID ON [T100].[EmployeeCertification](CertificationID);
CREATE INDEX IX_EmployeeCertification_Status ON [T100].[EmployeeCertification](Status);
CREATE INDEX IX_EmployeeCertification_ExpiryDate ON [T100].[EmployeeCertification](ExpiryDate);

CREATE INDEX IX_CompetencyElement_CompetencyID ON [T100].[CompetencyElement](CompetencyID);
CREATE INDEX IX_CompetencyElement_ElementType ON [T100].[CompetencyElement](ElementType, ElementID);

PRINT 'Competency tables (Skills, Qualifications, Certifications) created successfully';
GO