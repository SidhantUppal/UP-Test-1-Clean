-- =====================================================
-- Dev_Engine Database Setup with Dependencies
-- Following V7 Database Standards (DB_CONVENTIONS_GUIDE.md)
-- =====================================================

USE [V7-Dev]
GO

-- Create V7 schema if not exists
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'V7')
BEGIN
    EXEC('CREATE SCHEMA V7')
    PRINT 'Created schema V7'
END
GO

-- Create minimal User table if it doesn't exist (dependency for FK constraints)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='User' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[User] (
        UserID INT IDENTITY(1,1) NOT NULL,
        Username NVARCHAR(255) NOT NULL,
        FullName NVARCHAR(255) NOT NULL,
        Email NVARCHAR(255) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([UserID] ASC)
    )
    
    -- Insert system user
    INSERT INTO [V7].[User] (Username, FullName, Email) VALUES ('system', 'System User', 'system@t100.dev')
    
    PRINT 'Created table [V7].[User]'
END
GO

-- Create minimal UserArea table if it doesn't exist (for multi-tenancy)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserArea' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserArea] (
        UserAreaID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT [PK_UserArea] PRIMARY KEY CLUSTERED ([UserAreaID] ASC)
    )
    
    -- Insert default tenant
    INSERT INTO [V7].[UserArea] (Name, Description) VALUES ('Default Tenant', 'Default development tenant')
    
    PRINT 'Created table [V7].[UserArea]'
END
GO

-- Create TenantRole table for permission assignments (optional but useful)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TenantRole' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TenantRole] (
        TenantRoleID INT IDENTITY(1,1) NOT NULL,
        TenantID INT NOT NULL, -- Maps to UserAreaID for simplicity
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT [PK_TenantRole] PRIMARY KEY CLUSTERED ([TenantRoleID] ASC),
        CONSTRAINT [FK_TenantRole_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[UserArea]([UserAreaID])
    )
    
    -- Insert standard roles
    INSERT INTO [V7].[TenantRole] (TenantID, Name, DisplayName, Description) VALUES
    (1, 'SuperAdmin', 'Super Administrator', 'Full system access'),
    (1, 'TenantAdmin', 'Tenant Administrator', 'Tenant-level administration'),
    (1, 'ProjectManager', 'Project Manager', 'Project management permissions'),
    (1, 'SiteManager', 'Site Manager', 'Site-level management'),
    (1, 'QualityInspector', 'Quality Inspector', 'Quality inspection permissions'),
    (1, 'Contractor', 'Contractor', 'Basic contractor permissions'),
    (1, 'DocumentManager', 'Document Manager', 'Document management permissions'),
    (1, 'Viewer', 'Viewer', 'Read-only access')
    
    PRINT 'Created table [V7].[TenantRole] with sample roles'
END
GO

PRINT 'Database dependencies created successfully!'
PRINT 'Ready to run Dev_Engine permission tables script.'