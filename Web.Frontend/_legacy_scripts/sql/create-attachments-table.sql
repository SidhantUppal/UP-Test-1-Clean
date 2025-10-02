-- Create LegalRegisterAttachments table in V7-Dev database
USE [V7-Dev];
GO

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.LegalRegisterAttachments', 'U') IS NOT NULL
    DROP TABLE dbo.LegalRegisterAttachments;
GO

-- Create the Attachments table
CREATE TABLE dbo.LegalRegisterAttachments (
    AttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    LegalRegisterID INT NOT NULL,
    FileName NVARCHAR(500) NOT NULL,
    FileType NVARCHAR(100),
    FileSize BIGINT,
    FileData VARBINARY(MAX), -- Store file content as binary
    FileUrl NVARCHAR(1000), -- Alternative: store URL if files are stored externally
    UploadDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    UploadedBy NVARCHAR(100),
    CONSTRAINT FK_LegalRegisterAttachments_LegalRegister 
        FOREIGN KEY (LegalRegisterID) 
        REFERENCES LegalRegister(LegalRegisterID) 
        ON DELETE CASCADE
);
GO

-- Create index for better performance
CREATE INDEX IX_LegalRegisterAttachments_LegalRegisterID 
ON dbo.LegalRegisterAttachments(LegalRegisterID);
GO

-- Grant permissions to v7_app user
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.LegalRegisterAttachments TO v7_app;
GO

PRINT 'LegalRegisterAttachments table created successfully!';

-- Check the table structure
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    CHARACTER_MAXIMUM_LENGTH, 
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'LegalRegisterAttachments'
ORDER BY ORDINAL_POSITION;
GO