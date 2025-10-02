CREATE TABLE [V7].[AssetCategoryInspectionReminder] (
    [AssetCategoryInspectionReminderID] INT            IDENTITY (1, 1) NOT NULL,
    [AssetInspectionCategoryID]         INT            NOT NULL,
    [AssetCategoryID]                   INT            NOT NULL,
    [UserAreaID]                        INT            NOT NULL,
    [UserAreaDivisionID]                INT            NULL,
    [Title]                             NVARCHAR (255) NOT NULL,
    [FrequencyTypeID]                   INT            NOT NULL,
    [FrequencyPeriod]                   INT            NULL,
    [TaskDueAlertPeriodOverride]        INT            NULL,
    [CreatedByUserID]                   INT            NOT NULL,
    [CreatedDate]                       DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT            NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                  INT            NULL,
    [ArchivedDate]                      DATETIMEOFFSET (7) NULL,
    [OLDID]                             INT            NULL,
    [AssetInspectionTypeID]             INT            NULL,
    [ChecklistID]                       INT            NULL,
    PRIMARY KEY CLUSTERED ([AssetCategoryInspectionReminderID] ASC)
);

