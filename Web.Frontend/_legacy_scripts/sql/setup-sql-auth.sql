-- Enable SQL Server and Windows Authentication mode
-- NOTE: This requires SQL Server restart after running
-- You may need to do this manually in SSMS

-- Create a SQL login for the application
USE master;
GO

-- Drop the login if it exists
IF EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'v7_app')
    DROP LOGIN v7_app;
GO

-- Create new login
CREATE LOGIN v7_app WITH PASSWORD = 'V7App@2024!', CHECK_POLICY = OFF;
GO

-- Grant access to V7-Dev database
USE [V7-Dev];
GO

-- Drop user if exists
IF EXISTS (SELECT * FROM sys.database_principals WHERE name = 'v7_app')
    DROP USER v7_app;
GO

-- Create user for the login
CREATE USER v7_app FOR LOGIN v7_app;
GO

-- Grant permissions
ALTER ROLE db_datareader ADD MEMBER v7_app;
ALTER ROLE db_datawriter ADD MEMBER v7_app;
ALTER ROLE db_ddladmin ADD MEMBER v7_app;
GO

-- Test the permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.LegalRegister TO v7_app;
GO

PRINT 'SQL Authentication setup complete!';
PRINT 'Login: v7_app';
PRINT 'Password: V7App@2024!';
PRINT '';
PRINT 'NOTE: You may need to:';
PRINT '1. Enable SQL Server Authentication in SQL Server properties';
PRINT '2. Restart SQL Server service';
GO