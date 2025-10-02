/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[AlertType].
-- Generated from: Web.Frontend/ClientApp/src/app/(main)/alerts/page.tsx
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[AlertType]'

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
[AlertTypeID] int,
[UserAreaID] int,
[Reference] nvarchar(50),
[IsForActionPlanOnly] bit,
[Title] nvarchar(100),
[Description] nvarchar(max),
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
INSERT INTO @tblTempTable ([AlertTypeID], [UserAreaID], [Reference], [IsForActionPlanOnly], [Title], [Description], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 'INCIDENT', 0, 'Incident', 'Alert for incidents reported in the system', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, NULL, 'KILL_QUESTION', 0, 'Kill Question', 'Alert for failed kill questions in checklists', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, NULL, 'CRITICAL_CHECKLIST', 0, 'Critical Checklist', 'Alert for critical checklist failures', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, NULL, 'LOTO', 0, 'LOTO', 'Lockout/Tagout procedure alerts', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, NULL, 'PERMIT_EXPIRY', 0, 'Permit Expiry', 'Alert for expiring work permits', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (6, NULL, 'SAFETY_VIOLATION', 0, 'Safety Violation', 'Alert for safety policy violations', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (7, NULL, 'SYSTEM', 0, 'System', 'System-generated alerts and notifications', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (8, NULL, 'COMPLIANCE', 0, 'Compliance', 'Compliance and regulatory alerts', 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[AlertType] ([AlertTypeID], [UserAreaID], [Reference], [IsForActionPlanOnly], [Title], [Description], [CreatedByUserID], [CreatedDate])
SELECT tmp.[AlertTypeID], tmp.[UserAreaID], tmp.[Reference], tmp.[IsForActionPlanOnly], tmp.[Title], tmp.[Description], tmp.[CreatedByUserID], tmp.[CreatedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[AlertType] tbl ON tbl.[AlertTypeID] = tmp.[AlertTypeID]
WHERE tbl.[AlertTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[IsForActionPlanOnly] = tmp.[IsForActionPlanOnly],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[AlertType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[AlertTypeID] = tmp.[AlertTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[AlertType] FROM [V7].[AlertType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[AlertTypeID] = tmp.[AlertTypeID]
	WHERE tmp.[AlertTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[AlertType]'

GO