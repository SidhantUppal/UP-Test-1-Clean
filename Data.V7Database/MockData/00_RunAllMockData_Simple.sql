-- Simple version of mock data population script
-- Contains all INSERT statements in one file for easy execution

-- WARNING: This script will INSERT data into the database
-- Make sure you're running against a development/test database

PRINT 'Starting Mock Data Population...'
PRINT 'Database: ' + DB_NAME()
PRINT '=================================='

BEGIN TRANSACTION MockDataTransaction

BEGIN TRY

-- Step 1: User Areas
PRINT 'Step 1: Populating User Areas...'
SET IDENTITY_INSERT [V7].[UserArea] ON;
INSERT INTO [V7].[UserArea] ([UserAreaID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Safety & Compliance', 'Safety and compliance department', 1, sysdatetimeoffset(), 1),
    (2, 'Operations', 'Operations department', 1, sysdatetimeoffset(), 1),
    (3, 'Maintenance', 'Maintenance department', 1, sysdatetimeoffset(), 1),
    (4, 'HR & Training', 'Human resources and training', 1, sysdatetimeoffset(), 1),
    (5, 'Administration', 'Administrative department', 1, sysdatetimeoffset(), 1);
SET IDENTITY_INSERT [V7].[UserArea] OFF;

-- Step 2: Task Types
PRINT 'Step 2: Populating Task Types...'
SET IDENTITY_INSERT [V7].[TaskType] ON;
INSERT INTO [V7].[TaskType] ([TaskTypeID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Safety Inspection', 'Safety-related inspection tasks', 1, sysdatetimeoffset(), 1),
    (2, 'Permit Approval', 'Work permit approval tasks', 1, sysdatetimeoffset(), 1),
    (3, 'Compliance Check', 'Regulatory compliance tasks', 1, sysdatetimeoffset(), 1),
    (4, 'Document Review', 'Document review tasks', 1, sysdatetimeoffset(), 1),
    (5, 'Contractor Verification', 'Contractor verification tasks', 1, sysdatetimeoffset(), 1),
    (6, 'Process Review', 'Business process review tasks', 1, sysdatetimeoffset(), 1),
    (7, 'Training Assignment', 'Training-related tasks', 1, sysdatetimeoffset(), 1),
    (8, 'System Configuration', 'System setup tasks', 1, sysdatetimeoffset(), 1),
    (9, 'Data Entry', 'Data entry tasks', 1, sysdatetimeoffset(), 1),
    (10, 'Report Generation', 'Report creation tasks', 1, sysdatetimeoffset(), 1),
    (11, 'Audit', 'Audit-related tasks', 1, sysdatetimeoffset(), 1),
    (12, 'Meeting', 'Meeting coordination tasks', 1, sysdatetimeoffset(), 1),
    (13, 'Other', 'General tasks', 1, sysdatetimeoffset(), 1);
SET IDENTITY_INSERT [V7].[TaskType] OFF;

-- Step 3: Task Severity
PRINT 'Step 3: Populating Task Severity Levels...'
SET IDENTITY_INSERT [V7].[TaskSeverity] ON;
INSERT INTO [V7].[TaskSeverity] ([TaskSeverityID], [Name], [Description], [Level], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Low', 'Low priority task', 1, 1, sysdatetimeoffset(), 1),
    (2, 'Medium', 'Medium priority task', 2, 1, sysdatetimeoffset(), 1),
    (3, 'High', 'High priority task', 3, 1, sysdatetimeoffset(), 1),
    (4, 'Critical', 'Critical priority task', 4, 1, sysdatetimeoffset(), 1);
SET IDENTITY_INSERT [V7].[TaskSeverity] OFF;

-- Step 4: Task Status Types
PRINT 'Step 4: Populating Task Status Types...'
SET IDENTITY_INSERT [V7].[TaskStatusType] ON;
INSERT INTO [V7].[TaskStatusType] ([TaskStatusTypeID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'New', 'Newly created task', 1, sysdatetimeoffset(), 1),
    (2, 'In Progress', 'Task is being worked on', 1, sysdatetimeoffset(), 1),
    (3, 'On Hold', 'Task is temporarily paused', 1, sysdatetimeoffset(), 1),
    (4, 'Completed', 'Task has been completed', 1, sysdatetimeoffset(), 1),
    (5, 'Cancelled', 'Task has been cancelled', 1, sysdatetimeoffset(), 1),
    (6, 'Overdue', 'Task is past due date', 1, sysdatetimeoffset(), 1);
SET IDENTITY_INSERT [V7].[TaskStatusType] OFF;

-- Step 5: Locations
PRINT 'Step 5: Populating Locations...'
SET IDENTITY_INSERT [V7].[Location] ON;
INSERT INTO [V7].[Location] ([LocationID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Building A', 'Main office building', 1, sysdatetimeoffset(), 1),
    (2, 'Building B', 'Secondary office building', 1, sysdatetimeoffset(), 1),
    (3, 'Warehouse 1', 'Primary warehouse facility', 1, sysdatetimeoffset(), 1),
    (4, 'Warehouse 2', 'Secondary warehouse facility', 1, sysdatetimeoffset(), 1),
    (5, 'Site Office', 'Remote site office', 1, sysdatetimeoffset(), 1);
SET IDENTITY_INSERT [V7].[Location] OFF;

-- Step 6: Users
PRINT 'Step 6: Populating Users...'
SET IDENTITY_INSERT [V7].[User] ON;
INSERT INTO [V7].[User] ([UserID], [FullName], [Email], [IsActive], [CreatedDate], [UserAreaID])
VALUES
    (1, 'John Smith', 'john.smith@company.com', 1, sysdatetimeoffset(), 1),
    (2, 'Sarah Johnson', 'sarah.johnson@company.com', 1, sysdatetimeoffset(), 1),
    (3, 'Mike Davis', 'mike.davis@company.com', 1, sysdatetimeoffset(), 2),
    (4, 'Lisa Anderson', 'lisa.anderson@company.com', 1, sysdatetimeoffset(), 1),
    (5, 'Tom Wilson', 'tom.wilson@company.com', 1, sysdatetimeoffset(), 3),
    (6, 'Emma Wilson', 'emma.wilson@company.com', 1, sysdatetimeoffset(), 2),
    (7, 'James Martinez', 'james.martinez@company.com', 1, sysdatetimeoffset(), 4),
    (8, 'Michelle Chen', 'michelle.chen@company.com', 1, sysdatetimeoffset(), 1),
    (9, 'David Lee', 'david.lee@company.com', 1, sysdatetimeoffset(), 3),
    (10, 'Robert Brown', 'robert.brown@company.com', 1, sysdatetimeoffset(), 5);
SET IDENTITY_INSERT [V7].[User] OFF;

-- Step 7: Sample Tasks
PRINT 'Step 7: Populating Sample Tasks...'
SET IDENTITY_INSERT [V7].[BSSTask] ON;
INSERT INTO [V7].[BSSTask] (
    [TaskID], [Title], [Description], [Reference], [UserAreaID], [LocationID], 
    [TaskTypeID], [TaskSeverityID], [DueDate], [CreatedByUserID], [CreatedDate], 
    [TaskStatusTypeID], [IsAnonymous], [CanOneEmployeeAccept], [IsEvidenceRequiredToClose],
    [IsCreatorApprovalRequiredToClose], [IsSubmittedForApproval], [HasTravelCost],
    [RelatedDocumentTypeName], [RelatedDocumentTitle]
)
VALUES
    (1001, 'Review Critical Safety Incident Report - Building A',
     'Immediate review required for safety incident that occurred during maintenance work',
     'TSK-2025-1001', 1, 1, 1, 4, DATEADD(day, 3, sysdatetimeoffset()), 2, DATEADD(day, -2, sysdatetimeoffset()), 
     1, 0, 1, 1, 1, 0, 0, 'Safety', 'INC-2025-001'),
     
    (1002, 'Approve Emergency Work Permit - Power Outage',
     'Emergency electrical work permit requires immediate approval',
     'TSK-2025-1002', 2, 2, 2, 4, DATEADD(hour, 4, sysdatetimeoffset()), 3, DATEADD(hour, -2, sysdatetimeoffset()),
     2, 0, 1, 0, 1, 0, 0, 'Permit', 'EWP-2025-001'),
     
    (1003, 'Complete Quarterly Compliance Review',
     'Q1 compliance review for all active contractors - 15 contractors pending',
     'TSK-2025-1003', 1, 1, 3, 2, DATEADD(day, 14, sysdatetimeoffset()), 4, DATEADD(day, -5, sysdatetimeoffset()),
     2, 0, 0, 1, 1, 0, 0, 'Compliance', 'QCR-2025-Q1');
SET IDENTITY_INSERT [V7].[BSSTask] OFF;

    COMMIT TRANSACTION MockDataTransaction
    
    PRINT '=================================='
    PRINT 'Mock Data Population COMPLETED Successfully!'
    
    -- Display summary
    SELECT 'Summary of Populated Data:' as Message
    SELECT 
        'UserAreas' as TableName, COUNT(*) as RecordCount 
    FROM [V7].[UserArea] WHERE [IsActive] = 1
    UNION ALL
    SELECT 'TaskTypes', COUNT(*) FROM [V7].[TaskType] WHERE [IsActive] = 1
    UNION ALL
    SELECT 'TaskSeverities', COUNT(*) FROM [V7].[TaskSeverity] WHERE [IsActive] = 1
    UNION ALL  
    SELECT 'TaskStatusTypes', COUNT(*) FROM [V7].[TaskStatusType] WHERE [IsActive] = 1
    UNION ALL
    SELECT 'Locations', COUNT(*) FROM [V7].[Location] WHERE [IsActive] = 1
    UNION ALL
    SELECT 'Users', COUNT(*) FROM [V7].[User] WHERE [IsActive] = 1
    UNION ALL
    SELECT 'Tasks', COUNT(*) FROM [V7].[BSSTask] WHERE [ArchivedDate] IS NULL
    ORDER BY TableName

END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION MockDataTransaction
    
    PRINT '=================================='
    PRINT 'ERROR: Mock Data Population FAILED!'
    PRINT 'Error Number: ' + CAST(ERROR_NUMBER() AS VARCHAR)
    PRINT 'Error Message: ' + ERROR_MESSAGE()
    PRINT '=================================='
    
    THROW
END CATCH