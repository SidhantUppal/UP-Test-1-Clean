-- V7 Complete Database Schema
-- Extracted from Azure SQL Database: YOUR_DATABASE_SERVER.database.windows.net
-- Generated from database analysis dated 2025-07-04
-- Total Tables: 38

-- Create V7 schema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'V7')
BEGIN
    EXEC('CREATE SCHEMA [V7]')
    PRINT 'Created schema [V7]'
END
GO

-- =====================================================
-- TABLE DEFINITIONS (38 Tables)
-- =====================================================

-- 1. AnswerType
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AnswerType' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[AnswerType] (
        AnswerTypeID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_AnswerType] PRIMARY KEY CLUSTERED ([AnswerTypeID] ASC)
    )
    PRINT 'Created table [V7].[AnswerType]'
END
GO

-- 2. Attachment
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Attachment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[Attachment] (
        AttachmentID INT IDENTITY(1,1) NOT NULL,
        FileName NVARCHAR(255) NOT NULL,
        FileSize INT NULL,
        ContentType NVARCHAR(100) NULL,
        StorageLocation NVARCHAR(500) NULL,
        CreatedByUserID INT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT [PK_Attachment] PRIMARY KEY CLUSTERED ([AttachmentID] ASC)
    )
    PRINT 'Created table [V7].[Attachment]'
END
GO

-- 3. AttachmentUserArea (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AttachmentUserArea' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[AttachmentUserArea] (
        AttachmentUserAreaID INT IDENTITY(1,1) NOT NULL,
        AttachmentID INT NOT NULL,
        UserAreaID INT NOT NULL,
        CONSTRAINT [PK_AttachmentUserArea] PRIMARY KEY CLUSTERED ([AttachmentUserAreaID] ASC)
    )
    PRINT 'Created table [V7].[AttachmentUserArea]'
END
GO

-- 4. AuditLog
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AuditLog' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[AuditLog] (
        AuditLogID INT IDENTITY(1,1) NOT NULL,
        UserID INT NULL,
        UserAreaID INT NULL,
        Action NVARCHAR(100) NOT NULL,
        EntityType NVARCHAR(100) NULL,
        EntityID INT NULL,
        OldValues NVARCHAR(MAX) NULL,
        NewValues NVARCHAR(MAX) NULL,
        IPAddress NVARCHAR(45) NULL,
        UserAgent NVARCHAR(500) NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT [PK_AuditLog] PRIMARY KEY CLUSTERED ([AuditLogID] ASC)
    )
    PRINT 'Created table [V7].[AuditLog]'
END
GO

-- 5. CategoryType
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CategoryType' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[CategoryType] (
        CategoryTypeID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_CategoryType] PRIMARY KEY CLUSTERED ([CategoryTypeID] ASC)
    )
    PRINT 'Created table [V7].[CategoryType]'
END
GO

-- 6. ChecklistTemplate
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ChecklistTemplate' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[ChecklistTemplate] (
        ChecklistTemplateID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        CategoryTypeID INT NULL,
        FrequencyTypeID INT NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_ChecklistTemplate] PRIMARY KEY CLUSTERED ([ChecklistTemplateID] ASC)
    )
    PRINT 'Created table [V7].[ChecklistTemplate]'
END
GO

-- 7. ChecklistTemplateAssignment
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ChecklistTemplateAssignment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[ChecklistTemplateAssignment] (
        ChecklistTemplateAssignmentID INT IDENTITY(1,1) NOT NULL,
        ChecklistTemplateID INT NOT NULL,
        AssignedToUserID INT NOT NULL,
        AssignedByUserID INT NOT NULL,
        AssignedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        DueDate DATETIMEOFFSET NULL,
        CompletedDate DATETIMEOFFSET NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',
        CONSTRAINT [PK_ChecklistTemplateAssignment] PRIMARY KEY CLUSTERED ([ChecklistTemplateAssignmentID] ASC)
    )
    PRINT 'Created table [V7].[ChecklistTemplateAssignment]'
END
GO

-- 8. ChecklistTemplateCategory
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ChecklistTemplateCategory' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[ChecklistTemplateCategory] (
        ChecklistTemplateCategoryID INT IDENTITY(1,1) NOT NULL,
        ChecklistTemplateID INT NOT NULL,
        CategoryTypeID INT NOT NULL,
        CONSTRAINT [PK_ChecklistTemplateCategory] PRIMARY KEY CLUSTERED ([ChecklistTemplateCategoryID] ASC)
    )
    PRINT 'Created table [V7].[ChecklistTemplateCategory]'
END
GO

-- 9. ChecklistTemplateEnrolment
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ChecklistTemplateEnrolment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[ChecklistTemplateEnrolment] (
        ChecklistTemplateEnrolmentID INT IDENTITY(1,1) NOT NULL,
        ChecklistTemplateID INT NOT NULL,
        EmployeeID INT NOT NULL,
        EnrolledDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        EnrolledByUserID INT NOT NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CONSTRAINT [PK_ChecklistTemplateEnrolment] PRIMARY KEY CLUSTERED ([ChecklistTemplateEnrolmentID] ASC)
    )
    PRINT 'Created table [V7].[ChecklistTemplateEnrolment]'
END
GO

-- 10. Employee
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Employee' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[Employee] (
        EmployeeID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        UserID INT NULL,
        EmployeeNumber NVARCHAR(50) NULL,
        FirstName NVARCHAR(100) NOT NULL,
        LastName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(255) NULL,
        Phone NVARCHAR(50) NULL,
        JobTitle NVARCHAR(100) NULL,
        Department NVARCHAR(100) NULL,
        StartDate DATE NULL,
        EndDate DATE NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([EmployeeID] ASC)
    )
    PRINT 'Created table [V7].[Employee]'
END
GO

-- 11. FrequencyType
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FrequencyType' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[FrequencyType] (
        FrequencyTypeID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        DaysInterval INT NULL,
        Description NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_FrequencyType] PRIMARY KEY CLUSTERED ([FrequencyTypeID] ASC)
    )
    PRINT 'Created table [V7].[FrequencyType]'
END
GO

-- 12. Location
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Location' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[Location] (
        LocationID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        ParentLocationID INT NULL,
        Name NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NULL,
        Address NVARCHAR(500) NULL,
        City NVARCHAR(100) NULL,
        State NVARCHAR(100) NULL,
        PostalCode NVARCHAR(20) NULL,
        Country NVARCHAR(100) NULL,
        Latitude DECIMAL(10,8) NULL,
        Longitude DECIMAL(11,8) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED ([LocationID] ASC)
    )
    PRINT 'Created table [V7].[Location]'
END
GO

-- 13. LocationEmployee
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LocationEmployee' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[LocationEmployee] (
        LocationEmployeeID INT IDENTITY(1,1) NOT NULL,
        LocationID INT NOT NULL,
        EmployeeID INT NOT NULL,
        IsPrimary BIT NOT NULL DEFAULT 0,
        StartDate DATE NULL,
        EndDate DATE NULL,
        CONSTRAINT [PK_LocationEmployee] PRIMARY KEY CLUSTERED ([LocationEmployeeID] ASC)
    )
    PRINT 'Created table [V7].[LocationEmployee]'
END
GO

-- 14. OrgGroup
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OrgGroup' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[OrgGroup] (
        OrgGroupID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        ParentOrgGroupID INT NULL,
        Name NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NULL,
        Description NVARCHAR(MAX) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_OrgGroup] PRIMARY KEY CLUSTERED ([OrgGroupID] ASC)
    )
    PRINT 'Created table [V7].[OrgGroup]'
END
GO

-- 15. OrgGroupEmployee
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OrgGroupEmployee' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[OrgGroupEmployee] (
        OrgGroupEmployeeID INT IDENTITY(1,1) NOT NULL,
        OrgGroupID INT NOT NULL,
        EmployeeID INT NOT NULL,
        Role NVARCHAR(100) NULL,
        StartDate DATE NULL,
        EndDate DATE NULL,
        CONSTRAINT [PK_OrgGroupEmployee] PRIMARY KEY CLUSTERED ([OrgGroupEmployeeID] ASC)
    )
    PRINT 'Created table [V7].[OrgGroupEmployee]'
END
GO

-- 16. SystemPermission (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SystemPermission' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[SystemPermission] (
        PermissionID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(200) NOT NULL,
        DisplayName NVARCHAR(510) NOT NULL,
        Layer NVARCHAR(40) NULL,
        Module NVARCHAR(100) NOT NULL,
        Description NVARCHAR(1000) NULL,
        CONSTRAINT [PK_SystemPermission] PRIMARY KEY CLUSTERED ([PermissionID] ASC)
    )
    PRINT 'Created table [V7].[SystemPermission]'
END
GO

-- 17. SystemRole (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SystemRole' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[SystemRole] (
        RoleID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(200) NOT NULL,
        DisplayName NVARCHAR(510) NOT NULL,
        Category NVARCHAR(100) NOT NULL,
        IsSystemRole BIT NOT NULL,
        CONSTRAINT [PK_SystemRole] PRIMARY KEY CLUSTERED ([RoleID] ASC)
    )
    PRINT 'Created table [V7].[SystemRole]'
END
GO

-- 18. SystemRolePermission (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SystemRolePermission' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[SystemRolePermission] (
        SystemRoleID INT IDENTITY(1,1) NOT NULL,
        PermissionID INT NOT NULL,
        CONSTRAINT [PK_SystemRolePermission] PRIMARY KEY CLUSTERED ([SystemRoleID] ASC)
    )
    PRINT 'Created table [V7].[SystemRolePermission]'
END
GO

-- 19. Task
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Task' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[Task] (
        TaskID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        TaskTypeID INT NULL,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Priority NVARCHAR(20) NOT NULL DEFAULT 'Medium',
        Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',
        AssignedToUserID INT NULL,
        DueDate DATETIMEOFFSET NULL,
        CompletedDate DATETIMEOFFSET NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([TaskID] ASC)
    )
    PRINT 'Created table [V7].[Task]'
END
GO

-- 20. TaskAssignment
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TaskAssignment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TaskAssignment] (
        TaskAssignmentID INT IDENTITY(1,1) NOT NULL,
        TaskID INT NOT NULL,
        AssignedToUserID INT NOT NULL,
        AssignedByUserID INT NOT NULL,
        AssignedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        Status NVARCHAR(50) NOT NULL DEFAULT 'Assigned',
        CompletedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_TaskAssignment] PRIMARY KEY CLUSTERED ([TaskAssignmentID] ASC)
    )
    PRINT 'Created table [V7].[TaskAssignment]'
END
GO

-- 21. TaskSchedule
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TaskSchedule' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TaskSchedule] (
        TaskScheduleID INT IDENTITY(1,1) NOT NULL,
        TaskTypeID INT NOT NULL,
        FrequencyTypeID INT NOT NULL,
        UserAreaID INT NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        StartDate DATE NOT NULL,
        EndDate DATE NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_TaskSchedule] PRIMARY KEY CLUSTERED ([TaskScheduleID] ASC)
    )
    PRINT 'Created table [V7].[TaskSchedule]'
END
GO

-- 22. TaskScheduleAssignment
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TaskScheduleAssignment' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TaskScheduleAssignment] (
        TaskScheduleAssignmentID INT IDENTITY(1,1) NOT NULL,
        TaskScheduleID INT NOT NULL,
        AssignedToUserID INT NOT NULL,
        CONSTRAINT [PK_TaskScheduleAssignment] PRIMARY KEY CLUSTERED ([TaskScheduleAssignmentID] ASC)
    )
    PRINT 'Created table [V7].[TaskScheduleAssignment]'
END
GO

-- 23. TaskType
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TaskType' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TaskType] (
        TaskTypeID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        CategoryTypeID INT NULL,
        Description NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_TaskType] PRIMARY KEY CLUSTERED ([TaskTypeID] ASC)
    )
    PRINT 'Created table [V7].[TaskType]'
END
GO

-- 24. TaskTypeUserArea (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TaskTypeUserArea' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TaskTypeUserArea] (
        TaskTypeUserAreaID INT IDENTITY(1,1) NOT NULL,
        TaskTypeID INT NOT NULL,
        UserAreaID INT NOT NULL,
        CONSTRAINT [PK_TaskTypeUserArea] PRIMARY KEY CLUSTERED ([TaskTypeUserAreaID] ASC)
    )
    PRINT 'Created table [V7].[TaskTypeUserArea]'
END
GO

-- 25. Tenant
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tenant' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[Tenant] (
        TenantID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(MAX) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        CONSTRAINT [PK_Tenant] PRIMARY KEY CLUSTERED ([TenantID] ASC)
    )
    PRINT 'Created table [V7].[Tenant]'
END
GO

-- 26. TenantRole (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TenantRole' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TenantRole] (
        TenantRoleID INT IDENTITY(1,1) NOT NULL,
        TenantID INT NOT NULL,
        Name NVARCHAR(200) NOT NULL,
        DisplayName NVARCHAR(510) NOT NULL,
        ParentSystemRoleID INT NULL,
        IsCustomRole BIT NOT NULL,
        CONSTRAINT [PK_TenantRole] PRIMARY KEY CLUSTERED ([TenantRoleID] ASC)
    )
    PRINT 'Created table [V7].[TenantRole]'
END
GO

-- 27. TenantRolePermission (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TenantRolePermission' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[TenantRolePermission] (
        TenantRolePermissionID INT IDENTITY(1,1) NOT NULL,
        TenantID INT NOT NULL,
        PermissionID INT NOT NULL,
        IsGranted BIT NOT NULL,
        CONSTRAINT [PK_TenantRolePermission] PRIMARY KEY CLUSTERED ([TenantRolePermissionID] ASC)
    )
    PRINT 'Created table [V7].[TenantRolePermission]'
END
GO

-- 28. ThemeType
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ThemeType' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[ThemeType] (
        ThemeTypeID INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        PrimaryColor NVARCHAR(7) NULL,
        SecondaryColor NVARCHAR(7) NULL,
        LogoUrl NVARCHAR(500) NULL,
        CssOverrides NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_ThemeType] PRIMARY KEY CLUSTERED ([ThemeTypeID] ASC)
    )
    PRINT 'Created table [V7].[ThemeType]'
END
GO

-- 29. User (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='User' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[User] (
        UserID INT IDENTITY(1,1) NOT NULL,
        GUID UNIQUEIDENTIFIER NOT NULL,
        MasterUserAreaID INT NULL,
        FullName NVARCHAR(510) NOT NULL,
        Email NVARCHAR(510) NULL,
        IsMobileAppUser BIT NOT NULL,
        HasReadDisclaimer BIT NOT NULL,
        IsLocked BIT NOT NULL,
        LockedMessage NVARCHAR(510) NULL,
        LastLoginDate DATETIMEOFFSET NULL,
        CreatedByUserID INT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        AzureADObjectId NVARCHAR(510) NULL,
        CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([UserID] ASC)
    )
    PRINT 'Created table [V7].[User]'
END
GO

-- 30. UserArea (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserArea' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserArea] (
        UserAreaID INT IDENTITY(1,1) NOT NULL,
        ThemeTypeID INT NOT NULL,
        GUID UNIQUEIDENTIFIER NOT NULL,
        Title NVARCHAR(510) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Prefix NVARCHAR(20) NULL,
        IsDemo BIT NOT NULL,
        ExpiryDate DATE NULL,
        BaseURL NVARCHAR(510) NULL,
        SSOLoginURL NVARCHAR(510) NULL,
        MobileIdentityAPIInstanceID INT NULL,
        UploadedFileMBLimit INT NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserArea] PRIMARY KEY CLUSTERED ([UserAreaID] ASC)
    )
    PRINT 'Created table [V7].[UserArea]'
END
GO

-- 31. UserAreaContractor (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserAreaContractor' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserAreaContractor] (
        UserAreaContractorID INT IDENTITY(1,1) NOT NULL,
        UserAreaID INT NOT NULL,
        ContractorUserAreaID INT NOT NULL,
        IsActive BIT NOT NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserAreaContractor] PRIMARY KEY CLUSTERED ([UserAreaContractorID] ASC)
    )
    PRINT 'Created table [V7].[UserAreaContractor]'
END
GO

-- 32. UserAreaForm (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserAreaForm' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserAreaForm] (
        UserAreaFormID INT IDENTITY(1,1) NOT NULL,
        OriginalUserAreaFormID INT NULL,
        Version TINYINT NOT NULL,
        Status NVARCHAR(40) NOT NULL,
        UserAreaID INT NULL,
        Reference NVARCHAR(100) NULL,
        Title NVARCHAR(510) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        IsEnabledForWeb BIT NOT NULL,
        IsEnabledForApp BIT NOT NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserAreaForm] PRIMARY KEY CLUSTERED ([UserAreaFormID] ASC)
    )
    PRINT 'Created table [V7].[UserAreaForm]'
END
GO

-- 33. UserAreaFormQuestion (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserAreaFormQuestion' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserAreaFormQuestion] (
        UserAreaFormQuestionID INT IDENTITY(1,1) NOT NULL,
        OriginalUserAreaFormQuestionID INT NULL,
        UserAreaFormSectionID INT NOT NULL,
        AnswerTypeID INT NOT NULL,
        Title NVARCHAR(510) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        ConfigData NVARCHAR(MAX) NULL,
        ParentIDAnswerValues NVARCHAR(MAX) NULL,
        AnswerTypeOptionsTable NVARCHAR(100) NULL,
        AnswerTypeOptionsList NVARCHAR(MAX) NULL,
        OrderNum TINYINT NOT NULL,
        Weighting TINYINT NULL,
        MaxScore TINYINT NULL,
        IsMandatory BIT NOT NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserAreaFormQuestion] PRIMARY KEY CLUSTERED ([UserAreaFormQuestionID] ASC)
    )
    PRINT 'Created table [V7].[UserAreaFormQuestion]'
END
GO

-- 34. UserAreaFormQuestionAnswer (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserAreaFormQuestionAnswer' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserAreaFormQuestionAnswer] (
        UserAreaFormQuestionAnswerID INT IDENTITY(1,1) NOT NULL,
        OriginalUserAreaFormQuestionAnswerID INT NULL,
        UserAreaFormQuestionID INT NOT NULL,
        AnswerText NVARCHAR(510) NOT NULL,
        OrderNum TINYINT NOT NULL,
        Weighting TINYINT NULL,
        ScoreValue TINYINT NULL,
        JumpToOriginalUserAreaFormSectionID INT NULL,
        ConfigData NVARCHAR(MAX) NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserAreaFormQuestionAnswer] PRIMARY KEY CLUSTERED ([UserAreaFormQuestionAnswerID] ASC)
    )
    PRINT 'Created table [V7].[UserAreaFormQuestionAnswer]'
END
GO

-- 35. UserAreaFormResponse (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserAreaFormResponse' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserAreaFormResponse] (
        UserAreaFormResponseID INT IDENTITY(1,1) NOT NULL,
        OriginalUserAreaFormResponseID INT NULL,
        Version TINYINT NOT NULL,
        Status NVARCHAR(40) NOT NULL,
        UserAreaFormID INT NOT NULL,
        UserAreaID INT NOT NULL,
        EmployeeID INT NOT NULL,
        LocationID INT NULL,
        OrgGroupID INT NULL,
        Reference NVARCHAR(200) NULL,
        QuestionResponseData NVARCHAR(MAX) NULL,
        AttachmentIDList NVARCHAR(2000) NULL,
        TaskIDList NVARCHAR(2000) NULL,
        SubmissionDate DATETIMEOFFSET NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserAreaFormResponse] PRIMARY KEY CLUSTERED ([UserAreaFormResponseID] ASC)
    )
    PRINT 'Created table [V7].[UserAreaFormResponse]'
END
GO

-- 36. UserAreaFormSection (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserAreaFormSection' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserAreaFormSection] (
        UserAreaFormSectionID INT IDENTITY(1,1) NOT NULL,
        OriginalUserAreaFormSectionID INT NULL,
        UserAreaFormID INT NOT NULL,
        Reference NVARCHAR(100) NULL,
        Title NVARCHAR(510) NOT NULL,
        HelpText NVARCHAR(2000) NULL,
        OrderNum TINYINT NOT NULL,
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL,
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        CONSTRAINT [PK_UserAreaFormSection] PRIMARY KEY CLUSTERED ([UserAreaFormSectionID] ASC)
    )
    PRINT 'Created table [V7].[UserAreaFormSection]'
END
GO

-- 37. UserTenant (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserTenant' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserTenant] (
        UserTenantID INT IDENTITY(1,1) NOT NULL,
        UserID INT NOT NULL,
        TenantID INT NOT NULL,
        Status NVARCHAR(40) NULL,
        CONSTRAINT [PK_UserTenant] PRIMARY KEY CLUSTERED ([UserTenantID] ASC)
    )
    PRINT 'Created table [V7].[UserTenant]'
END
GO

-- 38. UserTenantRole (Full definition from analysis)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserTenantRole' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[UserTenantRole] (
        UserTenantRoleID INT IDENTITY(1,1) NOT NULL,
        UserTenantID INT NOT NULL,
        TenantRoleID INT NOT NULL,
        AssignedAt DATETIMEOFFSET NOT NULL,
        CONSTRAINT [PK_UserTenantRole] PRIMARY KEY CLUSTERED ([UserTenantRoleID] ASC)
    )
    PRINT 'Created table [V7].[UserTenantRole]'
END
GO

-- =====================================================
-- FOREIGN KEY RELATIONSHIPS
-- =====================================================

-- AttachmentUserArea
ALTER TABLE [V7].[AttachmentUserArea] ADD CONSTRAINT [FK_AttachmentUserArea_Attachment] 
    FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment]([AttachmentID])
ALTER TABLE [V7].[AttachmentUserArea] ADD CONSTRAINT [FK_AttachmentUserArea_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])

-- User
ALTER TABLE [V7].[User] ADD CONSTRAINT [FK_User_UserArea] 
    FOREIGN KEY ([MasterUserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])

-- UserArea
ALTER TABLE [V7].[UserArea] ADD CONSTRAINT [FK_UserArea_ThemeType] 
    FOREIGN KEY ([ThemeTypeID]) REFERENCES [V7].[ThemeType]([ThemeTypeID])

-- UserAreaContractor
ALTER TABLE [V7].[UserAreaContractor] ADD CONSTRAINT [FK_UserAreaContractor_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])
ALTER TABLE [V7].[UserAreaContractor] ADD CONSTRAINT [FK_UserAreaContractor_ContractorUserArea] 
    FOREIGN KEY ([ContractorUserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])

-- Tenant Relationships
ALTER TABLE [V7].[TenantRole] ADD CONSTRAINT [FK_TenantRole_Tenant] 
    FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant]([TenantID])
ALTER TABLE [V7].[TenantRole] ADD CONSTRAINT [FK_TenantRole_SystemRole] 
    FOREIGN KEY ([ParentSystemRoleID]) REFERENCES [V7].[SystemRole]([RoleID])

ALTER TABLE [V7].[TenantRolePermission] ADD CONSTRAINT [FK_TenantRolePermission_Tenant] 
    FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant]([TenantID])
ALTER TABLE [V7].[TenantRolePermission] ADD CONSTRAINT [FK_TenantRolePermission_Permission] 
    FOREIGN KEY ([PermissionID]) REFERENCES [V7].[SystemPermission]([PermissionID])

ALTER TABLE [V7].[UserTenant] ADD CONSTRAINT [FK_UserTenant_User] 
    FOREIGN KEY ([UserID]) REFERENCES [V7].[User]([UserID])
ALTER TABLE [V7].[UserTenant] ADD CONSTRAINT [FK_UserTenant_Tenant] 
    FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant]([TenantID])

ALTER TABLE [V7].[UserTenantRole] ADD CONSTRAINT [FK_UserTenantRole_UserTenant] 
    FOREIGN KEY ([UserTenantID]) REFERENCES [V7].[UserTenant]([UserTenantID])
ALTER TABLE [V7].[UserTenantRole] ADD CONSTRAINT [FK_UserTenantRole_TenantRole] 
    FOREIGN KEY ([TenantRoleID]) REFERENCES [V7].[TenantRole]([TenantRoleID])

-- Employee Relationships
ALTER TABLE [V7].[Employee] ADD CONSTRAINT [FK_Employee_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])
ALTER TABLE [V7].[Employee] ADD CONSTRAINT [FK_Employee_User] 
    FOREIGN KEY ([UserID]) REFERENCES [V7].[User]([UserID])

ALTER TABLE [V7].[LocationEmployee] ADD CONSTRAINT [FK_LocationEmployee_Location] 
    FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location]([LocationID])
ALTER TABLE [V7].[LocationEmployee] ADD CONSTRAINT [FK_LocationEmployee_Employee] 
    FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee]([EmployeeID])

ALTER TABLE [V7].[OrgGroupEmployee] ADD CONSTRAINT [FK_OrgGroupEmployee_OrgGroup] 
    FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup]([OrgGroupID])
ALTER TABLE [V7].[OrgGroupEmployee] ADD CONSTRAINT [FK_OrgGroupEmployee_Employee] 
    FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee]([EmployeeID])

-- Task Relationships
ALTER TABLE [V7].[Task] ADD CONSTRAINT [FK_Task_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])
ALTER TABLE [V7].[Task] ADD CONSTRAINT [FK_Task_TaskType] 
    FOREIGN KEY ([TaskTypeID]) REFERENCES [V7].[TaskType]([TaskTypeID])
ALTER TABLE [V7].[Task] ADD CONSTRAINT [FK_Task_AssignedTo] 
    FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User]([UserID])

ALTER TABLE [V7].[TaskTypeUserArea] ADD CONSTRAINT [FK_TaskTypeUserArea_TaskType] 
    FOREIGN KEY ([TaskTypeID]) REFERENCES [V7].[TaskType]([TaskTypeID])
ALTER TABLE [V7].[TaskTypeUserArea] ADD CONSTRAINT [FK_TaskTypeUserArea_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])

-- Form Relationships
ALTER TABLE [V7].[UserAreaForm] ADD CONSTRAINT [FK_UserAreaForm_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])

ALTER TABLE [V7].[UserAreaFormSection] ADD CONSTRAINT [FK_UserAreaFormSection_UserAreaForm] 
    FOREIGN KEY ([UserAreaFormID]) REFERENCES [V7].[UserAreaForm]([UserAreaFormID])

ALTER TABLE [V7].[UserAreaFormQuestion] ADD CONSTRAINT [FK_UserAreaFormQuestion_UserAreaFormSection] 
    FOREIGN KEY ([UserAreaFormSectionID]) REFERENCES [V7].[UserAreaFormSection]([UserAreaFormSectionID])
ALTER TABLE [V7].[UserAreaFormQuestion] ADD CONSTRAINT [FK_UserAreaFormQuestion_AnswerType] 
    FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType]([AnswerTypeID])

ALTER TABLE [V7].[UserAreaFormQuestionAnswer] ADD CONSTRAINT [FK_UserAreaFormQuestionAnswer_UserAreaFormQuestion] 
    FOREIGN KEY ([UserAreaFormQuestionID]) REFERENCES [V7].[UserAreaFormQuestion]([UserAreaFormQuestionID])

ALTER TABLE [V7].[UserAreaFormResponse] ADD CONSTRAINT [FK_UserAreaFormResponse_UserAreaForm] 
    FOREIGN KEY ([UserAreaFormID]) REFERENCES [V7].[UserAreaForm]([UserAreaFormID])
ALTER TABLE [V7].[UserAreaFormResponse] ADD CONSTRAINT [FK_UserAreaFormResponse_UserArea] 
    FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea]([UserAreaID])
ALTER TABLE [V7].[UserAreaFormResponse] ADD CONSTRAINT [FK_UserAreaFormResponse_Employee] 
    FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee]([EmployeeID])

GO

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- UserArea indexes
CREATE NONCLUSTERED INDEX [IX_UserArea_ThemeTypeID] ON [V7].[UserArea]([ThemeTypeID])
CREATE NONCLUSTERED INDEX [IX_UserArea_IsDemo] ON [V7].[UserArea]([IsDemo]) WHERE [ArchivedDate] IS NULL

-- User indexes
CREATE NONCLUSTERED INDEX [IX_User_MasterUserAreaID] ON [V7].[User]([MasterUserAreaID])
CREATE NONCLUSTERED INDEX [IX_User_Email] ON [V7].[User]([Email]) WHERE [Email] IS NOT NULL

-- Employee indexes
CREATE NONCLUSTERED INDEX [IX_Employee_UserAreaID] ON [V7].[Employee]([UserAreaID])
CREATE NONCLUSTERED INDEX [IX_Employee_UserID] ON [V7].[Employee]([UserID]) WHERE [UserID] IS NOT NULL

-- Task indexes
CREATE NONCLUSTERED INDEX [IX_Task_UserAreaID] ON [V7].[Task]([UserAreaID])
CREATE NONCLUSTERED INDEX [IX_Task_Status] ON [V7].[Task]([Status]) INCLUDE ([DueDate])

-- Audit field indexes
CREATE NONCLUSTERED INDEX [IX_UserArea_CreatedDate] ON [V7].[UserArea]([CreatedDate] DESC)
CREATE NONCLUSTERED INDEX [IX_User_CreatedDate] ON [V7].[User]([CreatedDate] DESC)

GO

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert ThemeTypes
SET IDENTITY_INSERT [V7].[ThemeType] ON
INSERT INTO [V7].[ThemeType] (ThemeTypeID, Name, DisplayName, PrimaryColor, SecondaryColor)
VALUES 
    (1, 'blue', 'Blue Theme', '#3B82F6', '#60A5FA'),
    (2, 'green', 'Green Theme', '#10B981', '#34D399'),
    (3, 'orange', 'Orange Theme', '#F97316', '#FB923C')
SET IDENTITY_INSERT [V7].[ThemeType] OFF

-- Insert sample UserArea
SET IDENTITY_INSERT [V7].[UserArea] ON
INSERT INTO [V7].[UserArea] (UserAreaID, ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, CreatedByUserID, CreatedDate)
VALUES 
    (1, 1, 'C6728746-D9CF-4727-99D8-47B59E3E8D25', 'Demo Area', NULL, NULL, 0, 1, '2025-06-26T11:59:57.297Z')
SET IDENTITY_INSERT [V7].[UserArea] OFF

-- Insert sample User
SET IDENTITY_INSERT [V7].[User] ON
INSERT INTO [V7].[User] (UserID, GUID, MasterUserAreaID, FullName, Email, IsMobileAppUser, HasReadDisclaimer, IsLocked, CreatedByUserID, CreatedDate)
VALUES 
    (1, '1DA1BB51-4880-449B-848A-D1CF3A4AFFE7', 1, 'Admin User', NULL, 1, 0, 0, 1, '2025-06-26T11:50:23.249Z')
SET IDENTITY_INSERT [V7].[User] OFF

PRINT 'V7 Complete Database Schema creation completed!'
PRINT 'Total tables created: 38'
PRINT 'Sample data inserted for ThemeType, UserArea, and User tables'