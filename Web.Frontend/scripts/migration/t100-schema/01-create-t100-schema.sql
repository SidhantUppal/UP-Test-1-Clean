-- =============================================
-- T100 Schema Creation Script
-- Purpose: Create T100 schema in V7-Dev database
-- Author: Platform Team
-- Date: 2025-07-29
-- =============================================

-- Create T100 schema if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'T100')
BEGIN
    EXEC('CREATE SCHEMA T100');
    PRINT 'T100 schema created successfully';
END
ELSE
BEGIN
    PRINT 'T100 schema already exists';
END
GO

-- Grant permissions to the application user (adjust as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::T100 TO [YourAppUser];
-- GO

PRINT 'T100 schema setup complete';
GO