/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[IncidentCategoryType].
-- Generated for critical Category table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[IncidentCategoryType]'

-- Set date format to ensure text dates are parsed correctly
SET DATEFORMAT ymd
SET NOCOUNT ON

-- Safety mechanism for production
DECLARE @DeleteMissingRecords BIT
SET @DeleteMissingRecords = 0

-- 1: Define table variable with exact schema
DECLARE @tblTempTable TABLE (
[IncidentCategoryTypeID] int,
[UserAreaID] int,
[Title] nvarchar(100),
[Reference] nvarchar(50),
[Description] nvarchar(500),
[ColorCode] nvarchar(50),
[Icon] nvarchar(50),
[DisplayOrder] int,
[IsActive] bit,
[CreatedByUserID] int,
[CreatedDate] datetimeoffset,
[ModifiedByUserID] int,
[ModifiedDate] datetimeoffset,
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset
)

-- 2: Insert static data values
INSERT INTO @tblTempTable ([IncidentCategoryTypeID], [UserAreaID], [Reference], [Title], [Description], [ColorCode], [Icon], [DisplayOrder], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 'SAFETY', 'Safety', 'Safety-related incidents and near misses', 'bg-red-100 text-red-600', 'shield', 1, 1, 1, '2025-09-17 00:00:00.000', NULL, NULL, NULL, NULL),
    (2, NULL, 'HR', 'HR', 'Human resources and personnel incidents', 'bg-blue-100 text-blue-600', 'users', 2, 1, 1, '2025-09-17 00:00:00.000', NULL, NULL, NULL, NULL),
    (3, NULL, 'CYBER', 'Cyber', 'Cybersecurity and data protection incidents', 'bg-purple-100 text-purple-600', 'shield-lock', 3, 1, 1, '2025-09-17 00:00:00.000', NULL, NULL, NULL, NULL),
    (4, NULL, 'WHISTLEBLOWING', 'Whistleblowing', 'Whistleblowing and ethics concerns', 'bg-orange-100 text-orange-600', 'megaphone', 4, 1, 1, '2025-09-17 00:00:00.000', NULL, NULL, NULL, NULL)

-- 3: Upsert logic with identity management
SET IDENTITY_INSERT [V7].[IncidentCategoryType] ON
INSERT INTO [V7].[IncidentCategoryType] ([IncidentCategoryTypeID], [UserAreaID], [Reference], [Title], [Description], [ColorCode], [Icon], [DisplayOrder], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[IncidentCategoryTypeID], tmp.[UserAreaID], tmp.[Reference], tmp.[Title], tmp.[Description], tmp.[ColorCode], tmp.[Icon], tmp.[DisplayOrder], tmp.[IsActive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[IncidentCategoryType] tbl ON tbl.[IncidentCategoryTypeID] = tmp.[IncidentCategoryTypeID]
WHERE tbl.[IncidentCategoryTypeID] IS NULL
SET IDENTITY_INSERT [V7].[IncidentCategoryType] OFF

-- 4: Update existing records
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[ColorCode] = tmp.[ColorCode],
LiveTable.[Icon] = tmp.[Icon],
LiveTable.[DisplayOrder] = tmp.[DisplayOrder],
LiveTable.[IsActive] = tmp.[IsActive]
-- Note: Don't update audit fields on static data sync
FROM [V7].[IncidentCategoryType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[IncidentCategoryTypeID] = tmp.[IncidentCategoryTypeID]

-- 5: Optional deletion (disabled by default for safety)
IF @DeleteMissingRecords = 1
BEGIN
    DELETE FROM [V7].[IncidentCategoryType] FROM [V7].[IncidentCategoryType] LiveTable
    LEFT JOIN @tblTempTable tmp ON LiveTable.[IncidentCategoryTypeID] = tmp.[IncidentCategoryTypeID]
    WHERE tmp.[IncidentCategoryTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[IncidentCategoryType]'

GO