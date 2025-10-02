/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[Location].
-- Generated from: Data.V7Database/MockData/create-test-data.sql
-- Date: 2025-09-25

PRINT 'Updating static data table [V7].[Location]'

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
[LocationID] int,
[ParentID] int,
[UserAreaID] int,
[Reference] nvarchar(50),
[Title] nvarchar(255),
[UPRN] varchar(12),
[IsMain] bit,
[IsReportTopLevel] bit,
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
INSERT INTO @tblTempTable ([LocationID], [ParentID], [UserAreaID], [Reference], [Title], [UPRN], [IsMain], [IsReportTopLevel], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 1, 'HQ-001', 'Head Office', '100001234567', 1, 1, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (2, NULL, 1, 'SITE-001', 'Manufacturing Plant A', '100002345678', 1, 1, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (3, 2, 1, 'PROD-001', 'Production Line 1', '100002345679', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (4, 2, 1, 'PROD-002', 'Production Line 2', '100002345680', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (5, 2, 1, 'WARE-001', 'Warehouse A', '100002345681', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (6, NULL, 1, 'SITE-002', 'Distribution Center', '100003456789', 1, 1, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (7, 6, 1, 'LOAD-001', 'Loading Dock 1', '100003456790', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (8, 6, 1, 'LOAD-002', 'Loading Dock 2', '100003456791', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (9, 1, 1, 'OFFICE-001', 'Reception Area', '100001234568', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (10, 1, 1, 'OFFICE-002', 'Conference Room A', '100001234569', 0, 0, 1, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (11, NULL, 2, 'DEMO-001', 'Demo Main Site', '200001234567', 1, 1, 2, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL),
    (12, 11, 2, 'DEMO-LAB', 'Demo Laboratory', '200001234568', 0, 0, 2, '2025-09-25 00:00:00.000', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[Location] ON
INSERT INTO [V7].[Location] ([LocationID], [ParentID], [UserAreaID], [Reference], [Title], [UPRN], [IsMain], [IsReportTopLevel], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[LocationID], tmp.[ParentID], tmp.[UserAreaID], tmp.[Reference], tmp.[Title], tmp.[UPRN], tmp.[IsMain], tmp.[IsReportTopLevel], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[Location] tbl ON tbl.[LocationID] = tmp.[LocationID]
WHERE tbl.[LocationID] IS NULL
SET IDENTITY_INSERT [V7].[Location] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[ParentID] = tmp.[ParentID],
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[UPRN] = tmp.[UPRN],
LiveTable.[IsMain] = tmp.[IsMain],
LiveTable.[IsReportTopLevel] = tmp.[IsReportTopLevel],
LiveTable.[CreatedByUserID] = tmp.[CreatedByUserID],
LiveTable.[CreatedDate] = tmp.[CreatedDate],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[Location] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[LocationID] = tmp.[LocationID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[Location] FROM [V7].[Location] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[LocationID] = tmp.[LocationID]
	WHERE tmp.[LocationID] IS NULL
END

PRINT 'Finished updating static data table [V7].[Location]'

GO