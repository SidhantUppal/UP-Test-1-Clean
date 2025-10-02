-- Document Template Tags Tables - V7 Convention Aligned
-- Created: 2025-08-11
-- Purpose: Support tenant-specific custom tags for document templates

-- 1. DocumentTemplateTag - Store custom tags per tenant
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentTemplateTag' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentTemplateTag] (
        DocumentTemplateTagID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        TagName nvarchar(100) NOT NULL, -- e.g., 'company.vatNumber', 'contract.clause1'
        DisplayName nvarchar(255) NOT NULL, -- e.g., 'Company VAT Number', 'Contract Clause 1'
        Description nvarchar(500) NULL,
        Category nvarchar(50) NULL, -- e.g., 'HR', 'Finance', 'Legal', 'Custom'
        DataType nvarchar(20) NOT NULL DEFAULT 'text', -- 'text', 'number', 'date', 'boolean'
        SampleValue nvarchar(500) NULL, -- Default/example value for preview
        IsSystemTag bit NOT NULL DEFAULT 0, -- False for custom tags, True for system tags
        IsActive bit NOT NULL DEFAULT 1,
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentTemplateTag] PRIMARY KEY CLUSTERED ([DocumentTemplateTagID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentTemplateTag_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentTemplateTag_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentTemplateTag_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentTemplateTag_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID]),
        
        -- Unique constraint for tag names per tenant
        CONSTRAINT [UK_DocumentTemplateTag_UserArea_TagName] UNIQUE ([UserAreaID], [TagName])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_UserAreaID] ON [V7].[DocumentTemplateTag]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_Category] ON [V7].[DocumentTemplateTag]([Category]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_TagName] ON [V7].[DocumentTemplateTag]([TagName]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateTag_IsActive] ON [V7].[DocumentTemplateTag]([IsActive]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentTemplateTag]';
END
GO

-- 2. DocumentTemplate - Store document templates (enhanced version)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentTemplate' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentTemplate] (
        DocumentTemplateID int IDENTITY(1,1) NOT NULL,
        UserAreaID int NOT NULL,
        Title nvarchar(255) NOT NULL,
        Description nvarchar(MAX) NULL,
        Content nvarchar(MAX) NOT NULL, -- Template content with <{tag}> placeholders
        DocumentType nvarchar(50) NOT NULL DEFAULT 'contract', -- 'contract', 'agreement', 'policy', 'form', 'letter', 'certificate', 'other'
        Category nvarchar(100) NULL,
        Tags nvarchar(MAX) NULL, -- JSON array of regular tags (not template tags)
        PlaceholderTags nvarchar(MAX) NULL, -- JSON array of template tags used in this template
        Version nvarchar(20) NOT NULL DEFAULT '1.0',
        IsActive bit NOT NULL DEFAULT 1,
        IsPublic bit NOT NULL DEFAULT 0, -- Can be used by other tenants
        CreatedByUserID int NOT NULL,
        CreatedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID int NULL,
        ModifiedDate datetimeoffset NULL,
        ArchivedByUserID int NULL,
        ArchivedDate datetimeoffset NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentTemplate] PRIMARY KEY CLUSTERED ([DocumentTemplateID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentTemplate_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_DocumentTemplate_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentTemplate_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_DocumentTemplate_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_UserAreaID] ON [V7].[DocumentTemplate]([UserAreaID]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_DocumentType] ON [V7].[DocumentTemplate]([DocumentType]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_Category] ON [V7].[DocumentTemplate]([Category]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_IsActive] ON [V7].[DocumentTemplate]([IsActive]) WHERE [ArchivedDate] IS NULL;
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplate_Title] ON [V7].[DocumentTemplate]([Title]) WHERE [ArchivedDate] IS NULL;
    
    PRINT 'Created table [V7].[DocumentTemplate]';
END
GO

-- 3. DocumentTemplateUsage - Track template usage for analytics
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DocumentTemplateUsage' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[DocumentTemplateUsage] (
        DocumentTemplateUsageID int IDENTITY(1,1) NOT NULL,
        DocumentTemplateID int NOT NULL,
        DocumentID int NULL, -- Link to generated document if stored
        UsedByUserID int NOT NULL,
        UsedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        GeneratedDocumentName nvarchar(255) NULL,
        TagValuesUsed nvarchar(MAX) NULL, -- JSON of tag values used during generation
        
        -- Primary Key Constraint
        CONSTRAINT [PK_DocumentTemplateUsage] PRIMARY KEY CLUSTERED ([DocumentTemplateUsageID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_DocumentTemplateUsage_Template] FOREIGN KEY ([DocumentTemplateID]) REFERENCES [V7].[DocumentTemplate]([DocumentTemplateID]),
        -- CONSTRAINT [FK_DocumentTemplateUsage_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document]([DocumentID]), -- Will add after Document table exists
        CONSTRAINT [FK_DocumentTemplateUsage_UsedBy] FOREIGN KEY ([UsedByUserID]) REFERENCES [V7].[User]([UserID])
    );

    -- Create indexes
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateUsage_DocumentTemplateID] ON [V7].[DocumentTemplateUsage]([DocumentTemplateID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateUsage_UsedByUserID] ON [V7].[DocumentTemplateUsage]([UsedByUserID]);
    CREATE NONCLUSTERED INDEX [IX_DocumentTemplateUsage_UsedDate] ON [V7].[DocumentTemplateUsage]([UsedDate]);
    
    PRINT 'Created table [V7].[DocumentTemplateUsage]';
END
GO

-- Insert system tags that align with actual database schema
-- These will be available to all tenants by default
IF EXISTS (SELECT * FROM sysobjects WHERE name='DocumentTemplateTag' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    -- Insert system tags for all existing UserAreas
    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'employee.firstName',
        'Employee First Name',
        'First name of the employee from Employee table',
        'Employee',
        'text',
        'John',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'employee.firstName'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'employee.lastName',
        'Employee Last Name',
        'Last name of the employee from Employee table',
        'Employee',
        'text',
        'Doe',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'employee.lastName'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'employee.jobTitle',
        'Employee Job Title',
        'Job title/position of the employee',
        'Employee',
        'text',
        'Software Engineer',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'employee.jobTitle'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'tenant.name',
        'Company Name',
        'Name of the company/organization',
        'Company',
        'text',
        'Acme Corporation',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'tenant.name'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'user.firstName',
        'User First Name',
        'First name of the current user',
        'User',
        'text',
        'Jane',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'user.firstName'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'user.lastName',
        'User Last Name',
        'Last name of the current user',
        'User',
        'text',
        'Smith',
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'user.lastName'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'current.date',
        'Current Date',
        'Current date when document is generated',
        'System',
        'date',
        FORMAT(SYSDATETIMEOFFSET(), 'yyyy-MM-dd'),
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'current.date'
    );

    INSERT INTO [V7].[DocumentTemplateTag] (UserAreaID, TagName, DisplayName, Description, Category, DataType, SampleValue, IsSystemTag, CreatedByUserID)
    SELECT 
        ua.UserAreaID,
        'current.year',
        'Current Year',
        'Current year when document is generated',
        'System',
        'text',
        CAST(YEAR(SYSDATETIMEOFFSET()) AS nvarchar),
        1,
        1
    FROM [V7].[UserArea] ua
    WHERE NOT EXISTS (
        SELECT 1 FROM [V7].[DocumentTemplateTag] dtt 
        WHERE dtt.UserAreaID = ua.UserAreaID AND dtt.TagName = 'current.year'
    );

    PRINT 'Inserted enhanced system tags for all UserAreas (8 core tags)';
END
GO

PRINT 'Document Template Tags migration completed successfully with V7 conventions';