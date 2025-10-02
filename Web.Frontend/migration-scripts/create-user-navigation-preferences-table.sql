-- =====================================================
-- Create User Navigation Preferences Table in Azure V7-Dev Database
-- =====================================================

-- Create the table if it doesn't exist
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
    
    PRINT 'Table dbo.UserNavigationPreferences created successfully.';
END
ELSE
BEGIN
    PRINT 'Table dbo.UserNavigationPreferences already exists.';
END
GO

-- Add unique constraint on UserID to ensure one preference set per user
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_UserNavigationPreferences_UserID_Unique' AND object_id = OBJECT_ID('dbo.UserNavigationPreferences'))
BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UserID_Unique] 
    ON [dbo].[UserNavigationPreferences] ([UserID] ASC);
    
    PRINT 'Unique index on UserID created successfully.';
END
GO

-- Add index for faster lookups
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_UserNavigationPreferences_UpdatedDate' AND object_id = OBJECT_ID('dbo.UserNavigationPreferences'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UpdatedDate] 
    ON [dbo].[UserNavigationPreferences] ([UpdatedDate] DESC);
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
        AND tc.TABLE_NAME = 'UserNavigationPreferences'
) pk ON c.COLUMN_NAME = pk.COLUMN_NAME
WHERE c.TABLE_NAME = 'UserNavigationPreferences'
ORDER BY c.ORDINAL_POSITION;