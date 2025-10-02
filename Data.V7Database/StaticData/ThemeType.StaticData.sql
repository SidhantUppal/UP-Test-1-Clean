/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[ThemeType].
-- Date: 2025-09-10

PRINT 'Updating static data table [V7].[ThemeType]'

-- Set date format to ensure text dates are parsed correctly
SET DATEFORMAT ymd

-- Turn off affected rows being returned
SET NOCOUNT ON

-- Change this to 1 to delete missing records in the target
-- WARNING: Setting this to 1 can cause damage to your database
-- and cause failed deployment if there are any rows referencing
-- a record which has been deleted.
DECLARE @DeleteMissingRecords BIT
SET @DeleteMissingRecords = 0

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[ThemeTypeID] int,
[Title] nvarchar(255),
[Description] nvarchar(max),
[CustomCultureRegionString] nvarchar(255),
[CssFolderRelativePath] nvarchar(max),
[ImagesFolderRelativePath] nvarchar(max),
[IsLive] bit
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([ThemeTypeID], [Title], [Description], [CustomCultureRegionString], [CssFolderRelativePath], [ImagesFolderRelativePath], [IsLive]) 
VALUES 
    (1, 'Default Theme', 'Default system theme for all user areas', NULL, NULL, NULL, 1)

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[ThemeType] ([ThemeTypeID], [Title], [Description], [CustomCultureRegionString], [CssFolderRelativePath], [ImagesFolderRelativePath], [IsLive])
SELECT tmp.[ThemeTypeID], tmp.[Title], tmp.[Description], tmp.[CustomCultureRegionString], tmp.[CssFolderRelativePath], tmp.[ImagesFolderRelativePath], tmp.[IsLive]
FROM @tblTempTable tmp
LEFT JOIN [V7].[ThemeType] tbl ON tbl.[ThemeTypeID] = tmp.[ThemeTypeID]
WHERE tbl.[ThemeTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[CustomCultureRegionString] = tmp.[CustomCultureRegionString],
LiveTable.[CssFolderRelativePath] = tmp.[CssFolderRelativePath],
LiveTable.[ImagesFolderRelativePath] = tmp.[ImagesFolderRelativePath],
LiveTable.[IsLive] = tmp.[IsLive]
FROM [V7].[ThemeType] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[ThemeTypeID] = tmp.[ThemeTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[ThemeType] FROM [V7].[ThemeType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[ThemeTypeID] = tmp.[ThemeTypeID]
	WHERE tmp.[ThemeTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[ThemeType]'

GO