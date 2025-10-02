CREATE TABLE [V7].[HRCaseStatusType] (
    [HRCaseStatusTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [HRTypeID]           INT           NULL,
    [Reference]          NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseStatusTypeID] ASC),
    CONSTRAINT [FK_HRCaseStatusType_HRType] FOREIGN KEY ([HRTypeID]) REFERENCES [V7].[HRType] ([HRTypeID])
,
    CONSTRAINT [FK_HRCaseStatusType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseStatusType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseStatusType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_HRCaseStatusType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


