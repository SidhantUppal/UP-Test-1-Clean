-- =====================================================
-- Create Legal Register Attachments Table in Azure V7-Dev Database
-- =====================================================

-- Create the table if it doesn't exist
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
    
    PRINT 'Table dbo.LegalRegisterAttachments created successfully.';
END
ELSE
BEGIN
    PRINT 'Table dbo.LegalRegisterAttachments already exists.';
END
GO

-- Add foreign key to LegalRegister table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_LegalRegisterAttachments_LegalRegister')
BEGIN
    ALTER TABLE [dbo].[LegalRegisterAttachments]
    ADD CONSTRAINT [FK_LegalRegisterAttachments_LegalRegister] 
    FOREIGN KEY ([LegalRegisterID]) REFERENCES [dbo].[LegalRegister]([LegalRegisterID])
    ON DELETE CASCADE;
    
    PRINT 'Foreign key FK_LegalRegisterAttachments_LegalRegister created successfully.';
END
GO

-- Add indexes for better performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegisterAttachments_LegalRegisterID' AND object_id = OBJECT_ID('dbo.LegalRegisterAttachments'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_LegalRegisterID] 
    ON [dbo].[LegalRegisterAttachments] ([LegalRegisterID] ASC);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LegalRegisterAttachments_UploadDate' AND object_id = OBJECT_ID('dbo.LegalRegisterAttachments'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_LegalRegisterAttachments_UploadDate] 
    ON [dbo].[LegalRegisterAttachments] ([UploadDate] DESC);
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
        AND tc.TABLE_NAME = 'LegalRegisterAttachments'
) pk ON c.COLUMN_NAME = pk.COLUMN_NAME
WHERE c.TABLE_NAME = 'LegalRegisterAttachments'
ORDER BY c.ORDINAL_POSITION;