CREATE TABLE [V7].[QuestionnaireTypeKeyFieldLink] (
    [QuestionnaireTypeKeyFieldLinkId] INT IDENTITY (1, 1) NOT NULL,
    [QuestionnaireTypeKeyFieldParent] INT NOT NULL,
    [QuestionnaireTypeKeyFieldChild]  INT NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireTypeKeyFieldLinkId] ASC),
    CONSTRAINT [FK_QuestionnaireTypeKeyFieldLink_Child] FOREIGN KEY ([QuestionnaireTypeKeyFieldChild]) REFERENCES [V7].[QuestionnaireTypeKeyField] ([QuestionnaireTypeKeyFieldID]),
    CONSTRAINT [FK_QuestionnaireTypeKeyFieldLink_Parent] FOREIGN KEY ([QuestionnaireTypeKeyFieldParent]) REFERENCES [V7].[QuestionnaireTypeKeyField] ([QuestionnaireTypeKeyFieldID])
);

