-- =====================================================
-- COMPLETE MIGRATION SCRIPT FOR AZURE V7-Dev DATABASE
-- Includes: LegalRegister, LegalRegisterAttachments, UserNavigationPreferences
-- 
-- Instructions:
-- 1. Connect to Azure V7-Dev database in SSMS
-- 2. Run this entire script
-- 3. Check the output messages for any errors
-- =====================================================

PRINT '============================================';
PRINT 'Starting migration of tables to Azure V7-Dev';
PRINT 'Date: ' + CONVERT(VARCHAR, sysdatetimeoffset(), 120);
PRINT '============================================';
PRINT '';

-- =====================================================
-- 1. Create Legal Register Table
-- =====================================================
PRINT 'Creating LegalRegister table...';

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LegalRegister' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [dbo].[LegalRegister] (
        [LegalRegisterID]     INT              IDENTITY(1,1) NOT NULL,
        [Name]                NVARCHAR(500)    NOT NULL,
        [Link]                NVARCHAR(1000)   NULL,
        [LatestUpdate]        DATETIMEOFFSET (7)         NULL,
        [RiskLevel]           NVARCHAR(50)     NULL,
        [ComplianceStatus]    NVARCHAR(50)     NULL,
        [Notes]               NVARCHAR(MAX)    NULL,
        [IndustryName]        NVARCHAR(200)    NULL,
        [LegislationType]     NVARCHAR(100)    NULL,
        [CreatedDate]         DATETIMEOFFSET (7)         NULL,
        [ModifiedDate]        DATETIMEOFFSET (7)         NULL,
        [CreatedBy]           NVARCHAR(100)    NULL,
        [ModifiedBy]          NVARCHAR(100)    NULL,
        CONSTRAINT [PK_LegalRegister] PRIMARY KEY CLUSTERED ([LegalRegisterID] ASC)
    );
    
    PRINT '✓ Table dbo.LegalRegister created successfully.';
    
    -- Add indexes
    CREATE NONCLUSTERED INDEX [IX_LegalRegister_Name] ON [dbo].[LegalRegister] ([Name] ASC);
    CREATE NONCLUSTERED INDEX [IX_LegalRegister_IndustryName] ON [dbo].[LegalRegister] ([IndustryName] ASC);
    CREATE NONCLUSTERED INDEX [IX_LegalRegister_ComplianceStatus] ON [dbo].[LegalRegister] ([ComplianceStatus] ASC);
    
    PRINT '✓ Indexes for LegalRegister created successfully.';
END
ELSE
BEGIN
    PRINT '! Table dbo.LegalRegister already exists.';
END
GO

-- =====================================================
-- 2. Create Legal Register Attachments Table
-- =====================================================
PRINT '';
PRINT 'Creating LegalRegisterAttachments table...';

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LegalRegisterAttachments' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [dbo].[LegalRegisterAttachments] (
        [AttachmentID]        INT              IDENTITY(1,1) NOT NULL,
        [LegalRegisterID]     INT              NOT NULL,
        [FileName]            NVARCHAR(500)    NOT NULL,
        [FileType]            NVARCHAR(100)    NULL,
        [FileSize]            BIGINT           NULL,
        [FileData]            VARBINARY(MAX)   NULL,
        [FileUrl]             NVARCHAR(1000)   NULL,
        [UploadDate]          DATETIMEOFFSET (7)         NULL,
        [UploadedBy]          NVARCHAR(100)    NULL,
        CONSTRAINT [PK_LegalRegisterAttachments] PRIMARY KEY CLUSTERED ([AttachmentID] ASC)
    );
    
    PRINT '✓ Table dbo.LegalRegisterAttachments created successfully.';
    
    -- Add foreign key
    ALTER TABLE [dbo].[LegalRegisterAttachments]
    ADD CONSTRAINT [FK_LegalRegisterAttachments_LegalRegister] 
    FOREIGN KEY ([LegalRegisterID]) REFERENCES [dbo].[LegalRegister]([LegalRegisterID])
    ON DELETE CASCADE;
    
    PRINT '✓ Foreign key constraint added successfully.';
    
    -- Add indexes
    CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_LegalRegisterID] 
    ON [dbo].[LegalRegisterAttachments] ([LegalRegisterID] ASC);
    
    CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_UploadDate] 
    ON [dbo].[LegalRegisterAttachments] ([UploadDate] DESC);
    
    PRINT '✓ Indexes for LegalRegisterAttachments created successfully.';
END
ELSE
BEGIN
    PRINT '! Table dbo.LegalRegisterAttachments already exists.';
END
GO

-- =====================================================
-- 3. Create User Navigation Preferences Table
-- =====================================================
PRINT '';
PRINT 'Creating UserNavigationPreferences table...';

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserNavigationPreferences' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [dbo].[UserNavigationPreferences] (
        [UserNavigationPreferencesID]  INT              IDENTITY(1,1) NOT NULL,
        [UserID]                       INT              NOT NULL,
        [NavigationPreferences]        NVARCHAR(MAX)    NOT NULL,
        [CreatedDate]                  DATETIMEOFFSET (7)         NULL,
        [UpdatedDate]                  DATETIMEOFFSET (7)         NULL,
        CONSTRAINT [PK_UserNavigationPreferences] PRIMARY KEY CLUSTERED ([UserNavigationPreferencesID] ASC)
    );
    
    PRINT '✓ Table dbo.UserNavigationPreferences created successfully.';
    
    -- Add unique constraint on UserID
    CREATE UNIQUE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UserID_Unique] 
    ON [dbo].[UserNavigationPreferences] ([UserID] ASC);
    
    CREATE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UpdatedDate] 
    ON [dbo].[UserNavigationPreferences] ([UpdatedDate] DESC);
    
    PRINT '✓ Indexes for UserNavigationPreferences created successfully.';
END
ELSE
BEGIN
    PRINT '! Table dbo.UserNavigationPreferences already exists.';
END
GO

-- =====================================================
-- 4. Verify All Tables Were Created
-- =====================================================
PRINT '';
PRINT '============================================';
PRINT 'VERIFICATION - Checking created tables:';
PRINT '============================================';

SELECT 
    t.name AS TableName,
    p.rows AS RowCount,
    'Created Successfully' AS Status
FROM sys.tables t
INNER JOIN sys.partitions p ON t.object_id = p.object_id
WHERE p.index_id <= 1
    AND t.name IN ('LegalRegister', 'LegalRegisterAttachments', 'UserNavigationPreferences')
ORDER BY t.name;

PRINT '';
PRINT 'Migration script completed!';
PRINT '============================================';

-- =====================================================
-- 5. Data Migration Helper Scripts
-- =====================================================
/*
-- TO MIGRATE DATA FROM YOUR LOCAL DATABASE:
-- Run these queries in your LOCAL database to generate INSERT scripts

-- For LegalRegister table:
SELECT 'INSERT INTO [dbo].[LegalRegister] ([Name], [Link], [LatestUpdate], [RiskLevel], [ComplianceStatus], [Notes], [IndustryName], [LegislationType], [CreatedDate], [ModifiedDate], [CreatedBy], [ModifiedBy]) VALUES (' +
    '''' + REPLACE([Name], '''', '''''') + ''', ' +
    ISNULL('''' + REPLACE([Link], '''', '''''') + '''', 'NULL') + ', ' +
    ISNULL('''' + CONVERT(VARCHAR, [LatestUpdate], 120) + '''', 'NULL') + ', ' +
    ISNULL('''' + [RiskLevel] + '''', 'NULL') + ', ' +
    ISNULL('''' + [ComplianceStatus] + '''', 'NULL') + ', ' +
    ISNULL('''' + REPLACE(CAST([Notes] AS NVARCHAR(MAX)), '''', '''''') + '''', 'NULL') + ', ' +
    ISNULL('''' + [IndustryName] + '''', 'NULL') + ', ' +
    ISNULL('''' + [LegislationType] + '''', 'NULL') + ', ' +
    ISNULL('''' + CONVERT(VARCHAR, [CreatedDate], 120) + '''', 'NULL') + ', ' +
    ISNULL('''' + CONVERT(VARCHAR, [ModifiedDate], 120) + '''', 'NULL') + ', ' +
    ISNULL('''' + [CreatedBy] + '''', 'NULL') + ', ' +
    ISNULL('''' + [ModifiedBy] + '''', 'NULL') + ');'
FROM [dbo].[LegalRegister];

-- For UserNavigationPreferences table:
SELECT 'INSERT INTO [dbo].[UserNavigationPreferences] ([UserID], [NavigationPreferences], [CreatedDate], [UpdatedDate]) VALUES (' +
    CAST([UserID] AS VARCHAR) + ', ' +
    '''' + REPLACE(CAST([NavigationPreferences] AS NVARCHAR(MAX)), '''', '''''') + ''', ' +
    ISNULL('''' + CONVERT(VARCHAR, [CreatedDate], 120) + '''', 'NULL') + ', ' +
    ISNULL('''' + CONVERT(VARCHAR, [UpdatedDate], 120) + '''', 'NULL') + ');'
FROM [dbo].[UserNavigationPreferences];

-- Note: For LegalRegisterAttachments with FileData, you may need to use SSMS Import/Export wizard
-- or use a different approach for binary data migration
*/