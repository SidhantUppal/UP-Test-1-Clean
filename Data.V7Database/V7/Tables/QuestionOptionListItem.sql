CREATE TABLE [V7].[QuestionOptionListItem] (
    [QuestionOptionListItemID] INT IDENTITY (1, 1) NOT NULL,
    [QuestionID]               INT NOT NULL,
    [OptionListItemID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionOptionListItemID] ASC),
    CONSTRAINT [FK_QuestionOptionListItem_OptionListItemID] FOREIGN KEY ([OptionListItemID]) REFERENCES [V7].[OptionListItem] ([OptionListItemID]),
    CONSTRAINT [FK_QuestionOptionListItem_QuestionID] FOREIGN KEY ([QuestionID]) REFERENCES [V7].[Question] ([QuestionID])
);

