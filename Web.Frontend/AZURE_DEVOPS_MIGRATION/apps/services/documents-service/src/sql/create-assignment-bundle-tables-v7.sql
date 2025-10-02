-- Document Assignment and Bundle Tables - V7 Convention Aligned
-- Created: 2025-08-11
-- Purpose: Support document assignment workflows, bundles, and signature tracking

-- 1. DocumentBundle - Predefined sets of documents for common scenarios
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentBundle' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentBundle] (
        BundleID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        BundleName nvarchar(255) NOT NULL,
        Description nvarchar(MAX) NULL,
        Category nvarchar(100) NULL, -- 'Onboarding', 'Project', 'Compliance', 'Training', etc.
        BundleType nvarchar(50) NOT NULL DEFAULT 'Standard', -- 'Standard', 'Template', 'Dynamic'
        RequiresSequentialSigning bit NOT NULL DEFAULT 0, -- Documents must be signed in order
        AllowBulkSign bit NOT NULL DEFAULT 1, -- Allow signing all at once
        ValidityDays int NULL, -- How many days the bundle remains valid
        IsActive bit NOT NULL DEFAULT 1,
        Tags nvarchar(MAX) NULL, -- JSON array of tags
        Metadata nvarchar(MAX) NULL, -- JSON for additional configuration
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentBundle] PRIMARY KEY CLUSTERED ([BundleID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentBundle_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentBundle_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentBundle_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentBundle_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentBundle_UserAreaID] ON [V7].[DocumentBundle]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentBundle_Category] ON [V7].[DocumentBundle]([Category]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentBundle_IsActive] ON [V7].[DocumentBundle]([IsActive]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentBundle]';
END
GO

-- 2. DocumentBundleItem - Documents included in a bundle
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentBundleItem' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentBundleItem] (
        BundleItemID int IDENTITY(1,1) NOT NULL,
        BundleID int NOT NULL,
        DocumentID int NULL, -- Reference to existing document
        DocumentTemplateID int NULL, -- Or reference to template for generation
        DisplayOrder int NOT NULL DEFAULT 0,
        IsRequired bit NOT NULL DEFAULT 1,
        RequiresSignature bit NOT NULL DEFAULT 0,
        SignatureType nvarchar(50) NULL, -- 'Simple', 'DocuSign', 'AdobeSign', 'Wet'
        Instructions nvarchar(MAX) NULL, -- Specific instructions for this document
        DueDaysOffset int NULL, -- Days from assignment date when due
        Metadata nvarchar(MAX) NULL, -- JSON for additional configuration
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentBundleItem] PRIMARY KEY CLUSTERED ([BundleItemID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentBundleItem_Bundle] FOREIGN KEY ([BundleID]) REFERENCES [V7].[DocumentBundle]([BundleID]),
        CONSTRAINT [FK_DocumentBundleItem_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document]([DocumentID]),
        CONSTRAINT [FK_DocumentBundleItem_Template] FOREIGN KEY ([DocumentTemplateID]) REFERENCES [V7].[DocumentTemplate]([DocumentTemplateID]),
        
        -- Business rule constraint
        CONSTRAINT [CHK_DocumentBundleItem_DocumentOrTemplate] CHECK (
            (DocumentID IS NOT NULL AND DocumentTemplateID IS NULL) OR 
            (DocumentID IS NULL AND DocumentTemplateID IS NOT NULL)
        )
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleItem_BundleID] ON [V7].[DocumentBundleItem]([BundleID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleItem_DocumentID] ON [V7].[DocumentBundleItem]([DocumentID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleItem_DocumentTemplateID] ON [V7].[DocumentBundleItem]([DocumentTemplateID]);
    
    PRINT 'Created table [V7].[DocumentBundleItem]';
END
GO

-- 3. DocumentAssignment - Individual document assignments to users
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentAssignment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentAssignment] (
        AssignmentID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        DocumentID int NOT NULL,
        AssignedToUserID int NULL, -- Individual user assignment
        AssignedToEmployeeID int NULL, -- Employee assignment
        AssignedToContractorID int NULL, -- Contractor assignment
        AssignedToOrgGroupID int NULL, -- Department/group assignment
        AssignedToLocationID int NULL, -- Location-based assignment
        AssignedToRoleID int NULL, -- Role-based assignment
        AssignmentType nvarchar(50) NOT NULL, -- 'Individual', 'Employee', 'Contractor', 'Group', 'Location', 'Role'
        BundleAssignmentID int NULL, -- If part of a bundle assignment
        Status nvarchar(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Viewed', 'InProgress', 'Completed', 'Expired', 'Cancelled'
        Priority nvarchar(20) NOT NULL DEFAULT 'Normal', -- 'Low', 'Normal', 'High', 'Urgent'
        DueDate datetimeoffset NULL,
        ViewedDate datetimeoffset NULL,
        CompletedDate datetimeoffset NULL,
        RequiresSignature bit NOT NULL DEFAULT 0,
        SignatureType nvarchar(50) NULL, -- 'Simple', 'DocuSign', 'AdobeSign', 'Wet'
        SignatureStatus nvarchar(50) NULL, -- 'NotRequired', 'Pending', 'Signed', 'Declined'
        SignedDate datetimeoffset NULL,
        ReminderEnabled bit NOT NULL DEFAULT 1,
        ReminderFrequencyDays int NULL DEFAULT 7,
        LastReminderDate datetimeoffset NULL,
        ReminderCount int NOT NULL DEFAULT 0,
        Notes nvarchar(MAX) NULL,
        CompletionNotes nvarchar(MAX) NULL,
        Metadata nvarchar(MAX) NULL, -- JSON for additional data
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentAssignment] PRIMARY KEY CLUSTERED ([AssignmentID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentAssignment_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document]([DocumentID]),
        CONSTRAINT [FK_DocumentAssignment_AssignedToUser] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User]([UserID]),
        -- Note: Employee, Contractor, OrgGroup, Location FKs would reference their respective tables when available
        CONSTRAINT [FK_DocumentAssignment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentAssignment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentAssignment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_UserAreaID] ON [V7].[DocumentAssignment]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_DocumentID] ON [V7].[DocumentAssignment]([DocumentID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_AssignedToUserID] ON [V7].[DocumentAssignment]([AssignedToUserID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_Status] ON [V7].[DocumentAssignment]([Status]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_DueDate] ON [V7].[DocumentAssignment]([DueDate]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentAssignment_BundleAssignmentID] ON [V7].[DocumentAssignment]([BundleAssignmentID]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentAssignment]';
END
GO

-- 4. DocumentBundleAssignment - Bundle assignments tracking
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentBundleAssignment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentBundleAssignment] (
        BundleAssignmentID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        BundleID int NOT NULL,
        AssignedToUserID int NULL,
        AssignedToEmployeeID int NULL,
        AssignedToContractorID int NULL,
        AssignedToOrgGroupID int NULL,
        AssignedToLocationID int NULL,
        AssignmentType nvarchar(50) NOT NULL, -- 'Individual', 'Employee', 'Contractor', 'Group', 'Location', 'Bulk'
        RecipientName nvarchar(255) NULL, -- For display/tracking
        RecipientEmail nvarchar(255) NULL,
        Status nvarchar(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'InProgress', 'Completed', 'PartiallyCompleted', 'Expired', 'Cancelled'
        TotalDocuments int NOT NULL DEFAULT 0,
        CompletedDocuments int NOT NULL DEFAULT 0,
        SignedDocuments int NOT NULL DEFAULT 0,
        AllowBulkSign bit NOT NULL DEFAULT 1,
        BulkSignStatus nvarchar(50) NULL, -- 'Available', 'InProgress', 'Completed'
        DueDate datetimeoffset NULL,
        StartedDate datetimeoffset NULL,
        CompletedDate datetimeoffset NULL,
        ExpiryDate datetimeoffset NULL,
        Notes nvarchar(MAX) NULL,
        Metadata nvarchar(MAX) NULL, -- JSON for additional data
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentBundleAssignment] PRIMARY KEY CLUSTERED ([BundleAssignmentID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentBundleAssignment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentBundleAssignment_Bundle] FOREIGN KEY ([BundleID]) REFERENCES [V7].[DocumentBundle]([BundleID]),
        CONSTRAINT [FK_DocumentBundleAssignment_AssignedToUser] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentBundleAssignment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentBundleAssignment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentBundleAssignment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_UserAreaID] ON [V7].[DocumentBundleAssignment]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_BundleID] ON [V7].[DocumentBundleAssignment]([BundleID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_AssignedToUserID] ON [V7].[DocumentBundleAssignment]([AssignedToUserID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_Status] ON [V7].[DocumentBundleAssignment]([Status]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentBundleAssignment_DueDate] ON [V7].[DocumentBundleAssignment]([DueDate]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentBundleAssignment]';
END
GO

-- 5. AssignmentSignature - Track signatures for assignments
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AssignmentSignature' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[AssignmentSignature] (
        SignatureID int IDENTITY(1,1) NOT NULL,
        AssignmentID int NOT NULL,
        SignerUserID int NOT NULL,
        SignatureType nvarchar(50) NOT NULL, -- 'Simple', 'DocuSign', 'AdobeSign', 'Wet'
        SignatureStatus nvarchar(50) NOT NULL, -- 'Pending', 'Signed', 'Declined', 'Expired'
        SignedDate datetimeoffset NULL,
        SignatureData nvarchar(MAX) NULL, -- Base64 signature image or external reference
        IPAddress nvarchar(50) NULL,
        UserAgent nvarchar(500) NULL,
        GeographicLocation nvarchar(255) NULL,
        ExternalSignatureID nvarchar(255) NULL, -- DocuSign envelope ID, etc.
        ExternalStatus nvarchar(100) NULL,
        DeclineReason nvarchar(MAX) NULL,
        Metadata nvarchar(MAX) NULL, -- JSON for provider-specific data
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        
        -- Primary Key Constraint
        CONSTRAINT [PK_AssignmentSignature] PRIMARY KEY CLUSTERED ([SignatureID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_AssignmentSignature_Assignment] FOREIGN KEY ([AssignmentID]) REFERENCES [V7].[DocumentAssignment]([AssignmentID]),
        CONSTRAINT [FK_AssignmentSignature_Signer] FOREIGN KEY ([SignerUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_AssignmentID] ON [V7].[AssignmentSignature]([AssignmentID]);
    CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_SignerUserID] ON [V7].[AssignmentSignature]([SignerUserID]);
    CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_SignatureStatus] ON [V7].[AssignmentSignature]([SignatureStatus]);
    CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_SignedDate] ON [V7].[AssignmentSignature]([SignedDate]);
    
    PRINT 'Created table [V7].[AssignmentSignature]';
END
GO

-- 6. AssignmentHistory - Track all actions on assignments
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AssignmentHistory' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[AssignmentHistory] (
        HistoryID int IDENTITY(1,1) NOT NULL,
        AssignmentID int NOT NULL,
        Action nvarchar(100) NOT NULL, -- 'Created', 'Viewed', 'Downloaded', 'Signed', 'Completed', 'Reminder Sent', etc.
        PerformedByUserID int NOT NULL,
        ActionDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        OldStatus nvarchar(50) NULL,
        NewStatus nvarchar(50) NULL,
        Notes nvarchar(MAX) NULL,
        IPAddress nvarchar(50) NULL,
        Metadata nvarchar(MAX) NULL, -- JSON for additional context
        
        -- Primary Key Constraint
        CONSTRAINT [PK_AssignmentHistory] PRIMARY KEY CLUSTERED ([HistoryID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_AssignmentHistory_Assignment] FOREIGN KEY ([AssignmentID]) REFERENCES [V7].[DocumentAssignment]([AssignmentID]),
        CONSTRAINT [FK_AssignmentHistory_PerformedBy] FOREIGN KEY ([PerformedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_AssignmentHistory_AssignmentID] ON [V7].[AssignmentHistory]([AssignmentID]);
    CREATE NONCLUSTERED INDEX [IX_AssignmentHistory_PerformedByUserID] ON [V7].[AssignmentHistory]([PerformedByUserID]);
    CREATE NONCLUSTERED INDEX [IX_AssignmentHistory_ActionDate] ON [V7].[AssignmentHistory]([ActionDate]);
    
    PRINT 'Created table [V7].[AssignmentHistory]';
END
GO

-- Add foreign key from DocumentAssignment to DocumentBundleAssignment (if not exists)
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_DocumentAssignment_BundleAssignment')
BEGIN
    ALTER TABLE [V7].[DocumentAssignment]
    ADD CONSTRAINT [FK_DocumentAssignment_BundleAssignment]
    FOREIGN KEY ([BundleAssignmentID]) REFERENCES [V7].[DocumentBundleAssignment]([BundleAssignmentID]);
END
GO

-- Insert sample document bundles
IF NOT EXISTS (SELECT * FROM [V7].[DocumentBundle] WHERE BundleName = 'New Employee Onboarding')
BEGIN
    INSERT INTO [V7].[DocumentBundle] (UserAreaID, BundleName, Description, Category, BundleType, RequiresSequentialSigning, AllowBulkSign, ValidityDays, IsActive, Tags, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'New Employee Onboarding',
        'Complete document package for new employee onboarding including contracts, policies, and forms',
        'Onboarding',
        'Template',
        0,
        1,
        30,
        1,
        '["hr", "onboarding", "new-employee"]',
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentBundle] 
        WHERE UserAreaID = ua.UserAreaID AND BundleName = 'New Employee Onboarding'
    );
    
    PRINT 'Created sample bundle: New Employee Onboarding';
END
GO

IF NOT EXISTS (SELECT * FROM [V7].[DocumentBundle] WHERE BundleName = 'Project Kickoff Package')
BEGIN
    INSERT INTO [V7].[DocumentBundle] (UserAreaID, BundleName, Description, Category, BundleType, RequiresSequentialSigning, AllowBulkSign, ValidityDays, IsActive, Tags, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'Project Kickoff Package',
        'Essential documents for project initiation including contracts, NDAs, and project charters',
        'Project',
        'Template',
        0,
        1,
        60,
        1,
        '["project", "kickoff", "contracts"]',
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentBundle] 
        WHERE UserAreaID = ua.UserAreaID AND BundleName = 'Project Kickoff Package'
    );
    
    PRINT 'Created sample bundle: Project Kickoff Package';
END
GO

IF NOT EXISTS (SELECT * FROM [V7].[DocumentBundle] WHERE BundleName = 'Contractor Onboarding')
BEGIN
    INSERT INTO [V7].[DocumentBundle] (UserAreaID, BundleName, Description, Category, BundleType, RequiresSequentialSigning, AllowBulkSign, ValidityDays, IsActive, Tags, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'Contractor Onboarding',
        'Required documents for contractor onboarding including agreements, safety docs, and compliance forms',
        'Onboarding',
        'Template',
        1, -- Sequential signing required
        0, -- No bulk sign for contractors
        45,
        1,
        '["contractor", "onboarding", "compliance"]',
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentBundle] 
        WHERE UserAreaID = ua.UserAreaID AND BundleName = 'Contractor Onboarding'
    );
    
    PRINT 'Created sample bundle: Contractor Onboarding';
END
GO

IF NOT EXISTS (SELECT * FROM [V7].[DocumentBundle] WHERE BundleName = 'Annual Compliance Review')
BEGIN
    INSERT INTO [V7].[DocumentBundle] (UserAreaID, BundleName, Description, Category, BundleType, RequiresSequentialSigning, AllowBulkSign, ValidityDays, IsActive, Tags, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'Annual Compliance Review',
        'Annual compliance documents requiring review and acknowledgment',
        'Compliance',
        'Standard',
        0,
        1,
        90,
        1,
        '["compliance", "annual", "review"]',
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentBundle] 
        WHERE UserAreaID = ua.UserAreaID AND BundleName = 'Annual Compliance Review'
    );
    
    PRINT 'Created sample bundle: Annual Compliance Review';
END
GO

PRINT 'Document Assignment and Bundle tables created successfully with V7 conventions';
PRINT '';
PRINT 'Tables created:';
PRINT '  - [V7].[DocumentBundle] - Predefined document sets';
PRINT '  - [V7].[DocumentBundleItem] - Documents in each bundle';
PRINT '  - [V7].[DocumentAssignment] - Individual document assignments';
PRINT '  - [V7].[DocumentBundleAssignment] - Bundle assignment tracking';
PRINT '  - [V7].[AssignmentSignature] - Signature tracking';
PRINT '  - [V7].[AssignmentHistory] - Assignment audit trail';
PRINT '';
PRINT 'Sample bundles created:';
PRINT '  - New Employee Onboarding';
PRINT '  - Project Kickoff Package';
PRINT '  - Contractor Onboarding';
PRINT '  - Annual Compliance Review';