/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[SeverityType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[SeverityType]'

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
DBCC CHECKIDENT('[V7].[SeverityType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[SeverityTypeID] int,
[Reference] nvarchar(20),
[UserAreaID] int,
[CreatedByUserID] int,
[CreatedDate] datetimeoffset(7),
[ModifiedByUserID] int,
[ModifiedDate] datetimeoffset(7),
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset(7),
[TaskSeverityID] int,
[Title] nvarchar(100)
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([SeverityTypeID], [Reference], [UserAreaID], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate], [TaskSeverityID], [Title])
VALUES
    (1, 'LOW', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, NULL, 'Low'),
    (2, 'MEDIUM', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, NULL, 'Medium'),
    (3, 'HIGH', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, NULL, 'High'),
    (4, 'CRITICAL', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, NULL, 'Critical')

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[SeverityType] ([SeverityTypeID], [Reference], [UserAreaID], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate], [TaskSeverityID], [Title])
SELECT tmp.[SeverityTypeID], tmp.[Reference], tmp.[UserAreaID], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate], tmp.[TaskSeverityID], tmp.[Title]
FROM @tblTempTable tmp
LEFT JOIN [V7].[SeverityType] tbl ON tbl.[SeverityTypeID] = tmp.[SeverityTypeID]
WHERE tbl.[SeverityTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate],
LiveTable.[TaskSeverityID] = tmp.[TaskSeverityID],
LiveTable.[Title] = tmp.[Title]
FROM [V7].[SeverityType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[SeverityTypeID] = tmp.[SeverityTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[SeverityType] FROM [V7].[SeverityType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[SeverityTypeID] = tmp.[SeverityTypeID]
	WHERE tmp.[SeverityTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[SeverityType]'

GO