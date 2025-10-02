CREATE TABLE [V7].[TribunalCaseSeverityType] (
    [TribunalCaseSeverityTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [Reference]                  NVARCHAR (50) NULL,
    [Title] NVARCHAR (255) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TribunalCaseSeverityTypeID] ASC)
,
    CONSTRAINT [FK_TribunalCaseSeverityType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseSeverityType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseSeverityType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TribunalCaseSeverityType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


