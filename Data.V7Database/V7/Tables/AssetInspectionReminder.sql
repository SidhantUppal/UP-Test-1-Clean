CREATE TABLE [V7].[AssetInspectionReminder] (
    [AssetInspectionReminderID]         INT            IDENTITY (1, 1) NOT NULL,
    [AssetInspectionCategoryID]         INT            NOT NULL,
    [AssetID]                           INT            NOT NULL,
    [UserAreaID]                        INT            NOT NULL,
    [UserAreaDivisionID]                INT            NULL,
    [AssetCategoryInspectionReminderID] INT            NULL,
    [Description]                       NVARCHAR (MAX) NULL,
    [TaskScheduleID]                    INT            NOT NULL,
    [CreatedByUserID]                   INT            NOT NULL,
    [CreatedDate]                       DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT            NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                  INT            NULL,
    [ArchivedDate]                      DATETIMEOFFSET (7) NULL,
    [AssetInspectionTypeID]             INT            NULL,
    [ChecklistID]                       INT            NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionReminderID] ASC)
);

