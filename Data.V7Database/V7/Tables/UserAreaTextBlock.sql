CREATE TABLE [V7].[UserAreaTextBlock] (
    [UserAreaTextBlockID]  INT      IDENTITY (1, 1) NOT NULL,
    [TextBlockID]          INT      NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaTextBlockID] ASC),
    CONSTRAINT [FK_UserAreaTextBlock_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaTextBlock_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaTextBlock_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserAreaTextBlock_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID]),
    CONSTRAINT [FK_UserAreaTextBlock_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

