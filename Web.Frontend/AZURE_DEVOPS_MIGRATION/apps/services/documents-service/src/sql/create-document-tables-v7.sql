-- Create Document table - V7 Convention Aligned
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Document' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[Document] (
        DocumentID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        DocumentType nvarchar(50) NOT NULL DEFAULT 'Attachment', -- 'Form' or 'Attachment'
        OriginalFileName nvarchar(255) NOT NULL,
        DisplayName nvarchar(255) NOT NULL,
        Description nvarchar(MAX) NULL,
        FileSize bigint NOT NULL DEFAULT 0,
        MimeType nvarchar(100) NULL,
        StorageUrl nvarchar(500) NULL, -- Azure Blob Storage URL
        FolderID int NULL,
        PrivacyLevel nvarchar(50) NOT NULL DEFAULT 'Public', -- 'Public', 'Private', 'Confidential', 'Secret'
        Status nvarchar(50) NOT NULL DEFAULT 'Draft', -- 'Draft', 'Final', 'Archived', 'Signed'
        Tags nvarchar(MAX) NULL, -- JSON array of tags
        IsStarred bit NOT NULL DEFAULT 0,
        IsEncrypted bit NOT NULL DEFAULT 0,
        EncryptionMethod nvarchar(50) NULL,
        EncryptionKeyID nvarchar(255) NULL,
        ExternalDocumentID nvarchar(100) NULL, -- For migration from legacy systems
        LegacySystemSource nvarchar(100) NULL,
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_Document] PRIMARY KEY CLUSTERED ([DocumentID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_Document_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_Document_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_Document_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_Document_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_Document_UserAreaID] ON [V7].[Document]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_Document_FolderID] ON [V7].[Document]([FolderID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_Document_Status] ON [V7].[Document]([Status]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_Document_CreatedDate] ON [V7].[Document]([CreatedDate]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_Document_DisplayName] ON [V7].[Document]([DisplayName]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[Document]';
END
GO

-- Create DocumentFolder table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentFolder' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentFolder] (
        FolderID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        Name nvarchar(255) NOT NULL,
        ParentFolderID int NULL,
        Path nvarchar(500) NOT NULL, -- Materialized path like '/Legal/Contracts/2025/'
        IsSystemFolder bit NOT NULL DEFAULT 0,
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentFolder] PRIMARY KEY CLUSTERED ([FolderID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentFolder_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentFolder_ParentFolder] FOREIGN KEY ([ParentFolderID]) REFERENCES [V7].[DocumentFolder]([FolderID]),
        CONSTRAINT [FK_DocumentFolder_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentFolder_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentFolder_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentFolder_UserAreaID] ON [V7].[DocumentFolder]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentFolder_ParentFolderID] ON [V7].[DocumentFolder]([ParentFolderID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentFolder_Path] ON [V7].[DocumentFolder]([Path]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentFolder]';
END
GO

-- Create DocumentViewLog table for audit tracking
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentViewLog' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentViewLog] (
        ViewLogID int IDENTITY(1,1) NOT NULL,
        DocumentID int NOT NULL,
        UserID int NOT NULL,
        ViewedAt datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ViewMethod nvarchar(50) NOT NULL, -- 'view', 'download', 'preview'
        ViewDurationSeconds int NULL,
        IPAddress nvarchar(50) NULL,
        UserAgent nvarchar(500) NULL,
        GeographicLocation nvarchar(255) NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentViewLog] PRIMARY KEY CLUSTERED ([ViewLogID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentViewLog_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document]([DocumentID]),
        CONSTRAINT [FK_DocumentViewLog_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentViewLog_DocumentID] ON [V7].[DocumentViewLog]([DocumentID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentViewLog_UserID] ON [V7].[DocumentViewLog]([UserID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentViewLog_ViewedAt] ON [V7].[DocumentViewLog]([ViewedAt]);
    
    PRINT 'Created table [V7].[DocumentViewLog]';
END
GO

-- Create DocumentSignature table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentSignature' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentSignature] (
        SignatureID int IDENTITY(1,1) NOT NULL,
        DocumentID int NOT NULL,
        SignerUserID int NOT NULL,
        SignatureProvider nvarchar(50) NOT NULL, -- 'simple', 'docusign', 'adobesign'
        SignatureStatus nvarchar(50) NOT NULL, -- 'pending', 'completed', 'declined', 'expired'
        SignedAt datetimeoffset NULL,
        SignatureData nvarchar(MAX) NULL, -- JSON data from provider
        IPAddress nvarchar(50) NULL,
        SignedDocumentUrl nvarchar(500) NULL,
        ExpiresAt datetimeoffset NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentSignature] PRIMARY KEY CLUSTERED ([SignatureID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentSignature_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document]([DocumentID]),
        CONSTRAINT [FK_DocumentSignature_Signer] FOREIGN KEY ([SignerUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentSignature_DocumentID] ON [V7].[DocumentSignature]([DocumentID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentSignature_SignerUserID] ON [V7].[DocumentSignature]([SignerUserID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentSignature_Status] ON [V7].[DocumentSignature]([SignatureStatus]);
    
    PRINT 'Created table [V7].[DocumentSignature]';
END
GO

-- Create DocumentRequirementSet table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentRequirementSet' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentRequirementSet] (
        RequirementSetID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        SetName nvarchar(255) NOT NULL,
        Description nvarchar(MAX) NULL,
        Category nvarchar(100) NULL,
        ProcessType nvarchar(100) NULL, -- 'DueDiligence', 'PermitApplication', 'ContractorOnboarding', etc.
        IsActive bit NOT NULL DEFAULT 1,
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentRequirementSet] PRIMARY KEY CLUSTERED ([RequirementSetID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentRequirementSet_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentRequirementSet_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentRequirementSet_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentRequirementSet_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentRequirementSet_UserAreaID] ON [V7].[DocumentRequirementSet]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentRequirementSet_ProcessType] ON [V7].[DocumentRequirementSet]([ProcessType]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentRequirementSet]';
END
GO

-- Create DocumentRequirement table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentRequirement' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentRequirement] (
        RequirementID int IDENTITY(1,1) NOT NULL,
        RequirementSetID int NOT NULL,
        Name nvarchar(255) NOT NULL,
        Description nvarchar(MAX) NULL,
        DocumentType nvarchar(100) NULL,
        IsRequired bit NOT NULL DEFAULT 1,
        ExpectedFormat nvarchar(50) NULL, -- 'PDF', 'Image', 'Excel', etc.
        MaxFileSize bigint NULL,
        ValidityDays int NULL, -- How many days the document is valid
        OrderIndex int NOT NULL DEFAULT 0,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentRequirement] PRIMARY KEY CLUSTERED ([RequirementID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentRequirement_RequirementSet] FOREIGN KEY ([RequirementSetID]) REFERENCES [V7].[DocumentRequirementSet]([RequirementSetID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentRequirement_RequirementSetID] ON [V7].[DocumentRequirement]([RequirementSetID]);
    
    PRINT 'Created table [V7].[DocumentRequirement]';
END
GO

-- Create DocumentRequirementFulfillment table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentRequirementFulfillment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentRequirementFulfillment] (
        FulfillmentID int IDENTITY(1,1) NOT NULL,
        RequirementID int NOT NULL,
        DocumentID int NOT NULL,
        Status nvarchar(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected', 'Expired'
        SubmittedByUserID int NOT NULL,
        SubmittedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ReviewedByUserID int NULL,
        ReviewedDate datetimeoffset NULL,
        ReviewNotes nvarchar(MAX) NULL,
        ExpiryDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentRequirementFulfillment] PRIMARY KEY CLUSTERED ([FulfillmentID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentRequirementFulfillment_Requirement] FOREIGN KEY ([RequirementID]) REFERENCES [V7].[DocumentRequirement]([RequirementID]),
        CONSTRAINT [FK_DocumentRequirementFulfillment_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document]([DocumentID]),
        CONSTRAINT [FK_DocumentRequirementFulfillment_SubmittedBy] FOREIGN KEY ([SubmittedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentRequirementFulfillment_ReviewedBy] FOREIGN KEY ([ReviewedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentRequirementFulfillment_RequirementID] ON [V7].[DocumentRequirementFulfillment]([RequirementID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentRequirementFulfillment_DocumentID] ON [V7].[DocumentRequirementFulfillment]([DocumentID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentRequirementFulfillment_Status] ON [V7].[DocumentRequirementFulfillment]([Status]);
    
    PRINT 'Created table [V7].[DocumentRequirementFulfillment]';
END
GO

-- Add foreign key from Document to DocumentFolder (if not exists)
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Document_FolderID')
BEGIN
    ALTER TABLE [V7].[Document]
    ADD CONSTRAINT [FK_Document_FolderID]
    FOREIGN KEY ([FolderID]) REFERENCES [V7].[DocumentFolder]([FolderID]);
END
GO

-- Create some default system folders
IF NOT EXISTS (SELECT 1 FROM [V7].[DocumentFolder] WHERE Name = 'System Documents' AND IsSystemFolder = 1)
BEGIN
    INSERT INTO [V7].[DocumentFolder] (UserAreaID, Name, ParentFolderID, Path, IsSystemFolder, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'System Documents',
        NULL,
        '/System Documents/',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentFolder] 
        WHERE UserAreaID = ua.UserAreaID AND Name = 'System Documents' AND IsSystemFolder = 1
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM [V7].[DocumentFolder] WHERE Name = 'Templates' AND IsSystemFolder = 1)
BEGIN
    INSERT INTO [V7].[DocumentFolder] (UserAreaID, Name, ParentFolderID, Path, IsSystemFolder, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'Templates',
        NULL,
        '/Templates/',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentFolder] 
        WHERE UserAreaID = ua.UserAreaID AND Name = 'Templates' AND IsSystemFolder = 1
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM [V7].[DocumentFolder] WHERE Name = 'Shared Documents' AND IsSystemFolder = 1)
BEGIN
    INSERT INTO [V7].[DocumentFolder] (UserAreaID, Name, ParentFolderID, Path, IsSystemFolder, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'Shared Documents',
        NULL,
        '/Shared Documents/',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentFolder] 
        WHERE UserAreaID = ua.UserAreaID AND Name = 'Shared Documents' AND IsSystemFolder = 1
    );
END
GO

PRINT 'Document tables created successfully with V7 conventions';