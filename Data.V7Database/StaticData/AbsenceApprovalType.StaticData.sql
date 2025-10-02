/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[AbsenceApprovalType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[AbsenceApprovalType]'

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
DBCC CHECKIDENT('[V7].[AbsenceApprovalType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[AbsenceApprovalTypeID] int,
[UserAreaID] int,
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
INSERT INTO @tblTempTable ([AbsenceApprovalTypeID], [UserAreaID], [Reference], [Title], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 'AUTO', 'Automatic Approval', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, NULL, 'MANAGER', 'Manager Approval Required', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, NULL, 'HR', 'HR Approval Required', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, NULL, 'NONE', 'No Approval Required', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[AbsenceApprovalType] ON
INSERT INTO [V7].[AbsenceApprovalType] ([AbsenceApprovalTypeID], [UserAreaID], [Reference], [Title], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[AbsenceApprovalTypeID], tmp.[UserAreaID], tmp.[Reference], tmp.[Title], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[AbsenceApprovalType] tbl ON tbl.[AbsenceApprovalTypeID] = tmp.[AbsenceApprovalTypeID]
WHERE tbl.[AbsenceApprovalTypeID] IS NULL
SET IDENTITY_INSERT [V7].[AbsenceApprovalType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[AbsenceApprovalType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[AbsenceApprovalTypeID] = tmp.[AbsenceApprovalTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[AbsenceApprovalType] FROM [V7].[AbsenceApprovalType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[AbsenceApprovalTypeID] = tmp.[AbsenceApprovalTypeID]
	WHERE tmp.[AbsenceApprovalTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[AbsenceApprovalType]'

GO