/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[TaskStatusType].
-- Generated from: Web.Frontend/ClientApp/src/app/(main)/processes/my/page.tsx, Web.Frontend/ClientApp/src/app/(main)/documents/assigned/page.tsx
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[TaskStatusType]'

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
DBCC CHECKIDENT('[V7].[TaskStatusType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[TaskStatusTypeID] int,
[Reference] nvarchar(50),
[Title] nvarchar(100),
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
INSERT INTO @tblTempTable ([TaskStatusTypeID], [Reference], [Title], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, 'COMPLETED', 'Completed', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, 'IN_PROGRESS', 'In Progress', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, 'PENDING', 'Pending', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, 'OVERDUE', 'Overdue', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, 'CANCELLED', 'Cancelled', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[TaskStatusType] ON
INSERT INTO [V7].[TaskStatusType] ([TaskStatusTypeID], [Reference], [Title], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[TaskStatusTypeID], tmp.[Reference], tmp.[Title], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[TaskStatusType] tbl ON tbl.[TaskStatusTypeID] = tmp.[TaskStatusTypeID]
WHERE tbl.[TaskStatusTypeID] IS NULL
SET IDENTITY_INSERT [V7].[TaskStatusType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[TaskStatusType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[TaskStatusTypeID] = tmp.[TaskStatusTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[TaskStatusType] FROM [V7].[TaskStatusType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[TaskStatusTypeID] = tmp.[TaskStatusTypeID]
	WHERE tmp.[TaskStatusTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[TaskStatusType]'

GO