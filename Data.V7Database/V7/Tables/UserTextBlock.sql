CREATE TABLE [V7].[UserTextBlock] (
    [UserTextBlockID]      INT      IDENTITY (1, 1) NOT NULL,
    [TextBlockID]          INT      NOT NULL,
    [UserID]               INT      NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [TaskID]               INT      NULL,
    PRIMARY KEY CLUSTERED ([UserTextBlockID] ASC),
    CONSTRAINT [FK_UserTextBlock_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserTextBlock_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserTextBlock_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserTextBlock_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_UserTextBlock_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID]),
    CONSTRAINT [FK_UserTextBlock_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserTextBlock_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

