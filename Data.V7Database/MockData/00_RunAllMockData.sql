-- Master script to populate database with mock/demo data
-- Run this script to set up all demo data for development and testing

-- WARNING: This script will INSERT data into the database
-- Make sure you're running against a development/test database

PRINT 'Starting Mock Data Population...'
PRINT 'Database: ' + DB_NAME()
PRINT 'Server: ' + @@SERVERNAME
PRINT 'Date: ' + CONVERT(VARCHAR, sysdatetimeoffset(), 120)
PRINT '=================================='

-- Check if we're in the right database
IF DB_NAME() NOT LIKE '%Dev%' AND DB_NAME() NOT LIKE '%Test%' AND DB_NAME() NOT LIKE '%Local%'
BEGIN
    PRINT 'WARNING: This appears to be a production database!'
    PRINT 'Mock data scripts should only be run on development/test databases.'
    PRINT 'Database name: ' + DB_NAME()
    PRINT 'Script execution STOPPED for safety.'
    RETURN
END

BEGIN TRANSACTION MockDataTransaction

BEGIN TRY
    PRINT 'Step 1: Populating User Areas...'
    EXEC('$(SQLCMDPATH)\01_UserAreas.sql')
    
    PRINT 'Step 2: Populating Task Types...'
    EXEC('$(SQLCMDPATH)\02_TaskTypes.sql')
    
    PRINT 'Step 3: Populating Task Severity Levels...'
    EXEC('$(SQLCMDPATH)\03_TaskSeverity.sql')
    
    PRINT 'Step 4: Populating Task Status Types...'
    EXEC('$(SQLCMDPATH)\04_TaskStatusType.sql')
    
    PRINT 'Step 5: Populating Locations...'
    EXEC('$(SQLCMDPATH)\05_Locations.sql')
    
    PRINT 'Step 6: Populating Users...'
    EXEC('$(SQLCMDPATH)\06_Users.sql')
    
    PRINT 'Step 7: Populating Sample Tasks...'
    EXEC('$(SQLCMDPATH)\07_SampleTasks.sql')
    
    COMMIT TRANSACTION MockDataTransaction
    
    PRINT '=================================='
    PRINT 'Mock Data Population COMPLETED Successfully!'
    
    -- Display summary
    SELECT 
        'UserAreas' as TableName, 
        COUNT(*) as RecordCount 
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
    PRINT 'Error Line: ' + CAST(ERROR_LINE() AS VARCHAR)
    PRINT '=================================='
    
    THROW
END CATCH