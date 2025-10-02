/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[AbsenceDurationType].
-- Generated automatically
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[AbsenceDurationType]'

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
DBCC CHECKIDENT('[V7].[AbsenceDurationType]', RESEED, 10000) WITH NO_INFOMSGS
-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[AbsenceDurationTypeID] int,
[UserAreaID] int,
[IsConfigurable] bit,
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

INSERT INTO @tblTempTable ([AbsenceDurationTypeID], [UserAreaID], [IsConfigurable], [Reference], [Title], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 1, 'FULL_DAY', 'Full Day', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, NULL, 1, 'HALF_DAY', 'Half Day', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, NULL, 0, 'HOURLY', 'Hourly', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[AbsenceDurationType] ON
INSERT INTO [V7].[AbsenceDurationType] ([AbsenceDurationTypeID], [UserAreaID], [IsConfigurable], [Reference], [Title], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[AbsenceDurationTypeID], tmp.[UserAreaID], tmp.[IsConfigurable], tmp.[Reference], tmp.[Title], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[AbsenceDurationType] tbl ON tbl.[AbsenceDurationTypeID] = tmp.[AbsenceDurationTypeID]
WHERE tbl.[AbsenceDurationTypeID] IS NULL
SET IDENTITY_INSERT [V7].[AbsenceDurationType] OFF
-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[IsConfigurable] = tmp.[IsConfigurable],
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[AbsenceDurationType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[AbsenceDurationTypeID] = tmp.[AbsenceDurationTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[AbsenceDurationType] FROM [V7].[AbsenceDurationType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[AbsenceDurationTypeID] = tmp.[AbsenceDurationTypeID]
	WHERE tmp.[AbsenceDurationTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[AbsenceDurationType]'

GO
