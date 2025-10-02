-- ===================================================================
-- T100 Risk Management V7 - Test Data Creation Script
-- ===================================================================
-- This script creates minimal test data required for CRUD operations
-- Run this script to enable the Api.Tasks test endpoints
-- ===================================================================

USE [Portal-V7]
GO

-- Check if test data already exists
IF EXISTS (SELECT 1 FROM V7.UserArea WHERE Title = 'Test User Area')
BEGIN
    PRINT '⚠️  Test data already exists. Skipping creation.'
    PRINT '💡 To recreate test data, run the cleanup script first.'
END
ELSE
BEGIN
    PRINT '🚀 Creating test data for T100 Risk Management V7...'
    
    -- Start transaction to ensure atomicity
    BEGIN TRANSACTION CreateTestData
    
    BEGIN TRY
    
    -- ===================================================================
    -- 1. GET EXISTING USER FOR FOREIGN KEY REFERENCES
    -- ===================================================================
    DECLARE @ExistingUserID INT = (SELECT TOP 1 UserID FROM V7.[User] WHERE ArchivedDate IS NULL)
    
    IF @ExistingUserID IS NULL
    BEGIN
        PRINT '⚠️  No existing users found. Using special bootstrap approach...'
        
        -- Get default timezone or create one if none exist
        DECLARE @DefaultTimeZoneID INT = (SELECT TOP 1 TimeZoneID FROM V7.BSSTimeZone)
        
        IF @DefaultTimeZoneID IS NULL
        BEGIN
            PRINT '⚠️  No timezones found. Creating default UTC timezone...'
            
            -- Check if BSSTimeZone table exists and create minimal timezone
            IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'BSSTimeZone')
            BEGIN
                -- Get the actual columns of BSSTimeZone table
                DECLARE @ColumnList NVARCHAR(MAX) = ''
                SELECT @ColumnList = @ColumnList + COLUMN_NAME + ', '
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'BSSTimeZone'
                ORDER BY ORDINAL_POSITION
                
                PRINT '📋 BSSTimeZone columns found: ' + LEFT(@ColumnList, LEN(@ColumnList)-1)
                
                -- Insert timezone with all the columns we found
                INSERT INTO V7.BSSTimeZone (
                    TimeZoneID,
                    Code,
                    Name,
                    UTCOffsetHours,
                    DateFormat
                ) VALUES (
                    1,
                    'UTC',           -- Code
                    'UTC',           -- Name  
                    0,               -- UTCOffsetHours (UTC = 0 offset)
                    'dd/MM/yyyy'     -- DateFormat (common format)
                )
                
                SET @DefaultTimeZoneID = 1
                PRINT '✅ Created minimal UTC timezone with ID: 1'
            END
            ELSE
            BEGIN
                PRINT '⚠️  BSSTimeZone table not found. Will skip TimeZone reference.'
                SET @DefaultTimeZoneID = NULL
            END
        END
        ELSE
        BEGIN
            PRINT '📋 Using existing TimeZone ID: ' + CAST(@DefaultTimeZoneID AS VARCHAR(10))
        END
        
        -- Use IDENTITY_INSERT to create bootstrap user with ID 1
        SET IDENTITY_INSERT V7.[User] ON
        
        -- Insert bootstrap user with conditional TimeZoneID
        IF @DefaultTimeZoneID IS NOT NULL
        BEGIN
            INSERT INTO V7.[User] (
                UserID, -- Explicitly set to 1 for bootstrap
                UserSalt,
                Username,
                Password, 
                FullName,
                Email,
                IsLocked,
                IsPasswordChangeRequired,
                IsAbleToDeleteAccidentCases,
                CreatedDate,
                CreatedByUserID,
                ModifiedDate,
                ModifiedByUserID,
                TimeZoneID,
                GUID
            ) VALUES (
                1, -- Bootstrap user ID
                'BOOTSTRAP1', 
                'bootstrap',
                'BOOTSTRAP123!',
                'Bootstrap User',
                'bootstrap@test.local',
                0,
                0,
                1,
                GETUTCDATE(),
                1, -- Self-reference
                GETUTCDATE(), 
                1, -- Self-reference
                @DefaultTimeZoneID,
                NEWID()
            )
        END
        ELSE
        BEGIN
            -- Insert without TimeZoneID if not available
            INSERT INTO V7.[User] (
                UserID, -- Explicitly set to 1 for bootstrap
                UserSalt,
                Username,
                Password, 
                FullName,
                Email,
                IsLocked,
                IsPasswordChangeRequired,
                IsAbleToDeleteAccidentCases,
                CreatedDate,
                CreatedByUserID,
                ModifiedDate,
                ModifiedByUserID,
                GUID
            ) VALUES (
                1, -- Bootstrap user ID
                'BOOTSTRAP1', 
                'bootstrap',
                'BOOTSTRAP123!',
                'Bootstrap User',
                'bootstrap@test.local',
                0,
                0,
                1,
                GETUTCDATE(),
                1, -- Self-reference
                GETUTCDATE(), 
                1, -- Self-reference
                NEWID()
            )
        END
        
        SET IDENTITY_INSERT V7.[User] OFF
        SET @ExistingUserID = 1
        PRINT '✅ Created Bootstrap User with ID: 1'
    END
    ELSE
    BEGIN
        PRINT '📋 Using existing User ID ' + CAST(@ExistingUserID AS VARCHAR(10)) + ' for foreign key references'
    END

    -- ===================================================================
    -- 2. CREATE TEST USER AREA
    -- ===================================================================
    PRINT '📁 Creating Test User Area...'
    
    INSERT INTO V7.UserArea (
        Title, 
        Description, 
        IsDemo, 
        HasELearning, 
        HasDynamicRAs, 
        HasSystemReports,
        CreatedDate,
        CreatedByUserID,
        ModifiedDate,
        ModifiedByUserID
    ) VALUES (
        'Test User Area',
        'Test user area for API testing and development',
        1, -- IsDemo = true
        1, -- HasELearning = true
        1, -- HasDynamicRAs = true  
        1, -- HasSystemReports = true
        GETUTCDATE(),
        @ExistingUserID,
        GETUTCDATE(),
        @ExistingUserID
    )
    
    DECLARE @TestUserAreaID INT = SCOPE_IDENTITY()
    PRINT '✅ Created Test User Area with ID: ' + CAST(@TestUserAreaID AS VARCHAR(10))
    
    -- ===================================================================
    -- 3. CREATE TEST USER
    -- ===================================================================
    PRINT '👤 Creating Test User...'
    
    -- Use the same timezone as bootstrap user
    DECLARE @TestTimeZoneID INT = @DefaultTimeZoneID -- Reuse from bootstrap creation
    
    -- Insert test user with conditional TimeZoneID
    IF @TestTimeZoneID IS NOT NULL
    BEGIN
        INSERT INTO V7.[User] (
            MasterUserAreaID,
            UserSalt,
            Username,
            Password, 
            FullName,
            Email,
            IsLocked,
            IsPasswordChangeRequired,
            IsAbleToDeleteAccidentCases,
            CreatedDate,
            CreatedByUserID,
            ModifiedDate,
            ModifiedByUserID,
            TimeZoneID,
            GUID
        ) VALUES (
            @TestUserAreaID,
            'TESTSALT01', -- Simple salt for testing
            'testuser',
            'TEST123!', -- Simple password for testing (should be hashed in production)
            'Test User',
            'testuser@test.local',
            0, -- Not locked
            0, -- Password change not required
            1, -- Can delete accident cases
            GETUTCDATE(),
            @ExistingUserID,
            GETUTCDATE(), 
            @ExistingUserID,
            @TestTimeZoneID,
            NEWID() -- Generate unique GUID
        )
    END
    ELSE
    BEGIN
        INSERT INTO V7.[User] (
            MasterUserAreaID,
            UserSalt,
            Username,
            Password, 
            FullName,
            Email,
            IsLocked,
            IsPasswordChangeRequired,
            IsAbleToDeleteAccidentCases,
            CreatedDate,
            CreatedByUserID,
            ModifiedDate,
            ModifiedByUserID,
            GUID
        ) VALUES (
            @TestUserAreaID,
            'TESTSALT01', -- Simple salt for testing
            'testuser',
            'TEST123!', -- Simple password for testing (should be hashed in production)
            'Test User',
            'testuser@test.local',
            0, -- Not locked
            0, -- Password change not required
            1, -- Can delete accident cases
            GETUTCDATE(),
            @ExistingUserID,
            GETUTCDATE(), 
            @ExistingUserID,
            NEWID() -- Generate unique GUID
        )
    END
    
    DECLARE @TestUserID INT = SCOPE_IDENTITY()
    PRINT '✅ Created Test User with ID: ' + CAST(@TestUserID AS VARCHAR(10))
    
    -- Update Test User to self-reference for CreatedBy/ModifiedBy  
    UPDATE V7.[User]
    SET CreatedByUserID = @TestUserID, ModifiedByUserID = @TestUserID
    WHERE UserID = @TestUserID
    
    -- ===================================================================
    -- 4. CREATE TEST TASK TYPE
    -- ===================================================================
    PRINT '📋 Creating Test Task Type...'
    
    INSERT INTO V7.TaskType (
        Title,
        Reference,
        IsSystemGeneratedOnly,
        IsScheduled,
        CreatedDate,
        CreatedByUserID,
        ModifiedDate,
        ModifiedByUserID
    ) VALUES (
        'Test Task Type',
        'TEST',
        0, -- Not system generated only
        0, -- Not scheduled
        GETUTCDATE(),
        @TestUserID,
        GETUTCDATE(),
        @TestUserID
    )
    
    DECLARE @TestTaskTypeID INT = SCOPE_IDENTITY()
    PRINT '✅ Created Test Task Type with ID: ' + CAST(@TestTaskTypeID AS VARCHAR(10))
    
    -- ===================================================================
    -- 5. CREATE TEST TASK STATUS TYPE
    -- ===================================================================
    PRINT '📋 Creating Test Task Status Type...'
    
    INSERT INTO V7.TaskStatusType (
        Reference
    ) VALUES (
        'OPEN'
    )
    
    DECLARE @TestTaskStatusTypeID INT = SCOPE_IDENTITY()
    PRINT '✅ Created Test Task Status Type with ID: ' + CAST(@TestTaskStatusTypeID AS VARCHAR(10))
    
    -- ===================================================================
    -- 6. LINK USER TO USER AREA (if UserUserArea table exists)
    -- ===================================================================
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'UserUserArea')
    BEGIN
        PRINT '🔗 Linking Test User to Test User Area...'
        
        INSERT INTO V7.UserUserArea (
            UserID,
            UserAreaID
        ) VALUES (
            @TestUserID,
            @TestUserAreaID
        )
        
        PRINT '✅ User linked to User Area'
    END
    ELSE
    BEGIN
        PRINT '💡 UserUserArea table not found, skipping user-area linking'
    END
    
    -- ===================================================================
    -- 7. SUMMARY
    -- ===================================================================
    PRINT ''
    PRINT '🎉 Test data creation completed successfully!'
    PRINT '================================================='
    PRINT 'Test User Area ID: ' + CAST(@TestUserAreaID AS VARCHAR(10))
    PRINT 'Test User ID: ' + CAST(@TestUserID AS VARCHAR(10)) 
    PRINT 'Test Task Type ID: ' + CAST(@TestTaskTypeID AS VARCHAR(10))
    PRINT 'Test Task Status Type ID: ' + CAST(@TestTaskStatusTypeID AS VARCHAR(10))
    PRINT '================================================='
    PRINT '✅ You can now run the Api.Tasks CRUD test endpoints'
    PRINT '🚀 POST /api/task/test - Full CRUD cycle test'
    PRINT '🔍 POST /api/task/test-connection - Database connectivity test'
    PRINT ''
    
    -- Commit transaction if everything succeeded
    COMMIT TRANSACTION CreateTestData
    PRINT '✅ Transaction committed successfully'
    
    END TRY
    BEGIN CATCH
        -- Rollback transaction on error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION CreateTestData
            
        DECLARE @ErrorMessage NVARCHAR(4000) = '❌ Test data creation failed: ' + ERROR_MESSAGE()
        DECLARE @ErrorNumber INT = ERROR_NUMBER()
        DECLARE @ErrorLine INT = ERROR_LINE()
        
        PRINT '❌ Error occurred during test data creation:'
        PRINT 'Error Number: ' + CAST(@ErrorNumber AS VARCHAR(10))
        PRINT 'Error Message: ' + ERROR_MESSAGE()
        PRINT 'Error Line: ' + CAST(@ErrorLine AS VARCHAR(10))
        PRINT '🔄 Transaction rolled back'
        
        -- Raise error to indicate failure
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================
PRINT '🔍 Verification - Current test data:'
SELECT 'UserArea' as TableName, UserAreaID as ID, Title as Name FROM V7.UserArea WHERE Title LIKE '%Test%'
UNION ALL
SELECT 'User', UserID, FullName FROM V7.[User] WHERE FullName LIKE '%Test%'  
UNION ALL
SELECT 'TaskType', TaskTypeID, Title FROM V7.TaskType WHERE Title LIKE '%Test%'
UNION ALL
SELECT 'TaskStatusType', TaskStatusTypeID, Reference FROM V7.TaskStatusType WHERE Reference = 'OPEN'