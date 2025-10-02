/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[BSSTimeZone].
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[BSSTimeZone]'

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
[TimeZoneID] int,
[Code] nvarchar(5),
[Name] nvarchar(50),
[UTCOffsetHours] float,
[DateFormat] varchar(10)
)

-- 2: Populate the table variable with data
INSERT INTO @tblTempTable ([TimeZoneID], [Code], [Name], [UTCOffsetHours], [DateFormat])
VALUES
    (1, 'UTC', 'UTC', 0, 'dd/MM/yyyy'),
    (2, 'GMT', 'Greenwich Mean Time', 0, 'dd/MM/yyyy'),
    (3, 'BST', 'British Summer Time', 1, 'dd/MM/yyyy'),
    (4, 'CET', 'Central European Time', 1, 'dd/MM/yyyy'),
    (5, 'EST', 'Eastern Standard Time', -5, 'MM/dd/yyyy'),
    (6, 'PST', 'Pacific Standard Time', -8, 'MM/dd/yyyy'),
    (7, 'CST', 'Central Standard Time', -6, 'MM/dd/yyyy'),
    (8, 'MST', 'Mountain Standard Time', -7, 'MM/dd/yyyy'),
    (9, 'AEST', 'Australian Eastern Standard Time', 10, 'dd/MM/yyyy'),
    (10, 'JST', 'Japan Standard Time', 9, 'yyyy/MM/dd')

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[BSSTimeZone] ([TimeZoneID], [Code], [Name], [UTCOffsetHours], [DateFormat])
SELECT tmp.[TimeZoneID], tmp.[Code], tmp.[Name], tmp.[UTCOffsetHours], tmp.[DateFormat]
FROM @tblTempTable tmp
LEFT JOIN [V7].[BSSTimeZone] tbl ON tbl.[TimeZoneID] = tmp.[TimeZoneID]
WHERE tbl.[TimeZoneID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Code] = tmp.[Code],
LiveTable.[Name] = tmp.[Name],
LiveTable.[UTCOffsetHours] = tmp.[UTCOffsetHours],
LiveTable.[DateFormat] = tmp.[DateFormat]
FROM [V7].[BSSTimeZone] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[TimeZoneID] = tmp.[TimeZoneID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[BSSTimeZone] FROM [V7].[BSSTimeZone] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[TimeZoneID] = tmp.[TimeZoneID]
	WHERE tmp.[TimeZoneID] IS NULL
END

PRINT 'Finished updating static data table [V7].[BSSTimeZone]'

GO