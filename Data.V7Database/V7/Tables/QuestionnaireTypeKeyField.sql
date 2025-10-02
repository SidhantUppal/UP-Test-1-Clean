CREATE TABLE [V7].[QuestionnaireTypeKeyField] (
    [QuestionnaireTypeKeyFieldID]         INT           NOT NULL,
    [QuestionnaireTypeID]                 INT           NOT NULL,
    [QuestionnaireTypeKeyFieldCategoryID] INT           NOT NULL,
    [AnswerTypeID]                        INT           NOT NULL,
    [Reference]                           NVARCHAR (50) NOT NULL,
    [Description] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireTypeKeyFieldID] ASC),
    CONSTRAINT [FK_QuestionnaireTypeKeyField_AnswerTypeID] FOREIGN KEY ([AnswerTypeID]) REFERENCES [V7].[AnswerType] ([AnswerTypeID]),
    CONSTRAINT [FK_QuestionnaireTypeKeyField_QuestionnaireTypeID] FOREIGN KEY ([QuestionnaireTypeID]) REFERENCES [V7].[QuestionnaireType] ([QuestionnaireTypeID]),
    CONSTRAINT [FK_QuestionnaireTypeKeyField_QuestionnaireTypeKeyFieldCategoryID] FOREIGN KEY ([QuestionnaireTypeKeyFieldCategoryID]) REFERENCES [V7].[QuestionnaireTypeKeyFieldCategory] ([QuestionnaireTypeKeyFieldCategoryID])
);

