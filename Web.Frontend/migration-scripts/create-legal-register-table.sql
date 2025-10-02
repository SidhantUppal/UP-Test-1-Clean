-- =====================================================
-- Create Legal Register Table in Azure V7-Dev Database
-- =====================================================

-- Create the table if it doesn't exist
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
    
    PRINT 'Table dbo.LegalRegister created successfully.';
END
ELSE
BEGIN
    PRINT 'Table dbo.LegalRegister already exists.';
END
GO

-- Add any useful indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegister_Name' AND object_id = OBJECT_ID('dbo.LegalRegister'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_LegalRegister_Name] 
    ON [dbo].[LegalRegister] ([Name] ASC);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegister_IndustryName' AND object_id = OBJECT_ID('dbo.LegalRegister'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_LegalRegister_IndustryName] 
    ON [dbo].[LegalRegister] ([IndustryName] ASC);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegister_ComplianceStatus' AND object_id = OBJECT_ID('dbo.LegalRegister'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_LegalRegister_ComplianceStatus] 
    ON [dbo].[LegalRegister] ([ComplianceStatus] ASC);
END
GO

-- Script to check if table was created successfully
SELECT 
    c.COLUMN_NAME,
    c.DATA_TYPE,
    c.CHARACTER_MAXIMUM_LENGTH,
    c.IS_NULLABLE,
    CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_PRIMARY_KEY
FROM INFORMATION_SCHEMA.COLUMNS c
LEFT JOIN (
    SELECT ku.COLUMN_NAME
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
        ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
    WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
        AND tc.TABLE_NAME = 'LegalRegister'
) pk ON c.COLUMN_NAME = pk.COLUMN_NAME
WHERE c.TABLE_NAME = 'LegalRegister'
ORDER BY c.ORDINAL_POSITION;