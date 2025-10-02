CREATE TABLE [V7].[SeverityOfInjuryType] (
    [SeverityOfInjuryTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [Reference]              NVARCHAR (50) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SeverityOfInjuryTypeID] ASC)
,
    CONSTRAINT [FK_SeverityOfInjuryType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SeverityOfInjuryType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SeverityOfInjuryType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SeverityOfInjuryType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


