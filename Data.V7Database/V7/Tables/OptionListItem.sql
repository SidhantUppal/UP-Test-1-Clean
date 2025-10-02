CREATE TABLE [V7].[OptionListItem] (
    [OptionListItemID]     INT      IDENTITY (1, 1) NOT NULL,
    [OptionListID]         INT      NOT NULL,
    [Value]                INT      NOT NULL,
    [Score]                INT      NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ArchivedByUserID]     INT      NULL,
    [OrderIndex]           INT      DEFAULT ((0)) NULL,
    [AnswerSeverity]       INT      DEFAULT ((0)) NOT NULL,
    [Text] NVARCHAR (1000) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([OptionListItemID] ASC),
    CONSTRAINT [FK_OptionListItem_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OptionListItem_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OptionListItem_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_OptionListItem_OptionList] FOREIGN KEY ([OptionListID]) REFERENCES [V7].[OptionList] ([OptionListID])
);


GO
CREATE NONCLUSTERED INDEX [IX_OptionListItem_OptionListID_ArchivedDate_includes]
    ON [V7].[OptionListItem]([OptionListID] ASC, [ArchivedDate] ASC)
    INCLUDE([OptionListItemID], [Score]);

