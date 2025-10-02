CREATE TABLE [V7].[SafeSystemOfWorkType] (
    [SafeSystemOfWorkTypeID] INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [Reference]              NVARCHAR (20) NULL,
    [TextBlockTypeID]        INT           NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkTypeID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkType_TextBlockType] FOREIGN KEY ([TextBlockTypeID]) REFERENCES [V7].[TextBlockType] ([TextBlockTypeID])
,
    CONSTRAINT [FK_SafeSystemOfWorkType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SafeSystemOfWorkType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


