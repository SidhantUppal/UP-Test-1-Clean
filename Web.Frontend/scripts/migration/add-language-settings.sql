-- =============================================
-- Enhanced Multi-Language Support Migration
-- Database: V7-Dev
-- Date: 2025-08-04
-- Description: Adds system settings table and language control features
-- =============================================

USE [V7-Dev];
GO

-- =============================================
-- 1. Create SystemSettings Table
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SystemSettings' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    PRINT 'Creating SystemSettings table...';
    
    CREATE TABLE [V7].[SystemSettings] (
        SettingKey NVARCHAR(100) NOT NULL,
        SettingValue NVARCHAR(MAX) NULL,
        SettingType NVARCHAR(50) NOT NULL, -- 'string', 'boolean', 'integer', 'json'
        Description NVARCHAR(500) NULL,
        IsUserEditable BIT NOT NULL DEFAULT 0,
        ModifiedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
        ModifiedByUserID INT NULL,
        CONSTRAINT [PK_SystemSettings] PRIMARY KEY CLUSTERED ([SettingKey] ASC)
    );
    
    PRINT 'SystemSettings table created successfully.';
END
ELSE
BEGIN
    PRINT 'SystemSettings table already exists.';
END
GO

-- =============================================
-- 2. Insert Default Language Settings
-- =============================================
PRINT 'Inserting default language settings...';

-- Insert only if not exists
IF NOT EXISTS (SELECT 1 FROM [V7].[SystemSettings] WHERE SettingKey = 'DefaultLanguage')
BEGIN
    INSERT INTO [V7].[SystemSettings] (SettingKey, SettingValue, SettingType, Description, IsUserEditable)
    VALUES ('DefaultLanguage', 'en', 'string', 'System-wide default language code', 1);
END

IF NOT EXISTS (SELECT 1 FROM [V7].[SystemSettings] WHERE SettingKey = 'AllowUserLanguageChange')
BEGIN
    INSERT INTO [V7].[SystemSettings] (SettingKey, SettingValue, SettingType, Description, IsUserEditable)
    VALUES ('AllowUserLanguageChange', 'true', 'boolean', 'Allow users to change their language preference', 1);
END

IF NOT EXISTS (SELECT 1 FROM [V7].[SystemSettings] WHERE SettingKey = 'EnforceLanguageByLocation')
BEGIN
    INSERT INTO [V7].[SystemSettings] (SettingKey, SettingValue, SettingType, Description, IsUserEditable)
    VALUES ('EnforceLanguageByLocation', 'false', 'boolean', 'Force location-based language settings', 1);
END

IF NOT EXISTS (SELECT 1 FROM [V7].[SystemSettings] WHERE SettingKey = 'SupportedLanguages')
BEGIN
    INSERT INTO [V7].[SystemSettings] (SettingKey, SettingValue, SettingType, Description, IsUserEditable)
    VALUES ('SupportedLanguages', '["en","es","fr","de","zh","ja"]', 'json', 'List of supported language codes', 1);
END

PRINT 'Default language settings inserted.';
GO

-- =============================================
-- 3. Update User Table - Add Language Permission
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[User]') AND name = 'CanChangeLanguage')
BEGIN
    PRINT 'Adding CanChangeLanguage column to User table...';
    ALTER TABLE [V7].[User] 
    ADD CanChangeLanguage BIT NOT NULL DEFAULT 1;
    PRINT 'CanChangeLanguage column added to User table.';
END
ELSE
BEGIN
    PRINT 'CanChangeLanguage column already exists in User table.';
END
GO

-- Add PreferredLanguage if not exists (from original plan)
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[User]') AND name = 'PreferredLanguage')
BEGIN
    PRINT 'Adding PreferredLanguage column to User table...';
    ALTER TABLE [V7].[User] 
    ADD PreferredLanguage VARCHAR(10) NULL;
    PRINT 'PreferredLanguage column added to User table.';
END
ELSE
BEGIN
    PRINT 'PreferredLanguage column already exists in User table.';
END
GO

-- =============================================
-- 4. Update UserArea Table - Add Language Enforcement
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[UserArea]') AND name = 'EnforceDefaultLanguage')
BEGIN
    PRINT 'Adding EnforceDefaultLanguage column to UserArea table...';
    ALTER TABLE [V7].[UserArea] 
    ADD EnforceDefaultLanguage BIT NOT NULL DEFAULT 0;
    PRINT 'EnforceDefaultLanguage column added to UserArea table.';
END
ELSE
BEGIN
    PRINT 'EnforceDefaultLanguage column already exists in UserArea table.';
END
GO

-- Add DefaultLanguage if not exists (from original plan)
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[UserArea]') AND name = 'DefaultLanguage')
BEGIN
    PRINT 'Adding DefaultLanguage column to UserArea table...';
    ALTER TABLE [V7].[UserArea] 
    ADD DefaultLanguage VARCHAR(10) NULL DEFAULT 'en';
    PRINT 'DefaultLanguage column added to UserArea table.';
END
ELSE
BEGIN
    PRINT 'DefaultLanguage column already exists in UserArea table.';
END
GO

-- =============================================
-- 5. Update Location Table - Add Language Preference
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[Location]') AND name = 'PreferredLanguage')
BEGIN
    PRINT 'Adding PreferredLanguage column to Location table...';
    ALTER TABLE [V7].[Location] 
    ADD PreferredLanguage VARCHAR(10) NULL;
    PRINT 'PreferredLanguage column added to Location table.';
END
ELSE
BEGIN
    PRINT 'PreferredLanguage column already exists in Location table.';
END
GO

-- =============================================
-- 6. Create Translations Table (from original plan)
-- =============================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Translations' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    PRINT 'Creating Translations table for dynamic content...';
    
    CREATE TABLE [V7].[Translations] (
        TranslationID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        EntityType VARCHAR(50) NOT NULL, -- 'ChecklistTemplate', 'Contractor', 'Policy', etc.
        EntityID INT NOT NULL,
        LanguageCode VARCHAR(10) NOT NULL,
        FieldName VARCHAR(100) NOT NULL, -- 'Name', 'Description', etc.
        TranslatedValue NVARCHAR(MAX) NULL,
        IsApproved BIT NOT NULL DEFAULT 0,
        CreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
        CreatedByUserID INT NOT NULL,
        UpdatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET() NOT NULL,
        UpdatedByUserID INT NOT NULL,
        CONSTRAINT [PK_Translations] PRIMARY KEY CLUSTERED ([TranslationID] ASC),
        CONSTRAINT [FK_Translations_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_Translations_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_Translations_UpdatedBy] FOREIGN KEY ([UpdatedByUserID]) REFERENCES [V7].[User]([UserID])
    );
    
    -- Create index for efficient lookups
    CREATE NONCLUSTERED INDEX [IX_Translations_Lookup] 
    ON [V7].[Translations] ([UserAreaID], [EntityType], [EntityID], [LanguageCode], [FieldName]);
    
    PRINT 'Translations table created successfully.';
END
ELSE
BEGIN
    PRINT 'Translations table already exists.';
END
GO

-- =============================================
-- 7. Create Language Permission View
-- =============================================
IF EXISTS (SELECT * FROM sys.views WHERE name = 'UserLanguagePermissions' AND schema_id = SCHEMA_ID('V7'))
BEGIN
    DROP VIEW [V7].[UserLanguagePermissions];
END
GO

CREATE VIEW [V7].[UserLanguagePermissions] AS
SELECT 
    u.UserID,
    u.Username,
    u.PreferredLanguage AS UserPreferredLanguage,
    u.CanChangeLanguage AS UserCanChangeLanguage,
    ua.UserAreaID,
    ua.Name AS UserAreaName,
    ua.DefaultLanguage AS UserAreaDefaultLanguage,
    ua.EnforceDefaultLanguage AS UserAreaEnforceLanguage,
    l.LocationID,
    l.Name AS LocationName,
    l.PreferredLanguage AS LocationPreferredLanguage,
    e.EmployeeID,
    -- Language resolution logic
    CASE 
        -- 1. If UserArea enforces default language
        WHEN ua.EnforceDefaultLanguage = 1 THEN ua.DefaultLanguage
        -- 2. If user cannot change language, use their set preference or tenant default
        WHEN u.CanChangeLanguage = 0 THEN COALESCE(u.PreferredLanguage, ua.DefaultLanguage, 'en')
        -- 3. User preference (if allowed to change)
        WHEN u.PreferredLanguage IS NOT NULL THEN u.PreferredLanguage
        -- 4. Location preference (if user is assigned to location)
        WHEN l.PreferredLanguage IS NOT NULL THEN l.PreferredLanguage
        -- 5. UserArea default
        WHEN ua.DefaultLanguage IS NOT NULL THEN ua.DefaultLanguage
        -- 6. System default
        ELSE 'en'
    END AS ResolvedLanguage,
    -- Explanation of why this language was chosen
    CASE 
        WHEN ua.EnforceDefaultLanguage = 1 THEN 'Enforced by tenant administrator'
        WHEN u.CanChangeLanguage = 0 AND u.PreferredLanguage IS NOT NULL THEN 'User preference (locked)'
        WHEN u.CanChangeLanguage = 0 THEN 'Tenant default (user cannot change)'
        WHEN u.PreferredLanguage IS NOT NULL THEN 'User preference'
        WHEN l.PreferredLanguage IS NOT NULL THEN 'Location default'
        WHEN ua.DefaultLanguage IS NOT NULL THEN 'Tenant default'
        ELSE 'System default'
    END AS LanguageSource
FROM [V7].[User] u
INNER JOIN [V7].[Employee] e ON u.UserID = e.UserID
INNER JOIN [V7].[UserArea] ua ON e.UserAreaID = ua.UserAreaID
LEFT JOIN [V7].[LocationEmployee] le ON e.EmployeeID = le.EmployeeID AND le.IsPrimary = 1
LEFT JOIN [V7].[Location] l ON le.LocationID = l.LocationID;
GO

PRINT 'UserLanguagePermissions view created successfully.';
GO

-- =============================================
-- 8. Create Stored Procedure for Language Resolution
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'GetUserLanguage' AND schema_id = SCHEMA_ID('V7'))
BEGIN
    DROP PROCEDURE [V7].[GetUserLanguage];
END
GO

CREATE PROCEDURE [V7].[GetUserLanguage]
    @UserID INT,
    @ResolvedLanguage VARCHAR(10) OUTPUT,
    @LanguageSource NVARCHAR(100) OUTPUT,
    @CanChange BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT TOP 1
        @ResolvedLanguage = ResolvedLanguage,
        @LanguageSource = LanguageSource,
        @CanChange = CASE 
            WHEN UserAreaEnforceLanguage = 1 THEN 0
            WHEN UserCanChangeLanguage = 0 THEN 0
            ELSE 1
        END
    FROM [V7].[UserLanguagePermissions]
    WHERE UserID = @UserID;
    
    -- If user not found, return system default
    IF @ResolvedLanguage IS NULL
    BEGIN
        SELECT @ResolvedLanguage = SettingValue 
        FROM [V7].[SystemSettings] 
        WHERE SettingKey = 'DefaultLanguage';
        
        SET @ResolvedLanguage = COALESCE(@ResolvedLanguage, 'en');
        SET @LanguageSource = 'System default';
        SET @CanChange = 1;
    END
END
GO

PRINT 'GetUserLanguage stored procedure created successfully.';
GO

-- =============================================
-- 9. Sample Data for Testing
-- =============================================
PRINT 'Migration completed successfully!';
PRINT '';
PRINT 'Language Resolution Hierarchy:';
PRINT '1. Tenant-enforced language (if EnforceDefaultLanguage = true)';
PRINT '2. User preference (if allowed and set)';
PRINT '3. Location preference (if user assigned to location)';
PRINT '4. Tenant default language';
PRINT '5. System default language';
PRINT '6. Fallback to English (en)';
PRINT '';
PRINT 'To test language resolution for a user:';
PRINT 'DECLARE @lang VARCHAR(10), @source NVARCHAR(100), @canChange BIT;';
PRINT 'EXEC [V7].[GetUserLanguage] @UserID = 1, @ResolvedLanguage = @lang OUTPUT, @LanguageSource = @source OUTPUT, @CanChange = @canChange OUTPUT;';
PRINT 'SELECT @lang AS Language, @source AS Source, @canChange AS CanChange;';
GO