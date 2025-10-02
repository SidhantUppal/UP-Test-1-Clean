-- =====================================================
-- Dev_Engine Permission Management Tables
-- Following V7 Database Standards (DB_CONVENTIONS_GUIDE.md)
-- Created: 2025-08-06
-- Purpose: Central management of UI elements, permissions, and authority
-- =====================================================

-- Note: Using V7 schema as per DBA standards (not creating separate DevEngine schema)

-- =====================================================
-- 1. PermissionModule Table
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionModule' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionModule] (
        -- Primary Key (Required)
        PermissionModuleID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Business Fields
        ModuleCode NVARCHAR(50) NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        Icon NVARCHAR(100) NULL,
        BaseRoute NVARCHAR(255) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionModule] PRIMARY KEY CLUSTERED ([PermissionModuleID] ASC),
        
        -- Unique Constraint
        CONSTRAINT [UQ_PermissionModule_Code] UNIQUE ([UserAreaID], [ModuleCode]),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionModule_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionModule_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionModule_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionModule_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionModule]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionModule_UserAreaID] 
    ON [V7].[PermissionModule]([UserAreaID])
    WHERE [ArchivedDate] IS NULL

CREATE NONCLUSTERED INDEX [IX_PermissionModule_IsActive] 
    ON [V7].[PermissionModule]([IsActive]) 
    WHERE [ArchivedDate] IS NULL
GO

-- =====================================================
-- 2. PermissionPage Table
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionPage' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionPage] (
        -- Primary Key (Required)
        PermissionPageID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Foreign Keys
        PermissionModuleID INT NOT NULL,
        
        -- Business Fields
        PageCode NVARCHAR(50) NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Route NVARCHAR(500) NOT NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        RequiredPermission NVARCHAR(200) NULL, -- Base permission to view page
        IsActive BIT NOT NULL DEFAULT 1,
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionPage] PRIMARY KEY CLUSTERED ([PermissionPageID] ASC),
        
        -- Unique Constraint
        CONSTRAINT [UQ_PermissionPage_Code] UNIQUE ([UserAreaID], [PermissionModuleID], [PageCode]),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionPage_Module] FOREIGN KEY ([PermissionModuleID]) 
            REFERENCES [V7].[PermissionModule]([PermissionModuleID]),
        CONSTRAINT [FK_PermissionPage_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionPage_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionPage_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionPage_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionPage]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionPage_UserAreaID_ModuleID] 
    ON [V7].[PermissionPage]([UserAreaID], [PermissionModuleID])
    WHERE [ArchivedDate] IS NULL
GO

-- =====================================================
-- 3. PermissionElementType Table (Static Data)
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionElementType' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionElementType] (
        -- Primary Key (NO IDENTITY for static data)
        PermissionElementTypeID INT NOT NULL,
        
        -- Static Data Fields
        Name NVARCHAR(100) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        DisplayOrder INT NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionElementType] PRIMARY KEY CLUSTERED ([PermissionElementTypeID] ASC)
    )
    
    PRINT 'Created table [V7].[PermissionElementType]'
END
GO

-- Insert static element types
IF NOT EXISTS (SELECT * FROM [V7].[PermissionElementType])
BEGIN
    INSERT INTO [V7].[PermissionElementType] (PermissionElementTypeID, Name, DisplayName, DisplayOrder) VALUES
    (1, 'Button', 'Button', 1),
    (2, 'Link', 'Link', 2),
    (3, 'Input', 'Input Field', 3),
    (4, 'Dropdown', 'Dropdown', 4),
    (5, 'Table', 'Table', 5),
    (6, 'Card', 'Card/Container', 6),
    (7, 'Modal', 'Modal Dialog', 7),
    (8, 'Form', 'Form', 8),
    (9, 'Tab', 'Tab', 9),
    (10, 'Menu', 'Menu Item', 10)
    
    PRINT 'Inserted static data for [V7].[PermissionElementType]'
END
GO

-- =====================================================
-- 4. PermissionElement Table
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionElement' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionElement] (
        -- Primary Key (Required)
        PermissionElementID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Foreign Keys
        PermissionPageID INT NOT NULL,
        PermissionElementTypeID INT NOT NULL,
        
        -- Business Fields
        ElementCode NVARCHAR(50) NOT NULL, -- e.g., 'CTR_CREATE_BTN'
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        RequiredPermission NVARCHAR(200) NULL, -- Links to V7.SystemPermission.Name
        
        -- UI Control Fields
        IsR0 BIT NOT NULL DEFAULT 0, -- Base access (visible to all who can see page)
        DisplayMode NVARCHAR(50) NOT NULL DEFAULT 'hidden', -- 'hidden', 'disabled', 'readonly'
        
        -- Implementation Status
        IsImplemented BIT NOT NULL DEFAULT 0,
        ImplementationNotes NVARCHAR(MAX) NULL,
        
        -- Dynamic Element Fields
        IsDynamic BIT NOT NULL DEFAULT 0,
        DynamicSource NVARCHAR(500) NULL, -- e.g., dropdown data source
        
        -- Authority Mapping (NEW for authority management)
        AuthorityType NVARCHAR(50) NULL, -- 'decision', 'exemption', 'assignment', 'delegation'
        AuthorityDisplayName NVARCHAR(500) NULL,
        AuthorityRiskLevel NVARCHAR(20) NULL, -- 'low', 'medium', 'high', 'critical'
        AuthorityMaxDuration INT NULL, -- Days for time-limited authorities
        
        IsActive BIT NOT NULL DEFAULT 1,
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionElement] PRIMARY KEY CLUSTERED ([PermissionElementID] ASC),
        
        -- Unique Constraint
        CONSTRAINT [UQ_PermissionElement_Code] UNIQUE ([UserAreaID], [ElementCode]),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionElement_Page] FOREIGN KEY ([PermissionPageID]) 
            REFERENCES [V7].[PermissionPage]([PermissionPageID]),
        CONSTRAINT [FK_PermissionElement_Type] FOREIGN KEY ([PermissionElementTypeID]) 
            REFERENCES [V7].[PermissionElementType]([PermissionElementTypeID]),
        CONSTRAINT [FK_PermissionElement_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionElement_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionElement_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionElement_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionElement]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionElement_UserAreaID_PageID] 
    ON [V7].[PermissionElement]([UserAreaID], [PermissionPageID])
    WHERE [ArchivedDate] IS NULL

CREATE NONCLUSTERED INDEX [IX_PermissionElement_RequiredPermission] 
    ON [V7].[PermissionElement]([RequiredPermission])
    WHERE [ArchivedDate] IS NULL AND [RequiredPermission] IS NOT NULL
GO

-- =====================================================
-- 5. PermissionElementRole Table (Role-Element Matrix)
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionElementRole' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionElementRole] (
        -- Primary Key (Required)
        PermissionElementRoleID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Foreign Keys
        PermissionElementID INT NOT NULL,
        TenantRoleID INT NOT NULL,
        
        -- Permission Settings
        CanView BIT NOT NULL DEFAULT 0,
        CanEdit BIT NOT NULL DEFAULT 0,
        CanDelete BIT NOT NULL DEFAULT 0,
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionElementRole] PRIMARY KEY CLUSTERED ([PermissionElementRoleID] ASC),
        
        -- Unique Constraint
        CONSTRAINT [UQ_PermissionElementRole] UNIQUE ([UserAreaID], [PermissionElementID], [TenantRoleID]),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionElementRole_Element] FOREIGN KEY ([PermissionElementID]) 
            REFERENCES [V7].[PermissionElement]([PermissionElementID]),
        CONSTRAINT [FK_PermissionElementRole_TenantRole] FOREIGN KEY ([TenantRoleID]) 
            REFERENCES [V7].[TenantRole]([TenantRoleID]),
        CONSTRAINT [FK_PermissionElementRole_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionElementRole_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionElementRole_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionElementRole_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionElementRole]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionElementRole_ElementID] 
    ON [V7].[PermissionElementRole]([PermissionElementID])
    WHERE [ArchivedDate] IS NULL

CREATE NONCLUSTERED INDEX [IX_PermissionElementRole_TenantRoleID] 
    ON [V7].[PermissionElementRole]([TenantRoleID])
    WHERE [ArchivedDate] IS NULL
GO

-- =====================================================
-- 6. PermissionElementApi Table (API Action Mappings)
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionElementApi' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionElementApi] (
        -- Primary Key (Required)
        PermissionElementApiID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Foreign Keys
        PermissionElementID INT NOT NULL,
        
        -- API Details
        ActionType NVARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'custom'
        Method NVARCHAR(10) NOT NULL, -- 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'
        Endpoint NVARCHAR(500) NOT NULL,
        RequiresAuth BIT NOT NULL DEFAULT 1,
        Description NVARCHAR(MAX) NULL,
        
        -- Validation Rules (JSON)
        ValidationRules NVARCHAR(MAX) NULL,
        
        -- Implementation Status
        IsImplemented BIT NOT NULL DEFAULT 0,
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionElementApi] PRIMARY KEY CLUSTERED ([PermissionElementApiID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionElementApi_Element] FOREIGN KEY ([PermissionElementID]) 
            REFERENCES [V7].[PermissionElement]([PermissionElementID]),
        CONSTRAINT [FK_PermissionElementApi_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionElementApi_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionElementApi_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionElementApi_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionElementApi]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionElementApi_ElementID] 
    ON [V7].[PermissionElementApi]([PermissionElementID])
    WHERE [ArchivedDate] IS NULL
GO

-- =====================================================
-- 7. PermissionSyncLog Table (Track syncs to production)
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionSyncLog' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionSyncLog] (
        -- Primary Key (Required)
        PermissionSyncLogID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Sync Details
        SyncType NVARCHAR(50) NOT NULL, -- 'permissions', 'api_generation', 'authority', 'full'
        SyncDirection NVARCHAR(50) NOT NULL, -- 'dev_to_prod', 'prod_to_dev', 'discovery'
        StartedAt DATETIMEOFFSET NOT NULL,
        CompletedAt DATETIMEOFFSET NULL,
        Status NVARCHAR(50) NOT NULL, -- 'in_progress', 'completed', 'failed', 'partial'
        
        -- Statistics
        ItemsProcessed INT NULL,
        ItemsSucceeded INT NULL,
        ItemsFailed INT NULL,
        
        -- Details (JSON)
        SyncDetails NVARCHAR(MAX) NULL, -- JSON with detailed sync information
        ErrorDetails NVARCHAR(MAX) NULL, -- JSON with error information
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionSyncLog] PRIMARY KEY CLUSTERED ([PermissionSyncLogID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionSyncLog_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionSyncLog_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionSyncLog_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionSyncLog_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionSyncLog]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionSyncLog_UserAreaID_Status] 
    ON [V7].[PermissionSyncLog]([UserAreaID], [Status])
    WHERE [ArchivedDate] IS NULL
GO

-- =====================================================
-- 8. PermissionChangeSet Table (Track pending changes)
-- =====================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PermissionChangeSet' AND xtype='U' AND uid=(SELECT uid FROM sysusers WHERE name='V7'))
BEGIN
    CREATE TABLE [V7].[PermissionChangeSet] (
        -- Primary Key (Required)
        PermissionChangeSetID INT IDENTITY(1,1) NOT NULL,
        
        -- Multi-Tenant Isolation (Required for business tables)
        UserAreaID INT NOT NULL,
        
        -- Change Set Details
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Status NVARCHAR(50) NOT NULL, -- 'draft', 'pending_approval', 'approved', 'applied', 'rejected'
        
        -- Approval Workflow
        SubmittedByUserID INT NULL,
        SubmittedDate DATETIMEOFFSET NULL,
        ApprovedByUserID INT NULL,
        ApprovedDate DATETIMEOFFSET NULL,
        AppliedByUserID INT NULL,
        AppliedDate DATETIMEOFFSET NULL,
        
        -- Change Details (JSON)
        Changes NVARCHAR(MAX) NOT NULL, -- JSON array of changes
        
        -- V7 Standard Audit Fields (Required)
        CreatedByUserID INT NOT NULL,
        CreatedDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        ModifiedByUserID INT NULL,
        ModifiedDate DATETIMEOFFSET NULL,
        ArchivedByUserID INT NULL,
        ArchivedDate DATETIMEOFFSET NULL,
        
        -- Primary Key Constraint
        CONSTRAINT [PK_PermissionChangeSet] PRIMARY KEY CLUSTERED ([PermissionChangeSetID] ASC),
        
        -- Foreign Key Constraints
        CONSTRAINT [FK_PermissionChangeSet_UserArea] FOREIGN KEY ([UserAreaID]) 
            REFERENCES [V7].[UserArea]([UserAreaID]),
        CONSTRAINT [FK_PermissionChangeSet_SubmittedBy] FOREIGN KEY ([SubmittedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionChangeSet_ApprovedBy] FOREIGN KEY ([ApprovedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionChangeSet_AppliedBy] FOREIGN KEY ([AppliedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionChangeSet_CreatedBy] FOREIGN KEY ([CreatedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionChangeSet_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) 
            REFERENCES [V7].[User]([UserID]),
        CONSTRAINT [FK_PermissionChangeSet_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) 
            REFERENCES [V7].[User]([UserID])
    )
    
    PRINT 'Created table [V7].[PermissionChangeSet]'
END
GO

-- Performance Indexes
CREATE NONCLUSTERED INDEX [IX_PermissionChangeSet_UserAreaID_Status] 
    ON [V7].[PermissionChangeSet]([UserAreaID], [Status])
    WHERE [ArchivedDate] IS NULL
GO

-- =====================================================
-- Verification Queries
-- =====================================================
PRINT ''
PRINT 'Verifying Dev_Engine tables creation...'
PRINT ''

SELECT 
    'Permission Management Tables' as Category,
    COUNT(*) as TableCount
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'V7' 
AND TABLE_NAME LIKE 'Permission%'

-- List all created tables
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'V7' 
AND TABLE_NAME LIKE 'Permission%'
ORDER BY TABLE_NAME

PRINT ''
PRINT 'Dev_Engine Permission Management tables created successfully!'
PRINT 'Total tables created: 8 (+ 1 static type table)'
PRINT ''
PRINT 'Next steps:'
PRINT '1. Run seed data script (if available)'
PRINT '2. Create backend service at /apps/services/dev-engine-service/'
PRINT '3. Update frontend to use real data'
PRINT '4. Test permission sync functionality'