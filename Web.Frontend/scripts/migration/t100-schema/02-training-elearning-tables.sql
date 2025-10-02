-- =============================================
-- Training & E-Learning Module Tables
-- Purpose: Create training and e-learning tables from Portal-V7
-- Author: Platform Team
-- Date: 2025-07-29
-- =============================================

USE [V7-Dev];
GO

-- =============================================
-- Core Training Tables
-- =============================================

-- Course Categories
CREATE TABLE [T100].[CourseCategory] (
    CourseCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    ParentCategoryID INT NULL,
    DisplayOrder INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseCategory_Parent FOREIGN KEY (ParentCategoryID) REFERENCES [T100].[CourseCategory](CourseCategoryID)
);
GO

-- Course Types
CREATE TABLE [T100].[CourseType] (
    CourseTypeID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(50) NOT NULL,
    TypeDescription NVARCHAR(200) NULL,
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

-- Main Course Table
CREATE TABLE [T100].[Course] (
    CourseID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseCode NVARCHAR(50) NOT NULL,
    CourseName NVARCHAR(255) NOT NULL,
    CourseDescription NVARCHAR(MAX) NULL,
    CourseTypeID INT NULL,
    CourseCategoryID INT NULL,
    
    -- Course Settings
    DurationMinutes INT NULL,
    PassingScore DECIMAL(5,2) NULL,
    MaxAttempts INT DEFAULT 3,
    ValidityDays INT NULL, -- How long certification is valid
    
    -- Content Settings
    ContentType NVARCHAR(50) DEFAULT 'Internal', -- Internal, SCORM, External, Video
    ContentURL NVARCHAR(500) NULL,
    ThumbnailURL NVARCHAR(500) NULL,
    
    -- Status
    Status NVARCHAR(50) DEFAULT 'Draft', -- Draft, Published, Archived
    PublishedDate DATETIMEOFFSET NULL,
    IsActive BIT DEFAULT 1,
    IsMandatory BIT DEFAULT 0,
    
    -- Cost
    Cost DECIMAL(10,2) DEFAULT 0,
    Currency NVARCHAR(3) DEFAULT 'USD',
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_Course_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_Course_CourseType FOREIGN KEY (CourseTypeID) REFERENCES [T100].[CourseType](CourseTypeID),
    CONSTRAINT FK_Course_CourseCategory FOREIGN KEY (CourseCategoryID) REFERENCES [T100].[CourseCategory](CourseCategoryID)
);
GO

-- Course Bundles (Groups of courses)
CREATE TABLE [T100].[CourseBundle] (
    CourseBundleID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    BundleName NVARCHAR(255) NOT NULL,
    BundleDescription NVARCHAR(MAX) NULL,
    TotalDurationMinutes INT NULL,
    TotalCost DECIMAL(10,2) DEFAULT 0,
    DiscountPercentage DECIMAL(5,2) DEFAULT 0,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseBundle_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- Course Bundle Mappings
CREATE TABLE [T100].[CourseBundleCourse] (
    CourseBundleCourseID INT IDENTITY(1,1) PRIMARY KEY,
    CourseBundleID INT NOT NULL,
    CourseID INT NOT NULL,
    SequenceOrder INT DEFAULT 0,
    IsMandatory BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_CourseBundleCourse_Bundle FOREIGN KEY (CourseBundleID) REFERENCES [T100].[CourseBundle](CourseBundleID),
    CONSTRAINT FK_CourseBundleCourse_Course FOREIGN KEY (CourseID) REFERENCES [T100].[Course](CourseID),
    CONSTRAINT UQ_CourseBundleCourse UNIQUE (CourseBundleID, CourseID)
);
GO

-- =============================================
-- Enrollment and Progress Tables
-- =============================================

-- Enrollment Status Types
CREATE TABLE [T100].[CourseEnrolmentStatusType] (
    CourseEnrolmentStatusTypeID INT IDENTITY(1,1) PRIMARY KEY,
    StatusName NVARCHAR(50) NOT NULL,
    StatusDescription NVARCHAR(200) NULL,
    ColorCode NVARCHAR(7) NULL, -- Hex color for UI
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL
);
GO

-- Course Enrollments
CREATE TABLE [T100].[CourseEnrolment] (
    CourseEnrolmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseID INT NOT NULL,
    UserID INT NOT NULL,
    
    -- Enrollment Details
    EnrolmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    EnrolmentType NVARCHAR(50) DEFAULT 'Manual', -- Manual, Automatic, Self
    EnrolmentStatusID INT NOT NULL,
    
    -- Progress Tracking
    StartDate DATETIMEOFFSET NULL,
    LastAccessDate DATETIMEOFFSET NULL,
    CompletionDate DATETIMEOFFSET NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- Scoring
    CurrentScore DECIMAL(5,2) NULL,
    BestScore DECIMAL(5,2) NULL,
    AttemptCount INT DEFAULT 0,
    
    -- Time Tracking
    TotalTimeMinutes INT DEFAULT 0,
    ProgressPercentage DECIMAL(5,2) DEFAULT 0,
    
    -- Certificate
    CertificateNumber NVARCHAR(50) NULL,
    CertificateIssuedDate DATETIMEOFFSET NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseEnrolment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseEnrolment_Course FOREIGN KEY (CourseID) REFERENCES [T100].[Course](CourseID),
    CONSTRAINT FK_CourseEnrolment_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_CourseEnrolment_Status FOREIGN KEY (EnrolmentStatusID) REFERENCES [T100].[CourseEnrolmentStatusType](CourseEnrolmentStatusTypeID),
    CONSTRAINT UQ_CourseEnrolment_User UNIQUE (CourseID, UserID, ArchivedDate)
);
GO

-- Course Certificates
CREATE TABLE [T100].[CourseCertificate] (
    CourseCertificateID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseEnrolmentID INT NOT NULL,
    CertificateTemplateID INT NULL,
    
    -- Certificate Details
    CertificateNumber NVARCHAR(50) NOT NULL,
    IssuedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- Verification
    VerificationCode NVARCHAR(100) NULL,
    VerificationURL NVARCHAR(500) NULL,
    
    -- Storage
    CertificateData NVARCHAR(MAX) NULL, -- JSON data for certificate details
    CertificateFileURL NVARCHAR(500) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseCertificate_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseCertificate_Enrolment FOREIGN KEY (CourseEnrolmentID) REFERENCES [T100].[CourseEnrolment](CourseEnrolmentID)
);
GO

-- =============================================
-- Assignment and Allocation Tables
-- =============================================

-- Course Allocations (to groups/departments)
CREATE TABLE [T100].[CourseAllocation] (
    CourseAllocationID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseID INT NOT NULL,
    OrgGroupID INT NULL,
    LocationID INT NULL,
    JobRoleID INT NULL,
    
    -- Allocation Settings
    AllocationDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    DueDate DATETIMEOFFSET NULL,
    IsMandatory BIT DEFAULT 1,
    AutoEnrol BIT DEFAULT 1,
    
    -- Recurrence
    IsRecurring BIT DEFAULT 0,
    RecurrencePattern NVARCHAR(50) NULL, -- Annual, Biannual, Quarterly
    RecurrenceMonths INT NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseAllocation_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseAllocation_Course FOREIGN KEY (CourseID) REFERENCES [T100].[Course](CourseID),
    CONSTRAINT FK_CourseAllocation_OrgGroup FOREIGN KEY (OrgGroupID) REFERENCES [V7].[OrgGroup](OrgGroupID),
    CONSTRAINT FK_CourseAllocation_Location FOREIGN KEY (LocationID) REFERENCES [V7].[Location](LocationID)
);
GO

-- Direct Course Assignments (to individuals)
CREATE TABLE [T100].[CourseAssignment] (
    CourseAssignmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseID INT NOT NULL,
    AssignedToUserID INT NOT NULL,
    AssignedByUserID INT NOT NULL,
    
    -- Assignment Details
    AssignmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    DueDate DATETIMEOFFSET NULL,
    Priority NVARCHAR(20) DEFAULT 'Normal', -- Low, Normal, High, Urgent
    Notes NVARCHAR(MAX) NULL,
    
    -- Status
    Status NVARCHAR(50) DEFAULT 'Assigned', -- Assigned, InProgress, Completed, Overdue
    CompletedDate DATETIMEOFFSET NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseAssignment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseAssignment_Course FOREIGN KEY (CourseID) REFERENCES [T100].[Course](CourseID),
    CONSTRAINT FK_CourseAssignment_AssignedTo FOREIGN KEY (AssignedToUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_CourseAssignment_AssignedBy FOREIGN KEY (AssignedByUserID) REFERENCES [V7].[User](UserID)
);
GO

-- =============================================
-- Course Content and Assessment Tables
-- =============================================

-- Course Attachments/Materials
CREATE TABLE [T100].[CourseAttachment] (
    CourseAttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseID INT NOT NULL,
    AttachmentID INT NOT NULL,
    
    -- Attachment Details
    AttachmentType NVARCHAR(50) DEFAULT 'Resource', -- Resource, Prerequisite, Certificate
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(500) NULL,
    SequenceOrder INT DEFAULT 0,
    IsRequired BIT DEFAULT 0,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseAttachment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseAttachment_Course FOREIGN KEY (CourseID) REFERENCES [T100].[Course](CourseID),
    CONSTRAINT FK_CourseAttachment_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID)
);
GO

-- Course Filters (for searching/categorization)
CREATE TABLE [T100].[CourseFilter] (
    CourseFilterID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    FilterName NVARCHAR(100) NOT NULL,
    FilterType NVARCHAR(50) NOT NULL, -- Category, Tag, Custom
    FilterValue NVARCHAR(255) NOT NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseFilter_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- Course Questionnaires/Assessments
CREATE TABLE [T100].[CourseQuestionaire] (
    CourseQuestionaireID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseID INT NOT NULL,
    
    -- Questionnaire Settings
    QuestionnaireName NVARCHAR(255) NOT NULL,
    QuestionnaireType NVARCHAR(50) DEFAULT 'Assessment', -- Assessment, Survey, Feedback
    Instructions NVARCHAR(MAX) NULL,
    
    -- Scoring Settings
    TotalQuestions INT DEFAULT 0,
    PassingScore DECIMAL(5,2) NULL,
    TimeLimit INT NULL, -- in minutes
    RandomizeQuestions BIT DEFAULT 0,
    ShowResults BIT DEFAULT 1,
    
    -- Status
    IsActive BIT DEFAULT 1,
    IsMandatory BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseQuestionaire_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseQuestionaire_Course FOREIGN KEY (CourseID) REFERENCES [T100].[Course](CourseID)
);
GO

-- Enrollment Questionnaire Responses
CREATE TABLE [T100].[CourseEnrolmentQuestionnaire] (
    CourseEnrolmentQuestionnaireID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseEnrolmentID INT NOT NULL,
    CourseQuestionaireID INT NOT NULL,
    
    -- Response Details
    StartDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    SubmitDate DATETIMEOFFSET NULL,
    TimeSpentMinutes INT DEFAULT 0,
    
    -- Scoring
    Score DECIMAL(5,2) NULL,
    Passed BIT NULL,
    
    -- Response Data
    ResponseData NVARCHAR(MAX) NULL, -- JSON format for flexibility
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseEnrolmentQuestionnaire_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseEnrolmentQuestionnaire_Enrolment FOREIGN KEY (CourseEnrolmentID) REFERENCES [T100].[CourseEnrolment](CourseEnrolmentID),
    CONSTRAINT FK_CourseEnrolmentQuestionnaire_Questionnaire FOREIGN KEY (CourseQuestionaireID) REFERENCES [T100].[CourseQuestionaire](CourseQuestionaireID)
);
GO

-- =============================================
-- SCORM and External Content Tables
-- =============================================

-- SCORM Activity Tracking
CREATE TABLE [T100].[CourseEnrolmentSCORMActivity] (
    CourseEnrolmentSCORMActivityID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseEnrolmentID INT NOT NULL,
    
    -- SCORM Data
    ActivityID NVARCHAR(255) NOT NULL,
    ActivityTitle NVARCHAR(500) NULL,
    
    -- Progress
    CompletionStatus NVARCHAR(50) NULL, -- completed, incomplete, not attempted
    SuccessStatus NVARCHAR(50) NULL, -- passed, failed, unknown
    ProgressMeasure DECIMAL(5,2) NULL,
    
    -- Scoring
    ScoreRaw DECIMAL(10,2) NULL,
    ScoreMin DECIMAL(10,2) NULL,
    ScoreMax DECIMAL(10,2) NULL,
    ScoreScaled DECIMAL(5,2) NULL,
    
    -- Time Tracking
    TotalTime NVARCHAR(50) NULL, -- SCORM time format
    SessionTime NVARCHAR(50) NULL,
    
    -- Interaction Data
    Location NVARCHAR(500) NULL,
    SuspendData NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_CourseEnrolmentSCORMActivity_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseEnrolmentSCORMActivity_Enrolment FOREIGN KEY (CourseEnrolmentID) REFERENCES [T100].[CourseEnrolment](CourseEnrolmentID)
);
GO

-- Digital Signatures for Course Completion
CREATE TABLE [T100].[CourseEnrolmentSignature] (
    CourseEnrolmentSignatureID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CourseEnrolmentID INT NOT NULL,
    
    -- Signature Details
    SignatureType NVARCHAR(50) DEFAULT 'Completion', -- Completion, Acknowledgment
    SignatureData NVARCHAR(MAX) NOT NULL, -- Base64 encoded signature image
    SignedByUserID INT NOT NULL,
    SignedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    -- Agreement Text
    AgreementText NVARCHAR(MAX) NULL,
    IPAddress NVARCHAR(50) NULL,
    UserAgent NVARCHAR(500) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_CourseEnrolmentSignature_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_CourseEnrolmentSignature_Enrolment FOREIGN KEY (CourseEnrolmentID) REFERENCES [T100].[CourseEnrolment](CourseEnrolmentID),
    CONSTRAINT FK_CourseEnrolmentSignature_SignedBy FOREIGN KEY (SignedByUserID) REFERENCES [V7].[User](UserID)
);
GO

-- =============================================
-- Create Indexes for Performance
-- =============================================

-- Course indexes
CREATE INDEX IX_Course_UserAreaID ON [T100].[Course](UserAreaID);
CREATE INDEX IX_Course_Status ON [T100].[Course](Status);
CREATE INDEX IX_Course_CourseCode ON [T100].[Course](CourseCode);

-- Enrollment indexes
CREATE INDEX IX_CourseEnrolment_UserAreaID ON [T100].[CourseEnrolment](UserAreaID);
CREATE INDEX IX_CourseEnrolment_CourseID ON [T100].[CourseEnrolment](CourseID);
CREATE INDEX IX_CourseEnrolment_UserID ON [T100].[CourseEnrolment](UserID);
CREATE INDEX IX_CourseEnrolment_EnrolmentDate ON [T100].[CourseEnrolment](EnrolmentDate);
CREATE INDEX IX_CourseEnrolment_CompletionDate ON [T100].[CourseEnrolment](CompletionDate);

-- Assignment indexes
CREATE INDEX IX_CourseAssignment_AssignedToUserID ON [T100].[CourseAssignment](AssignedToUserID);
CREATE INDEX IX_CourseAssignment_DueDate ON [T100].[CourseAssignment](DueDate);
CREATE INDEX IX_CourseAssignment_Status ON [T100].[CourseAssignment](Status);

-- Allocation indexes
CREATE INDEX IX_CourseAllocation_OrgGroupID ON [T100].[CourseAllocation](OrgGroupID);
CREATE INDEX IX_CourseAllocation_LocationID ON [T100].[CourseAllocation](LocationID);

PRINT 'Training & E-Learning tables created successfully';
GO