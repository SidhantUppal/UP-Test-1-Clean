/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[QuestionnaireStaticDataType].
-- Generated from: Web.Frontend/ClientApp/src/data/demo-checklist.ts
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[QuestionnaireStaticDataType]'

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
[QuestionnaireStaticDataTypeID] int,
[Description] varchar(255),
[IsPostBackRequired] bit
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([QuestionnaireStaticDataTypeID], [Description], [IsPostBackRequired]) 
VALUES 
    (1, 'Weather Conditions', 0),
    (2, 'Priority Levels', 0),
    (3, 'Question Types', 0),
    (4, 'Approval Levels', 0),
    (5, 'Competency Types', 0)

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[QuestionnaireStaticDataType] ([QuestionnaireStaticDataTypeID], [Description], [IsPostBackRequired])
SELECT tmp.[QuestionnaireStaticDataTypeID], tmp.[Description], tmp.[IsPostBackRequired]
FROM @tblTempTable tmp
LEFT JOIN [V7].[QuestionnaireStaticDataType] tbl ON tbl.[QuestionnaireStaticDataTypeID] = tmp.[QuestionnaireStaticDataTypeID]
WHERE tbl.[QuestionnaireStaticDataTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsPostBackRequired] = tmp.[IsPostBackRequired]
FROM [V7].[QuestionnaireStaticDataType] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[QuestionnaireStaticDataTypeID] = tmp.[QuestionnaireStaticDataTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[QuestionnaireStaticDataType] FROM [V7].[QuestionnaireStaticDataType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[QuestionnaireStaticDataTypeID] = tmp.[QuestionnaireStaticDataTypeID]
	WHERE tmp.[QuestionnaireStaticDataTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[QuestionnaireStaticDataType]'

GO