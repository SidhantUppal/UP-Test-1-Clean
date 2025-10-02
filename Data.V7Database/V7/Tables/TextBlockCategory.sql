CREATE TABLE [V7].[TextBlockCategory] (
    [TextBlockCategoryID]       INT           IDENTITY (1, 1) NOT NULL,
    [TextBlockCategoryTypeID]   INT           NOT NULL,
    [TextBlockTypeID]           INT           NULL,
    [ParentTextBlockCategoryID] INT           NULL,
    [Reference]                 NVARCHAR (50) NULL,
    [UserAreaID]                INT           NULL,
    [CreatedByUserID]           INT           NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]      INT           NULL,
    [ArchivedByUserID]          INT           NULL,
    [Title] NVARCHAR (255) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__TextBloc__D157A5B4876A1CC0] PRIMARY KEY CLUSTERED ([TextBlockCategoryID] ASC),
    CONSTRAINT [FK_TextBlockCategory_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockCategory_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockCategory_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TextBlockCategory_TextBlockCategory] FOREIGN KEY ([ParentTextBlockCategoryID]) REFERENCES [V7].[TextBlockCategory] ([TextBlockCategoryID]),
    CONSTRAINT [FK_TextBlockCategory_TextBlockCategoryType] FOREIGN KEY ([TextBlockCategoryTypeID]) REFERENCES [V7].[TextBlockCategoryType] ([TextBlockCategoryTypeID]),
    CONSTRAINT [FK_TextBlockCategory_TextBlockType] FOREIGN KEY ([TextBlockTypeID]) REFERENCES [V7].[TextBlockType] ([TextBlockTypeID]),
    CONSTRAINT [FK_TextBlockCategory_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

