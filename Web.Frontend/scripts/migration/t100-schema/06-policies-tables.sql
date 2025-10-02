-- =============================================
-- Policies Module Tables
-- Purpose: Create policy management tables for corporate policies
-- Author: Platform Team
-- Date: 2025-07-29
-- =============================================

USE [V7-Dev];
GO

-- =============================================
-- Policy Configuration Tables
-- =============================================

-- Policy Types
CREATE TABLE [T100].[PolicyType] (
    PolicyTypeID INT IDENTITY(1,1) PRIMARY KEY,
    TypeName NVARCHAR(100) NOT NULL,
    TypeDescription NVARCHAR(500) NULL,
    RequiresApproval BIT DEFAULT 1,
    RequiresTraining BIT DEFAULT 0,
    RequiresAcknowledgment BIT DEFAULT 1,
    ReviewFrequencyMonths INT DEFAULT 12,
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

-- Policy Categories
CREATE TABLE [T100].[PolicyCategory] (
    PolicyCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDescription NVARCHAR(500) NULL,
    ParentCategoryID INT NULL,
    DisplayOrder INT DEFAULT 0,
    ColorCode NVARCHAR(7) NULL, -- Hex color for UI
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyCategory_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyCategory_Parent FOREIGN KEY (ParentCategoryID) REFERENCES [T100].[PolicyCategory](PolicyCategoryID)
);
GO

-- Policy Status Types
CREATE TABLE [T100].[PolicyStatusType] (
    PolicyStatusTypeID INT IDENTITY(1,1) PRIMARY KEY,
    StatusName NVARCHAR(50) NOT NULL,
    StatusDescription NVARCHAR(200) NULL,
    StatusCategory NVARCHAR(50) NOT NULL, -- Draft, Review, Approved, Published, Expired, Archived
    ColorCode NVARCHAR(7) NULL, -- Hex color for UI
    WorkflowOrder INT NULL,
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL
);
GO

-- =============================================
-- Main Policy Tables
-- =============================================

-- Main Policy Document Table
CREATE TABLE [T100].[Policy] (
    PolicyID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyTypeID INT NOT NULL,
    PolicyCategoryID INT NULL,
    PolicyStatusTypeID INT NOT NULL,
    
    -- Document Information
    PolicyNumber NVARCHAR(50) NOT NULL,
    PolicyTitle NVARCHAR(255) NOT NULL,
    PolicyVersion NVARCHAR(20) DEFAULT '1.0',
    PreviousVersionID INT NULL,
    IsCurrentVersion BIT DEFAULT 1,
    
    -- Policy Content
    PolicySummary NVARCHAR(MAX) NULL,
    PolicyContent NVARCHAR(MAX) NOT NULL,
    Purpose NVARCHAR(MAX) NULL,
    Scope NVARCHAR(MAX) NULL,
    Applicability NVARCHAR(MAX) NULL,
    
    -- Compliance and Legal
    RegulatoryRequirements NVARCHAR(MAX) NULL,
    LegalReferences NVARCHAR(MAX) NULL,
    ComplianceNotes NVARCHAR(MAX) NULL,
    
    -- Authorship and Ownership
    PolicyOwnerUserID INT NOT NULL,
    AuthorUserID INT NOT NULL,
    DepartmentResponsible NVARCHAR(255) NULL,
    
    -- Approval and Review
    ReviewerUserID INT NULL,
    ApproverUserID INT NULL,
    ReviewDate DATETIMEOFFSET NULL,
    ApprovalDate DATETIMEOFFSET NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    ReviewFrequencyMonths INT DEFAULT 12,
    
    -- Publication and Effectiveness
    PublishedDate DATETIMEOFFSET NULL,
    PublishedByUserID INT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    ExpiryDate DATETIMEOFFSET NULL,
    
    -- Training and Acknowledgment Requirements
    RequiresTraining BIT DEFAULT 0,
    RequiresAcknowledgment BIT DEFAULT 1,
    TrainingCourseID INT NULL, -- Link to T100.Course if training required
    AcknowledgmentText NVARCHAR(MAX) NULL,
    
    -- Additional Information
    RelatedPolicies NVARCHAR(MAX) NULL,
    Keywords NVARCHAR(500) NULL,
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
    
    CONSTRAINT FK_Policy_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_Policy_PolicyType FOREIGN KEY (PolicyTypeID) REFERENCES [T100].[PolicyType](PolicyTypeID),
    CONSTRAINT FK_Policy_PolicyCategory FOREIGN KEY (PolicyCategoryID) REFERENCES [T100].[PolicyCategory](PolicyCategoryID),
    CONSTRAINT FK_Policy_PolicyStatus FOREIGN KEY (PolicyStatusTypeID) REFERENCES [T100].[PolicyStatusType](PolicyStatusTypeID),
    CONSTRAINT FK_Policy_PolicyOwner FOREIGN KEY (PolicyOwnerUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_Policy_Author FOREIGN KEY (AuthorUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_Policy_Reviewer FOREIGN KEY (ReviewerUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_Policy_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_Policy_Publisher FOREIGN KEY (PublishedByUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_Policy_TrainingCourse FOREIGN KEY (TrainingCourseID) REFERENCES [T100].[Course](CourseID),
    CONSTRAINT FK_Policy_PreviousVersion FOREIGN KEY (PreviousVersionID) REFERENCES [T100].[Policy](PolicyID)
);
GO

-- =============================================
-- Policy Assignment and Distribution
-- =============================================

-- Policy Assignments to Organization Groups
CREATE TABLE [T100].[PolicyOrgGroupAssignment] (
    PolicyOrgGroupAssignmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    OrgGroupID INT NOT NULL,
    
    -- Assignment Details
    AssignmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    DueDate DATETIMEOFFSET NULL,
    IsMandatory BIT DEFAULT 1,
    
    -- Assignment Notes
    AssignmentNotes NVARCHAR(MAX) NULL,
    SpecialInstructions NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyOrgGroupAssignment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyOrgGroupAssignment_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyOrgGroupAssignment_OrgGroup FOREIGN KEY (OrgGroupID) REFERENCES [V7].[OrgGroup](OrgGroupID),
    CONSTRAINT UQ_PolicyOrgGroupAssignment UNIQUE (PolicyID, OrgGroupID, ArchivedDate)
);
GO

-- Policy Assignments to Locations
CREATE TABLE [T100].[PolicyLocationAssignment] (
    PolicyLocationAssignmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    LocationID INT NOT NULL,
    
    -- Assignment Details
    AssignmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    EffectiveDate DATETIMEOFFSET NULL,
    LocationSpecificNotes NVARCHAR(MAX) NULL,
    LocalVariations NVARCHAR(MAX) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyLocationAssignment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyLocationAssignment_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyLocationAssignment_Location FOREIGN KEY (LocationID) REFERENCES [V7].[Location](LocationID),
    CONSTRAINT UQ_PolicyLocationAssignment UNIQUE (PolicyID, LocationID, ArchivedDate)
);
GO

-- Direct Policy Assignments to Individual Users
CREATE TABLE [T100].[PolicyUserAssignment] (
    PolicyUserAssignmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    AssignedToUserID INT NOT NULL,
    AssignedByUserID INT NOT NULL,
    
    -- Assignment Details
    AssignmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    DueDate DATETIMEOFFSET NULL,
    Priority NVARCHAR(20) DEFAULT 'Normal', -- Low, Normal, High, Urgent
    AssignmentReason NVARCHAR(500) NULL,
    SpecialInstructions NVARCHAR(MAX) NULL,
    
    -- Status
    Status NVARCHAR(50) DEFAULT 'Assigned', -- Assigned, Acknowledged, Overdue, Completed
    CompletedDate DATETIMEOFFSET NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyUserAssignment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyUserAssignment_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyUserAssignment_AssignedTo FOREIGN KEY (AssignedToUserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_PolicyUserAssignment_AssignedBy FOREIGN KEY (AssignedByUserID) REFERENCES [V7].[User](UserID)
);
GO

-- =============================================
-- Policy Acknowledgment and Compliance
-- =============================================

-- Policy Acknowledgments
CREATE TABLE [T100].[PolicyAcknowledgment] (
    PolicyAcknowledgmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    UserID INT NOT NULL,
    
    -- Acknowledgment Details
    AcknowledgmentDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    AcknowledgmentMethod NVARCHAR(50) DEFAULT 'Digital', -- Digital, Paper, Verbal, Training
    
    -- Digital Signature (if applicable)
    DigitalSignature NVARCHAR(MAX) NULL, -- Base64 encoded signature
    IPAddress NVARCHAR(50) NULL,
    UserAgent NVARCHAR(500) NULL,
    
    -- Acknowledgment Content
    AcknowledgmentText NVARCHAR(MAX) NULL,
    UserComments NVARCHAR(MAX) NULL,
    
    -- Verification
    VerificationCode NVARCHAR(100) NULL,
    IsVerified BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_PolicyAcknowledgment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyAcknowledgment_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyAcknowledgment_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT UQ_PolicyAcknowledgment UNIQUE (PolicyID, UserID)
);
GO

-- Policy Compliance Tracking
CREATE TABLE [T100].[PolicyCompliance] (
    PolicyComplianceID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    UserID INT NOT NULL,
    
    -- Compliance Status
    ComplianceStatus NVARCHAR(50) NOT NULL, -- Compliant, NonCompliant, Overdue, Exempt
    ComplianceDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    LastReviewDate DATETIMEOFFSET NULL,
    NextReviewDate DATETIMEOFFSET NULL,
    
    -- Evidence and Documentation
    ComplianceEvidence NVARCHAR(MAX) NULL,
    ComplianceNotes NVARCHAR(MAX) NULL,
    ExemptionReason NVARCHAR(MAX) NULL,
    ExemptionApprovedBy INT NULL,
    
    -- Training Completion (if required)
    TrainingCompletedDate DATETIMEOFFSET NULL,
    TrainingScore DECIMAL(5,2) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyCompliance_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyCompliance_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyCompliance_User FOREIGN KEY (UserID) REFERENCES [V7].[User](UserID),
    CONSTRAINT FK_PolicyCompliance_ExemptionApprover FOREIGN KEY (ExemptionApprovedBy) REFERENCES [V7].[User](UserID)
);
GO

-- =============================================
-- Policy Review and Approval
-- =============================================

-- Policy Review History
CREATE TABLE [T100].[PolicyReview] (
    PolicyReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    ReviewerUserID INT NOT NULL,
    
    -- Review Details
    ReviewDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ReviewType NVARCHAR(50) NOT NULL, -- Scheduled, Triggered, Emergency, Regulatory
    ReviewStatus NVARCHAR(50) NOT NULL, -- InProgress, Completed, RequiresUpdate, NoChangeRequired
    
    -- Review Content
    ReviewNotes NVARCHAR(MAX) NULL,
    RecommendedChanges NVARCHAR(MAX) NULL,
    ComplianceCheck NVARCHAR(MAX) NULL,
    RegulatoryCheck NVARCHAR(MAX) NULL,
    
    -- Review Outcome
    ReviewOutcome NVARCHAR(50) NULL, -- Approved, RequiresRevision, Withdraw, NoAction
    NextReviewDate DATETIMEOFFSET NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyReview_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyReview_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyReview_Reviewer FOREIGN KEY (ReviewerUserID) REFERENCES [V7].[User](UserID)
);
GO

-- Policy Approval Log
CREATE TABLE [T100].[PolicyApprovalLog] (
    PolicyApprovalLogID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    ApprovalAction NVARCHAR(50) NOT NULL, -- Submitted, Reviewed, Approved, Rejected, Published, Withdrawn
    ApprovalLevel INT DEFAULT 1,
    ApproverUserID INT NOT NULL,
    ApprovalDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    -- Approval Details
    ApprovalComments NVARCHAR(MAX) NULL,
    ConditionsOfApproval NVARCHAR(MAX) NULL,
    
    -- Document State at Time of Approval
    PolicyVersion NVARCHAR(20) NULL,
    PolicyStatus NVARCHAR(50) NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_PolicyApprovalLog_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyApprovalLog_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyApprovalLog_Approver FOREIGN KEY (ApproverUserID) REFERENCES [V7].[User](UserID)
);
GO

-- =============================================
-- Policy Supporting Tables
-- =============================================

-- Policy Attachments
CREATE TABLE [T100].[PolicyAttachment] (
    PolicyAttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    AttachmentID INT NOT NULL,
    
    -- Attachment Details
    AttachmentType NVARCHAR(50) DEFAULT 'Document', -- Document, Form, Template, Reference, Appendix
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
    
    CONSTRAINT FK_PolicyAttachment_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyAttachment_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyAttachment_Attachment FOREIGN KEY (AttachmentID) REFERENCES [V7].[Attachment](AttachmentID)
);
GO

-- Policy External Links
CREATE TABLE [T100].[PolicyExternalLink] (
    PolicyExternalLinkID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    PolicyID INT NOT NULL,
    
    -- Link Details
    LinkTitle NVARCHAR(255) NOT NULL,
    LinkURL NVARCHAR(500) NOT NULL,
    LinkDescription NVARCHAR(500) NULL,
    LinkType NVARCHAR(50) DEFAULT 'Reference', -- Reference, Regulation, Standard, Form, Training
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyExternalLink_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID),
    CONSTRAINT FK_PolicyExternalLink_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID)
);
GO

-- Policy Tags (for flexible categorization)
CREATE TABLE [T100].[PolicyTag] (
    PolicyTagID INT IDENTITY(1,1) PRIMARY KEY,
    UserAreaID INT NOT NULL,
    TagName NVARCHAR(100) NOT NULL,
    TagDescription NVARCHAR(500) NULL,
    TagColor NVARCHAR(7) NULL, -- Hex color
    IsActive BIT DEFAULT 1,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    ModifiedByUserID INT NULL,
    ModifiedDate DATETIMEOFFSET NULL,
    ArchivedByUserID INT NULL,
    ArchivedDate DATETIMEOFFSET NULL,
    
    CONSTRAINT FK_PolicyTag_UserArea FOREIGN KEY (UserAreaID) REFERENCES [V7].[UserArea](UserAreaID)
);
GO

-- Policy Tag Assignments
CREATE TABLE [T100].[PolicyTagAssignment] (
    PolicyTagAssignmentID INT IDENTITY(1,1) PRIMARY KEY,
    PolicyID INT NOT NULL,
    PolicyTagID INT NOT NULL,
    
    -- V7 Audit Fields
    CreatedByUserID INT NOT NULL,
    CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
    
    CONSTRAINT FK_PolicyTagAssignment_Policy FOREIGN KEY (PolicyID) REFERENCES [T100].[Policy](PolicyID),
    CONSTRAINT FK_PolicyTagAssignment_Tag FOREIGN KEY (PolicyTagID) REFERENCES [T100].[PolicyTag](PolicyTagID),
    CONSTRAINT UQ_PolicyTagAssignment UNIQUE (PolicyID, PolicyTagID)
);
GO

-- =============================================
-- Create Indexes for Performance
-- =============================================

-- Policy indexes
CREATE INDEX IX_Policy_UserAreaID ON [T100].[Policy](UserAreaID);
CREATE INDEX IX_Policy_PolicyNumber ON [T100].[Policy](PolicyNumber);
CREATE INDEX IX_Policy_Status ON [T100].[Policy](PolicyStatusTypeID);
CREATE INDEX IX_Policy_PolicyOwner ON [T100].[Policy](PolicyOwnerUserID);
CREATE INDEX IX_Policy_NextReviewDate ON [T100].[Policy](NextReviewDate);
CREATE INDEX IX_Policy_EffectiveDate ON [T100].[Policy](EffectiveDate);
CREATE INDEX IX_Policy_ExpiryDate ON [T100].[Policy](ExpiryDate);

-- Assignment indexes
CREATE INDEX IX_PolicyOrgGroupAssignment_OrgGroupID ON [T100].[PolicyOrgGroupAssignment](OrgGroupID);
CREATE INDEX IX_PolicyLocationAssignment_LocationID ON [T100].[PolicyLocationAssignment](LocationID);
CREATE INDEX IX_PolicyUserAssignment_AssignedToUserID ON [T100].[PolicyUserAssignment](AssignedToUserID);
CREATE INDEX IX_PolicyUserAssignment_DueDate ON [T100].[PolicyUserAssignment](DueDate);

-- Acknowledgment and compliance indexes
CREATE INDEX IX_PolicyAcknowledgment_UserID ON [T100].[PolicyAcknowledgment](UserID);
CREATE INDEX IX_PolicyAcknowledgment_PolicyID ON [T100].[PolicyAcknowledgment](PolicyID);
CREATE INDEX IX_PolicyCompliance_UserID ON [T100].[PolicyCompliance](UserID);
CREATE INDEX IX_PolicyCompliance_ComplianceStatus ON [T100].[PolicyCompliance](ComplianceStatus);

-- Review and approval indexes
CREATE INDEX IX_PolicyReview_PolicyID ON [T100].[PolicyReview](PolicyID);
CREATE INDEX IX_PolicyReview_ReviewerUserID ON [T100].[PolicyReview](ReviewerUserID);
CREATE INDEX IX_PolicyApprovalLog_PolicyID ON [T100].[PolicyApprovalLog](PolicyID);
CREATE INDEX IX_PolicyApprovalLog_ApproverUserID ON [T100].[PolicyApprovalLog](ApproverUserID);

-- Supporting table indexes
CREATE INDEX IX_PolicyAttachment_PolicyID ON [T100].[PolicyAttachment](PolicyID);
CREATE INDEX IX_PolicyExternalLink_PolicyID ON [T100].[PolicyExternalLink](PolicyID);
CREATE INDEX IX_PolicyTagAssignment_PolicyID ON [T100].[PolicyTagAssignment](PolicyID);
CREATE INDEX IX_PolicyTagAssignment_TagID ON [T100].[PolicyTagAssignment](PolicyTagID);

PRINT 'Policies module tables created successfully';
GO