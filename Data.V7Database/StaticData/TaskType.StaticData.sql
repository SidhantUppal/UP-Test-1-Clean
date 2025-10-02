/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[TaskType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[TaskType]'

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

-- Set IDENTITY seed to 10000 to allow for client-specific entries starting from 10000+
DBCC CHECKIDENT('[V7].[TaskType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[TaskTypeID] int,
[UserAreaID] int,
[Title] nvarchar(50),
[IsSystemGenerated] bit,
[IsUserAbleToCreate] bit,
[IsLive] bit,
[CreatedByUserID] int,
[CreatedDate] datetimeoffset(7),
[ModifiedByUserID] int,
[ModifiedDate] datetimeoffset(7),
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset(7)
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([TaskTypeID], [UserAreaID], [Title], [IsSystemGenerated], [IsUserAbleToCreate], [IsLive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 'Action', 1, 0, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, NULL, 'Review', 1, 0, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, NULL, 'Training', 1, 1, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, NULL, 'Audit', 1, 0, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, NULL, 'Investigation', 1, 0, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (6, NULL, 'Inspection', 1, 1, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (7, NULL, 'Maintenance', 1, 1, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (8, NULL, 'Document Review', 1, 0, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[TaskType] ([TaskTypeID], [UserAreaID], [Title], [IsSystemGenerated], [IsUserAbleToCreate], [IsLive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[TaskTypeID], tmp.[UserAreaID], tmp.[Title], tmp.[IsSystemGenerated], tmp.[IsUserAbleToCreate], tmp.[IsLive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[TaskType] tbl ON tbl.[TaskTypeID] = tmp.[TaskTypeID]
WHERE tbl.[TaskTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Title] = tmp.[Title],
LiveTable.[IsSystemGenerated] = tmp.[IsSystemGenerated],
LiveTable.[IsUserAbleToCreate] = tmp.[IsUserAbleToCreate],
LiveTable.[IsLive] = tmp.[IsLive],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[TaskType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[TaskTypeID] = tmp.[TaskTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[TaskType] FROM [V7].[TaskType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[TaskTypeID] = tmp.[TaskTypeID]
	WHERE tmp.[TaskTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[TaskType]'

GO