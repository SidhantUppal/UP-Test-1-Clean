-- ===================================================================
-- T100 Risk Management V7 - Test Data Cleanup Script  
-- ===================================================================
-- This script removes test data created by create-test-data.sql
-- Use this to clean up test data before recreating or for cleanup
-- ===================================================================

USE [Portal-V7]
GO

PRINT 'Cleaning up test data from T100 Risk Management V7...'

-- Start transaction for atomic cleanup
BEGIN TRANSACTION CleanupTestData

-- ===================================================================
-- 1. GET TEST DATA IDs
-- ===================================================================
DECLARE @TestUserAreaID INT = (SELECT UserAreaID FROM V7.UserArea WHERE Title = 'Test User Area')
DECLARE @TestUserID INT = (SELECT UserID FROM V7.[User] WHERE FullName = 'Test User')
DECLARE @TestTaskTypeID INT = (SELECT TaskTypeID FROM V7.TaskType WHERE Title = 'Test Task Type')
DECLARE @TestTaskStatusTypeID INT = 1 -- Assume test TaskStatusType has ID = 1
DECLARE @BootstrapUserID INT = (SELECT UserID FROM V7.[User] WHERE FullName = 'Bootstrap User')

IF @TestUserAreaID IS NULL AND @TestUserID IS NULL AND @TestTaskTypeID IS NULL AND @TestTaskStatusTypeID IS NULL
BEGIN
    PRINT 'No test data found to clean up.'
END
ELSE
BEGIN
    PRINT 'Found test data to clean:'
    IF @TestUserAreaID IS NOT NULL PRINT '   - Test User Area ID: ' + CAST(@TestUserAreaID AS VARCHAR(10))
    IF @TestUserID IS NOT NULL PRINT '   - Test User ID: ' + CAST(@TestUserID AS VARCHAR(10))
    IF @TestTaskTypeID IS NOT NULL PRINT '   - Test Task Type ID: ' + CAST(@TestTaskTypeID AS VARCHAR(10))
    IF @TestTaskStatusTypeID IS NOT NULL PRINT '   - Test Task Status Type ID: ' + CAST(@TestTaskStatusTypeID AS VARCHAR(10))
    PRINT ''

    -- ===================================================================
    -- 2. CLEAN UP TEST TASKS (if any exist)
    -- ===================================================================
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'BSSTask')
    BEGIN
        DECLARE @TestTaskCount INT
        SELECT @TestTaskCount = COUNT(*) FROM V7.BSSTask 
        WHERE Reference LIKE 'TEST-%' OR Title LIKE 'Test Task%'
        
        IF @TestTaskCount > 0
        BEGIN
            PRINT 'Cleaning up ' + CAST(@TestTaskCount AS VARCHAR(10)) + ' test tasks...'
            DELETE FROM V7.BSSTask WHERE Reference LIKE 'TEST-%' OR Title LIKE 'Test Task%'
            PRINT 'Test tasks cleaned up'
        END
    END

    -- ===================================================================
    -- 3. CLEAN UP USER-USERAREA LINKS
    -- ===================================================================
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'UserUserArea')
       AND @TestUserID IS NOT NULL AND @TestUserAreaID IS NOT NULL
    BEGIN
        PRINT 'Removing user-area links...'
        DELETE FROM V7.UserUserArea 
        WHERE UserID = @TestUserID AND UserAreaID = @TestUserAreaID
        PRINT 'User-area links removed'
    END

    -- ===================================================================
    -- 4. CLEAN UP TEST TASK STATUS TYPE
    -- ===================================================================
    IF @TestTaskStatusTypeID IS NOT NULL
    BEGIN
        PRINT 'Removing Test Task Status Type...'
        DELETE FROM V7.TaskStatusType WHERE TaskStatusTypeID = 1
        PRINT 'Test Task Status Type removed'
    END

    -- ===================================================================
    -- 5. CLEAN UP TEST TASK TYPE
    -- ===================================================================
    IF @TestTaskTypeID IS NOT NULL
    BEGIN
        PRINT 'Removing Test Task Type...'
        DELETE FROM V7.TaskType WHERE TaskTypeID = @TestTaskTypeID
        PRINT 'Test Task Type removed'
    END

    -- ===================================================================
    -- 6. CLEAN UP TEST USER
    -- ===================================================================
    IF @TestUserID IS NOT NULL
    BEGIN
        PRINT 'Removing Test User...'
        DELETE FROM V7.[User] WHERE UserID = @TestUserID
        PRINT 'Test User removed'
    END

    -- ===================================================================
    -- 7. CLEAN UP TEST USER AREA
    -- ===================================================================
    IF @TestUserAreaID IS NOT NULL
    BEGIN
        PRINT 'Removing Test User Area...'
        DELETE FROM V7.UserArea WHERE UserAreaID = @TestUserAreaID
        PRINT 'Test User Area removed'
    END

    PRINT ''
    -- Clean up bootstrap user if no other data depends on it
    IF @BootstrapUserID IS NOT NULL
    BEGIN
        DECLARE @BootstrapDependencies INT = (
            SELECT COUNT(*) FROM V7.UserArea WHERE CreatedByUserID = @BootstrapUserID OR ModifiedByUserID = @BootstrapUserID
        ) + (
            SELECT COUNT(*) FROM V7.TaskType WHERE CreatedByUserID = @BootstrapUserID OR ModifiedByUserID = @BootstrapUserID
        ) + (
            SELECT COUNT(*) FROM V7.[User] WHERE UserID != @BootstrapUserID AND (CreatedByUserID = @BootstrapUserID OR ModifiedByUserID = @BootstrapUserID)
        )
        
        IF @BootstrapDependencies = 0
        BEGIN
            PRINT 'Removing Bootstrap User (no dependencies)...'
            DELETE FROM V7.[User] WHERE UserID = @BootstrapUserID
            PRINT 'Bootstrap User removed'
        END
        ELSE
        BEGIN
            PRINT 'Bootstrap User kept (has ' + CAST(@BootstrapDependencies AS VARCHAR(10)) + ' dependencies)'
        END
    END

    PRINT 'Test data cleanup completed!'
    
    -- Commit transaction if everything succeeded
    COMMIT TRANSACTION CleanupTestData
    PRINT 'Cleanup transaction committed successfully'
END

GO

-- ===================================================================
-- VERIFICATION
-- ===================================================================
PRINT 'Verification - Remaining test data:'
DECLARE @RemainingCount INT = 0

SELECT @RemainingCount = 
    (SELECT COUNT(*) FROM V7.UserArea WHERE Title LIKE '%Test%') +
    (SELECT COUNT(*) FROM V7.[User] WHERE FullName LIKE '%Test%') +
    (SELECT COUNT(*) FROM V7.TaskType WHERE Title LIKE '%Test%') +
    (CASE WHEN EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'TaskStatusType')
          THEN (SELECT COUNT(*) FROM V7.TaskStatusType WHERE TaskStatusTypeID = 1)
          ELSE 0 END)

IF @RemainingCount = 0
BEGIN
    PRINT 'All test data successfully cleaned up'
END
ELSE
BEGIN
    PRINT 'WARNING: ' + CAST(@RemainingCount AS VARCHAR(10)) + ' test records still remain'
END

GO