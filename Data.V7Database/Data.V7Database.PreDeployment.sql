-- =============================================
-- Pre-Deployment Script 
-- =============================================
-- This script is executed before the database schema is updated

PRINT 'Starting Pre-Deployment Script...'

-- Check if HazardCategoryType table exists and log information
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'HazardCategoryType')
BEGIN
    PRINT 'HazardCategoryType table exists.'
    
    -- Show current column structure
    PRINT 'Current columns in HazardCategoryType:'
    DECLARE @columns NVARCHAR(MAX) = ''
    SELECT @columns = @columns + COLUMN_NAME + ' (' + DATA_TYPE + 
        CASE WHEN IS_NULLABLE = 'NO' THEN ' NOT NULL' ELSE ' NULL' END + '), '
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'HazardCategoryType'
    ORDER BY ORDINAL_POSITION
    
    PRINT SUBSTRING(@columns, 1, LEN(@columns) - 1) -- Remove trailing comma
    
    -- Count existing records
    DECLARE @recordCount INT
    SELECT @recordCount = COUNT(*) FROM [V7].[HazardCategoryType]
    PRINT 'Total records in table: ' + CAST(@recordCount AS NVARCHAR(10))
    
    -- Check if Title column exists
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'HazardCategoryType' AND COLUMN_NAME = 'Title')
    BEGIN
        PRINT 'Title column already exists in current table structure.'
    END
    ELSE
    BEGIN
        PRINT 'Title column does not exist - will be added during deployment.'
        PRINT 'This means existing records need default values for the new NOT NULL column.'
    END
END
ELSE
BEGIN
    PRINT 'HazardCategoryType table does not exist - will be created during deployment.'
END

-- Fix duplicate NULL values in User.AzureADObjectId before schema update
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'User')
BEGIN
    PRINT 'User table exists. Checking for duplicate NULL AzureADObjectId values...'
    
    -- Check if AzureADObjectId column exists
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'User' AND COLUMN_NAME = 'AzureADObjectId')
    BEGIN
        PRINT 'AzureADObjectId column exists. Checking for multiple NULL values...'
        
        -- Use dynamic SQL to avoid parsing errors when column doesn't exist
        DECLARE @userSql NVARCHAR(MAX)
        DECLARE @userNullCount INT
        
        -- Check for NULL values using dynamic SQL
        SET @userSql = 'SELECT @count = COUNT(*) FROM [V7].[User] WHERE [AzureADObjectId] IS NULL'
        EXEC sp_executesql @userSql, N'@count INT OUTPUT', @userNullCount OUTPUT
        
        IF @userNullCount > 1
        BEGIN
            PRINT 'Found multiple NULL AzureADObjectId values (' + CAST(@userNullCount AS NVARCHAR(10)) + '). Updating with unique placeholder values...'
            
            -- Update NULL AzureADObjectId with unique placeholder values using dynamic SQL
            SET @userSql = '
            ;WITH NullUsers AS (
                SELECT [UserID], 
                       ROW_NUMBER() OVER (ORDER BY [UserID]) as RowNum
                FROM [V7].[User] 
                WHERE [AzureADObjectId] IS NULL
            )
            UPDATE U
            SET [AzureADObjectId] = ''PLACEHOLDER_'' + CAST(NU.RowNum AS NVARCHAR(10)) + ''_'' + CAST(U.[UserID] AS NVARCHAR(10))
            FROM [V7].[User] U
            INNER JOIN NullUsers NU ON U.[UserID] = NU.[UserID]'
            
            EXEC sp_executesql @userSql
            
            PRINT 'Updated NULL AzureADObjectId values with unique placeholders.'
        END
        ELSE IF @userNullCount = 1
        BEGIN
            PRINT 'Found 1 NULL AzureADObjectId value. Updating with placeholder...'
            
            -- Update single NULL value using dynamic SQL
            SET @userSql = 'UPDATE [V7].[User] SET [AzureADObjectId] = ''PLACEHOLDER_1_'' + CAST([UserID] AS NVARCHAR(10)) WHERE [AzureADObjectId] IS NULL'
            EXEC sp_executesql @userSql
            
            PRINT 'Updated NULL AzureADObjectId value with placeholder.'
        END
        ELSE
        BEGIN
            PRINT 'No NULL AzureADObjectId values found.'
        END
    END
    ELSE
    BEGIN
        PRINT 'AzureADObjectId column does not exist in current User table structure.'
    END
END
ELSE
BEGIN
    PRINT 'User table does not exist.'
END

-- Check UserArea table for ThemeTypeID column
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'UserArea')
BEGIN
    PRINT 'UserArea table exists. Checking for ThemeTypeID column...'
    
    -- Check if ThemeTypeID column exists
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'V7' AND TABLE_NAME = 'UserArea' AND COLUMN_NAME = 'ThemeTypeID')
    BEGIN
        PRINT 'ThemeTypeID column already exists in current UserArea table structure.'
    END
    ELSE
    BEGIN
        PRINT 'ThemeTypeID column does not exist - will be added during deployment with default value.'
        
        -- Count existing records
        DECLARE @userAreaRecordCount INT
        SELECT @userAreaRecordCount = COUNT(*) FROM [V7].[UserArea]
        PRINT 'Total UserArea records that will receive default ThemeTypeID: ' + CAST(@userAreaRecordCount AS NVARCHAR(10))
    END
END
ELSE
BEGIN
    PRINT 'UserArea table does not exist.'
END

-- Note: Audit field updates will be handled by post-deployment script
-- since columns don't exist yet in existing database
PRINT 'Pre-deployment audit field check: Audit columns will be added during schema deployment'

PRINT 'Pre-Deployment Script completed successfully.'