-- Create UserNavigationPreferences table in V7-Dev database
USE [V7-Dev];
GO

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.UserNavigationPreferences', 'U') IS NOT NULL
    DROP TABLE dbo.UserNavigationPreferences;
GO

-- Create the UserNavigationPreferences table
CREATE TABLE dbo.UserNavigationPreferences (
    UserNavigationPreferencesID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    NavigationPreferences NVARCHAR(MAX) NOT NULL, -- JSON string containing preferences
    CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    UpdatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    CONSTRAINT UQ_UserNavigationPreferences_UserID UNIQUE (UserID)
);
GO

-- Create index for better performance
CREATE INDEX IX_UserNavigationPreferences_UserID 
ON dbo.UserNavigationPreferences(UserID);
GO

-- Grant permissions to v7_app user
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.UserNavigationPreferences TO v7_app;
GO

-- Insert default preferences for user ID 1
INSERT INTO dbo.UserNavigationPreferences (UserID, NavigationPreferences)
VALUES (1, '{"primaryItems":[],"maxPrimaryItems":8,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');
GO

PRINT 'UserNavigationPreferences table created successfully!';

-- Check the table structure
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    CHARACTER_MAXIMUM_LENGTH, 
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'UserNavigationPreferences'
ORDER BY ORDINAL_POSITION;
GO

-- Verify the sample data
SELECT * FROM dbo.UserNavigationPreferences;
GO